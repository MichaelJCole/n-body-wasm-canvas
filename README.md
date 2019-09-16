# n-body Wasm + Canvas Tech Demo

Hello, this is a tech demo for:
- [WebAssembly (Wasm)](https://webassembly.org/) - a high performance web binary that allows execution of other languages on the web (C, C++, Rust, etc)
- [AssemblyScript](https://docs.assemblyscript.org/) - a TypeScript subset that compiles to Wasm
- [Web Workers](https://www.html5rocks.com/en/tutorials/workers/basics/) - a separate thread to run our Wasm calculations
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - drawing API for visualization

We'll apply this tech to the [n-body problem](https://en.wikipedia.org/wiki/N-body_problem).  This is an astro-physics problem famous for being numerical (solved by a program) instead of analytical (solved by equations).

Essentially we'll throw some debris in a 3d space and watch it go spinny.

Why?  Anectodally this is a 60% performance boost on mobile.  Also, it's hard-core nerd-core.

This is an engineering journal of sorts as I experiment with the tech.

# Running Locally

If you have Node.js >= 8 installed:

```
# Install all the dev packages
npm install

# Build the Wasm using assemblyBuild.js
npm run build

# Serve the app
npm run serve
```


# Design

This is a simulation hosted in a web browser, and expands on an AssemblyScript starter project from [https://webassembly.studio](https://webassembly.studio) 

Files:
```
index.html               -  sets up the Canvas and UI, then runs main.js.
main.js                  -  Entry point.  Creates a nBodySystem(), passing a nBodyVisCanvas()

nBodyVisCanvas.js        -  Simulation visualizers
nBodyVisPrettyPrint.js

nBodySystem.js           -  Simulation loop and loads a nBodyForces implementation
worker.js                -  Web worker to run our calculations in separate thread

gulpfile.js              -  Gulpfile to process assembly/*
assembly/nBodyForces.ts  -  AssemblyScript code to calculate forces.  Transpiled to out/*

out/nBodyForces.wasm     -  nBodyForces.ts --binaryen-transpiler--> wasm
out/nBodyForces.asc.js   -  nBodyForces.ts --binaryen-transpiler--> js
out/nBodyForces.tsc.js   -  nBodyForces.ts --typescript-transpiler--> js

node_modules             -  Node.js stuff
package.json             -  Package versions and npm run commands
package-lock.json        -  Future proofs package installation
README.md                -  Turtles all the way down
```

Architecture:
```
UI THREAD                /          WORKER THREAD
   
browser
  |
index.html
  |
main.js
  |
nBodySystem.js-----(web worker------worker.js
  |              message passing)     |
(draws to)                          out/nBodyForces.wasm
  |
nBodyVisCanvas.js
```
