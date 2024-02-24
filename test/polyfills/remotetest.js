"use strict";

global.Promise = require("bluebird");
// Enable long stack traces
Promise.config({
	longStackTraces: true
});

const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

// By default, promises fail silently if you don't attach a .catch() handler to them.
//This tool keeps track of unhandled rejections globally. If any remain unhandled at the end of your process, it logs them to STDERR and exits with code 1.
const hardRejection = require("hard-rejection");
// Install the unhandledRejection listeners
hardRejection();

const promisify = require("util").promisify;
const path = require("path");
const fs = require("fs");
const cli = require("cli-color");
const _ = require("lodash");
const normalizeUserAgent = require('../../lib').normalizeUserAgent;
const TestJob = require("./test-job");
const Tunnel = require("browserstack-local").Local;
const modifiedPolyfillsWithTests = require('../utils/modified-polyfills-with-tests').modifiedPolyfillsWithTests;
const UA = require("@financial-times/polyfill-useragent-normaliser");
const { URL } = require('url');

// Grab all the browsers from BrowserStack which are officially supported by the polyfil service.
const TOML = require("@iarna/toml");

main();

async function main() {
	let modified = {
		testEverything: true // by default we test everything.
	};

	if (process.argv.includes("test-modified-only")) {
		// Check if only a subset of polyfills needs to be tested.
		modified = await modifiedPolyfillsWithTests();
	}

	const browserlist = TOML.parse(
		fs.readFileSync(path.join(__dirname, "./browsers.toml"), "utf-8")
	).browsers;

	const browserstacklist = TOML.parse(
		fs.readFileSync(path.join(__dirname, "./browserstackBrowsers.toml"), "utf-8")
	).browsers;

	const browser = (process.argv
		.find(a => {
			return a.startsWith("browser=");
		}) || "")
		.replace("browser=", "");
	const browsers = browserlist
		.filter(b => {
			return browser ? b.startsWith(browser) : true;
		})
		.filter(uaString => {
			if (uaString.startsWith("ios/")) {
				uaString = uaString.replace("ios", "ios_saf");
			}

			if (normalizeUserAgent(uaString) === "other/0.0.0") {
				return false;
			}

			if (!modified.testEverything) {
				// When a subset of polyfills is tested :
				// - check each polyfill config
				// - if the polyfill is required for this browser family
				// - and this browser version satisfies the version range for the polyfill
				// -> include this browser in the test run

				const ua = new UA(uaString);

				let isNeeded = false;
				for (const polyfillName in modified.affectedPolyfills) {
					const polyfill = modified.affectedPolyfills[polyfillName];
					if (polyfill.browsers[ua.getFamily()] && ua.satisfies(polyfill.browsers[ua.getFamily()])) {
						isNeeded = true;
					}
				}

				return isNeeded;
			}

			return true;
		});

	if (browsers.length === 0) {
		console.log("nothing to test");
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(0);
	}

	console.log({ browsers });

	const useragentToBrowserObject = browserWithVersion => {
		const [browser, version] = browserWithVersion.split("/");
		for (const browserObject of browserstacklist) {
			if (browser === browserObject.os && version === browserObject.os_version) {
				return {
					deviceName: browserObject.device,
					platformName: browserObject.os,
					platformVersion: browserObject.os_version,
					real_mobile: true,
					'browserstack.appium_version': '1.8.0'
				};
			} else if (
				browser === browserObject.browser &&
				version === browserObject.browser_version
			) {
				const o = {
					browserName: browserObject.browser,
					browserVersion: browserObject.browser_version,
				};
				if (o.browserName === 'edge') {
					o["browserstack.selenium_version"] = "3.5.2";
				}
				return o;
			}
		}
		throw new Error(
			`Browser: ${browser} with version ${version} was not found on BrowserStack.`
		);
	};

	const testResults = {};
	const pollTick = 1000;
	const testBrowserTimeout = 10 * 60 * 1000;
	const mode =
		["all", "control", "targeted"].find(x => process.argv.includes(x)) || "all";
	const testResultsFile = browser ? path.join(__dirname, `results-${mode}-${browser}.json`) : path.join(__dirname, `results-${mode}.json`);

	const director = process.argv.includes("director");
	const always = "always=" + ((mode === "all" || mode === 'control') ? "yes" : "no");

	let feature = '';
	if (!modified.testEverything) {
		// When a subset of polyfills is tested :
		// - pass the subset as a url query param to the director
		// - the keys of "modified.affectedPolyfills" are the names of the polyfills in the subset
		feature = `&feature=${Object.keys(modified.affectedPolyfills).join(',')}`;
	}

	const includePolyfills = "includePolyfills=" + (mode === "control" ? "no" : "yes");
	// https://www.browserstack.com/question/759
	const url = `http://bs-local.com:9876/${director ? '' : 'test'}?${includePolyfills}&${always}${feature}`;
	const tunnelId =
		"build:" +
		(process.env.CIRCLE_BUILD_NUM || process.env.NODE_ENV || "null") +
		"_" +
		new Date().toISOString();

	const jobConfigs = browsers.flatMap(browser => {
		let configs = [];
		const baseConfig = {
			browser: browser,
			shard: false,
			capability: useragentToBrowserObject(browser),
		};

		if (
			(browser === 'ie/8.0' || browser === 'ie/9.0') &&
			modified.testEverything // no need to shard tests if only a subset is tested
		) {
			configs = [
				{
					...baseConfig,
					shard: 1,
				},
				{
					...baseConfig,
					shard: 2,
				}
			];
		} else {
			configs = [
				baseConfig
			];
		}

		if (!process.argv.includes("test-polyfill-combinations")) {
			return configs;
		}

		// Polyfill combinations run tests with all polyfills for a browser included.
		// These tests guard against issues where polyfill A breaks polyfill B
		// even though there is no depedency relation between A and B.
		// These tests are slow and only run on demand
		return configs.flatMap((config) => {
			return [
				{
					...config,
					polyfillCombinations: false,
				},
				{
					...config,
					polyfillCombinations: true,
				}
			]
		})
	});

	let jobs = [];

	for (const jobConfig of jobConfigs) {
		jobs.push(new TestJob(
			jobConfig.browser,
			url,
			mode,
			jobConfig.capability,
			tunnelId,
			testBrowserTimeout,
			pollTick,
			jobConfig.polyfillCombinations,
			jobConfig.shard
		));
	}

	const tunnel = new Tunnel();

	const openTunnel = promisify(tunnel.start.bind(tunnel));
	const closeTunnel = promisify(tunnel.stop.bind(tunnel));
	const printProgress = (function () {
		let previousPrint;
		return jobs => {
			const out = ["-".repeat(80)];
			let readyCount = 0;
			for (const job of jobs) {
				let message = "";
				switch (job.state) {
					case "complete": {
						if (job.results.failed) {
							message = cli.red(
								`✘ ${job.results.total} tests, ${job.results.failed} failures`
							);
						} else {
							message = cli.green(`✓ ${job.results.total} tests`);
						}
						message += `  ${job.duration} seconds to complete`;
						break;
					}
					case "error": {
						message = cli.red(`⚠️  ${job.results}`);
						break;
					}
					case "ready": {
						readyCount += 1;
						break;
					}
					case "running": {
						message =
							job.results.runnerCompletedCount + "/" + job.results.runnerCount;
						if (job.results.failed) {
							message += cli.red("  ✘ " + job.results.failed);
						}
						const timeWaiting = Math.floor(
							(Date.now() - job.lastUpdateTime) / 1000
						);
						if (timeWaiting > 5) {
							message += cli.yellow("  🕒  " + timeWaiting + "s");
						}
						break;
					}
					default: {
						message = job.state;
						const timeWaiting = Math.floor(
							(Date.now() - job.lastUpdateTime) / 1000
						);
						if (timeWaiting > 5) {
							message += cli.yellow("  🕒  " + timeWaiting + "s");
						}
					}
				}
				if (message) {
					out.push(
						` • Browser: ${job.name.padEnd(
							" ",
							20
						)} Test config: ${job.configForLog} ${message}`
					);
				}
			}
			if (readyCount) {
				out.push(" + " + readyCount + " job(s) queued");
			}
			const print = out.join("\n") + "\n";
			if (previousPrint !== print) {
				process.stdout.write(print);
			}
			previousPrint = print;
		};
	}());

	(async function () {
		try {
			await openTunnel({
				verbose: "true",
				force: "true",
				onlyAutomate: "true",
				forceLocal: "true"
			});
			const cliFeedbackTimer = setInterval(() => printProgress(jobs), pollTick);
			// Run jobs within concurrency limits
			await new Promise((resolve) => {
				const results = [];
				let resolvedCount = 0;
				function pushJob() {
					const job = jobs[results.length];
					results.push(
						job
							.run()
							.then(job => {
								if (job.state === "complete") {
									const [family, version] = normalizeUserAgent(job.useragent).split("/");
									_.set(
										testResults,
										[family, version, job.mode],
										job.getResultSummary()
									);
								}
								resolvedCount++;
								if (results.length < jobs.length) {
									pushJob();
								} else if (resolvedCount === jobs.length) {
									resolve();
								}
								return job;
							})
							.catch(error => {
								if (error.message.includes("There was an error. Please try again.")) {
									/*
										This is an exception that Browserstack is throwing when it
										fails to open a session using a real device. I think that
										there aren't real devices available.
										We need to wait some time to try again because it depends on time.
										We will also try more for these exceptions.
									*/
									return wait(30 * 1000).then(() =>
										job
											.run()
											.then(job => {
												if (job.state === "complete") {
													const [family, version] = job.name.split("/");
													_.set(
														testResults,
														[family, version, job.mode],
														job.getResultSummary()
													);
												}
												resolvedCount++;
												if (results.length < jobs.length) {
													pushJob();
												} else if (resolvedCount === jobs.length) {
													resolve();
												}
												return job;
											})
											.catch(error => {
												console.log(error.stack || error);
												process.exitCode = 1;
												// eslint-disable-next-line unicorn/no-process-exit
												process.exit(1);
											}));
								} else {
									console.log(error.stack || error);
									process.exitCode = 1;
									// eslint-disable-next-line unicorn/no-process-exit
									process.exit(1);
								}
							})
					);
				}
				const concurrency = 5;
				for (let index = 0; index < concurrency && index < jobs.length; index++) {
					pushJob();
				}
			});

			fs.writeFileSync(testResultsFile, JSON.stringify(testResults));

			clearTimeout(cliFeedbackTimer);

			printProgress(jobs);

			await closeTunnel();
			console.log("Tunnel closed");

			let totalFailureCount = 0;
			for (const job of jobs) {
				if (job.state === "complete") {
					totalFailureCount += job.results.failed;
				} else {
					totalFailureCount += 1;
				}
			}
			if (totalFailureCount) {
				console.log(cli.bold.white("\nFailures:"));
				for (const job of jobs) {
					if (job.results && job.results.tests) {
						for (const test of job.results.tests) {
							const failingTestURL = new URL(url);
							failingTestURL.searchParams.delete('feature');

							console.log(" - " + job.name + ":");
							console.log("    -> " + test.name);
							console.log(
								"       " +
								failingTestURL.toString().replace("http://bs-local.com:9876/", "http://bs-local.com:9876/test") +
								"&feature=" +
								test.failingSuite
							);
							console.log("       " + test.message);
						}
					} else if (job.state !== "complete") {
						console.log(
							" • " +
							job.name +
							" (" +
							job.mode +
							"): " +
							cli.red(job.results || "No results")
						);
					}
				}
				console.log("");
				throw new Error("Failures detected");
			}
		} catch (error) {
			console.error(error);
			process.exitCode = 1;
			// eslint-disable-next-line unicorn/no-process-exit
			process.exit(1);
		}
	}());
}
