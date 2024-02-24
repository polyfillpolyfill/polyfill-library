'use strict';

const fs = require('fs');
const path = require('path');
const {
	promisify
} = require('util');

const writeFile = promisify(fs.writeFile);

/**
 * Write "aliases.json" to the output directory.
 *
 * @param {Array<Polyfill>} polyfills list of polyfills
 * @param {string} directory output directory location
 *
 * @throws When writing a valid JSON to the output directory fails.
 */
module.exports = function writeAliasFile(polyfills, directory) {
	const aliases = {};

	for (const polyfill of polyfills) {
		for (const alias of polyfill.aliases) {
			if (aliases[alias]) {
				aliases[alias] = [...aliases[alias], polyfill.name];
			} else {
				aliases[alias] = [polyfill.name];
			}
		}
	}

	return writeFile(path.join(directory, 'aliases.json'), JSON.stringify(aliases));
}
