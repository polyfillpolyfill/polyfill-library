"use strict";

const { remote } = require("webdriverio");
const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

if (
	!process.env.BROWSERSTACK_USERNAME ||
	!process.env.BROWSERSTACK_ACCESS_KEY
) {
	throw new Error(
		"BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY must be set in the environment to run tests on BrowserStack.  For more information about how to set this up or for alternative methods of testing, see https://polyfill.io/v2/docs/contributing/testing"
	);
}

module.exports = class TestJob {
	constructor(
		name,
		url,
		mode,
		capability,
		sessionName,
		testBrowserTimeout,
		pollTick,
		polyfillCombinations,
		shard
	) {
		this.name = name;
		this.mode = mode;
		this.results = undefined;
		this.lastUpdateTime = 0;
		this.duration = 0;
		// BrowserStack options https://www.browserstack.com/automate/capabilities
		this.capabilities = Object.assign(
			{
				name: sessionName,
				project: "polyfill-library",
				"browserstack.local": "true",
				"browserstack.video": "true",
				"browserstack.debug": "true",
				"browserstack.console": "errors",
				"browserstack.networkLogs": "true",
				timeout: 180000
			},
			capability
		);
		this.testBrowserTimeout = testBrowserTimeout;
		this.pollTick = pollTick;
		this.setState("ready");
		this.runCount = 0;

		this.url = url;
		if (polyfillCombinations) {
			this.polyfillCombinations = true;
			this.url = this.url + '&polyfillCombinations=yes';
		}

		if (shard) {
			this.shard = shard;
			this.url = this.url + `&shard=${shard}`;
		}
	}

	async pollForResults() {
		const browserdata = await this.browser.execute(function () {
			// browser context - you may not access client or console
			// eslint-disable-next-line no-undef
			return window.global_test_results || window.global_test_progress;
		});
		if (browserdata && browserdata.state === "complete") {
			this.browser.deleteSession();
			this.results = browserdata;
			this.duration = Math.floor((Date.now() - this.startTime) / 1000);
			this.setState("complete");
			return this;
		} else if (
			this.lastUpdateTime &&
			this.lastUpdateTime < Date.now() - this.testBrowserTimeout
		) {
			throw new Error(`Timed out at "${this.state}" on "${this.name}"`);
		} else {
			if (browserdata && browserdata.state === "running") {
				if (
					!this.results ||
					browserdata.runnerCompletedCount > this.results.runnerCompletedCount
				) {
					this.results = browserdata;
					this.lastUpdateTime = Date.now();
				}
				this.setState("running");
			}

			// Recurse
			return wait(this.pollTick).then(() => this.pollForResults());
		}
	}

	async run() {
		try {
			this.setState("connecting to browser");
			this.browser = await remote({
				maxInstances: 1,
				logLevel: "warn",
				capabilities: this.capabilities,
				services: ["browserstack"],
				user: process.env.BROWSERSTACK_USERNAME,
				key: process.env.BROWSERSTACK_ACCESS_KEY,
				browserstackLocal: true
			});
		} catch (error) {
			/*
				This is an exception that Browserstack is throwing when it
				fails to open a session using a real device. I think that
				there aren't real devices available.
				We need to wait some time to try again because it depends on time.
				We will also try more for these exceptions.
			*/
			if (error.message.includes("There was an error. Please try again.") && this.runCount < 3) {
				this.runCount += 1;
				this.setState("waiting 30 seconds to retry");
				await wait(30 * 1000);
				this.setState(`retrying browser -- attempt ${this.runCount}`);
				return this.run();
			} else {
				this.results = error;
				this.setState("error");
				throw error;
			}
		}

			this.lastUpdateTime = 0;
			this.setState("initialising browser");
			this.startTime = Date.now();

		try {
			await this.setState("started");
			this.useragent = await this.browser.execute(function () {
				// browser context - you may not access client or console
				// eslint-disable-next-line no-undef
				return navigator.userAgent;
			});
			await this.browser.navigateTo(this.url);
			await this.setState("loaded URL");
			await wait(this.pollTick);
			await this.setState("polling for results");
			await this.pollForResults();
			return this;
		} catch (error) {
			console.log({ error });
			await this.browser.closeWindow();
			this.results = error;
			this.setState("error");
			throw error;
		}
	}

	setState(newState) {
		this.state = newState;
		this.lastUpdateTime = Date.now();
	}

	getResultSummary() {
		if (!this.results) throw new Error("Results not available yet");
		return {
			passed: this.results.passed,
			failed: this.results.failed,
			failingTests: this.results.tests,
			failingSuites: this.results.failingSuites
				? Object.keys(this.results.failingSuites)
				: [],
			testedSuites: [...this.results.testedSuites]
		};
	}

	get configForLog() {
		return `${this.mode.padEnd(" ", 8)} / ${(this.polyfillCombinations ? 'combined' : '        ')}${(this.shard ? ' / shard ' + this.shard + '  ' : '')}`;
	}
};
