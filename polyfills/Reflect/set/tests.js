
/* globals proclaim, Reflect, Symbol */

it('is a function', function () {
	proclaim.isFunction(Reflect.set);
});

it('has correct arity', function () {
	proclaim.arity(Reflect.set, 3);
});

it('has correct name', function () {
	proclaim.hasName(Reflect.set, 'set');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Reflect, 'set');
});

it('throws a TypeError if target is not an Object', function () {
	proclaim.throws(function () {
		Reflect.set(1, 'a', 1);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.set(null, 'a', 1);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.set(undefined, 'a', 1);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.set('', 'a', 1);
	}, TypeError);

	if ('Symbol' in self) {
		proclaim.throws(function () {
			Reflect.set(Symbol(), 'p', 42);
		}, TypeError);
	}
});
