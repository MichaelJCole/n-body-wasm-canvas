const gulp = require("gulp");
const ts = require('gulp-typescript');
const rename = require('gulp-rename');
const watch = require('gulp-watch');

const portable = require("assemblyscript/std/portable");


/*
  Assemblyscript Runtime variants:

  "--runtime", "full" (default)
    A proper memory manager and reference-counting based garbage collector, with runtime interfaces
    being exported to the host for being able to create managed objects externally.

  "--runtime", "half"
    The same as full but without any exports, i.e. where creating objects externally is not required.
    This allows the optimizer to eliminate parts of the runtime that are not needed.

  "--runtime", "stub"
    A minimalist arena memory manager without any means of freeing up memory again, but the same external
    interface as full. Useful for very short-lived programs or programs with hardly any memory footprint,
    while keeping the option to switch to full without any further changes. No garbage collection.

  "--runtime", "none"
    The same as stub but without any exports, for the same reasons as explained in half. Essentially
    evaporates entirely after optimizations.

    For more information see: https://docs.assemblyscript.org/details/runtime
*/
gulp.task("build-assembly", callback => {
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
});

// Copy /assembly/nBodyForces.wasm.map to /nBodyForces.wasm.map for chrome debugger
gulp.task('copy-nBodyForces.wasm.map', function() {
  gulp.src('./dist/assembly/nBodyForces.wasm.map')
  .pipe(gulp.dest('./dist'));
});

// This does not work because we are using shared memory to pass arrays in/out
// asc/tsc - portability is(was?) a work in progress: https://docs.assemblyscript.org/details/portability
gulp.task('build-js', function () {
  /*
  const tsProject = ts.createProject('src/assembly/tsconfig.json');

  return tsProject.src()
    .pipe(tsProject())
    .pipe(rename(function (path) {
      path.basename += ".tsc";
    }))
    .pipe(gulp.dest('dist/assembly'));
  */
});


gulp.task("build", ["build-assembly", "copy-nBodyForces.wasm.map", "build-js"]);
gulp.task("default", ["build"]);

gulp.task('dev', ['dev-assembly']);
gulp.task('dev-assembly', function() {
  watch(
    'src/assembly/*', 
    { ignoreInitial: false },
    function() {
      gulp.start('build');
    }
  );
});