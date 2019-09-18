import { nBodyVisPrettyPrint, nBodyVisCanvas } from "./nBodyVisualizer"
import { Body, nBodySimulator } from "./nBodySimulator"

window.onload = function() {
  // Create a Simulation
  const sim = new nBodySimulator()
  
  // Add some visualizers
  sim.addVisualization(new nBodyVisPrettyPrint(document.getElementById("visPrettyPrint")))
  sim.addVisualization(new nBodyVisCanvas(document.getElementById("visCanvas")))

  // This is a simulation, using opinionated G = 6.674e-11
  // So boring values are allowed and create systems that collapse over billions of years.

  // For spinny, where distance = 1, masses of 1e10 are fun

  // Set Z coords to 1 for best visualiztion in overhead 2d Canvas
  // lol, making up stable universes is hard
  //                   name            color     x    y    z    m      vz    vy   vz
  sim.addBody(new Body("star",         "yellow", 0,   0,   0,   1e9)) 
  sim.addBody(new Body("hot jupiter",  "red",   -1,  -1,   0,   1e4,  .24,  -0.05,  0))
  sim.addBody(new Body("cold jupiter", "purple", 4,   4, -.1,   1e4, -.07,   0.04,  0))
  // A couple far-out asteroids to pin the canvas visualization in place.
  sim.addBody(new Body("asteroid",     "black", -15,  -15,  0,  0))  
  sim.addBody(new Body("asteroid",     "black",  15,   15,  0,  0))

  // Start simulation  
  sim.start()
  
  // Add another
  sim.addBody(new Body("saturn",       "blue",  -8,  -8,  .1,   1e3,   .07,   -.035,  0))

  // That is the extent of my effort to hand craft a stable solar system.

  // We can now play in that system by throwing debris around (inner plants)
  // Because that debris will have significanly smaller mass, it won't disturb our stable system (hopefully :-)
  // This requires we remove bodies that fly out of bounds past our 15x15 astroids.  
  // See sim.trimDebris().  It's a bit hacky, but my client (me) doesn't want to pay for it and wants the WebVR version

  function rando(scale) {
    return (Math.random()-.5) * scale
  }

  document.getElementById("mayhem").addEventListener('click', () => {
    for (let x=0; x<10; x++) {
      sim.addBody(new Body("debris", "white", rando(10), rando(10), rando(10), 1, rando(.1), rando(.1), rando(.1)))
    }
  })

}
