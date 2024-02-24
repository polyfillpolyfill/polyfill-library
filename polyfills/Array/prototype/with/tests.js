/* eslint-env mocha, browser */
/* global proclaim */

var supportsDefiningFunctionName = (function () {
	var fn = function () {};
	try {
		Object.defineProperty(fn, 'name', {
			value: 'test'
		});
		return true;
	} catch (ignore) {
		return false;
	}
})();

it('is a function', function () {
	proclaim.isFunction(Array.prototype.with);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.with, 2);
});

it('has correct name', function () {
	if (supportsDefiningFunctionName) {
		proclaim.hasName(Array.prototype.with, 'with');
	} else {
		proclaim.hasName(Array.prototype.with, 'With');
	}
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array.prototype, 'with');
});

describe('with', function () {
	[
		// eslint-disable-next-line no-sparse-arrays
		{ kind: 'array', thing: [3, 4, 5, 6] },
		{ kind: 'array-like object', thing: {0: 3, 1: 4, 2: 5, 3: 6, length: 4} }
	].forEach(function (test) {
		describe(test.kind, function () {
			var thing = test.thing;

			it('should modify a value (by copy)', function () {
				proclaim.deepStrictEqual(Array.prototype.with.call(thing, 0, 1), [1, 4, 5, 6]);
				proclaim.equal(thing[0], 3);
			});

			it('should modify a value for negative index (by copy)', function () {
				proclaim.deepStrictEqual(Array.prototype.with.call(thing, -4, 1), [1, 4, 5, 6]);
				proclaim.equal(thing[0], 3);
			});

			it('should throw for invalid index', function () {
				proclaim.throws(function () {
					Array.prototype.with.call(thing, 4);
				});
			});
		});
	});
});
