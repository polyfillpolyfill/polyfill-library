/* eslint-env mocha, browser */
/* global proclaim, Int8Array */

// use "Int8Array" as a proxy for all "TypedArray" subclasses

it('is a function', function () {
	proclaim.isFunction(Int8Array.prototype.keys);
});

it('has correct arity', function () {
	proclaim.arity(Int8Array.prototype.keys, 0);
});

it('has correct name', function () {
	proclaim.hasName(Int8Array.prototype.keys, 'keys');
});

it('is not enumerable', function () {
	if ('__proto__' in Int8Array.prototype && Int8Array.prototype.__proto__ !== Object.prototype) {
		proclaim.isNotEnumerable(Int8Array.prototype.__proto__, 'keys');
	} else {
		proclaim.isNotEnumerable(Int8Array.prototype, 'keys');
	}
});

describe('keys', function () {
	it('returns a next-able object', function () {
		var array = new Int8Array([10, 11]);
		var iterator = array.keys();

		proclaim.isInstanceOf(iterator.next, Function);
		proclaim.deepEqual(iterator.next(), {
			value: 0,
			done: false
		});
	});

	it('finally returns a done object', function () {
		var array = new Int8Array([10, 11]);
		var iterator = array.keys();
		iterator.next();
		iterator.next();
		proclaim.deepEqual(iterator.next(), {
			value: undefined,
			done: true
		});
	});
});
