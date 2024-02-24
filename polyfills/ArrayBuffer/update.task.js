/* eslint-env node */

'use strict';

var fs = require('fs');
var path = require('path');
var arrayBufferPolyfillOutput = path.resolve('polyfills/ArrayBuffer/polyfill.js');

var polyfill = fs.readFileSync(arrayBufferPolyfillOutput, 'utf-8');

// always attach these to `self`, since the existing browser implementation may be incomplete (e.g. IE11)
[
	'ArrayBuffer',
	'Int8Array',
	'Uint8Array',
	'Uint8ClampedArray',
	'Int16Array',
	'Uint16Array',
	'Int32Array',
	'Uint32Array',
	'Float32Array',
	'Float64Array',
	'DataView'
].forEach(function (kind) {
	polyfill = polyfill.replace(
		'global.' + kind + ' = global.' + kind + ' || ' + kind + ';',
		'global.' + kind + ' = ' + kind + ';'
	)
});

// add helper function for defining properties correctly (all properties should be `writable` and `configurable`)
polyfill = polyfill.replace(
	/(function packF32\(v\).+?\n)/,
	'$1\n' +
	'  function ObjectDefinePropertyConfigurable(o, prop, desc) {\n' +
	'    desc.writable = true;\n' +
	'    desc.configurable = true;\n' +
	'    return Object.defineProperty(o, prop, desc);\n' +
	'  }\n'
);

// replace usage of `Object.defineProperty` with helper function
[
	'$TypedArray$',
	'this',
	'DataView'
].forEach(function (kind) {
	polyfill = polyfill
		.split('Object.defineProperty(' + kind)
		.join('ObjectDefinePropertyConfigurable(' + kind)
});

fs.writeFileSync(arrayBufferPolyfillOutput, polyfill, 'utf-8');
