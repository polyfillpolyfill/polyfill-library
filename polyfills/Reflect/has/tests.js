
/* globals proclaim, Reflect, Symbol */

it('is a function', function () {
	proclaim.isFunction(Reflect.has);
});

it('has correct arity', function () {
	proclaim.arity(Reflect.has, 2);
});

it('has correct name', function () {
	proclaim.hasName(Reflect.has, 'has');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Reflect, 'has');
});

it('returns true if the property is anywhere in the prototype chain', function () {
	proclaim.isTrue(Reflect.has({
		a: 1
	}, 'a'));
	if ("create" in Object) {
		proclaim.isTrue(Reflect.has(Object.create({
			a: 1
		}), 'a'));
	}
});

it('returns false if the property is not anywhere in the prototype chain', function () {
	proclaim.isFalse(Reflect.has({
		a: 1
	}, 'b'));
});

it('throws a TypeError if `target` is not an Object', function () {
	proclaim.throws(function () {
		Reflect.has(1, 'a');
	}, TypeError);

	proclaim.throws(function () {
		Reflect.has(null, 'a');
	}, TypeError);

	proclaim.throws(function () {
		Reflect.has(undefined, 'a');
	}, TypeError);

	proclaim.throws(function () {
		Reflect.has('', 'a');
	}, TypeError);

	if('Symbol' in self) {
		proclaim.throws(function () {
			Reflect.has(Symbol(), 'a');
		}, TypeError);
	}
});
