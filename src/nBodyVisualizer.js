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

    this.scaleSize = 25 // divided into bodies drawSize.  drawSize is log10(mass)
  }

  resize() {}

  paint(bodies) {
    console.log(JSON.stringify(bodies, null, 2))
  }
}

/**
 * This is the WebVR visualizer.  It's responsible for painting and setting up the entire scene.
 */
export class nBodyVisWebVR extends nBodyVisualizer {
  constructor(htmlElement, sim) {
    // HTML Element is a-collection#a-bodies.
    super(htmlElement)
    // We add these to the global namespace because this isn't the core problem we are trying to solve.
    window.sim = sim
    this.nextId = 0
  }

  resize() {}

  paint(bodies) {
    let i

    // Create lookup table:  lookup[body.aframeId] = body
    const lookup = bodies.reduce( (total, body) => {
      // If new body, give it an aframeId
      if (!body.aframeId) body.aframeId = `a-sim-body-${body.name}-${this.nextId++}`
      total[body.aframeId] = body
      return total
    }, {})

    // Loop through existing a-sim-bodies and remove any that are not in lookup - dropped debris
    const aSimBodies = document.querySelectorAll(".a-sim-body")
    for (i = 0; i < aSimBodies.length; i++) {
      if (!lookup[aSimBodies[i].id]) {  // if we don't find the scene's a-body in the lookup table of Body()s, 
        aSimBodies[i].parentNode.removeChild(aSimBodies[i]); // remove the a-body from the scene
      } 
    }

    // loop through sim bodies and upsert
    let aBody
    bodies.forEach( body => {
      // Find the html element for this aframeId
      aBody = document.getElementById(body.aframeId)
      // If html element not found, make one.
      if (!aBody) {
        this.htmlElement.innerHTML += `
<a-sphere 
  id="${body.aframeId}"
  class="a-sim-body"
  dynamic-body 
  ${ (body.name === "star") ? "debris-listener event-set__enter='_event: mouseenter; color: green' event-set__leave='_event: mouseleave; color: yellow'" : ""} 
  position="${body.x} ${body.y} ${body.z}" 
  radius="${body.drawSize/this.scaleSize}" 
  color="${body.color}">
</a-sphere>`
        aBody = document.getElementById(body.aframeId)
      }
      // reposition
      aBody.object3D.position.set(body.x, body.y, body.z)
    })
	}
}

// Component to change to a sequential color on click.
AFRAME.registerComponent('debris-listener', {
  init: function () {
    const self = this
    // Helper function
    function rando(scale) {  return (Math.random()-.5) * scale }
    this.el.addEventListener('click', function (evt) {
      //console.log('I was clicked at: ', evt.detail.intersection.point);
      for (let x=0; x<10; x++) {
        window.sim.addBodyArgs("debris", "white", rando(10), rando(10), rando(10), 1, rando(.1), rando(.1), rando(.1))
      }
    })
  }
})



// Unused reference implementations below

/**
 * Pretty print simulation to an htmlElement's innerHTML
 */
export class nBodyVisPrettyPrint extends nBodyVisualizer {
  constructor(htmlElement) {
    super(htmlElement)
  }

  resize() {}

  paint(bodies) {
    let text = ''
    bodies.forEach( body => {
      text += `<br>${body.name} {<br>  x:${body.x.toPrecision(2)}<br>  y:${body.y.toPrecision(2)}<br>  z:${body.z.toPrecision(2)}<br>  mass:${body.mass.toPrecision(2)})<br>}<br>${body.drawSize}`
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
