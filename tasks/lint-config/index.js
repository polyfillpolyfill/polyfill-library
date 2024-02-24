/* eslint-disable unicorn/no-array-push-push */
'use strict';

/* eslint-disable unicorn/no-process-exit */

const fs = require('fs');
const TOML = require('@iarna/toml');
const semver = require('semver');
const { simplifyRange } = require('./simplify-versions');
const { mdnBrowserKey } = require('./mdn-browser-key');
const { parseRange, replaceInRange } = require('./parse-range');
const { forEachPolyfillConfigPath } = require('./for-each-polyfill-config');
const assert = require('assert');
const { fetchMCD } = require('./mcd');
const { ChromeToOpera, ChromeAndroidToOperaAndroid, SafariToIOS, ChromeAndroidToSamsung } = require('./static-mapping');

const deadBrowsers = new Set(['ie', 'ie_mob', 'android', 'bb', 'op_mini', 'edge', 'edge_mob']);

const stats = {
	// browser config
	unbounded: 0,
	missing: 0,
	unknownVersions: 0,
	// meta config
	withoutDocumentation: 0,
	// debug counters
	withWarnings: 0,
	withInfoMessages: 0,
}

function processLog(logs) {
	if (logs.findIndex((x) => x[1] === 'info') > -1) {
		stats.withInfoMessages++;
	}

	if (logs.findIndex((x) => x[1] === 'error') > -1) {
		stats.withWarnings++;
		console.warn('\n' + logs.map((x) => x[0]).join('\n') + '\n');
		console.log('----------------------------------------');
	}
}

fetchMCD().then((browserData) => {
	return forEachPolyfillConfigPath((configPath) => {
		if (configPath === 'polyfills/IntersectionObserverEntry/config.toml') {
			// Very specific polyfill and doesn't fit the config linter.
			return;
		}

		if (configPath === 'polyfills/Function/prototype/name/config.toml') {
			// Very old polyfill with only a few data points.
			return;
		}

		if (configPath.includes('~locale')) {
			// These are dynamically generated configs.
			return;
		}

		if (configPath.includes('polyfills/console/')) {
			// Console API is a bit special.
			// Skipping this for now.
			return;
		}

		const logBuffer = [];
		logBuffer.push([`Linting "${configPath}"...`, '']);

		let config = {};

		try {
			config = TOML.parse(fs.readFileSync(configPath, 'utf-8'));
		} catch (error) {
			console.error('Error: ' + error);
			process.exit(1);
		}

		if (!config.browsers) {
			logBuffer.push(['- error: no browsers config', 'error']);
			processLog(logBuffer);
			return;
		}

		let isHelper = false;
		if (configPath.includes('polyfills/_')) {
			// Helper packages should have a `_` prefix.
			isHelper = true;

			for (const browser of Object.keys(config.browsers || {})) {
				if (config.browsers[browser] !== '*') {
					// Helper packages are always served to all versions of all browsers.
					isHelper = false;
					break;
				}
			}
		}

		if (!config.docs && !isHelper) {
			stats.withoutDocumentation++;
		}

		const originalBrowsers = JSON.parse(JSON.stringify(config.browsers));

		let configTemplate = {};

		try {
			configTemplate = TOML.parse(fs.readFileSync(`tasks/polyfill-templates/config.toml`, 'utf-8'));
		} catch (error) {
			console.error(error);
			process.exit(1);
		}

		// Cleanup faulty Edge configs
		{
			if (config.browsers.edge === '<12') {
				delete config.browsers.edge;
			}

			if (config.browsers.edge_mob === '<12') {
				delete config.browsers.edge_mob;
			}
		}

		const configTemplateBrowserNames = Object.keys(configTemplate.browsers || {});

		for (const browser of Object.keys(config.browsers || {})) {
			// We want uniform configs with a known set of browsers.
			// The template for new polyfills is a good baseline.
			if (!configTemplateBrowserNames.includes(browser)) {
				logBuffer.push([`- error: browser "${browser}" is not defined in the template for new polyfills`, 'error']);
			}

			// Browser configs must be ranges.
			const parsedRange = parseRange(config.browsers[browser]);
			if (
				!parsedRange.isRanged && mdnBrowserKey(browser) !== 'ie' && browser !== 'bb' && !(
					// If the range is a single version and the first release it will be optimized as just this version.
					browserData.browsers[mdnBrowserKey(browser)] &&
					parsedRange.versions.length === 1 &&
					browserData.browsers[mdnBrowserKey(browser)].release_versions[0] === semver.coerce(parsedRange.versions[0]).toString()
				)
			) {
				logBuffer.push([`- error: browser "${browser}: ${config.browsers[browser]}" is not a range`, 'error']);
			}

			if (browser === 'android' && parsedRange.versions.findIndex((x) => semver.coerce(x).major > 10) > -1) {
				logBuffer.push([`- error: android config should not include later chromium versions, "${browser}: ${config.browsers[browser]}`, 'error']);

				config.browsers['android'] = '*';
			}

			if ((browser === 'edge' || browser === 'edge_mob') && parsedRange.versions.findIndex((x) => semver.coerce(x).major > 18) > -1) {
				logBuffer.push([`- error: edge config should not include chromium versions, "${browser}: ${config.browsers[browser]}`, 'error']);

				config.browsers[browser] = '*';
			}

			// Browser configs must be valid ranges for `semver`.
			if (!semver.validRange(config.browsers[browser])) {
				logBuffer.push([`- error: browser "${browser}: ${config.browsers[browser]}" is not a valid range`, 'error']);
			}
		}

		for (const browser of configTemplateBrowserNames) {
			if (config.browsers[browser] && config.browsers[browser] !== '*') {
				continue;
			}

			switch (browser) {
				case 'opera':
					if (config.browsers['chrome'] && config.browsers['chrome'] !== '*') {
						const replaced = replaceInRange(config.browsers['chrome'], (version) => {
							return ChromeToOpera(Number.parseInt(version, 10));
						});

						if (replaced) {
							config.browsers[browser] = replaced;
						}
					}

					if (config.browsers['chrome'] && config.browsers['chrome'] === '*') {
						config.browsers[browser] = '*';
					}

					break;
				case 'op_mob':
					if (config.browsers['chrome'] && config.browsers['chrome'] !== '*') {
						const mapped = ChromeAndroidToOperaAndroid.map((pair) => {
							if (semver.satisfies(semver.coerce(pair[0]), config.browsers['chrome'])) {
								return pair[1];
							}
						}).filter((x) => !!x);

						if (mapped && mapped.length > 0) {
							config.browsers[browser] = mapped.join(' || ');
						}
					}

					if (config.browsers['chrome'] && config.browsers['chrome'] === '*') {
						config.browsers[browser] = '*';
					}

					break;
				case 'samsung_mob':
					if (config.browsers['chrome'] && config.browsers['chrome'] !== '*') {
						const mapped = ChromeAndroidToSamsung.map((pair) => {
							if (semver.satisfies(semver.coerce(pair[0]), config.browsers['chrome'])) {
								return pair[1];
							}
						}).filter((x) => !!x);

						if (mapped && mapped.length > 0) {
							config.browsers[browser] = mapped.join(' || ');
						}
					}

					if (config.browsers['chrome'] && config.browsers['chrome'] === '*') {
						config.browsers[browser] = '*';
					}

					break;
				case 'ios_saf':
					if (config.browsers['safari'] && config.browsers['safari'] !== '*') {
						const mapped = SafariToIOS.map((pair) => {
							if (semver.satisfies(semver.coerce(pair[0]), config.browsers['safari'])) {
								return pair[1];
							}
						}).filter((x) => !!x);

						if (mapped && mapped.length > 0) {
							config.browsers[browser] = mapped.join(' || ');
						}
					}

					if (config.browsers['safari'] && config.browsers['safari'] === '*') {
						config.browsers[browser] = '*';
					}

					break;
				case 'firefox_mob':
					if (config.browsers['firefox'] && config.browsers['firefox'] !== '<4' && config.browsers['firefox'] !== '<3') {
						config.browsers[browser] = config.browsers['firefox'];
					}

					break;

				default:
					break;
			}
		}

		for (const browser of Object.keys(config.browsers || {})) {
			if (
				config.browsers[browser] !== '*' &&
				browserData.browsers[mdnBrowserKey(browser)]
			) {
				const parsedRange = parseRange(config.browsers[browser]);

				if (
					parsedRange.versions.length === 1 &&
					browserData.browsers[mdnBrowserKey(browser)] &&
					!browserData.browsers[mdnBrowserKey(browser)].release_versions.includes(semver.coerce(parsedRange.versions[0]).toString())
				) {
					if (!deadBrowsers.has(browser)) {
						if (browser === 'ios_saf' || browser === 'firefox_mob') {
							logBuffer.push([`- error : unknown version for "${browser}" - "${config.browsers[browser]}"`, 'error']);
						} else {
							logBuffer.push([`- info : unknown version for "${browser}" - "${config.browsers[browser]}"`, 'info']);
						}
					}
					continue;
				}

				// Some versions in configs might be very specific (e.g. a build number).
				// Other versions might be typo's.
				const unknownVersions = parsedRange.versions.filter((x) => {
					return !browserData.browsers[mdnBrowserKey(browser)].release_versions.includes(semver.coerce(x).toString());
				});

				const versions = browserData.browsers[mdnBrowserKey(browser)].release_versions.map((x) => semver.coerce(x));

				if (unknownVersions.length > 0 && !deadBrowsers.has(browser)) {
					// Warn when a version is not found in MDN data.
					logBuffer.push([`- info : unknown versions for "${browser}" - ${JSON.stringify(unknownVersions)} `, 'info']);
					stats.unknownVersions++;
					// But add it to the list anyway.
					versions.push(...(unknownVersions.map((x) => semver.coerce(x))));
				}

				// Normalize the range by deconstructing and reconstructing it.
				// - deconstruct the range into a list of versions.
				const versionsSatisfiedByConfig = versions.filter((x) => semver.satisfies(semver.coerce(x), config.browsers[browser]));
				// - reconstruct a simplified range from the list of versions.
				const alwaysIncludeMinor = ['safari', 'ios_saf', 'samsung_mob'].includes(browser);
				config.browsers[browser] = simplifyRange(semver.sort(versions), versionsSatisfiedByConfig.join(' || '), alwaysIncludeMinor).toString();

				if (!config.browsers[browser]) {
					logBuffer.push([`- error: browser "${browser}: ${originalBrowsers[browser]}" did not match any real browser versions`, 'error']);
				}
			}
		}

		for (const browser of Object.keys(config.browsers || {})) {
			if (deadBrowsers.has(browser) || isHelper || !browserData.browsers[mdnBrowserKey(browser)]) {
				continue;
			}

			const releaseVersions = browserData.browsers[mdnBrowserKey(browser)].release_versions;
			if (semver.satisfies(semver.coerce(releaseVersions[releaseVersions.length - 1]), config.browsers[browser])) {
				stats.unbounded++;
			}
		}

		for (const browser of configTemplateBrowserNames) {
			if (deadBrowsers.has(browser) || config.browsers[browser]) {
				continue;
			}

			stats.missing++;
		}

		const sortedConfig = {};
		for (const browser of configTemplateBrowserNames) {
			if (!config.browsers[browser]) {
				continue;
			}

			sortedConfig[browser] = config.browsers[browser];
		}

		config.browsers = sortedConfig;

		try {
			assert.deepStrictEqual(config.browsers, originalBrowsers);
			assert.deepStrictEqual(Object.keys(config.browsers), Object.keys(originalBrowsers));
		} catch (_) {
			logBuffer.push(['\n\nupdated browser config:\n', 'error']);
			logBuffer.push([TOML.stringify({ browsers: config.browsers }), 'error']);
		}

		processLog(logBuffer);

	});
}).then(() => {
	if (process.env.GITHUB_STEP_SUMMARY) {
		fs.appendFileSync(
			process.env.GITHUB_STEP_SUMMARY,
			`## Config stats\n\n` +
			`_The goal is never to reduce all these stats to zero._\n` +
			`_Over time we do want to make sure these do not escalate._\n\n` +
			`### Browsers\n`+
			`- ${stats.missing} missing\n` +
			`- ${stats.unknownVersions} unknown\n` +
			`- ${stats.unbounded} unbounded ('*' or '>5')\n\n` +
			`### Meta\n` +
			`- ${stats.withoutDocumentation} missing docs link\n\n` +
			`### Log\n` +
			`- ${stats.withWarnings} warnings\n` +
			`- ${stats.withInfoMessages} info messages\n\n`
		);
	} else {
		console.log(`\n${JSON.stringify(stats, undefined, 2)}`);
	}
});
