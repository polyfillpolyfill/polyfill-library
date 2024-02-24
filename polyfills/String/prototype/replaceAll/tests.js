/* eslint-env mocha, browser */
/* globals proclaim */

describe('String.prototype.replaceAll', function () {
	it('is a function', function () {
		proclaim.isFunction(String.prototype.replaceAll);
	});

	it('has correct arity', function () {
		proclaim.arity(String.prototype.replaceAll, 2);
	});

	it('has correct name', function () {
		proclaim.hasName(String.prototype.replaceAll, 'replaceAll');
	});

	it('is not enumerable', function () {
		proclaim.isNotEnumerable(String.prototype, 'replaceAll');
	});

	var supportsStrictModeTests = (function () {
		'use strict';

		return this === undefined;
	}).call(undefined);

	if (supportsStrictModeTests) {
		it('throws incoercible objects', function () {
			proclaim.throws(function () {
				String.prototype.replaceAll.call(undefined);
			}, TypeError);

			proclaim.throws(function () {
				String.prototype.replaceAll.call(null);
			}, TypeError);
		});
	}

	it("works with a functional replacer", function () {
		var result = 'origami'.replaceAll('a', function (search, i, string) {
			proclaim.deepStrictEqual(search, 'a');
			proclaim.deepStrictEqual(i, 4);
			proclaim.deepStrictEqual(string, 'origami');
			return 'o';
		});
		proclaim.deepStrictEqual(result, 'origomi');
	});

	it("replaces with undefined if replacer is not given", function() {
		proclaim.deepStrictEqual('origami'.replaceAll('a'), 'origundefinedmi');
	});

	it("an empty string to replace, replaces each code unit in a single char string", function() {
		proclaim.deepStrictEqual('origami'.replaceAll('', '_'), '_o_r_i_g_a_m_i_');
	});

	it("throws a TypeError if searchValue is a regex without a global flag", function() {
		proclaim.throws(function() {
			'origami.origami.origami'.replaceAll(/\./, 'fox');
		}, TypeError);
	});

	var supportsRegexpStickyFlag = (function () {
		// NOTE : figure out why sticky flag isn't supported.
		try {
			new RegExp('\\.', 'gy');
			return true;
		} catch (_) {
			return false;
		}
	}());

	// NOTE : Polyfill for RegExp.prototype[@@replace] is missing. This polyfill won't work fully as expected untill that polyfill has been implemented.
	if ('Symbol' in self && 'replace' in self.Symbol && self.RegExp.prototype[self.Symbol.replace]) {
		it('works correctly if searchValue is a regex with a global flag', function () {
			proclaim.deepStrictEqual('origami.origami.origami'.replaceAll(/\./g, 'fox'), 'origamifoxorigamifoxorigami');
		});

		it('works when there is a functional custom replace on RegExp', function () {

			var searchValue = /./g;

			var result = 'aa /./g /./g aa'.replaceAll(searchValue, 'z');
			proclaim.deepStrictEqual(result, 'zzzzzzzzzzzzzzz');

			if (supportsRegexpStickyFlag) {
				searchValue = new RegExp('\\.', 'gy');

				result = '. aa /./gy /./gy aa .'.replaceAll(searchValue, 'z');
				proclaim.deepStrictEqual(result, 'z aa /./gy /./gy aa .');
			}

			searchValue = /./gi;

			result = 'aa /./gi /./gi aa'.replaceAll(searchValue, 'z');
			proclaim.deepStrictEqual(result, 'zzzzzzzzzzzzzzzzz');

			if (supportsRegexpStickyFlag) {
				searchValue = new RegExp('\\.', 'igy');

				result = 'aa /\\./giy /./giy /\\./iyg /\\./gyi /\\./giy aa'.replaceAll(searchValue, 'z');
				proclaim.deepStrictEqual(result, 'aa /\\./giy /./giy /\\./iyg /\\./gyi /\\./giy aa');
			}
		});
	}

	if ('Symbol' in self && 'replace' in self.Symbol) {
		it('works when there is no functional custom replace on RegExp', function () {

			var searchValue = /./g;

			Object.defineProperty(searchValue, self.Symbol.replace, { value: undefined });

			var result = 'aa /./g /./g aa'.replaceAll(searchValue, 'z');
			proclaim.deepStrictEqual(result, 'aa z z aa');

			if (supportsRegexpStickyFlag) {
				searchValue = new RegExp('\\.', 'gy');

				Object.defineProperty(searchValue, self.Symbol.replace, { value: undefined });

				result = 'aa /\\./gy /\\./gy aa'.replaceAll(searchValue, 'z');
				proclaim.deepStrictEqual(result, 'aa z z aa');
			}

			searchValue = /./gi;

			Object.defineProperty(searchValue, self.Symbol.replace, { value: undefined });

			result = 'aa /./gi /./gi aa'.replaceAll(searchValue, 'z');
			proclaim.deepStrictEqual(result, 'aa z z aa');

			if (supportsRegexpStickyFlag) {
				searchValue = new RegExp('\\.', 'igy');

				Object.defineProperty(searchValue, self.Symbol.replace, { value: undefined });

				result = 'aa /\\./giy /./giy /\\./iyg /\\./gyi /\\./giy aa'.replaceAll(searchValue, 'z');
				proclaim.deepStrictEqual(result, 'aa z /./giy /\\./iyg /\\./gyi z aa');
			}
		});
	}
});
