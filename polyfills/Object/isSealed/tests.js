/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Object.isSealed);
});

 it('has correct arity', function () {
	proclaim.arity(Object.isSealed, 1);
});

 it('has correct name', function () {
	proclaim.hasName(Object.isSealed, 'isSealed');
});

 it('is not enumerable', function () {
	proclaim.isNotEnumerable(Object, 'isSealed');
});

 it('does not throw on primitives', function () {
	proclaim.doesNotThrow(function () {
		Object.isSealed(1);
	});
	proclaim.doesNotThrow(function () {
		Object.isSealed('a');
	});
	proclaim.doesNotThrow(function () {
		Object.isSealed(false);
	});
	proclaim.doesNotThrow(function () {
		Object.isSealed(null);
	});
	proclaim.doesNotThrow(function () {
		Object.isSealed(undefined);
	});
});

 it('returns true for primitives', function () {
	proclaim.isTrue(Object.isSealed(1));
	proclaim.isTrue(Object.isSealed('a'));
	proclaim.isTrue(Object.isSealed(false));
	proclaim.isTrue(Object.isSealed(null));
	proclaim.isTrue(Object.isSealed(undefined));
});

 it('returns false for a default object literal', function(){
	proclaim.isFalse(Object.isSealed({}));
});
