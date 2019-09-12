# n-body Wasm + Canvas Tech Demo

Hello, this is a tech demo for:
- [WebAssembly (Wasm)](https://webassembly.org/) - a high performance web binary that allows execution of other languages on the web (C, C++, Rust, etc)
- [AssemblyScript](https://docs.assemblyscript.org/) - a TypeScript subset that compiles to Wasm
- [Web Workers](https://www.html5rocks.com/en/tutorials/workers/basics/) - a separate thread to run our Wasm calculations
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - drawing API for visualization

We'll apply this tech to the [n-body problem](https://en.wikipedia.org/wiki/N-body_problem).  This is an astro-physics problem famous for being numerical (solved by a program) instead of analytical (solved by equations).

Essentially we'll throw some debris on a 2-d plane and watch it go spinny.

Why?  Anectodally this is a 60% performance boost on mobile.  Also, it's hard-core nerd-core.

# End Result:

This projects expands on an AssemblyScript starter project from [https://webassembly.studio](https://webassembly.studio) 

```
assembly/nBodyForces.ts  - The forces math written in AssemblyScript
assemblyBuild.js         - Gulp build script    
out/nBodyForces.wasm     - WebAssembly output ready for browser

index.html               - main file to view the simulation
main.js                  - Entry point
nBodySystem.js           - Simulation with a game loop
worker.js                - Web worker to run our Wasm

node_modules             - Node.js stuff
package.json
package-lock.json
README.md                - Turtles all the way down.
```

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


