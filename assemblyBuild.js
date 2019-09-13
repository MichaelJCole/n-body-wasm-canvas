const gulp = require("gulp");
const ts = require('gulp-typescript');
const rename = require('gulp-rename');
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
gulp.task("build-wasm", callback => {
  const asc = require("assemblyscript/bin/asc");
  asc.main([
    "nBodyForces.ts",
    "--baseDir", "assembly",
    "--binaryFile", "../out/nBodyForces.wasm",
    "--asmjsFile", "../out/nBodyForces.asc.js",
    "--runtime", "half",
    "-O3",        // https://github.com/AssemblyScript/assemblyscript/issues/838
    "--noAssert",
    "--sourceMap",
    "--measure",
  ], callback);
});

gulp.task('build-js', function () {
  const tsProject = ts.createProject('assembly/tsconfig.json');

  return tsProject.src()
      .pipe(tsProject())
      .pipe(rename(function (path) {
        path.basename += ".tsc";
      }))
      .pipe(gulp.dest('out'));
});


gulp.task("build", ["build-wasm", "build-js"]);
gulp.task("default", ["build"]);
