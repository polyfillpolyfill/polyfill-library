"use strict";

const fs = require("fs");
const path = require("path");
const _ = require('lodash');

const intersection = (a, b) =>
	new Set([...b].filter(value => a.has(value)));
const difference = (a, b) =>
	new Set([...b].filter(value => !a.has(value)));

const browser = (process.argv
	.find(a => {
		return a.startsWith("browser=");
	}) || "")
	.replace("browser=", "");

console.log("Reading test result data");
const control = JSON.parse(fs.readFileSync(path.join(__dirname, browser ? `results-control-${browser}.json` : "results-control.json")));
const all = JSON.parse(fs.readFileSync(path.join(__dirname, browser ? `results-all-${browser}.json` : "results-all.json")));

const compat = _.merge({}, control, all);
const builtCompatTable = {};

function buildData(support, browserName, version) {
	return function(feature) {
		if (!builtCompatTable[feature]) {
			builtCompatTable[feature] = {};
		}

		if (!builtCompatTable[feature][browserName]) {
			builtCompatTable[feature][browserName] = {};
		}

		builtCompatTable[feature][browserName][version] = support;
	};
}

function trimFeatureName(name) {
	// When a test times out the feature name will be incorrect :
	// "ResizeObserver (timeout after 30000ms, 2 retries)",
	return name.split(' (timeout ')[0];
}

for (const browserName of Object.keys(compat)) {
	const versions = compat[browserName];
	for (const version of Object.keys(versions)) {
		const testResults = versions[version];
		if (!testResults.all || !testResults.control) {
			throw new Error(
				"Missing test results for " + browserName + "/" + version
			);
		}

		const allTests = new Set([...testResults.control.testedSuites.map(x => trimFeatureName(x))]);
		const failedNative = new Set([...testResults.control.failingSuites.map(x => trimFeatureName(x))]);
		const failedPolyfilled = new Set([...testResults.all.failingSuites.map(x => trimFeatureName(x))]);

		// test suite fails without and with requesting the polyfill.
		// -> this should indicate that the polyfill was not served to the browser.
		const missing = intersection(failedNative, failedPolyfilled);

		// test suite fails natively but passed when the polyfill was requested.
		const polyfilled = difference(failedPolyfilled, failedNative);

		// all tests suites that passed without the polyfill.
		const native = difference(failedNative, allTests);

		for (const feature of native)  buildData("native", browserName, version)(feature);
		for (const feature of polyfilled)  buildData("polyfilled", browserName, version)(feature);
		for (const feature of missing)  buildData("missing", browserName, version)(feature);
	}
}

const compatFile = path.join(__dirname, "compat.json");
fs.writeFileSync(compatFile, JSON.stringify(builtCompatTable, undefined, 2));
console.log("Updated compat.json");
