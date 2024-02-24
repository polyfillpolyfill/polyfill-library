const https = require('https');
const semver = require('semver');

const browsersFiles = [
	'chrome',
	'chrome_android',
	'deno',
	'edge',
	'firefox',
	'firefox_android',
	'ie',
	'nodejs',
	'oculus',
	'opera',
	'opera_android',
	'safari',
	'safari_ios',
	'samsunginternet_android',
	'webview_android'
];

function getBrowserData(browser) {
	return new Promise((resolve, reject) => {
		const buffer = [];

		https.request(`https://raw.githubusercontent.com/mdn/browser-compat-data/main/browsers/${browser}.json`, (response) => {
			response.on('data', function (chunk) {
				buffer.push(chunk);
			});

			response.on('end', function () {
				if (response.statusCode !== 200) {
					reject(new Error('statusCode=' + response.statusCode));
					return;
				}

				resolve(JSON.parse(buffer.join('')));
				return;
			});
		}).end();
	})
}

function mapEngines(browsersData) {
	const engines = {};

	for (const browserName in browsersData.browsers) {
		const browser = browsersData.browsers[browserName];
		const browserReleases = browser.releases;

		for (const releaseVersion in browserReleases) {
			browsersData.browsers[browserName].releases[releaseVersion].browser = browserName;
			browsersData.browsers[browserName].releases[releaseVersion].browser_version = releaseVersion;

			const release = browsersData.browsers[browserName].releases[releaseVersion];
			let engine = release.engine;
			if (!engine && (release.browser === 'ie' || release.browser === 'opera')) {
				release.engine = release.browser;
				release.engine_version = release.browser_version;
				engine = release.engine;
			}

			if (!engine) {
				console.log(release);
				throw new Error('Engine not set');
			}

			if (!engines[engine.toLowerCase()]) {
				engines[engine.toLowerCase()] = {
					name: engine,
					releases: {}
				};
			}

			if (!engines[engine.toLowerCase()].releases[release.engine_version]) {
				engines[engine.toLowerCase()].releases[release.engine_version] = [];
			}

			engines[engine.toLowerCase()].releases[release.engine_version].push(release);
		}
	}

	browsersData.engines = engines;
	return browsersData;
}

function fetchMCD() {
	return Promise.all(browsersFiles.map(browser => getBrowserData(browser))).then((allData) => {
		let out = {
			browsers: {}
		};

		for (const [index, data] of allData.entries()) {
			if (!data.browsers) {
				console.log('Error: no browsers in', index);
				continue;
			}

			for (const browser of Object.keys(data.browsers)) {
				if (browser === 'webview_android') {
					for (const releaseVersion in data.browsers[browser].releases) {
						if (semver.coerce(releaseVersion).major >= 37) {
							delete data.browsers[browser].releases[releaseVersion];
						}
					}
				}

				if (out.browsers[browser]) {
					throw new Error('Unexpected duplicate browsers key ' + browser);
				}
				out.browsers[browser] = data.browsers[browser];

				const releaseVersions = Object.keys(data.browsers[browser].releases).map((x) => semver.coerce(x));
				releaseVersions.sort((a, b) => semver.compare(a, b));

				out.browsers[browser].release_versions = releaseVersions.map((x) => x.toString());
			}
		}

		return mapEngines(out);
	});
}

module.exports = {
	fetchMCD: fetchMCD
}
