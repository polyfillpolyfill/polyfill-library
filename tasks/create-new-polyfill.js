"use strict";

const fs = require("fs");
const path = require("path");

const newPolyfill = process.argv.slice(2)[0];

const polyfillTemplateFolderPath = path.join(__dirname, './polyfill-templates');
const configTemplate = fs.readFileSync(path.join(polyfillTemplateFolderPath, 'config.toml'), { encoding: 'utf-8'});
const polyfillTemplate = fs.readFileSync(path.join(polyfillTemplateFolderPath, 'polyfill.js'), { encoding: 'utf-8'});
const detectTemplate = fs.readFileSync(path.join(polyfillTemplateFolderPath, 'detect.js'), { encoding: 'utf-8'});
const testsTemplate = fs.readFileSync(path.join(polyfillTemplateFolderPath, 'tests.js'), { encoding: 'utf-8'});

const polyfillFolderPath = path.join(__dirname, "../polyfills/", dotToSlash(newPolyfill));
fs.mkdirSync(polyfillFolderPath, {recursive: true});

fs.writeFileSync(path.join(polyfillFolderPath, 'polyfill.js'), polyfillTemplate, {encoding: 'utf-8'});
fs.writeFileSync(path.join(polyfillFolderPath, 'config.toml'), configTemplate, {encoding: 'utf-8'});
fs.writeFileSync(path.join(polyfillFolderPath, 'detect.js'), detectTemplate, {encoding: 'utf-8'});
fs.writeFileSync(path.join(polyfillFolderPath, 'tests.js'), testsTemplate.replace('REPLACE_ME', newPolyfill), {encoding: 'utf-8'});

console.log(`Created a new polyfill template at ${polyfillFolderPath}. Woohoo!`);

/**
 * Converts `.`s to `/`s
 *
 * @param {string} string The string to convert
 * @returns {string} The newly converted string
 */
function dotToSlash(string) {
	return string.replace(/\./g, '/');
}
