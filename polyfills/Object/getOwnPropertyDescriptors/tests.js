/* eslint-env mocha, browser */
/* global proclaim, Symbol */

it('is a function', function () {
	proclaim.isFunction(Object.getOwnPropertyDescriptors);
});

it('has correct arity', function () {
	proclaim.arity(Object.getOwnPropertyDescriptors, 1);
});

it('has correct name', function () {
	proclaim.hasName(Object.getOwnPropertyDescriptors, 'getOwnPropertyDescriptors');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Object, 'getOwnPropertyDescriptors');
});

it('throws on invalid object', function() {
	proclaim.throws(function () {
		Object.getOwnPropertyDescriptors(null);
	}, TypeError, 'null is not an object');

	proclaim.throws(function () {
		Object.getOwnPropertyDescriptors(undefined);
	}, TypeError, 'undefined is not an object');
});

it('handles regular properties', function () {
	proclaim.deepEqual(Object.getOwnPropertyDescriptors({ a: 1 }), {
		a: { value: 1, writable: true, enumerable: true, configurable: true }
	});
});

it('handles symbols as well', function () {
	var b = Symbol('b');
	var obj = {};
	obj[b] = 2;
	var descriptor = {};
	descriptor[b] = { value: 2, writable: true, enumerable: true, configurable: true };
	proclaim.deepEqual(Object.getOwnPropertyDescriptors(obj), descriptor);
});

it('can be re-assigned', function () {
	var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;
	proclaim.deepEqual(getOwnPropertyDescriptors({ a: 1 }), {
		a: { value: 1, writable: true, enumerable: true, configurable: true }
	});
});

it('works as expected', function () {
	var obj = {};
	var aDescriptor = {
		get: function() {
			return 1;
		}
	};
	var b = Symbol('b');
	var bDescriptor = { value: 2, writable: false, configurable: false };
	Object.defineProperty(obj, 'a', aDescriptor);
	Object.defineProperty(obj, b, bDescriptor);
	var descriptors = Object.getOwnPropertyDescriptors(obj);
	proclaim.strictEqual(descriptors.a.get, aDescriptor.get);
	proclaim.deepEqual(descriptors[b], {
		value: 2,
		enumerable: false,
		writable: false,
		configurable: false
	});
});
