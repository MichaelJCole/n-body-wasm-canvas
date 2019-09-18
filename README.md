# n-body Wasm + Canvas Tech Demo

[Live WebVR Demo](https://michaeljcole.github.io/n-body-wasm-webvr/)

See also: [Mobile-ready 2d Canvas version](https://michaeljcole.github.io/n-body-wasm-canvas/)

Hello, this is a tech demo for:
- [WebVR with Aframe](https://aframe.io/docs/0.9.0/introduction/) - WebVR for visualization
- [Web Workers](https://www.html5rocks.com/en/tutorials/workers/basics/) - a separate thread to run our calculations
- [WebAssembly (Wasm)](https://webassembly.org/) - a high performance web binary that allows execution of other languages on the web (C, C++, Rust, etc)
- [AssemblyScript](https://docs.assemblyscript.org/) - a TypeScript subset that compiles to high-performance Wasm

We'll apply this tech to the [n-body problem](https://en.wikipedia.org/wiki/N-body_problem).  This is an astro-physics problem famous for being numerical (solved by a program) instead of analytical (solved by equations).  This is a fork of [my original Canvas](https://michaeljcole.github.io/n-body-wasm-canvas/) version.

Essentially we'll throw some debris in a 3d space and watch it go spinny.

Why?  The n-body problem is CPU intensive.  
We will code those computations in WebAssembly (high performance C/Rust/AssemblyScript code), then run them in a separate thread.  

Anectodally this is a 60% performance boost on mobile.  It's also hard-core nerd-core.

Welcome to the back-end of the front-end - high-performance computing in the browser.  This is crucial tech for the web as we move to WebVR.

# Running Locally

If you have Node.js >= 8 installed:

```
# Install all the dev packages
npm install

# Build the Wasm using assemblyBuild.js and rollup.config.js
npm run build

# Serve the app
npm run serve
```

# Build Tools

I'm always evaluating alternative tools to see what's coming in the future of technology.  

`gulpfile.js` builds the AssemblyScript to WebAssembly output.  

- Why gulp?  WebAssembly's [AssemblyScript starter project](https://webassembly.studio) uses it.

`rollup.config.js` file builds the two js files needed for the web application: `main.js` and `workerWasm.js`.

- Why so complicated?  Memory management is still a thing.  I spent a fair amount of time on this project trying to get it to work without a build toolchange.  Passing arrays to/from AssemblyScript is dumb-hard (the unsatisfying kind of hard), and the best solution is to use [AssemblyScript's loader](https://docs.assemblyscript.org/basics/loader), which is going to require a require().

- Why [rollup](https://rollupjs.org/guide/en/)?  Facebook has done an amazing job sponsoring and shaping the open source and web development toolchain with `yarn` and `webpack`.  I wanted something lighter-weight than `webpack` so tried rollup.  Rollup was trivial to configure a 2nd entry point and requires almost no attention.  


# Architecture and Design

This is a simulation hosted in a web browser, and expands on an AssemblyScript starter project from [https://webassembly.studio](https://webassembly.studio) 


```
UI THREAD                /          WORKER THREAD
   
browser
  |
index.html
  |
main.js
  |
nBodySystem.js-----(web worker------workerWasm.js
  |              message passing)     |
(draws to)                          nBodyForces.wasm
  |
nBodyVisualizer.js
  |
Aframe.io WebVR library
```

# Implementation

Files:
```
src/index.html               -  sets up the WebVR scene and UI, then runs main.js.

rollup.config.js             -  Build file for main.js and workerWasm.js

src/main.js                  -  Entry point.  Creates a nBodySystem(), passing a nBodyVisCanvas()  <== WebVr here

src/nBodyVisualizer.js       -  Simulation visualizers   <===  ES6 Classes are standard and fun.  WebVr here

src/nBodySystem.js           -  Simulation loop and loads a nBodyForces implementation
src/workerWasm.js            -  Web worker to calculate in separate thread       <=== WebAssembly and Web Workers

gulpfile.js                  -  Gulpfile to process assembly/*

src/assembly/nBodyForces.ts  -  AssemblyScript code to calculate forces.              <=== Sciency!

dist/assembly/nBodyForces.wasm - nBodyForces.ts --binaryen-transpiler--> wasm
dist/assembly/nBodyForces.wat  - An "assembly code" text view of the compiled module  <=== Nerd-core.

node_modules                 -  Node.js stuff
package.json                 -  Package versions and npm run commands
package-lock.json            -  Future proofs package installation
README.md                    -  Turtles all the way down
```

[Need code?  Have money?  Hire Me!](https://github.com/MichaelJCole/_code_resume)
