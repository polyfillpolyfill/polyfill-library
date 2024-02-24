/* eslint-env mocha, browser */
/* globals proclaim, Symbol */

var supportsUnicodeRegexpFlag = (function () {
	try {
		new RegExp('\uD83D', 'u');
		return true;
	} catch (ignore) {
		return false;
	}
})();

describe('String.prototype.matchAll', function () {
	it('is a function', function () {
		proclaim.isFunction(String.prototype.matchAll);
	});

	it('has correct arity', function () {
		proclaim.arity(String.prototype.matchAll, 1);
	});

	it('has correct name', function () {
		proclaim.hasName(String.prototype.matchAll, 'matchAll');
	});

	it('is not enumerable', function () {
		proclaim.isNotEnumerable(String.prototype, 'matchAll');
	});

	var supportsStrictModeTests = (function () {
		'use strict';

		return this === undefined;
	}).call(undefined);

	if (supportsStrictModeTests) {
		it('throws incoercible objects', function () {
			proclaim.throws(function () {
				String.prototype.matchAll.call(undefined);
			}, TypeError);

			proclaim.throws(function () {
				String.prototype.matchAll.call(null);
			}, TypeError);
		});
	}

	it("matches for a global regex", function () {
		var iterator = 'test1test2'.matchAll(/t(e)(st(\d?))/g);
		proclaim.isInstanceOf(iterator.next, Function);

		var expected = ['test1', 'e', 'st1', '1'];
		expected.groups = undefined;
		expected.index = 0;
		expected.input = 'test1test2';
		expected.length = 4;
		proclaim.deepStrictEqual(iterator.next(), {
			value: expected,
			done: false
		});

		expected = ['test2', 'e', 'st2', '2'];
		expected.groups = undefined;
		expected.index = 5;
		expected.input = 'test1test2';
		expected.length = 4;
		proclaim.deepStrictEqual(iterator.next(), {
			value: expected,
			done: false
		});

		proclaim.deepStrictEqual(iterator.next(), {
			value: undefined,
			done: true
		});

		proclaim.deepStrictEqual(iterator.next(), {
			value: undefined,
			done: true
		});
	});

	it("throws for a non-global regex", function () {
		proclaim.throws(function() {
			'a'.matchAll(/a/)
		}, TypeError);
	});

	it("matches for a regex string", function () {
		var iterator = 'aa'.matchAll('a+');
		var expected = ['aa'];
		expected.groups = undefined;
		expected.index = 0;
		expected.input = 'aa';
		expected.length = 1;
		proclaim.deepStrictEqual(iterator.next(), {
			value: expected,
			done: false
		});

		proclaim.deepStrictEqual(iterator.next(), {
			value: undefined,
			done: true
		});
	});

	it("matches for a regex subclass", function () {
		var regexp = {}
		regexp[Symbol.matchAll] = function() {
			return {
				next: function() {
					return {
						value: 'subclass',
						done: true
					}
				}
			}
		}
		var iterator = 'aa'.matchAll(regexp);
		proclaim.isInstanceOf(iterator.next, Function);
		proclaim.deepStrictEqual(iterator.next(), {
			value: 'subclass',
			done: true
		});
	});

	if (supportsUnicodeRegexpFlag) {
		it("matches for a global unicode regex", function () {
			var regexp = new RegExp('\uD83D', 'ug');
			var iterator = '\uD83D \uDC2B'.matchAll(regexp);

			var expected = ['\uD83D'];
			expected.groups = undefined;
			expected.index = 0;
			expected.input = '\uD83D \uDC2B';
			expected.length = 1;
			proclaim.deepStrictEqual(iterator.next(), {
				value: expected,
				done: false
			});

			proclaim.deepStrictEqual(iterator.next(), {
				value: undefined,
				done: true
			});
		});
	}
});
