var importObject = {
  main: {
    sayHello() {
      console.log("Hello from WebAssembly!");
    }
  },
  env: {
    abort(_msg, _file, line, column) {
      console.error("abort called at main.ts:" + line + ":" + column);
    }
  }
}

// TODO: implement using Cloudflare workers: https://blog.cloudflare.com/webassembly-on-cloudflare-workers/

// The WebAssembly module instance that we'll be working with   
var wasm = null

// Listen for messages from the main thread.  This is the API surface area
this.onmessage = function (evt) {
  // If we've been asked to call the module's Add method then...     
  var data = evt.data

  switch (data.purpose) {
    // worker may not fetch, so main page must pass us wasm module
    case 'wasmModule': 
      return WebAssembly.instantiate(data.wasmModule, importObject).then(instance => {
        wasm = instance
        this.postMessage({ purpose: 'wasmReady' })
      })
    // Perform the calculation
    case 'calculateForces':
      if (!wasm) throw new Error('wasm not initialized')
      var iResult = wasm.exports.add(data.Val1, data.Val2)
      return this.postMessage({
        purpose: 'forcesReady', result: iResult.toString()
      })
  } 
}