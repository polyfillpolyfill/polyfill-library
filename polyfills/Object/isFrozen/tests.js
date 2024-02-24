/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Object.isFrozen);
});

 it('has correct arity', function () {
	proclaim.arity(Object.isFrozen, 1);
});

 it('has correct name', function () {
	proclaim.hasName(Object.isFrozen, 'isFrozen');
});

 it('is not enumerable', function () {
	proclaim.isNotEnumerable(Object, 'isFrozen');
});

 it('does not throw on primitives', function () {
	proclaim.doesNotThrow(function () {
		Object.isFrozen(1);
	});
	proclaim.doesNotThrow(function () {
		Object.isFrozen('a');
	});
	proclaim.doesNotThrow(function () {
		Object.isFrozen(false);
	});
	proclaim.doesNotThrow(function () {
		Object.isFrozen(null);
	});
	proclaim.doesNotThrow(function () {
		Object.isFrozen(undefined);
	});
});

 it('returns true for primitives', function () {
	proclaim.isTrue(Object.isFrozen(1));
	proclaim.isTrue(Object.isFrozen('a'));
	proclaim.isTrue(Object.isFrozen(false));
	proclaim.isTrue(Object.isFrozen(null));
	proclaim.isTrue(Object.isFrozen(undefined));
});

 it('returns false for a default object literal', function(){
	proclaim.isFalse(Object.isFrozen({}));
});
