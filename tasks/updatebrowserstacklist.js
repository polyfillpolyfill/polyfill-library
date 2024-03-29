"use strict";

const path = require("path");
const fs = require("fs");
const BrowserStack = require("browserstack");
const dotenv = require("dotenv");
dotenv.config({
	path: path.join(__dirname, "../../.env")
});
const browserStackCredentials = {
	username: process.env.BROWSERSTACK_USERNAME,
	password: process.env.BROWSERSTACK_ACCESS_KEY
};

if (!process.env.BROWSERSTACK_USERNAME || !process.env.BROWSERSTACK_ACCESS_KEY) {
	throw new Error("BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY must be set in the environment to run this script.");
}

const automateClient = BrowserStack.createAutomateClient(browserStackCredentials);
const TOML = require('@iarna/toml');
const semver = require("semver");
automateClient.getBrowsers(function(error, browsers) {
	console.log("Updated the browser list for automated testing via BrowserStack.");
	fs.writeFileSync(path.join(__dirname, "../test/polyfills/browserstackBrowsers.toml"), `# This file is automatically generated via \`npm run update-browserstack-list\`
${TOML.stringify({browsers})}`);
	fs.writeFileSync(
		path.join(__dirname, "../test/polyfills/browsers.toml"), `# This file is automatically generated via \`npm run update-browserstack-list\`
${TOML.stringify({
	browsers: ([...new Set(browsers.map(b => (b.browser_version ? `${b.browser}/${b.browser_version}` : `${b.os}/${b.os_version}`)))].sort(sortBrowserByVersion))
})}`);
});

function sortBrowserByVersion(a, b) {
	const [aBrowser, aVersion] = a.split("/");
	const [bBrowser, bVersion] = b.split("/");

	if (aBrowser !== bBrowser) {
		return aBrowser.localeCompare(bBrowser);
	}

	if (aVersion !== bVersion) {
		return semver.lt(semver.coerce(aVersion), semver.coerce(bVersion)) ? -1 : 1;
	}

	return 0;
}
