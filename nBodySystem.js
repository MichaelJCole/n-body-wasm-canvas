/**
 * Our 2D Universe has forces.
 * 
 * Calculating those forces has a 60% perf boost on mobile
 * 
 * const sim = new ThreeBodySystem([
 *  new Body(1,100, 1){ }
 * ])
 * 
 * let bodies = sim.getBodies() // see class Body
 * 
 * while(true) {
 *   if (magic.idle) {
 *     magic.forces(bodies)
 *     .then(() => {
 *       // bodies have been updated
 *     }
 *     .catch(error => {
 *       // error = "magic in progress" means wait till idle
 *     })
 *   }
 * })
 * 
 */

// Interface object.  
// Subclass or use your own with these paramters.
//export 
class Body {
  constructor(x, y, mG, mM, mD) {
    this.x = x
    this.y = y
    this.mG = mG // masses for forces.  Non-zero reals
    this.mM = mM
    this.mD = mD
    // Added later: fxG, fyG, fxM, fyM, fxD, fyD
  }
}

// wasm takes a single array.
// INTERNAL constants indexes into single array we pass to wasm
const B_X = 0 // space
const B_Y = 1 // space
const B_mG = 2 // Gravitational force of this body
const B_mM = 3 // Magnitiminal force
const B_mD = 4 // Darklivismal force
const B_FxG = 5 // Calculated G force
const B_FyG = 6
const B_FxM = 7 // Calculated Magnitismal force
const B_FyM = 8
const B_FxD = 9 // Calculated Darkliminal force
const B_FyD = 10
const B_OFFSET = 11 // Index where distances start  DIST + nodeId = index of that nodes distance.


/**
 * Our Magic Body System Calculator.  Only one allowed per dimension
 */
let singleton
//export default 
class MagicBodySystem {
  constructor() {
    if (singleton) throw new Error('only one MagicBodySystem per pocket universe')
    singleton = this

    this.objBodies = []
    this.arrBodies = new Float32Array(0)

    this.idle = true
    this.wasmReady = false
    
    this.numPrev = 0
    this.bodySize = B_OFFSET
  }

  prettyState() {
    let ret = `${this.objBodies.length} Magic Bodies\n\n`
    for (let b =0; b < this.objBodies.length; b++) {
      ret += this.prettyBody(b)
    }
    return ret
  }
  prettyBody(b) {
    let body = this.getBody(b)
    let ret = `Body: ${b}, x: ${body.x}, y: ${body.y}\n`
    ret += ` mG ${body.mG}, fxG: ${body.fxG}, ${body.fyG}\n`
    ret += ` mG ${body.mM}, fxM: ${body.fxM}, ${body.fyM}\n`
    ret += ` mG ${body.mD}, fxD: ${body.fxD}, ${body.fyD}\n`
    return ret + `\n`
  }

  ready() {
    return this.idle && this.wasmReady
  }

  // Given a set of bodies, calculate the forces
  conjureForces(objBodies) {
    // Spinlock
    if (!this.ready()) return console.log('Magic not ready')
    this.idle = false

    // Marshal our data:  [Object] -> Float64Array
    this.objBodies = objBodies
    if (this.objBodies.length !== this.numPrev) {
      const size = this.objBodies.length  * this.bodySize
      this.arrBodies = new Float64Array(size)
    }
    this.objBodies.forEach((body, index) => {
      this.setBody(index, body)
    })

    // Start the calculations:  UI -> worker.postMessage -> WASM -> worker.onmessage -> new Promise(forcesResolve, forcesReject)
    worker.postMessage({ 
      purpose: 'calculateForces',
      Val1: 1.0,
      Val2: 2.0 
    })

    return new Promise((resolve, reject) => {
      worker.forcesResolve = resolve
      worker.forcesReject = reject
    })
  }

  getBody(b, body) {
    if (!body) body = new Body(
      this.getBodyValue(b, B_X),
      this.getBodyValue(b, B_Y),
      this.getBodyValue(b, B_mG),
      this.getBodyValue(b, B_mM),
      this.getBodyValue(b, B_mD)
    )
    body.fxG = this.getBodyValue(b, B_FxG) || (Math.random() -.5)
    body.fyG = this.getBodyValue(b, B_FyG) || (Math.random() -.5)
    body.fxM = this.getBodyValue(b, B_FxM)
    body.fyM = this.getBodyValue(b, B_FyM)
    body.fxD = this.getBodyValue(b, B_FxD)
    body.fyD = this.getBodyValue(b, B_FyD)

    return body
  }
  setBody(b, body) {
    this.setBodyValue(b, B_X, body.x)
    this.setBodyValue(b, B_Y, body.y)
    this.setBodyValue(b, B_mG, body.mG)
    this.setBodyValue(b, B_mM, body.mM)
    this.setBodyValue(b, B_mD, body.mD)
  }
  // @inline
  getBodyValue(b, key) {
    return this.arrBodies[b * this.bodySize + key]
  }
  // @inline
  setBodyValue = function(b, key, value) {
    this.arrBodies[b * this.bodySize + key] = value
  }

  // Todo FIXME implement in main.ts as part of forcesReady
  bounds() {
    let ret = { xMin: 0, xMax: 0, yMin: 0, yMax: 0 }
    this.objBodies.forEach(body => {
      if (ret.xMin > body.x) ret.xMin = body.x
      if (ret.xMax < body.x) ret.xMax = body.x
      if (ret.yMin > body.y) ret.yMin = body.y
      if (ret.yMax < body.y) ret.yMax = body.y
    })
    return ret
  }

}



/**
 * Wrap our Magic Universe in a Web Worker and WASM
 * Marshal the data into a Float64Array(), then calculate
 * Bodies are tracked in an array so we can pass to WASM for fast computation.
 */




// See conjureForces for context on code below
// UI -> new Worker() -> worker.postMessage -> wasm -> worker.onmessage -> resolveForces() -> completes conjureForces().then()

// Compile the wasm and send to worker.  (Worker cannot fetch())
WebAssembly.compileStreaming(fetch("out/main.wasm"))
.then(wasmModule => {
  worker.postMessage({ purpose: 'wasmModule', wasmModule })
});

// Create a Web Worker (separate thread) that we'll pass the WebAssembly module to.         
const worker = new Worker("worker.js");
worker.onerror = function (evt) {
  console.log(`Error from Web Worker: ${evt.message}`);
}

// worker.js this.postMessage
worker.onmessage = function (evt) {
  if (singleton && evt && evt.data) {
    switch (evt.data.purpose) {
      // wasm has loaded module.  Let the magic begin!
      case 'wasmReady': 
        singleton.wasmReady = true
        break
      // 
      case 'forcesReady':
        singleton.idle = true
        if (evt.data.error) {
          // Reject the promise returned by: this.magic.conjureForces()
          worker.forcesReject(evt.data)
        } else {
          // Fulfill the promise returned by: this.magic.conjureForces()
          singleton.objBodies.forEach((body, index) => {
            singleton.getBody(index, body) // copy from array
          })
          worker.forcesResolve(singleton.objBodies)
        }
        break
    }
  }
}


// For development
window.Body = Body
window.MagicBodySystem = MagicBodySystem
