/* globals proclaim, Int8Array */

// use "Int8Array" as a proxy for all "TypedArray" subclasses

it('is a function', function () {
	if ('__proto__' in Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		proclaim.isFunction(Int8Array.prototype.__proto__.toLocaleString);
	} else {
		proclaim.isFunction(Int8Array.prototype.toLocaleString);
	}
});

it('has correct arity', function () {
	if ('__proto__' in Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		proclaim.arity(Int8Array.prototype.__proto__.toLocaleString, 0);
	} else {
		proclaim.arity(Int8Array.prototype.toLocaleString, 0);
	}
});

it('has correct name', function () {
	if ('__proto__' in Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		proclaim.hasName(Int8Array.prototype.__proto__.toLocaleString, 'toLocaleString');
	} else {
		proclaim.hasName(Int8Array.prototype.toLocaleString, 'toLocaleString');
	}
});

it('is not enumerable', function () {
	if ('__proto__' in Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		proclaim.isNotEnumerable(Int8Array.prototype.__proto__, 'toLocaleString');
	} else {
		proclaim.isNotEnumerable(Int8Array.prototype, 'toLocaleString');
	}
});

describe('toLocaleString', function () {
	it('has the same result as Array.prototype.toLocaleString', function () {
		var typedArray = new Int8Array([10, 11]);
		var array = [10, 11];
		proclaim.equal(typedArray.toLocaleString(), array.toLocaleString());
	});
});
