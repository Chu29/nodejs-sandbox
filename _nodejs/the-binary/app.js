#!/usr/bin/env node
"use strict";

/**
 * The Node Binary - Learning Scaffold
 *
 * Topics:
 * 1) Checking Syntax
 * 2) Dynamic Evaluation
 * 3) Pre-Loading CommonJS Modules
 * 4) Stack Trace Limit
 *
 * Run examples:
 *   node --check app.js
 *   node --eval "console.log('dynamic eval with --eval')"
 *   node -r ./app.js -e "console.log('preloaded app.js'); global.preloaded()"
 *   node app.js
 */

// 3) Pre-Loading CommonJS Modules (via: node -r ./app.js ...)
// If preloaded, expose a global helper so learners can see the effect.
if (!global.preloaded) {
	global.preloaded = () => {
		console.log("[preload] app.js was preloaded successfully.");
	};
}

// 4) Stack Trace Limit
Error.stackTraceLimit = 20;

function recursiveDepth(n) {
	if (n === 0) {
		throw new Error("Demo error to show stack trace depth");
	}
	return recursiveDepth(n - 1);
}

function runStackTraceDemo() {
	try {
		recursiveDepth(8);
	} catch (err) {
		console.log("\n[stack-trace-limit] Current limit:", Error.stackTraceLimit);
		console.log(err.stack);
	}
}

// 2) Dynamic Evaluation
function runDynamicEvaluationDemo() {
	const code = "const x = 21; x * 2;";
	const result = eval(code); // Learning-only example
	console.log("[dynamic-eval] Code:", code);
	console.log("[dynamic-eval] Result:", result);
}

function main() {
	console.log("The Node Binary - Scaffold Running\n");
	console.log("Try these commands:");
	console.log("  1) Syntax check:");
	console.log("     node --check app.js");
	console.log("  2) Dynamic evaluation:");
	console.log("     node --eval \"console.log(1 + 2 + 3)\"");
	console.log("  3) Pre-load CommonJS module:");
	console.log("     node -r ./app.js -e \"global.preloaded()\"");
	console.log("  4) Stack trace limit demo:");
	console.log("     node app.js\n");

	runDynamicEvaluationDemo();
	runStackTraceDemo();
}

if (require.main === module) {
	main();
}

