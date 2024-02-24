/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Object.isExtensible);
});

it('has correct arity', function () {
	proclaim.arity(Object.isExtensible, 1);
});

it('has correct name', function () {
	proclaim.hasName(Object.isExtensible, 'isExtensible');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Object, 'isExtensible');
});

it('does not throw on primitives', function () {
	proclaim.doesNotThrow(function () {
		Object.isExtensible(1);
	});
	proclaim.doesNotThrow(function () {
		Object.isExtensible('a');
	});
	proclaim.doesNotThrow(function () {
		Object.isExtensible(false);
	});
	proclaim.doesNotThrow(function () {
		Object.isExtensible(null);
	});
	proclaim.doesNotThrow(function () {
		Object.isExtensible(undefined);
	});
});

it('returns false for primitives', function () {
	proclaim.isFalse(Object.isExtensible(1));
	proclaim.isFalse(Object.isExtensible('a'));
	proclaim.isFalse(Object.isExtensible(false));
	proclaim.isFalse(Object.isExtensible(null));
	proclaim.isFalse(Object.isExtensible(undefined));
});

it('returns true for a default object literal', function(){
	proclaim.isTrue(Object.isExtensible({}));
});
