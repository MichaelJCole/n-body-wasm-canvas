import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default [
	{
		input: 'src/main.js',
		output: {
			file: 'dist/main.js',
			format: 'iife', // immediately-invoked function expression — suitable for <script> tags
			name: 'main',
			sourcemap: true
		},
		plugins: [
			resolve(), // tells Rollup how to find date-fns in node_modules
			commonjs(), // converts date-fns to ES modules
			production && terser() // minify, but only in production
		]
	}, {
		input: 'src/workerWasm.js',
		output: {
			file: 'dist/workerWasm.js',
			format: 'iife', 
			name: 'workerWasm',
			sourcemap: true
		},
		plugins: [
			resolve(), // tells Rollup how to find date-fns in node_modules
			commonjs(), // converts date-fns to ES modules
			production && terser() // minify, but only in production
		]
	}
]
