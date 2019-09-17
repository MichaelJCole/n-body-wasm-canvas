/**
 * The WebAssembly module instance that we'll be working with
 * synchronous in this web worker thread.
 * 
 * The .wasm file data is message'd from the main thread because a web worker cannot fetch() from the network.
 */
var wasm = null


/**
 * The assemblyscript loader.  It adds helpers for moving data to/from AssemblyScript.  Highly recommended
 */
const loader = require("assemblyscript/lib/loader")

/**
 * When we instantiate the .wasm module, give it a context to work in:
 * nBodyForces: {} is a table of functions we can import into AssemblyScript.  See top of nBodyForces.ts
 * env: {} describes the environment sent to the Wasm module as it's instantiated
 */
const importObj = {
  nBodyForces: {
    logI(data) { console.log("Log() - " + data); },
    logF(data) { console.log("Log() - " + data); },
    logS(data) { console.log("Log() - " + wasm.__getString(data)); },

  },
  env: {
    abort(msg, file, line, column) {
      // wasm.__getString() is added by assemblyscript's loader: https://github.com/AssemblyScript/assemblyscript/tree/master/lib/loader
      console.error("abort: (" + wasm.__getString(msg) + ") at " + wasm.__getString(file) + ":" + line + ":" + column);
    },
    trace(msg, n) {
      console.log("trace: " + wasm.__getString(msg) + (n ? " " : "") + Array.prototype.slice.call(arguments, 2, 2 + n).join(", "));
    }
  }
}

/**
 * Web Workers listen for messages from the main thread.  This is the entire API surface area
 */
this.onmessage = function (evt) {

  // message from UI thread
  var msg = evt.data 
  switch (msg.purpose) {

    // Message: Load new wasm module

    case 'wasmModule': 
      // Instantiate the compiled module we were passed.
      wasm = loader.instantiate(msg.wasmModule, importObj)  // Throws
      // Tell nBodySimulation.js we are ready
      this.postMessage({ purpose: 'wasmReady' })
      return 


    // Message: Given array of floats describing a system of bodies (x,y,x,mass), 
    // calculate the Grav forces to be applied to each body

    case 'nBodyForces':
      if (!wasm) throw new Error('wasm not initialized')

      // Copy msg.arrBodies array into the wasm instance, increase GC count
      const dataRef = wasm.__retain(wasm.__allocArray(wasm.FLOAT64ARRAY_ID, msg.arrBodies));
      // Do the calculations in this thread synchronously
      const resultRef = wasm.nBodyForces(dataRef);
      // Copy result array from the wasm instance
      const arrForces = wasm.__getFloat64Array(resultRef);

      // Decrease the GC count on dataRef from __retain() here, and GC count from new Float64Array in wasm module
      wasm.__release(dataRef);
      wasm.__release(resultRef);
      
      console.log('arrBodies, arrForces', msg. arrBodies, arrForces)
      // Message results back to main thread.  see nBodySimulation.js this.worker.onmessage
      return this.postMessage({
        purpose: 'nBodyForces', 
        arrForces
      })
  }
}