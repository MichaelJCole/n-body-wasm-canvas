/**
 * This is a toolkit of visualizers for our simulation.
 */

/**
 * Base class that console.log()s the simulation state.
 */
export class nBodyVisualizer {
  constructor(htmlElement) {
    this.htmlElement = htmlElement
    this.resize()
  }

  resize() {}

  paint(bodies) {
    console.log(JSON.stringify(bodies, null, 2))
  }

}

/**
 * Pretty print simulation to an htmlElement's innerHTML
 */
export class nBodyVisPrettyPrint extends nBodyVisualizer {
  constructor(htmlElement) {
    super(htmlElement)
  }

  resize() {}

  paint(bodies) {
    this.htmlElement.innerHTML = JSON.stringify(bodies, null, 2)
  }
}

/**
 * Draw simulation state to Canvas
 */
export class nBodyVisCanvas extends nBodyVisualizer {
  constructor(htmlElement) {
    super(htmlElement)

    // Listen for resize to scale our simulation
    window.onresize = this.resize.bind(this)
  }

  // If the window is resized, we need to resize our visualization
  resize() {
    this.sizeX = this.htmlElement.offsetWidth
    this.sizeY = this.htmlElement.offsetHeight
    this.htmlElement.width = this.sizeX
    this.htmlElement.height = this.sizeY
    this.vis = this.htmlElement.getContext('2d')
  }

  // Paint on the canvas
  paint() {
    // We need to convert our 3d float universe to a 2d pixel visualization
    // calculate shift and scale
    const bounds = this.bounds()
    const shiftX = bounds.xMin
    const shiftY = bounds.yMin
    const scaleX = this.sizeX / (bounds.xMax - bounds.xMin)
    const scaleY = this.sizeY / (bounds.yMax - bounds.yMin)

    // Begin Draw
    this.vis.clearRect(0, 0, visX, visY)
    const colors = ['#ff0000', '#0000ff', '#00ff00']
    this.bodies.forEach((body, index) => {
      // Fancy colors are nice
      this.vis.fillStyle = colors[index % 3]
      // Draw on canvas
      const drawX = (body.x - shiftX) * scaleX
      const drayY = (body.y - shiftY) * scaleY
      this.vis.fillRect(x-10, y-10, 20, 20)  // draw 20x20 body
    });
  }

  // Because we draw the 3d space in 2d from the top, we ignore z
  bounds() {
    const ret = { xMin: 0, xMax: 0, yMin: 0, yMax: 0 }
    this.bodies.forEach(body => {
      if (ret.xMin > body.x) ret.xMin = body.x
      if (ret.xMax < body.x) ret.xMax = body.x
      if (ret.yMin > body.y) ret.yMin = body.y
      if (ret.yMax < body.y) ret.yMax = body.y
    })
    return ret
  }
}
