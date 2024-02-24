/* eslint-env mocha, browser */
/* global proclaim, Int8Array */

// use "Int8Array" as a proxy for all "TypedArray" subclasses

it('is a function', function () {
	proclaim.isFunction(Int8Array.prototype.at);
});

it('has correct arity', function () {
	proclaim.arity(Int8Array.prototype.at, 1);
});

it('has correct name', function () {
	proclaim.hasName(Int8Array.prototype.at, 'at');
});

it('is not enumerable', function () {
	if ('__proto__' in Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		proclaim.isNotEnumerable(Int8Array.prototype.__proto__, 'at');
	} else {
		proclaim.isNotEnumerable(Int8Array.prototype, 'at');
	}
});

describe('at', function () {
	it('retrieves values by index for typed arrays', function () {
		var typedArray = new Int8Array(3);
		typedArray[0] = 1;
		typedArray[1] = 2;
		typedArray[2] = 3;
		proclaim.equal(typedArray.at(undefined), 1);
		proclaim.equal(typedArray.at(-4), undefined);
		proclaim.equal(typedArray.at(-2), 2);
		proclaim.equal(typedArray.at(-0.5), 1);
		proclaim.equal(typedArray.at(0), 1);
		proclaim.equal(typedArray.at(0.5), 1);
		proclaim.equal(typedArray.at(2), 3);
		proclaim.equal(typedArray.at(4), undefined);
	});
});
