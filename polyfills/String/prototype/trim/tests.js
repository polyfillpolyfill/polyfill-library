
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(String.prototype.trim);
});

it('has correct arity', function () {
	proclaim.arity(String.prototype.trim, 0);
});

it('has correct name', function () {
	proclaim.hasName(String.prototype.trim, 'trim');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(String.prototype, 'trim');
});

it('removes whitespaces at left & right side of string', function () {
	proclaim.strictEqual(' \n  q w e \n  '.trim(), 'q w e');
});
it('removes all forms of whitespace', function () {
	proclaim.strictEqual('\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'.trim(), '');
});
it("shouldn't remove zero width space characters as they are not in the Zs Unicode category", function () {
	// ECMAScript WhiteSpace intentionally excludes all code points that have the Unicode “White_Space” property but which are not classified in category "Space_Separator" ("Zs").
	proclaim.strictEqual('\u200b\u0085'.trim(), '\u200b\u0085');
});
var supportsStrictModeTests = (function () {
	'use strict';

	return this === undefined;
}).call(undefined);

if (supportsStrictModeTests) {
	it('should throw TypeError if called with a null context', function () {
		proclaim.throws(function () {
			String.prototype.trim.call(null, 0);
		}, TypeError);
	});
	it('should throw TypeError if called with an undefined context', function () {
		proclaim.throws(function () {
			String.prototype.trim.call(undefined, 0);
		}, TypeError);
	});
}
