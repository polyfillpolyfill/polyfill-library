/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Object.preventExtensions);
});

it('has correct arity', function () {
	proclaim.arity(Object.preventExtensions, 1);
});

it('has correct name', function () {
	proclaim.hasName(Object.preventExtensions, 'preventExtensions');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Object, 'preventExtensions');
});

it('does not throw on primitives', function () {
	proclaim.doesNotThrow(function () {
		Object.preventExtensions(1);
	});
	proclaim.doesNotThrow(function () {
		Object.preventExtensions('a');
	});
	proclaim.doesNotThrow(function () {
		Object.preventExtensions(false);
	});
	proclaim.doesNotThrow(function () {
		Object.preventExtensions(null);
	});
	proclaim.doesNotThrow(function () {
		Object.preventExtensions(undefined);
	});
});

it('returns argument if given a primitive', function () {
	proclaim.deepStrictEqual(Object.preventExtensions(1), 1);
	proclaim.deepStrictEqual(Object.preventExtensions('a'), 'a');
	proclaim.deepStrictEqual(Object.preventExtensions(false), false);
	proclaim.deepStrictEqual(Object.preventExtensions(null), null);
	proclaim.deepStrictEqual(Object.preventExtensions(undefined), undefined);
});

it('returns same object for a default object literal', function () {
	var o = {};
	proclaim.equal(Object.preventExtensions(o), o);
});
