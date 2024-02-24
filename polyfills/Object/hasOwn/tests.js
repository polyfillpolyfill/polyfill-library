/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Object.hasOwn);
});

it('has correct arity', function () {
	proclaim.arity(Object.hasOwn, 2);
});

it('has correct name', function () {
	proclaim.hasName(Object.hasOwn, 'hasOwn');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Object, 'hasOwn');
});

it('returns true when an object has an own property', function () {
	proclaim.equal(Object.hasOwn({ a: '' }, 'a'), true);
});

it('returns false when an object does not have an own property', function () {
	proclaim.equal(Object.hasOwn({}, 'toString'), false);
});

it('throws when undefined or null is passed', function () {
	proclaim.throws(function () {
		Object.hasOwn(undefined);
	}, TypeError);
	proclaim.throws(function () {
		Object.hasOwn(null);
	}, TypeError);
});

it('does not throw when a non-object is passed', function () {
	proclaim.equal(Object.hasOwn('', ''), false);
});

it('does not throw when no property is passed', function () {
	proclaim.equal(Object.hasOwn({}), false);
});
