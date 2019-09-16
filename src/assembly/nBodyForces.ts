/**
 * Because can only pass numbers to/from Wasm, our parameters are passed as an array of floats
 * 
 * We let nBodySystem.js apply these forces to the bodies as acceleration.
 * 
 * Doing this means the game loop calculate forces as needed and re-use forces if overloaded.
 *
 * TODO FIXME Possible performance boost using unchecked() https://github.com/AssemblyScript/assemblyscript/issues/838
 */

declare function logI(data: i32): void
declare function logF(data: f64): void
declare function logS(data: string): void

export const FLOAT64ARRAY_ID = idof<Float64Array>();


// Gravitational constant.  Any G could be used in a game.  This value is best for a scientific simulation.
export const G: f64 = 6.674e-11;

// for sizing and indexing arrays
export const bodySize: i32 = 4
export const forceSize: i32 = 3

/**
 * Calculate the forces of Gravity (G) on two bodies.  Return this force as a 2d-vector
 * 
 * Exporting your wasm functions make them easier to debug.
 * 
 * @param x0 - Body0 x
 * @param y0 - Body0 y
 * @param y0 - Body0 z
 * @param m0 - Body0 mass
 * @param x1 - Body1 x
 * @param y1 - Body1 y
 * @param y1 - Body1 z
 * @param m1 - Body1 mass
 * @return - [fx, fy]
 */
function twoBodyForces(x0: f64, y0: f64, z0: f64, m0: f64, x1: f64, y1: f64, z1: f64, m1: f64): f64[] {
  // Science for the win!

  // F  =  G * m0 * m1 / d^2
  // F  =  Gmm / d * d
  const Gmm = G * m0 * m1;

  // We calculate distance in the X and Y directions, so it's easier to add the forces together.
  const dx: f64 = x1 - x0;
  const dy: f64 = y1 - y0;
  const dz: f64 = z1 - z0;

  //trace("Gmm, dx, dy, dz", 4, Gmm, dx, dy, dz)

  // Return calculated 2-vector force
  const ret: f64[] = new Array<f64>(3)
  ret[0] = Gmm / (dx * dx);
  ret[1] = Gmm / (dy * dy);
  ret[2] = Gmm / (dz * dz);

  //trace("ret", 3, ret[0], ret[1], ret[2])
  return ret;
}

/**
 * Given N bodies with mass, in a 3d space, calculate the forces of gravity to be applied to each body.  
 * 
 * This function is exported to JavaScript, so only takes/returns numbers and arrays.
 * For N bodies, pass and array of 4N values (x,y,z,mass) and expect a 3N array of forces (x,y,z)
 * Those forcess can be applied to the bodies mass to update the its position in the simulation.

 * Calculate the 3-vector each unique pair of bodies applies to each other.
 * 
 *   0 1 2 3 4 5
 * 0   x x x x x
 * 1     x x x x
 * 2       x x x
 * 3         x x
 * 4           x
 * 5
 * 
 * Sum those forces together into an array of 3-vector x,y,z forces
 * 
 * Return 0 on success
 */
export function nBodyForces(arrBodies: Float64Array): Float64Array { 

  // Check inputs

  //trace("nBodyForces.length in", 1, arrBodies.length)
  const numBodies: i32 = arrBodies.length / bodySize
  //trace("numBodies", 1, numBodies)
  if (arrBodies.length % bodySize !== 0) trace("INVALID nBodyForces parameter.  Chaos ensues...")

  // Create result array.  This should be garbage collected later:  https://docs.assemblyscript.org/details/memory#dynamic-memory

  let arrForces: Float64Array = new Float64Array(numBodies * forceSize)

  // For all bodies:

  for (let i: i32 = 0; i < numBodies; i++) {
    //trace("bodyI", 1, i)
    // Given body i: pair with every body[j] where j > i
    for (let j: i32 = i + 1; j < numBodies; j++) {
      //trace("bodyJ", 1, j)
      // Calculate the force the bodies apply to one another
      const bI: i32 = i * bodySize
      const bJ: i32 = j * bodySize
      
      const f: f64[] = twoBodyForces(
        arrBodies[bI], arrBodies[bI+1], arrBodies[bI+2], arrBodies[bI+3], // x,y,z,m
        arrBodies[bJ], arrBodies[bJ+1], arrBodies[bJ+2], arrBodies[bJ+3], // x,y,z,m
      )
      trace("f", 3, f[0], f[1], f[2])

      // Add this pair's force on one another to their total forces applied x,y,z

      const fI: i32 = i * forceSize
      const fJ: i32 = j * forceSize

      // body0
      //trace("update arrForces[bI]: ", 4, bI, arrForces[fI], arrForces[fI+1], arrForces[fI+2]) // x,y,z
      arrForces[fI] = arrForces[fI] + f[0]
      arrForces[fI+1] = arrForces[fI+1] + f[1]
      arrForces[fI+2] = arrForces[fI+2] + f[2]
      //trace("update arrForces[bI]: ", 4, bI, arrForces[fI], arrForces[fI+1], arrForces[fI+2]) // x,y,z

      // body1    
      //trace("update arrForces[bJ]: ", 4, bI, arrForces[fI], arrForces[fI+1], arrForces[fI+2]) // x,y,z
      arrForces[fJ] = arrForces[fJ] + f[0] 
      arrForces[fJ+1] = arrForces[fJ+1] + f[1]    
      arrForces[fJ+2] = arrForces[fJ+2] + f[2]
      //trace("update arrForces[bJ]: ", 4, bJ, arrForces[fJ], arrForces[fJ+1], arrForces[fJ+2]) // x,y,z
      //trace('done j', 1, j)
    }
    //trace('done i', 1, i)
  }
  // For each body, return the summ of forces all other bodies applied to it.
  //trace("nBodyForces returns (b0x, b0y, b0z, b1z): ", 4, arrForces[0], arrForces[1], arrForces[2], arrForces[3]) // x,y,z
  return arrForces  // success
}
