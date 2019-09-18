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
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  resize() {}

  paint(bodies) {
    
    if (this.isMobile) return

    let text = ''
    function pretty(number) {
      return number.toPrecision(2).padStart(10)
    }
    bodies.forEach( body => {
      text += `<br>${body.name.padStart(12)} {  x:${pretty(body.x)}  y:${pretty(body.y)}  z:${pretty(body.z)}  mass:${pretty(body.mass)}) }`
    })
    if (this.htmlElement) this.htmlElement.innerHTML = text
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
    if (!this.htmlElement) return
    this.sizeX = this.htmlElement.offsetWidth
    this.sizeY = this.htmlElement.offsetHeight
    this.htmlElement.width = this.sizeX
    this.htmlElement.height = this.sizeY
    this.vis = this.htmlElement.getContext('2d')
  }

  // Paint on the canvas
  paint(bodies) {
    if (!this.htmlElement) return
    // We need to convert our 3d float universe to a 2d pixel visualization
    // calculate shift and scale
    const bounds = this.bounds(bodies)
    const shiftX = bounds.xMin
    const shiftY = bounds.yMin
    const twoPie = 2 * Math.PI
    
    let scaleX = this.sizeX / (bounds.xMax - bounds.xMin)
    let scaleY = this.sizeY / (bounds.yMax - bounds.yMin)
    if (isNaN(scaleX) || !isFinite(scaleX) || scaleX < 15) scaleX = 15
    if (isNaN(scaleY) || !isFinite(scaleY) || scaleY < 15) scaleY = 15

    // Begin Draw
    this.vis.clearRect(0, 0, this.vis.canvas.width, this.vis.canvas.height)
    bodies.forEach((body, index) => {
      // Center
      const drawX = (body.x - shiftX) * scaleX
      const drawY = (body.y - shiftY) * scaleY
      // Draw on canvas
      this.vis.beginPath();
      this.vis.arc(drawX, drawY, body.drawSize, 0, twoPie, false);
      this.vis.fillStyle = body.color || "#aaa"
      this.vis.fill();
    });
  }

  // Because we draw the 3d space in 2d from the top, we ignore z
  bounds(bodies) {
    const ret = { xMin: 0, xMax: 0, yMin: 0, yMax: 0, zMin: 0, zMax: 0 }
    bodies.forEach(body => {
      if (ret.xMin > body.x) ret.xMin = body.x
      if (ret.xMax < body.x) ret.xMax = body.x
      if (ret.yMin > body.y) ret.yMin = body.y
      if (ret.yMax < body.y) ret.yMax = body.y
      if (ret.zMin > body.z) ret.zMin = body.z
      if (ret.zMax < body.z) ret.zMax = body.z
    })
    return ret
  }
}
