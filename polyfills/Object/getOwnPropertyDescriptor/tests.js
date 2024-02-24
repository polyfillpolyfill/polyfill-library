/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Object.getOwnPropertyDescriptor);
});

it('has correct arity', function () {
	proclaim.arity(Object.getOwnPropertyDescriptor, 2);
});

it('has correct name', function () {
	proclaim.hasName(Object.getOwnPropertyDescriptor, 'getOwnPropertyDescriptor');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Object, 'getOwnPropertyDescriptor');
});

it('returns undefined for properties which the object does not own', function () {
	proclaim.isUndefined(Object.getOwnPropertyDescriptor({}, 'carrot'));
});

it('does not throw an error for numbers', function() {
	proclaim.doesNotThrow(function() {
		Object.getOwnPropertyDescriptor(13.7);
	});
});

it('does not throw an error for strings', function() {
	proclaim.doesNotThrow(function() {
		Object.getOwnPropertyDescriptor('13.7');
	});
});

it('does not throw an error for booleans', function() {
	proclaim.doesNotThrow(function() {
		Object.getOwnPropertyDescriptor(true);
	});
});

it('throws a TypeError for null', function() {
	proclaim.throws(function() {
		Object.getOwnPropertyDescriptor(null);
	});
});

it('throws a TypeError for undefined', function() {
	proclaim.throws(function() {
		Object.getOwnPropertyDescriptor(undefined);
	});
});

it('returns the data-descriptor for the requested property on the object', function() {
	var descr = Object.getOwnPropertyDescriptor({ name: 'polyfill-library' }, 'name');
	var expected = {
		enumerable: true,
		configurable: true,
		value: 'polyfill-library',
		writable: true
	};

	proclaim.deepEqual(descr, expected);
});
