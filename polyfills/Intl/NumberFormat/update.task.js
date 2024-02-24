/* eslint-env node */

/*
 * This script will copy all of the localisation language files from the Intl.NumberFormat
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
var LocalesPath = path.dirname(require.resolve('@formatjs/intl-numberformat/locale-data/en.js'));
var PluralRulesLocalesPath = path.dirname(require.resolve('@formatjs/intl-pluralrules/locale-data/en.js'));
var IntlPolyfillOutput = path.resolve('polyfills/Intl/NumberFormat');
var LocalesPolyfillOutput = path.resolve('polyfills/Intl/NumberFormat/~locale');
var TOML = require('@iarna/toml');
var localeMatcher = require('@formatjs/intl-localematcher');

var pluralRulesLocales = new Set(
	fs.readdirSync(PluralRulesLocalesPath).filter(function(f)  {
		return f.endsWith('.js');
	}).map((f) => {
		return f.slice(0, f.indexOf('.'));
	})
);

function localeDependencies(locale) {
	const match = localeMatcher.match([locale], Array.from(pluralRulesLocales));
	if (!match) {
		return [];
	}

	return [
		`Intl.PluralRules.~locale.${match}`
	];
}

var configSource = TOML.parse(fs.readFileSync(path.join(IntlPolyfillOutput, 'config.toml'), 'utf-8'));
delete configSource.install;

if (!fs.existsSync(LocalesPolyfillOutput)) {
	fs.mkdirSync(LocalesPolyfillOutput, { recursive: true });
}

// customizing the config to add intl as a dependency
configSource.dependencies.push('Intl.NumberFormat');

// don't test every single locale - it will be too slow
configSource.test = { ci: false };

function intlLocaleDetectFor(locale) {
	return "'Intl' in self && Intl.NumberFormat && (function () {\n\t\ttry {\n\t\t  new Intl.NumberFormat('".concat(locale, "', {\n\t\t\tstyle: 'unit',\n\t\t\tunit: 'byte'\n\t\t  });\n\t\t} catch (e) {\n\t\t  return false;\n\t\t}\n\t\treturn true;\n\t  })() && Intl.NumberFormat.supportedLocalesOf('").concat(locale, "').length");
}

console.log('Importing Intl.NumberFormat~locale.* polyfill from ' + LocalesPath);
var locales = fs.readdirSync(LocalesPath);
locales.filter(function(locale) {
	return locale.endsWith('.js')
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
	fs.writeFileSync(
		configOutputPath,
		TOML.stringify({
			...configSource,
			dependencies: [
				...configSource.dependencies,
				...localeDependencies(locale)
			].sort(),
			aliases: [`Intl.~locale.${locale}`].concat(locale === 'en' ? ['Intl'] : [])
		})
	);
});


console.log(locales.length + ' imported locales');
console.log('Intl.NumberFormat polyfill imported successfully');
