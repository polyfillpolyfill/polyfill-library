
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(String.prototype.trimStart);
});

it('has correct arity', function () {
	proclaim.arity(String.prototype.trimStart, 0);
});

it('has correct name', function () {
	proclaim.hasName(String.prototype.trimStart, 'trimStart');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(String.prototype, 'trimStart');
});

it('works as expected', function () {
	proclaim.strictEqual(' \n  q w e \n  '.trimStart(), 'q w e \n  ');
	proclaim.strictEqual('\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF  q w e \n  '.trimStart(), 'q w e \n  ');
	// ECMAScript WhiteSpace intentionally excludes all code points that have the Unicode “White_Space” property but which are not classified in category "Space_Separator" ("Zs").
	proclaim.strictEqual(' \u200b\u0085  q w e \n  '.trimStart(), '\u200b\u0085  q w e \n  ', "shouldn't remove zero width space characters as they are not in the Zs Unicode category");
	var supportsStrictModeTests = (function () {
		'use strict';
		return this === undefined;
	}).call(undefined);

	if (supportsStrictModeTests) {
		proclaim.throws(function () {
	"use strict";
			String.prototype.trimStart.call(null, 0);
		}, TypeError);
		proclaim.throws(function () {
	"use strict";
			String.prototype.trimStart.call(void 0, 0);
		}, TypeError);
	}
});
