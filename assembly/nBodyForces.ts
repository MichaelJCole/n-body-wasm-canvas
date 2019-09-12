/**
 * Because can only pass numbers to/from Wasm, our parameters are passed as an array of floats
 * 
 * We let nBodySystem.js apply these forces to the bodies as acceleration.
 * 
 * Doing this means the game loop calculate forces as needed and re-use forces if overloaded.
 */

// Gravitational constant.
export const G: f64 = 6.674e-11;

/**
 * Calculate the forces of Gravity (G) on two bodies.  Return this force as a 2d-vector
 * 
 * @param x0 - Body0 x
 * @param y0 - Body0 y
 * @param m0 - Body0 mass
 * @param x1 - Body1 x
 * @param y1 - Body1 y
 * @param m1 - Body1 mass
 * @return - [fx, fy]
 */
export function twoBodyForces(x0: f64, y0: f64, m0: f64, x1: f64, y1: f64, m1: f64): f64[] {

  // Science for the win!

  // F  =  G * m0 * m1 / d^2
  // F  =  Gmm / d * d
  const Gmm = G * m0 * m1;

  // We calculate distance in the X and Y directions, so it's easier to add the forces together.
  const dx: f64 = x1 - x0;
  const dy: f64 = y1 - y0;

  // Return calculated 2-vector force
  const ret: f64[] = new Array<f64>(2)
  ret[0] = Gmm / (dx * dx);
  ret[1] = Gmm / (dy * dy);

  return ret;
}

/**
 * Given N bodies with mass, in a 2d space, calculate the forces of gravity to be applied to each body.  
 *  
 * data[0] - body0 position x
 * data[1] - body0 position y
 * data[2] - body0 mass
 * data[3] - body1 position x
 * data[4] - body1 position y
 * data[5] - body1 mass
 * data[6] - body2 position x
 * data[7] - body2 position y
 * data[8] - body2 mass
 * 
 * Return those forces in an array of size 2N.
 * 
 * ret[0] - body0 force x
 * ret[1] - body0 force y
 * ret[2] - body1 force x
 * ret[3] - body1 force y
 * ret[4] - body2 force x
 * ret[5] - body2 force y
 * 
 * Check
 * 
 * data.length / 3 = ret.length / 2
 * data.length % 3 = 0
 * ret.length % 2 = 0
 * 
 * @param data Array[Float]
 * @return Array[Float]
 */
export function nBodyForces(data: f64[]): f64[] {
  if (data.length % 3 !== 0) return new Array<f64>(0);

  const numBodies: i32 = data.length / 3;
  let ret: f64[] = new Array<f64>(numBodies * 2);  // return a 2-force x,y vector for each x,y,m passed in.

  /**
   * Calculate the force every unique pair of bodies applies to each other.
   * 
   *   0 1 2 3 4 5
   * 0   x x x x x
   * 1     x x x x
   * 2       x x x
   * 3         x x
   * 4           x
   * 5
   * 
   * Sum those forces together into an array of 2-vector x,y forces
   */

  // For all bodies:
  for (let i: i32 = 0; i < numBodies; i++) {
    // Given body i: pair with every body[j] where j > i
    for (let j: i32 = i + 1; i < numBodies; j++) {
      // Calculate the force the bodies apply to one another
      let f: f64[] = twoBodyForces(
        data[i * 3], data[i * 3 + 1], data[i * 3 + 2], // body[i]
        data[j * 3], data[j * 3 + 1], data[j * 3 + 2], // body[j]
      );
      // Sum the forces applied to each body
      ret[i * 2] = ret[i * 2] + f[0];    // body[i]
      ret[i * 2 + 1] = ret[i * 2 + 1] + f[1];
      ret[j * 2] = ret[j * 2] + f[0];    // body[j]
      ret[j * 2 + 1] = ret[j * 2 + 1] + f[1];
    }
  }
  // Return the summed forces.
  return ret;
}
