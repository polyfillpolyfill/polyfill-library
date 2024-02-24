
/* globals proclaim, Reflect, Symbol */

it('is a function', function () {
	proclaim.isFunction(Reflect.getPrototypeOf);
});

it('has correct arity', function () {
	proclaim.arity(Reflect.getPrototypeOf, 1);
});

it('has correct name', function () {
	proclaim.hasName(Reflect.getPrototypeOf, 'getPrototypeOf');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Reflect, 'getPrototypeOf');
});

if ('create' in Object) {
	it('returns null if no prototype', function () {
		proclaim.isNull(Reflect.getPrototypeOf(Object.create(null)));
	});
}

it('returns the internal [[Prototype]] of an object', function () {
	proclaim.equal(
		Reflect.getPrototypeOf({}), Object.prototype
	);
});

it('throws a TypeError if target is not an Object', function () {
	proclaim.throws(function () {
		Reflect.getPrototypeOf(1);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.getPrototypeOf(null);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.getPrototypeOf(undefined);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.getPrototypeOf('');
	}, TypeError);

	if ('Symbol' in self) {
		proclaim.throws(function () {
			Reflect.getPrototypeOf(Symbol());
		}, TypeError);
	}
});
