/* eslint-env node */

/*
 * This script will copy all of the localisation language files from the Intl.ListFormat
 * module and install them within a folder in this directory named ~locale.
 *
 * The detect.js file used for Intl is copied into every ~locale polyfill for
 * use on detecting whether that locale needs to be polyfilled.
 *
 * The config.toml file for each locale polyfill is based off of the one for
 * Intl. The changes made ot it are:
 *  - Removing the "install" section
 *  - Adding Intl as a dependency
 */

'use strict';

var fs = require('fs');
var path = require('path');
var LocalesPath = path.dirname(require.resolve('@formatjs/intl-listformat/locale-data/en.js'));
var IntlPolyfillOutput = path.resolve('polyfills/Intl/ListFormat');
var LocalesPolyfillOutput = path.resolve('polyfills/Intl/ListFormat/~locale');
var TOML = require('@iarna/toml');

var configSource = TOML.parse(fs.readFileSync(path.join(IntlPolyfillOutput, 'config.toml'), 'utf-8'));
delete configSource.install;

if (!fs.existsSync(LocalesPolyfillOutput)) {
	fs.mkdirSync(LocalesPolyfillOutput, { recursive: true });
}

// customizing the config to add intl as a dependency
configSource.dependencies.push('Intl.ListFormat');

// don't test every single locale - it will be too slow
configSource.test = { ci: false };

var configFileSource = TOML.stringify(configSource);

function intlLocaleDetectFor(locale) {
	return "'Intl' in self && " +
			"Intl.ListFormat && " +
			"Intl.ListFormat.supportedLocalesOf && " +
			"Intl.ListFormat.supportedLocalesOf('"+locale+"').length === 1";
}

console.log('Importing Intl.ListFormat~locale.* polyfill from ' + LocalesPath);
var locales = fs.readdirSync(LocalesPath);
locales.filter(function(f)  {
	return f.endsWith('.js')
}).forEach(function (file) {
	var locale = file.slice(0, file.indexOf('.'));
	var localeOutputPath = path.join(LocalesPolyfillOutput, locale);

	if (!fs.existsSync(localeOutputPath)) {
		fs.mkdirSync(localeOutputPath, { recursive: true });
	}

	var localePolyfillSource = fs.readFileSync(path.join(LocalesPath, file));
	var polyfillOutputPath = path.join(localeOutputPath, 'polyfill.js');
	var detectOutputPath = path.join(localeOutputPath, 'detect.js');
	var configOutputPath = path.join(localeOutputPath, 'config.toml');
	fs.writeFileSync(polyfillOutputPath, localePolyfillSource);
	fs.writeFileSync(detectOutputPath, intlLocaleDetectFor(locale));
	fs.writeFileSync(configOutputPath, configFileSource);
});


console.log(locales.length + ' imported locales');
console.log('Intl.ListFormat polyfill imported successfully');
