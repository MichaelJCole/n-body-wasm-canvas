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
      this.pX = (pX === undefined) ? (Math.random()-.5) * 10 : pX;
      this.pY = (pY === undefined) ? (Math.random()-.5) * 10 : pY;
      this.pZ = pZ;
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
      //setInterval(step, this.simulationSpeed)
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
     * 
     * CHALLENGE - pass an array of floats from here through web worker to wasm and return values back
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
      // Continued in workerWasm.js worker.onmessage()
      this.worker.postMessage({ 
        purpose: 'nBodyForces',
        arrBodies: this.arrBodies,
      });

      // Continued in step()  await this.calculateForces()
      return ret
    }

    /**
     * Apply those forces.  Yes, this could be moved out of the UI thread.
     */
    applyForces() {
      // Accelerate our bodies using the forces calcuated
      // F = ma.   a = F/m.
      // Here we convert magical forces to physical energy in the MatterJS world
      // f = ma.   a = f/m.  
      // Each body has one mass and several force polarities (pG, pM, pD).
      // Force polarity also scales mass.  
      //   pG = 1 regular gravity
      //   pG = -1 regular anti-gravity
      //   pG = -2 double-strength anti-gravity

      // fG = ma*pG.  aG = f/m*pG
      // a = dV / t
      // v = x / t

      // For MatterJS, we want to affect Velocity or Acceleration
      // for our canvas simulation, we apply them linearly
      //console.log('applyForces()', this.arrForces)
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
     * Setup our web worker
     */
    setupWebWorker() {

      // Create a Web Worker (separate thread) that we'll pass the WebAssembly module to.         
      this.worker = new Worker("workerWasm.js");

      // Console errors from worker.js
      this.worker.onerror = function (evt) {
        console.log(`Error from Web Worker: ${evt.message}`);
      };

      // Listen for messages from worker.js postMessage()
      const self = this;
      this.worker.onmessage = function (evt) {
        if (evt && evt.data) {
          const msg = evt.data;
          console.log('nBodySimulator.js', msg);

          // Messages are dispatched by purpose
          switch (msg.purpose) {

            // worker has loaded the wasm module we compiled and sent.  Let the magic begin!
            case 'wasmReady': 
              self.workerReady = true;
              break

            // wasm has computed forces for us
            case 'nBodyForces':
              self.workerCalculating = false;
              if (msg.error) {
                // Accept/Reject the promise to resolve await in step() above
                self.forcesReject(msg.error);
              } else {
                this.arrForces = msg.arrForces;
                self.forcesResolve(this.arrForces);
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
