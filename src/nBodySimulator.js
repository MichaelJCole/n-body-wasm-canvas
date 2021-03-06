/**
 * This creates an n-body simulation in 3d space using mass, distance, and gravity.
 * 
 * Example usage:
 * 
 * const sim = new nBodySimulator()
 * 
 * sim.addVisualization(new nBodyVisPrettyPrint())
 * sim.addVisualization(new nBodyVisCanvas())
 * 
 * // Set Z coords to 1 for best visualiztion in overhead 2d Canvas
 * sim.addBody(new Body(1, 1, 1, 100))
 * 
 * // Start simulation with empty universe, then add bodies.  
 * sim.start()
 * sim.addBody(new Body(-1, -1, 1, 100))
 * sim.addBody(new Body(2, -2, 1, 100))
 */

/**
 * Body doesn't do much and resists change.  For our purposes, negative mass is fun.
 * 
 * If pX or pY are unspecified, we give the body random initial momentum 
 * so the spinny doesn't devolve to weird oscilating linear orbit
 
 * No collisions or splody are implemented.
 */
export class Body {
  constructor(name, color, x, y, z, mass, vX, vY, vZ) {
    this.name = name
    this.color = color
    this.x = x
    this.y = y
    this.z = z
    this.mass = mass
    
    this.vX = vX || 0
    this.vY = vY || 0
    this.vZ = vZ || 0

    this.forceX = 0
    this.forceY = 0
    this.forceZ = 0

    this.drawSize = Math.min(   Math.max( Math.log10(mass), 1),   10)
  }
}


/**
 * Our n-body system simulator
 */
export class nBodySimulator {

  constructor() {
    this.setupWebWorker()

    // 1000 ms/s / 33 ms/frame = 30 frame/sec.  FIXME this could be replaced with requestAnimationFrame()
    this.simulationSpeed = 33

    // Source of truth
    this.objBodies = []
    
    // used to index arrBodies
    this.bodySize = 4   // x,y,z,mass

    // used to index arrForces
    this.forceSize = 3  // x,y,z

    // Debris bounds.  see trimDebris().
    this.debrisBounds = 12

    // Has the worker been setup?
    this.workerReady = false
    // Is the worker calculating
    this.workerCalculating = false

    // Array of our visualizations
    this.visualizations = []
  }

  /**
   * Is the simulation ready to calculate
   */
  ready() {
    return this.workerReady && !this.workerCalculating
  }

  /**
   * Add a body to the simulation.
   */
  addBody(body) {
    this.objBodies.push(body)
  }

  /**
   * Start the simulation loop
   */
  start() {
    // This is the simulation loop.  step() calls visualize()
    const step = this.step.bind(this)
    setInterval(step, this.simulationSpeed)
  }

  /**
   * This is the simulation loop.
   */
  async step() {
    // Skip calculation if worker not ready.  We scheduled this to run every 33ms (30fps), so expect it to skip.
    if (this.ready()) {
      await this.calculateForces()
    } else {
      console.log(`Skipping calcuation:  WorkerReady: ${this.workerReady}   WorkerCalculating: ${this.workerCalculating}`)
    }
    // Remove any "debris" that has traveled out of bounds - this is for the button
    this.trimDebris()

    // Now Update forces.  Reuse old forces if worker is already busy calculating.
    this.applyForces()

    // Now Visualize
    this.visualize()
  }

  /** 
   * Use our web worker to calculate the forces to apply on our bodies.
   */
  calculateForces() {
    this.workerCalculating = true
    this.arrBodies = []

    // Copy data to array
    this.objBodies.forEach((body, index) => {
      const b = index * this.bodySize
      this.arrBodies[b] = body.x
      this.arrBodies[b + 1] = body.y
      this.arrBodies[b + 2] = body.z
      this.arrBodies[b + 3] = body.mass
    })

    // return promise that worker.onmessage will fulfill
    const ret = new Promise((resolve, reject) => {
      this.forcesResolve = resolve
      this.forcesReject = reject
    })
    
    // postMessage() to worker to start calculation
    // Execution continues in workerWasm.js worker.onmessage()
    this.worker.postMessage({ 
      purpose: 'nBodyForces',
      arrBodies: this.arrBodies,
    })

    // Return promise for completion
    // Promise is resolve()d in this.worker.onmessage() below.
    // Once resolved, execution continees in step() above - await this.calculateForces()
    return ret
  }

  /**
   * Trim debris.  We let the player/user throw random bits into the universe for fun.
   * But fun means watching it fly off, not the vis camera fly around.
   * So we remove stuff that's gotten out of bounds
   */
  trimDebris() {
    this.objBodies = this.objBodies.filter( body => {
      if (body.name !=="debris") return true
      if (isNaN(body.x) || isNaN(body.y) || isNaN(body.z)) return false
      if (body.x < -this.debrisBounds || body.x > this.debrisBounds) return false
      if (body.y < -this.debrisBounds || body.y > this.debrisBounds) return false
      if (body.z < -this.debrisBounds || body.z > this.debrisBounds) return false
      return true
    })
  }

  /**
   * Apply those forces.  Yes, this could be moved out of the UI thread,
   * but passing objects across Wasm boundaries is dumb-hard - the kind of hard that is neither fun nor profitable.
   * 
   * Physics:
   * 
   * V = d/t             Velocity = distance / time
   * P = mV              Momentum = mass * Velocity
   * F = ma              Force = mass * acceleration
   * 
   * Given the positions and mass of our bodies, we calculated the Grav forces applied in arrForces.
   * 
   * Now, we want to push the bodies around using the forces.
   * 
   * This is me trying to remember how to do high school physics.
   * 
   * Given our positions and forces, 
   * 
   * F = ma.            Known F (wasm) and m (body)
   * a = F/m.           Known a
   * a = dV / t.        Known t (1/tick) - we will apply previous forces, so t always = 1
   * F/m = dV / t
   * dV = Ft/m
   * V2 = V1 + dV       Known dV, V1
   * x2 = x1 + V2 * t   Known x1, V2, t
   * 
   * x2 = x1 + (V1 + (F/m))
   * 
   * body.vX = body.vX + body.forceX / body.mass
   * body.x = body.x + body.vX
   */
  applyForces() {
    this.objBodies.forEach( (body, i) => {

      if (body.mass === 0 || !this.arrForces) return // 0 mass bodies are used to position the camera min viewin the canvas visualizer.

      // Capture forces
      body.forceX = this.arrForces[i * this.forceSize + 0]
      body.forceY = this.arrForces[i * this.forceSize + 1]
      body.forceZ = this.arrForces[i * this.forceSize + 2]

      // Convert to velocity.  We could remove mass in nBodyForces.ts and just send velocities, but I'm moving this project to the done pile.
      body.vX = body.vX + body.forceX / body.mass
      body.vY = body.vY + body.forceY / body.mass  
      body.vZ = body.vZ + body.forceZ / body.mass  

      // Update position from velocity
      body.x = body.x + body.vX
      body.y = body.y + body.vY
      body.z = body.z + body.vZ
    })
  }

  /**
   * Loop through our visualizers and paint()
   */
  visualize() {
    this.visualizations.forEach(vis => {
      vis.paint(this.objBodies)
    })
  }

  /**
   * Add a visualizer to our list
   */
  addVisualization(vis) {
    this.visualizations.push(vis)
  }

  /**
   * Setup our web worker - buckle up, let's get weird.
   */
  setupWebWorker() {

    // Create a Web Worker (separate thread) that we'll pass the WebAssembly module to.         
    this.worker = new Worker("workerWasm.js");

    // Console errors from workerWasm.js
    this.worker.onerror = function (evt) {
      console.log(`Error from Web Worker: ${evt.message}`);
    }

    // Listen for messages from workerWasm.js postMessage()
    const self = this
    this.worker.onmessage = function (evt) {
      if (evt && evt.data) {
        
        // Messages are dispatched by purpose
        const msg = evt.data
        switch (msg.purpose) {

          // worker has loaded the wasm module we compiled and sent.  Let the magic begin!
          // See postmessage at the bottom of this function.

          case 'wasmReady': 
            self.workerReady = true
            break

          // wasm has computed forces for us

          case 'nBodyForces':
            self.workerCalculating = false
            // Accept/Reject the promise to resolve await this.calculateForces() in step() above
            if (msg.error) {
              self.forcesReject(msg.error)
            } else {
              self.arrForces = msg.arrForces
              self.forcesResolve(self.arrForces)
            }
            break
        }
      }
    }

    // Fetch and compile the wasm module because web workers cannot fetch()
    WebAssembly.compileStreaming(fetch("assembly/nBodyForces.wasm"))
    // Send the compiled wasm module to the worker as a message
    .then(wasmModule => {
      self.worker.postMessage({ purpose: 'wasmModule', wasmModule })
    });
  }
}
