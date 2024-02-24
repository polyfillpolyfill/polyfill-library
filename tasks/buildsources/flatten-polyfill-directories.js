'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Recursively discover all subfolders and produce a flattened list.
 * Directories prefixed with '__' are not polyfill features and are not included.
 *
 * @param {string} directory Directory to flatten.
 * @returns {Array<string>} Flattened directory.
 */
module.exports = function flattenPolyfillDirectories(directory) {
	let results = [];
	for (const item of fs.readdirSync(directory)) {
		const joined = path.join(directory, item);
		if (fs.lstatSync(joined).isDirectory() && item.indexOf('__') !== 0) {
			results = [...results, ...flattenPolyfillDirectories(joined), joined];
		}
	}
	return results;
}
