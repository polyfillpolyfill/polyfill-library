"use strict";

const fs = require("fs");
const path = require("path");
const semver = require("semver");
const polyfillLibrary = require('../../lib');
const TOML = require("@iarna/toml");

async function main() {
	const file = path.join(__dirname, "./compat.json");
	// Ensure file exists before proceeding.
	if (!fs.existsSync(file)) {
		throw new Error(
			"Compat results file does not exists, to create the file you need to run the command: `node ./test/polyfills/compat.js`."
		);
	}
	const compat = JSON.parse(fs.readFileSync(file));
	const changes = [];
	for (const [feature, featureResults] of Object.entries(compat)) {
		const featureMetadata = await polyfillLibrary.describePolyfill(feature);

		for (const [browser, results] of Object.entries(featureResults)) {
			for (const [version, support] of Object.entries(results)) {
				const browserIsServedPolyfill =
					featureMetadata.browsers &&
					featureMetadata.browsers[browser] &&
					semver.satisfies(
						semver.coerce(version),
						featureMetadata.browsers[browser]
					);

				const browserIsNotServedPolyfill = !browserIsServedPolyfill;

				if (support === "native" && browserIsServedPolyfill) {
					// Change the browser config for the polyfill to not include this version
					changes.push([
						feature + "|" + browser,
						JSON.stringify({ [browser]: `<${version}` })
					]);
				}
				if (support === "polyfilled" && browserIsNotServedPolyfill) {
					changes.push([
						feature + "|" + browser,
						JSON.stringify({
							[browser]: `<${Number.parseFloat(version) + 1}`
						})
					]);
				}

				if (support === "missing" && browserIsNotServedPolyfill) {
					changes.push([
						feature + "|" + browser,
						JSON.stringify({
							[browser]: `<${Number.parseFloat(version) + 1}`
						})
					]);
				}
			}
		}
	}

	async function updateFeature(feature, update) {
		const configPath = path.join(
			__dirname,
			"../../polyfills",
			feature.join("/").replace(/\./g, "/"),
			"config.toml"
		);
		const config = TOML.parse(fs.readFileSync(configPath, "utf-8"));
		config.browsers = config.browsers || {};
		config.browsers = Object.assign(config.browsers, JSON.parse(update));
		fs.writeFileSync(configPath, TOML.stringify(config), "utf-8");
	}
	if (changes.length > 0) {
		for (const [featureWithBrowser, value] of changes) {
			const [feature] = featureWithBrowser.split("|");
			if (typeof value === "object") {
				for (const [featureWithBrowser2, value2] of Object.entries(value)) {
					const [feature2] = featureWithBrowser2.split("|");
					if (typeof value2 === "object") {
						for (const [featureWithBrowser3, value3] of Object.entries(
							value2
						)) {
							const [feature3] = featureWithBrowser3.split("|");
							await updateFeature([feature, feature2, feature3], value3);
						}
					} else {
						await updateFeature([feature, feature2], value2);
					}
				}
			} else {
				await updateFeature([feature], value);
			}
		}
	} else {
		console.log("All browsers have correctly configured polyfills. Nice!");
	}
}

main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
