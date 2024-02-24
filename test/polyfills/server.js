"use strict";

require("hard-rejection/register");
const semver = require("semver");
const polyfillio = require('../../lib');
const fs = require("fs");
const promisify = require("util").promisify;
const readFile = promisify(fs.readFile);
const path = require("path");
const handlebars = require("handlebars");

const directorTemplate = handlebars.compile(
	fs.readFileSync(path.join(__dirname, "./test-director.handlebars"), {
		encoding: "UTF-8"
	})
);
const runnerTemplate = handlebars.compile(
	fs.readFileSync(path.join(__dirname, "./test-runner.handlebars"), {
		encoding: "UTF-8"
	})
);
const testIframeTemplate = handlebars.compile(
	fs.readFileSync(path.join(__dirname, "./test-iframe.handlebars"), {
		encoding: "UTF-8"
	})
);

function createPolyfillLibraryConfigFor(features, always) {
	const config = {};
	const flags = new Set(always ? ["always", "gated"] : []);
	for (const feature of features.split(",")) {
		config[feature] = { flags };
	}

	return config;
}

const compression = require('compression');
const express = require("express");

const app = express();
app.use(compression());

const port = 9876;
const apicache = require('apicache');
const cache = apicache.middleware;

const cacheFor1Day = cache("1 day", () => true, {
	appendKey: request => {
		let key =
			request.query.feature +
			request.query.includePolyfills +
			request.query.always;
		if (request.query.always === "no") {
			const ua = request.get("User-Agent");
			key += polyfillio.normalizeUserAgent(ua);
		}
		return key;
	}
});

app.get(["/test"], createEndpoint(runnerTemplate));
app.get(["/iframe.html"], createEndpoint(testIframeTemplate));
app.get(["/empty-document.html"], cacheFor1Day, (request, response) => {
	response.sendFile(path.resolve(__dirname, "./empty-document.html"));
});
app.get(["/"], createEndpoint(directorTemplate));
app.get("/mocha.js", cacheFor1Day,(request, response) => {
	response.sendFile(require.resolve("mocha/mocha.js"));
});
app.get("/mocha.css", cacheFor1Day, (request, response) => {
	response.sendFile(require.resolve("mocha/mocha.css"));
});
app.get("/proclaim.js", cacheFor1Day, (request, response) => {
	response.sendFile(require.resolve("proclaim/lib/proclaim.js"), "utf-8");
});

app.get(
	"/polyfill.js",
	cacheFor1Day,
	async (request, response) => {
		const polyfillCombinations = (request.query.polyfillCombinations || "no") === "yes";
		const feature = request.query.feature || "";
		const includePolyfills = request.query.includePolyfills || "no";
		const always = request.query.always || "no";

		const headers = {
			"Content-Type": "text/javascript; charset=utf-8"
		};
		response.status(200);
		response.set(headers);

		if (includePolyfills === "yes") {
			const polyfillsWithTests = await testablePolyfills();
			let features = polyfillsWithTests.map(polyfill => polyfill.feature);

			// Exclude polyfills which must not be loaded together
			if (polyfillCombinations) {
				// "timeZone.golden" and "timeZone.all" overlap.
				// Including both is a user error.
				features = features.filter((x) => {
					return x !== 'Intl.DateTimeFormat.~timeZone.golden';
				})
			}

			const parameters = {
				features: createPolyfillLibraryConfigFor(
					(feature && !polyfillCombinations) ? feature : features.join(","),
					always === "yes"
				),
				minify: false,
				stream: false,
				uaString: always === "yes" ? "other/0.0.0" : request.get("user-agent")
			};

			const bundle = await polyfillio.getPolyfillString(parameters);
			response.send(bundle);
		} else {
			response.send("");
		}
	}
);

app.get(
	"/tests.js",
	cacheFor1Day,
	async (request, response) => {
		const feature = request.query.feature;
		const requestedFeature = request.query.feature !== undefined;

		const headers = {
			"Content-Type": "text/javascript; charset=utf-8"
		};
		response.status(200);
		response.set(headers);

		const polyfills = await testablePolyfills();

		// Filter for querystring args
		const features = requestedFeature
			? polyfills.filter(polyfill => feature && feature.split(',').includes(polyfill.feature))
			: polyfills;
		const testSuite = features.map(feature => feature.testSuite).join("\n");

		response.send(testSuite);
	}
);

app.get(
	"/sleep",
	async (request, response) => {
		const duration = Math.max(Number.parseInt(request.query.d), 1000);
		await new Promise((resolve) => setTimeout(resolve, duration));

		response.status(200);
		response.send("");
	}
);

app.listen(port, () => console.log(`Test server listening on port ${port}!`));

const testablePolyfillsCache = {};
async function testablePolyfills(ua) {
	if (testablePolyfillsCache[`ua:${ua}`]) {
		return testablePolyfillsCache[`ua:${ua}`];
	}

	const polyfills = await polyfillio.listAllPolyfills();
	const polyfilldata = [];

	for (const polyfill of polyfills) {
		const config = await polyfillio.describePolyfill(polyfill);
		if (config && config.isTestable && config.isPublic && config.hasTests && ua) {
			const [family, version] = ua.split('/');
			if (config.browsers[family] && !semver.satisfies(version, config.browsers[family])){
				continue;
			}
			if (!config.browsers[family]) {
				continue;
			}
		}
		if (config && config.isTestable && config.isPublic && config.hasTests) {
			const baseDirectory = path.resolve(__dirname, "../../polyfills");
			const testFile = path.join(baseDirectory, config.baseDir, "/tests.js");
			const testSuite = `describe('${polyfill}', function() {
				it('passes the feature detect', function() {
					proclaim.ok((function() {
						return (${config.detectSource || 'false'});
					}).call(window));
				});

				${await readFile(testFile)}
			});`;
			polyfilldata.push({
				feature: polyfill,
				testSuite
			});
		}
	}

	polyfilldata.sort(function (a, b) {
		// console.clear() test must run first to preserve console output of other tests.
		// to run first it must be last in the list.
		if (a.feature === 'console.clear') {
			return 1;
		}

		if (b.feature === 'console.clear') {
			return -1;
		}

		return a.feature > b.feature ? -1 : 1;
	});

	testablePolyfillsCache[`ua:${ua}`] = polyfilldata;
	return polyfilldata;
}

function createEndpoint(template) {
	return async (request, response) => {
		const ua = request.get("User-Agent");
		const featuresArgument = (request.query.feature || "").split(',').filter((feature) => !!feature);
		const includePolyfills = request.query.includePolyfills || "no";
		const polyfillCombinations = request.query.polyfillCombinations || "no";
		const shard = request.query.shard || false;
		const always = request.query.always || "no";

		if (includePolyfills !== "yes" && includePolyfills !== "no") {
			response.status(400);
			response.send(
				"includePolyfills query parameter is an invalid value, it can only be 'yes' or 'no'."
			);
			return;
		}

		if (always !== "yes" && always !== "no") {
			response.status(400);
			response.send(
				"always query parameter is an invalid value, it can only be 'yes' or 'no'."
			);
			return;
		}
		let polyfills;
		if (includePolyfills === 'yes' && always === 'no') {
			polyfills = await testablePolyfills(polyfillio.normalizeUserAgent(ua));
		} else {
			polyfills = await testablePolyfills();
		}

		// Filter for querystring args
		let features = (featuresArgument.length > 0)
			? polyfills.filter(polyfill => {
				return featuresArgument.includes(polyfill.feature);
			})
			: polyfills;

		// Make sure we always test something.
		// This catches edge cases were a run is requested for a polyfill that isn't required for the current UA.
		if (features.length === 0) {
			features = polyfills;
		}

		response.status(200);

		if (shard) {
			features = features.slice((shard - 1) * (features.length / 2), (shard) * (features.length / 2));
		}

		response.set({
			"Content-Type": "text/html; charset=utf-8"
		});

		response.send(
			template({
				requestedFeature: features.length > 0,
				features: features.map(f => f.feature).join(','),
				includePolyfills: includePolyfills,
				requestedPolyfillCombinations: polyfillCombinations === 'yes',
				polyfillCombinations: polyfillCombinations,
				always: always,
				afterTestSuite: `
				// During the test run, surface the test results in Browserstacks' preferred format
				function run() {
					// Given a test, get the first level suite that it is contained within
					// Not the top level, the first one down.
					function getFirstLevelSuite(test) {
						var parent = test;
						while (parent && parent.parent && parent.parent.parent) {
							parent = parent.parent;
						}
						return parent.title;
					}
					var runner = mocha.run();
					var results = {
						state: 'complete',
						passed: 0,
						failed: 0,
						total: 0,
						duration: 0,
						tests: [],
						failingSuites: {},
						testedSuites: [],
						uaString: window.navigator.userAgent || 'unknown'
					};
					runner.on('pass', function(test) {
						results.passed++;
						results.total++;
					});
					runner.on('fail', function(test, err) {
						// Get a set of all the suites with failing tests in them.
						if (test.parent) {
							results.failingSuites[getFirstLevelSuite(test)] = true;
						}
						results.failed++;
						results.total++;
						results.tests.push({
							name: test.fullTitle(),
							result: false,
							message: err.message,
							stack: err.stack,
							failingSuite: getFirstLevelSuite(test)
						});
					});
					runner.on('suite', function(suite) {
						results.testedSuites.push(getFirstLevelSuite(suite));
					});
					runner.on('end', function() {
						window.global_test_results = results;
						if (parent && parent.receiveTestResults) {
							var flist = ${JSON.stringify(features.map(f => f.feature))};
							parent.receiveTestResults(flist, results);
						}
					});
				}
				run();`
			})
		);
	};
}
