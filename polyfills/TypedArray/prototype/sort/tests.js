/* eslint-env mocha, browser */
/* global proclaim, Int8Array */

// use "Int8Array" as a proxy for all "TypedArray" subclasses

it('is a function', function () {
	proclaim.isFunction(Int8Array.prototype.sort);
});

it('has correct arity', function () {
	proclaim.arity(Int8Array.prototype.sort, 1);
});

it('has correct name', function () {
	proclaim.hasName(Int8Array.prototype.sort, 'sort');
});

it('is not enumerable', function () {
	if ('__proto__' in Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		proclaim.isNotEnumerable(Int8Array.prototype.__proto__, 'sort');
	} else {
		proclaim.isNotEnumerable(Int8Array.prototype, 'sort');
	}
});

describe('sort', function () {
	it('should sort with no comparefn', function () {
		// eslint-disable-next-line no-sparse-arrays
		var typedArray = new Int8Array([6, 4, 5, , 3]);
		var expected = new Int8Array([0, 3, 4, 5, 6])
		proclaim.deepStrictEqual(typedArray.sort(), expected);
		proclaim.deepStrictEqual(typedArray, expected);
	});

	it('should sort with comparefn (by copy)', function () {
		// eslint-disable-next-line no-sparse-arrays
		var typedArray = new Int8Array([6, 4, 5, , 3]);
		var expected = new Int8Array([0, 3, 4, 5, 6])
		proclaim.deepStrictEqual(typedArray.sort(function (a, b) {
			return a - b;
		}), expected);
		proclaim.deepStrictEqual(typedArray, expected);
	});

	it('should throw for invalid comparefn', function () {
		// eslint-disable-next-line no-sparse-arrays
		var typedArray = new Int8Array([6, 4, 5, , 3]);
		proclaim.throws(function () {
			typedArray.sort('invalid');
		});
	});
});
