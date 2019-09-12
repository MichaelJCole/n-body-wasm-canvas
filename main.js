// Visualize the simulation
const vis = document.getElementById("visualization").getContext('2d')
const visX = 1000
const visY = 1000

const prettyState = document.getElementById("prettyState")


class Game {
  constructor() {
    this.magic = new MagicBodySystem()
    this.bodies = [
      // Strong pushers
      new Body(  1,   1, 0, 1, 1),
      new Body(  1, 100, 0, 1, 1),
      new Body(100,   1, 0, 1, 1),
      new Body(100, 100, 0, 1, 1),

      // Fun times!
      new Body(100, 100, 1, 1, 1),
      new Body(-10, -10, 10, 1, 1),
      new Body(10, 1, 1, 1, 1),
      new Body(10, 100, 1, 1, 1),
      new Body(100, 10, 10, 1, 1)
    ]
    this.t = 0
  }
  update() {
    // each call to update is a single time unit.  
    // calculations over multiple updates are magnified by the number of updates
    if (this.magic.wasmReady) this.t++

    // Wait until magic is ready (wasm module loaded && idle)
    if (this.magic.ready()) {
      this.magic
        .conjureForces(this.bodies)
        .then(() => { this.applyForces() })
      }
      this.paint()
  }

  applyForces() {
    // Here we convert magical forces to physical energy in the MatterJS world
    // f = ma.   a = f/m.  
    // Each body has one mass and several force polarities (pG, pM, pD).
    // Force polarity also scales mass.  
    //   pG = 1 regular gravity
    //   pG = -1 regular anti-gravity
    //   pG = -2 double-strength anti-gravity

    // fG = ma*pG.  aG = f/m*pG
    // a = dV / t
    // v = x / t

    // For MatterJS, we want to affect Velocity or Acceleration
    // for our canvas simulation, we apply them linearly
    this.bodies.forEach(body => {
      body.x += body.fxG * body.mG * this.t
      body.y += body.fyG * body.mG * this.t
    })

    this.t = 0
  }

  paint() {
    const bounds = this.magic.bounds()
    const shiftX = bounds.xMin
    const shiftY = bounds.yMin
    const scaleX = visX / (bounds.xMax - bounds.xMin)
    const scaleY = visY / (bounds.yMax - bounds.yMin)
    vis.clearRect(0, 0, visX, visY)
    this.bodies.forEach((body, index) => {
      switch(index % 3) {
        case 0: 
          vis.fillStyle = '#ff0000';
          break;
        case 1:
          vis.fillStyle = '#0000ff';
          break;
        case 2:
          vis.fillStyle = '#00ff00';
          break;
      }
      const x = (body.x - shiftX) * scaleX
      const y = (body.y - shiftY) * scaleY
      vis.fillRect(x-10, y-10, 20, 20)
    });
  }
}

let game = new Game() 
setInterval(() => {
  game.update()
  if (prettyState) prettyState.innerText = game.magic.prettyState()
}, 1000)


