/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.toSorted);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.toSorted, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.toSorted, 'toSorted');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array.prototype, 'toSorted');
});

describe('toSorted', function () {
	[
		// eslint-disable-next-line no-sparse-arrays
		{ kind: 'array', thing: [6, 4, 5, , 3] },
		{ kind: 'array-like object', thing: {0: 6, 1: 4, 2: 5, 4: 3, length: 5} }
	].forEach(function (test) {
		describe(test.kind, function () {
			var thing = test.thing;

			it('should sort with no comparefn (by copy)', function () {
				proclaim.deepStrictEqual(Array.prototype.toSorted.call(thing), [3, 4, 5, 6, undefined]);
				proclaim.equal(thing[0], 6);
			});

			it('should sort with comparefn (by copy)', function () {
				proclaim.deepStrictEqual(Array.prototype.toSorted.call(thing, function (a, b) {
					return a - b;
				}), [3, 4, 5, 6, undefined]);
				proclaim.equal(thing[0], 6);
			});

			it('should throw for invalid comparefn', function () {
				proclaim.throws(function () {
					Array.prototype.toSorted.call(thing, 'invalid');
				});
			});
		});
	});
});
