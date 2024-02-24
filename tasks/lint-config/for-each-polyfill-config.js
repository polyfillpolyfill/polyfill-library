'use strict';

const { promisify } = require('util');
const glob = promisify(require('glob'));
const globOptions = { cwd: process.cwd() };

function forEachPolyfillConfigPath(callback) {
	return glob('polyfills/**/config.toml', globOptions).then((files) => {
		return Promise.all(files.map((file) => {
			return callback(file);
		}))
	}).catch((error) => {
		console.log(error);
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	});
}

module.exports = {
	forEachPolyfillConfigPath: forEachPolyfillConfigPath
}
