(function () {
  'use strict';

  /**
   * This is a toolkit of visualizers for our simulation.
   */

  /**
   * Base class that console.log()s the simulation state.
   */
  class nBodyVisualizer {
    constructor(htmlElement) {
      this.htmlElement = htmlElement;
      this.resize();
    }

    resize() {}

    paint(bodies) {
      console.log(JSON.stringify(bodies, null, 2));
    }

  }

  /**
   * Pretty print simulation to an htmlElement's innerHTML
   */
  class nBodyVisPrettyPrint extends nBodyVisualizer {
    constructor(htmlElement) {
      super(htmlElement);
    }

    resize() {}

    paint(bodies) {
      this.htmlElement.innerHTML = JSON.stringify(bodies, null, 2);
    }
  }

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
  class Body {
    constructor(x, y, z, mass, pX, pY, pZ) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.mass = mass;
    }
  }


  /**
   * Our n-body system simulator
   */
  class nBodySimulator {

    constructor() {
      this.setupWebWorker();

      // 1000 ms/s / 33 ms/frame = 30 frame/sec.  FIXME this could be replaced with requestAnimationFrame()
      this.simulationSpeed = 2000;

      // Source of truth
      this.objBodies = [];
      
      // used to index arrBodies
      this.bodySize = 4;   // x,y,z,mass

      // used to index arrForces
      this.forceSize = 3;  // x,y,z

      // Has the worker been setup?
      this.workerReady = false;
      // Is the worker calculating
      this.workerCalculating = false;

      // Array of our visualizations
      this.visualizations = [];

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
      this.objBodies.push(body);
    }

    /**
     * Start the simulation loop
     */
    start() {
      // This is the simulation loop.  step() calls visualize()
      const step = this.step.bind(this);
      setInterval(step, this.simulationSpeed);
    }

    /**
     * This is the simulation loop.
     */
    async step() {
      // Skip calculation if worker not ready.  We scheduled this to run every 33ms (30fps), so expect it to skip.
      if (this.ready()) {
        await this.calculateForces();
      } else {
        console.log(`Skipping calcuation:  WorkerReady: ${this.workerReady}   WorkerCalculating: ${this.workerCalculating}`);
      }

      // Now Update forces.  Reuse old forces if worker is already busy calculating.
      this.applyForces();

      // Now Visualize
      this.visualize();
    }

    /** 
     * Use our web worker to calculate the forces to apply on our bodies.
     */
    calculateForces() {
      this.workerCalculating = true;
      this.arrBodies = [];

      // Copy data to array
      this.objBodies.forEach((body, index) => {
        const b = index * this.bodySize;
        this.arrBodies[b] = body.x;
        this.arrBodies[b + 1] = body.y;
        this.arrBodies[b + 2] = body.z;
        this.arrBodies[b + 3] = body.mass;
      });

      // return promise that worker.onmessage will fulfill
      const ret = new Promise((resolve, reject) => {
        this.forcesResolve = resolve;
        this.forcesReject = reject;
      });
      
      // postMessage() to worker to start calculation
      // Execution continues in workerWasm.js worker.onmessage()
      this.worker.postMessage({ 
        purpose: 'nBodyForces',
        arrBodies: this.arrBodies,
      });

      // Return promise for completion
      // Promise is resolve()d in this.worker.onmessage() below.
      // Once resolved, execution continees in step() above - await this.calculateForces()
      return ret
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
        // Capture forces
        body.forceX = this.arrForces[i * this.forceSize + 0];
        body.forceY = this.arrForces[i * this.forceSize + 1];
        body.forceZ = this.arrForces[i * this.forceSize + 2];
        
        // Convert to velocity vectors
        // body.vX = body.vX + body.forceX / body.mass
        body.vX = body.vX + body.forceX / body.mass;  // We could remove mass in nBodyForces.ts and just send velocities, but I'm super bored with this project already.
        body.vY = body.vY + body.forceY / body.mass;  
        body.vZ = body.vZ + body.forceZ / body.mass;  

        // Update position from velocity
        // body.x = body.x + body.vX
        //body.x = body.x + body.vX
        //body.y = body.y + body.vY
        //body.z = body.z + body.vZ
      });
      //debugger
    }

    /**
     * Loop through our visualizers and paint()
     */
    visualize() {
      this.visualizations.forEach(vis => {
        vis.paint(this.objBodies);
      });
    }

    /**
     * Add a visualizer to our list
     */
    addVisualization(vis) {
      this.visualizations.push(vis);
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
      };

      // Listen for messages from workerWasm.js postMessage()
      const self = this;
      this.worker.onmessage = function (evt) {
        if (evt && evt.data) {
          
          // Messages are dispatched by purpose
          const msg = evt.data;
          switch (msg.purpose) {

            // worker has loaded the wasm module we compiled and sent.  Let the magic begin!
            // See postmessage at the bottom of this function.

            case 'wasmReady': 
              self.workerReady = true;
              break

            // wasm has computed forces for us

            case 'nBodyForces':
              self.workerCalculating = false;
              // Accept/Reject the promise to resolve await this.calculateForces() in step() above
              if (msg.error) {
                self.forcesReject(msg.error);
              } else {
                self.arrForces = msg.arrForces;
                self.forcesResolve(self.arrForces);
              }
              break
          }
        }
      };

      // Fetch and compile the wasm module because web workers cannot fetch()
      WebAssembly.compileStreaming(fetch("assembly/nBodyForces.wasm"))
      // Send the compiled wasm module to the worker as a message
      .then(wasmModule => {
        self.worker.postMessage({ purpose: 'wasmModule', wasmModule });
      });
    }
  }

  window.onload = function() {
    // Create a Simulation
    const sim = new nBodySimulator();
    
    // Add some visualizers
    sim.addVisualization(new nBodyVisPrettyPrint(document.getElementById("visPrettyPrint")));
    //sim.addVisualization(new nBodyVisCanvas(document.getElementById("visCanvas")))
    
    // Add some bodies
    // Set Z coords to 1 for best visualiztion in overhead 2d Canvas
    sim.addBody(new Body(1, 1, 1, 100));
    sim.addBody(new Body(-1, -1, 1, 100));
    sim.addBody(new Body(2, -2, 1, 100));
    
    // Start simulation  
    sim.start();
    
    // Add some more
    sim.addBody(new Body(-1, -1, 1, 100));
  };

}());
//# sourceMappingURL=main.js.map
