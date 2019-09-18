const gulp = require("gulp")
const rollup = require("rollup")
const watch = require('gulp-watch')
const webserver = require('gulp-webserver')

const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const terser = require('rollup-plugin-terser').terser

const portable = require("assemblyscript/std/portable")

const ghPages = require('gulp-gh-pages');


gulp.task("default", ["build"])
gulp.task("build", ["build-assembly", "build-rollup"])
gulp.task('build-assembly', ['build-assembly-asc', 'copy-nBodyForces.wasm.map'])
gulp.task('build-rollup', ['build-rollup-rollup', 'copy-assets'])
gulp.task('dev', ['dev-assembly', 'dev-rollup', 'dev-serve'])

// Deploy to github pages

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

// For more information see: https://docs.assemblyscript.org/details/runtime

gulp.task("build-assembly-asc", callback => {
  const asc = require("assemblyscript/bin/asc");
  asc.main([
    "nBodyForces.ts",
    "--baseDir", "src/assembly",
    // Output all the goodies asc has to offer
    "--binaryFile", "../../dist/assembly/nBodyForces.wasm",
    "--textFile", "../../dist/assembly/nBodyForces.wat",
    "--asmjsFile", "../../dist/assembly/nBodyForces.asc.js",
    "--idlFile", "../../dist/assembly/nBodyForces.webidl",
    "--tsdFile", "../../dist/assembly/nBodyForces.d.ts",
    "--sourceMap",
    // Configure compilation
//    "--runtime", "full",  // default
//    "-O3",        // https://github.com/AssemblyScript/assemblyscript/issues/838
//    "--noAssert",
    // Output timing info and validate
    "--measure",
    "--validate"
  ], callback);
})

// Copy /assembly/nBodyForces.wasm.map to /nBodyForces.wasm.map for chrome debugger

gulp.task('copy-nBodyForces.wasm.map', function() {
  gulp.src('./dist/assembly/nBodyForces.wasm.map')
  .pipe(gulp.dest('./dist'));
})

// Run rollup on source 
let production = true
gulp.task('build-rollup-rollup', function() {
  return Promise.all([
    rollup.rollup({
      input: 'src/main.js',
      plugins: [
        resolve(), // tells Rollup how to find date-fns in node_modules
        commonjs(), // converts date-fns to ES modules
        production && terser() // minify, but only in production
      ]
    }).then(bundle => {
      return bundle.write({
        file: 'dist/main.js',
        format: 'iife', // immediately-invoked function expression — suitable for <script> tags
        name: 'main',
        sourcemap: true
      })
    }),
    rollup.rollup({
      input: 'src/workerWasm.js',
      plugins: [
        resolve(), // tells Rollup how to find date-fns in node_modules
        commonjs(), // converts date-fns to ES modules
        production && terser() // minify, but only in production
      ]
    }).then(bundle => {
      return bundle.write({
        file: 'dist/workerWasm.js',
        format: 'iife', 
        name: 'workerWasm',
        sourcemap: true
      })
    })
  ])
})

// Copy static assets

gulp.task('copy-assets', function() {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'))
  gulp.src('./src/favicon.ico')
    .pipe(gulp.dest('./dist'))
})

// Watch for changes and rebuild

gulp.task('dev-assembly', function() {
  gulp.start('build-assembly')
  watch(
    'src/assembly/nBodyForces.ts', 
    function() {
      gulp.start('build-assembly')
    }
  )
})

// Watch for changes and rebuild

gulp.task('dev-rollup', function() {
  production = false
  gulp.start('build-rollup')
  watch(
    ['src/**/*.js', 'src/index.html'],
    function() {
      gulp.start('build-rollup')
    }
  )
})

// Run a live reloading server

gulp.task('dev-serve', function() {
  gulp.src('dist')
    .pipe(webserver({
      fallback: 'index.html',
      livereload: true,
      open: true,
      middleware: (req, res, next) => {
        if (req.originalUrl.endsWith('.wasm')) res.setHeader('Content-Type', 'application/wasm')
        next()
      }
    }))
})