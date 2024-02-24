'use strict';

const path = require('path');
const child_process = require('child_process');
const fs = require('fs');

const source = path.join(__dirname, '../../polyfills');

const build = require('./build');
const Polyfill = require('./polyfill');

console.log('Doing a full build before starting watcher');

// Keep a list of started test servers.
let servers = [];

// Kill all servers when exiting.
process.on('exit', function () {
	for (const serverProc of servers) {
		serverProc.stdin.pause();
		serverProc.kill();
	}
});


processFeatureAndStartServer().then(() => {
	console.log(`Watching...`);
	let throttles = {};

	if (fs.existsSync(source)) {
		fs.watch(source, { recursive: true }, (eventType, fileName) => {
			if (fileName.indexOf('__') === 0) {
				return; // skip
			}

			const pathInfo = path.parse(fileName);
			if (!fs.existsSync(path.join(source, pathInfo.dir, 'config.toml'))) {
				return; // skip
			}

			const feature = (new Polyfill(path.join(source, pathInfo.dir), pathInfo.dir)).name;
			if (throttles[feature]) {
				clearTimeout(throttles[feature]);
				delete throttles[feature];
			}

			throttles[feature] = setTimeout(() => {
				delete throttles[feature];

				console.log('Building : ' + feature);
				processFeatureAndStartServer(feature).then(() => {
					console.log(`Visit : http://bs-local.com:9876/test?includePolyfills=yes&always=no&feature=${feature}`);
				});
			}, 150);
		});
	} else {
		console.warn('Polyfills directory does not exist.');
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	}
});

/**
 * Build all or a single polyfill and (re)start the test server.
 *
 * @param {string|undefined} feature An optional feature to build. When omitted all polyfills will be build.
 * @returns {Promise<void>} When done.
 */
async function processFeatureAndStartServer(feature) {
	const startTime = new Date();

	return build(feature)
		.then(() => {
			const endTime = new Date();
			const timeDiff = (endTime - startTime) / 1000;

			if (feature) {
				console.log(`Built : ${feature} in ${Math.round(timeDiff)}s`);
			} else {
				console.log(`Built : everything in ${Math.round(timeDiff)}s`);
			}

			for (const serverProc of servers) {
				serverProc.stdin.pause();
				serverProc.kill();
			}

			servers = [];

			const serverProc = child_process.spawn("node", ["./test/polyfills/server.js"], {
				stdio: [undefined, process.stdout, process.stderr],
			});

			serverProc.on("exit", function (code) {
				if (code) {
					console.log("server exited with exit code " + code);
				}
			});

			servers.push(serverProc);
		})
		.catch((error) => {
			console.log(error);
			console.log(JSON.stringify(error));
		});
}
