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

describe('RegExp.prototype[@@matchAll]', function () {
	it('is a function', function () {
		proclaim.isFunction(RegExp.prototype[Symbol.matchAll]);
	});

	it('has correct arity', function () {
		proclaim.arity(RegExp.prototype[Symbol.matchAll], 1);
	});

	it('has correct name', function () {
		try {
			proclaim.hasName(RegExp.prototype[Symbol.matchAll], '[Symbol.matchAll]');
		} catch (ignore) {
			// older browsers do not set `name` for symbols
			proclaim.hasName(RegExp.prototype[Symbol.matchAll], '');
		}
	});

	it('is not enumerable', function () {
		proclaim.isNotEnumerable(RegExp.prototype, Symbol.matchAll);
	});

	it("matches for a regex", function () {
		var iterator = (/t(e)(st(\d?))/)[Symbol.matchAll]('test1test2');
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

		proclaim.deepStrictEqual(iterator.next(), {
			value: undefined,
			done: true
		});

		proclaim.deepStrictEqual(iterator.next(), {
			value: undefined,
			done: true
		});
	});

	it("matches for a global regex", function () {
		var iterator = (/t(e)(st(\d?))/g)[Symbol.matchAll]('test1test2');
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
	});

	if (supportsUnicodeRegexpFlag) {
		it("matches for a unicode regex", function () {
			var regexp = new RegExp('\uD83D', 'ug');
			var iterator = regexp[Symbol.matchAll]('\uD83D \uDC2B');

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
