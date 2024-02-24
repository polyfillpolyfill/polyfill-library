/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.toReversed);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.toReversed, 0);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.toReversed, 'toReversed');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array.prototype, 'toReversed');
});

describe('toReversed', function () {
	[
		{ kind: 'array', thing: [3, 4, 5, 6] },
		{ kind: 'array-like object', thing: {0: 3, 1: 4, 2: 5, 3: 6, length: 4} }
	].forEach(function (test) {
		describe(test.kind, function () {
			var thing = test.thing;

			it('should reverse (by copy)', function () {
				proclaim.deepStrictEqual(Array.prototype.toReversed.call(thing), [6, 5, 4, 3]);
				proclaim.equal(thing[0], 3);
			});
		});
	});
});
