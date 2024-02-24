/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.toSpliced);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.toSpliced, 2);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.toSpliced, 'toSpliced');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array.prototype, 'toSpliced');
});

describe('toSpliced', function () {
	[
		// eslint-disable-next-line no-sparse-arrays
		{ kind: 'array', thing: [3, 4, 5, 6] },
		{ kind: 'array-like object', thing: {0: 3, 1: 4, 2: 5, 3: 6, length: 4} }
	].forEach(function (test) {
		describe(test.kind, function () {
			var thing = test.thing;

			it('should splice with no start (by copy)', function () {
				proclaim.deepStrictEqual(Array.prototype.toSpliced.call(thing), [3, 4, 5, 6]);
				proclaim.equal(thing[0], 3);
			});

			it('should splice with no skipCount (by copy)', function () {
				proclaim.deepStrictEqual(Array.prototype.toSpliced.call(thing, 0), []);
				proclaim.equal(thing[0], 3);
			});

			it('should splice with no items (by copy)', function () {
				proclaim.deepStrictEqual(Array.prototype.toSpliced.call(thing, 0, 1), [4, 5, 6]);
				proclaim.equal(thing[0], 3);
			});

			it('should splice with items (by copy)', function () {
				proclaim.deepStrictEqual(Array.prototype.toSpliced.call(thing, 0, 1, 1, 2), [1, 2, 4, 5, 6]);
				proclaim.equal(thing[0], 3);
			});

			it('should splice with items and negative start (by copy)', function () {
				proclaim.deepStrictEqual(Array.prototype.toSpliced.call(thing, -4, 1, 1, 2), [1, 2, 4, 5, 6]);
				proclaim.equal(thing[0], 3);
			});
		});
	});
});
