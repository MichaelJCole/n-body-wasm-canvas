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
 * Given two bodies, calculate the Force of Gravity, then return as a 3-force vector (x, y, z)
 * 
 * Sometimes, the force of gravity is:  
 * 
 * Fg  =  G * mA * mB / r^2
 * 
 * Today, we're using better-gravity, because better-gravity can calculate force vectors without polar math (sin, cos, tan)
 * 
 * Fbg =  G * mA * mB * dr / r^3     // using dr as a 3-value vector let's us project Fbg as a 3-force vector
 * 
 * It may sound like bullshit, but it's not wrong:
 * - https://physics.stackexchange.com/questions/17285/split-gravitational-force-into-x-y-and-z-componenets
 * - https://stackoverflow.com/questions/57966211/calcuate-force-of-gravity-on-2-bodies-in-3d-space?noredirect=1#comment102344210_57966211
 * 
 * Given:
 * - dx = bodyB.x - bodyA.x
 * - dr = (dx, dy, dz)     // a 3-value vector
 * - r  = sqrt ( dx + dy + dz) = straight line distance between objects    
 * - G  = gravitational constant
 * - mA, mB = mass of objects
 * 
 * Force of Better-Gravity:
 * 
 * - Fbg = (Fx, Fy, Fz)  =  the change in force applied by gravity each body's (x,y,z) over a time period (1)
 * - Fbg = G * mA * mB * dr / r^3   // dr = (dx, dy, dz)
 * - Fx = Gmm * dx / r3 
 * - Fy = Gmm * dy / r3 
 * - Fz = Gmm * dz / r3 
 * 
 * From the parameters, return an array 
 * 
 * @param xA - BodyA x
 * @param yA - BodyA y
 * @param zA - BodyA z
 * @param mA - BodyA mass
 * @param xB - BodyB x
 * @param yB - BodyB y
 * @param zB - BodyB z
 * @param mB - BodyB mass
 * @return - [fx, fy, fz]
 */
function twoBodyForces(xA: f64, yA: f64, zA: f64, mA: f64, xB: f64, yB: f64, zB: f64, mB: f64): f64[] {

  // Values used in each x,y,z calculation
  const Gmm: f64 = G * mA * mB
  const dx: f64 = xB - xA
  const dy: f64 = yB - yA
  const dz: f64 = zB - zA
  const r: f64 = Math.sqrt(dx * dx + dy * dy + dz * dz)
  const r3: f64 = r * r * r

  // Return calculated foce vector
  const ret: f64[] = new Array<f64>(3)

  // The best not-a-number number is zero thank you.  Two bodies in the same x,y,z
  if (isNaN(r) || r === 0) return ret

  // Calculate each part of the vector
  ret[0] = Gmm * dx / r3
  ret[1] = Gmm * dy / r3
  ret[2] = Gmm * dz / r3

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

  const numBodies: i32 = arrBodies.length / bodySize
  if (arrBodies.length % bodySize !== 0) trace("INVALID nBodyForces parameter.  Chaos ensues...")

  // Create result array.  This should be garbage collected later:  https://docs.assemblyscript.org/details/memory#dynamic-memory

  let arrForces: Float64Array = new Float64Array(numBodies * forceSize)

  // For all bodies:

  for (let i: i32 = 0; i < numBodies; i++) {
    // Given body i: pair with every body[j] where j > i
    for (let j: i32 = i + 1; j < numBodies; j++) {
      // Calculate the force the bodies apply to one another
      const bI: i32 = i * bodySize
      const bJ: i32 = j * bodySize

      const f: f64[] = twoBodyForces(
        arrBodies[bI], arrBodies[bI + 1], arrBodies[bI + 2], arrBodies[bI + 3], // x,y,z,m
        arrBodies[bJ], arrBodies[bJ + 1], arrBodies[bJ + 2], arrBodies[bJ + 3], // x,y,z,m
      )

      // Add this pair's force on one another to their total forces applied x,y,z

      const fI: i32 = i * forceSize
      const fJ: i32 = j * forceSize

      // body0
      arrForces[fI] = arrForces[fI] + f[0]
      arrForces[fI + 1] = arrForces[fI + 1] + f[1]
      arrForces[fI + 2] = arrForces[fI + 2] + f[2]

      // body1    
      arrForces[fJ] = arrForces[fJ] - f[0]   // apply forces in opposite direction
      arrForces[fJ + 1] = arrForces[fJ + 1] - f[1]
      arrForces[fJ + 2] = arrForces[fJ + 2] - f[2]
    }
  }
  // For each body, return the summ of forces all other bodies applied to it.
  // If you'd like to debug wasm, you can use trace or the log functions described in workerWasm when we initialized
  // E.g. trace("nBodyForces returns (b0x, b0y, b0z, b1z): ", 4, arrForces[0], arrForces[1], arrForces[2], arrForces[3]) // x,y,z
  return arrForces  // success
}
