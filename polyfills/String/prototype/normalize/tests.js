/* globals proclaim */


it('is a function', function () {
	proclaim.isFunction(String.prototype.normalize);
});

it('has correct arity', function () {
	proclaim.arity(String.prototype.normalize, 0);
});

it('has correct name', function () {
	proclaim.hasName(String.prototype.normalize, 'normalize');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(String.prototype, 'normalize');
});

it('throws a RangeError if ToString(form) value is not a valid form name', function () {
	proclaim.throws(function () {
		'a'.normalize('b');
	}, RangeError);

	proclaim.throws(function () {
		'a'.normalize('NFC1');
	}, RangeError);

	proclaim.throws(function () {
		'a'.normalize(null);
	}, RangeError);
});

it('uses NFC as default form', function () {
	var s = '\u00C5\u2ADC\u0958\u2126\u0344';
	var nfc = '\xC5\u2ADD\u0338\u0915\u093C\u03A9\u0308\u0301';
	proclaim.deepStrictEqual(s.normalize(), nfc);
	proclaim.deepStrictEqual(s.normalize(undefined), nfc);
});

it('works correctly for NFC form', function () {
	var s = '\u1E9B\u0323';
	proclaim.deepStrictEqual(s.normalize('NFC'), '\u1E9B\u0323');
	proclaim.deepStrictEqual(
		'\u00C5\u2ADC\u0958\u2126\u0344'.normalize('NFC'),
		'\xC5\u2ADD\u0338\u0915\u093C\u03A9\u0308\u0301'
	);
});

it('works correctly for NFD form', function () {
	var s = '\u1E9B\u0323';
	proclaim.deepStrictEqual(s.normalize('NFD'), '\u017F\u0323\u0307');
	proclaim.deepStrictEqual(
		'\u00C5\u2ADC\u0958\u2126\u0344'.normalize('NFD'),
		'A\u030A\u2ADD\u0338\u0915\u093C\u03A9\u0308\u0301'
	);
});

it('works correctly for NFKC form', function () {
	var s = '\u1E9B\u0323';
	proclaim.deepStrictEqual(s.normalize('NFKC'), '\u1E69');
	proclaim.deepStrictEqual(
		'\u00C5\u2ADC\u0958\u2126\u0344'.normalize('NFKC'),
		'\xC5\u2ADD\u0338\u0915\u093C\u03A9\u0308\u0301'
	);
});

it('works correctly for NFKD form', function () {
	var s = '\u1E9B\u0323';
	proclaim.deepStrictEqual(s.normalize('NFKD'), '\u0073\u0323\u0307');
	proclaim.deepStrictEqual(
		'\u00C5\u2ADC\u0958\u2126\u0344'.normalize('NFKD'),
		'A\u030A\u2ADD\u0338\u0915\u093C\u03A9\u0308\u0301'
	);
});

var supportsStrictModeTests = (function () {
	'use strict';

	return this === undefined;
}).call(undefined);

if (supportsStrictModeTests) {
	it('throws TypeError if `this` is null', function () {
		proclaim.throws(function () {
			String.prototype.normalize.call(null);
		}, TypeError);
	});

	it('throws TypeError if `this` is undefined', function () {
		proclaim.throws(function () {
			String.prototype.normalize.call(undefined);
		}, TypeError);
	});
}
