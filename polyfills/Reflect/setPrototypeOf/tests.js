
/* globals proclaim, Reflect, Symbol */

it('is a function', function () {
	proclaim.isFunction(Reflect.setPrototypeOf);
});

it('has correct arity', function () {
	proclaim.arity(Reflect.setPrototypeOf, 2);
});

it('has correct name', function () {
	proclaim.hasName(Reflect.setPrototypeOf, 'setPrototypeOf');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Reflect, 'setPrototypeOf');
});

it('throws a TypeError if proto is not Object or proto is not null', function () {
	proclaim.throws(function () {
		Reflect.setPrototypeOf({}, undefined);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.setPrototypeOf({}, 1);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.setPrototypeOf({}, 'string');
	}, TypeError);

	proclaim.throws(function () {
		Reflect.setPrototypeOf({}, true);
	}, TypeError);
});

it('returns false if target and proto are the same, without setting a new prototype', function () {
	var o = {};
	proclaim.isFalse(Reflect.setPrototypeOf(o, o));
	proclaim.equal(Object.getPrototypeOf(o), Object.prototype);
});

if ('__proto__' in Object.prototype) {
	it('returns true if the new prototype is set', function () {
		var o1 = {};
		proclaim.isTrue(Reflect.setPrototypeOf(o1, null));
		proclaim.equal(Object.getPrototypeOf(o1), null);

		var o3 = {};
		var proto = {};
		proclaim.isTrue(Reflect.setPrototypeOf(o3, proto));
		proclaim.equal(Object.getPrototypeOf(o3), proto);
	});
}
it('throws a TypeError if target is not an Object', function () {
	proclaim.throws(function () {
		Reflect.setPrototypeOf(1, {});
	}, TypeError);

	proclaim.throws(function () {
		Reflect.setPrototypeOf(null, {});
	}, TypeError);

	proclaim.throws(function () {
		Reflect.setPrototypeOf(undefined, {});
	}, TypeError);

	proclaim.throws(function () {
		Reflect.setPrototypeOf('', {});
	}, TypeError);

	if ('Symbol' in self) {
		proclaim.throws(function () {
			Reflect.setPrototypeOf(Symbol(), {});
		}, TypeError);
	}
});
