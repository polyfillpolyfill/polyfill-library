/* eslint-env mocha, browser */
/* global proclaim, Int8Array */

// use "Int8Array" as a proxy for all "TypedArray" subclasses

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
	proclaim.isFunction(Int8Array.prototype.with);
});

it('has correct arity', function () {
	proclaim.arity(Int8Array.prototype.with, 2);
});

it('has correct name', function () {
	if (supportsDefiningFunctionName) {
		proclaim.hasName(Int8Array.prototype.with, 'with');
	} else {
		proclaim.hasName(Int8Array.prototype.with, 'With');
	}
});

it('is not enumerable', function () {
	if ('__proto__' in Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		proclaim.isNotEnumerable(Int8Array.prototype.__proto__, 'with');
	} else {
		proclaim.isNotEnumerable(Int8Array.prototype, 'with');
	}
});

describe('with', function () {
	var typedArray = new Int8Array([3, 4, 5, 6]);

	it('should modify a value (by copy)', function () {
		proclaim.deepStrictEqual(typedArray.with(0, 1), new Int8Array([1, 4, 5, 6]));
		proclaim.equal(typedArray[0], 3);
	});

	it('should modify a value for negative index (by copy)', function () {
		proclaim.deepStrictEqual(typedArray.with(-4, 1), new Int8Array([1, 4, 5, 6]));
		proclaim.equal(typedArray[0], 3);
	});

	it('should throw for invalid index', function () {
		proclaim.throws(function () {
			typedArray.with(4);
		});
	});
});
