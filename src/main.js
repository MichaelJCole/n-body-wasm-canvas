import { nBodyVisPrettyPrint, nBodyVisCanvas } from "./nBodyVisualizer"
import { Body, nBodySimulator } from "./nBodySimulator"

window.onload = function() {
  // Create a Simulation
  const sim = new nBodySimulator()
  
  // Add some visualizers
  sim.addVisualization(new nBodyVisPrettyPrint(document.getElementById("visPrettyPrint")))
  //sim.addVisualization(new nBodyVisCanvas(document.getElementById("visCanvas")))
  
  // Add some bodies
  // Set Z coords to 1 for best visualiztion in overhead 2d Canvas
  sim.addBody(new Body(1, 1, 1, 100))
  sim.addBody(new Body(-1, -1, 1, 100))
  sim.addBody(new Body(2, -2, 1, 100))
  
  // Start simulation  
  sim.start()
  
  // Add some more
  sim.addBody(new Body(-1, -1, 1, 100))
}
