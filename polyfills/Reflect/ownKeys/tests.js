
/* globals proclaim, Reflect, Symbol */

it('is a function', function () {
	proclaim.isFunction(Reflect.ownKeys);
});

it('has correct arity', function () {
	proclaim.arity(Reflect.ownKeys, 1);
});

it('has correct name', function () {
	proclaim.hasName(Reflect.ownKeys, 'ownKeys');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Reflect, 'ownKeys');
});

it('returns an empty array if target has no own properties', function () {
	proclaim.deepStrictEqual(Reflect.ownKeys({}), []);
	var o = {
		a: 1
	};
	delete o.a;
	proclaim.deepStrictEqual(Reflect.ownKeys(o), []);
});

it('throws a TypeError if target is not an Object', function () {
	proclaim.throws(function () {
		Reflect.ownKeys(1);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.ownKeys(null);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.ownKeys(undefined);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.ownKeys('');
	}, TypeError);

	if ('Symbol' in self) {
		proclaim.throws(function () {
			Reflect.ownKeys(Symbol());
		}, TypeError);
	}
});

it('Returns target\'s own property keys', function () {
	proclaim.deepStrictEqual(Reflect.ownKeys([]), ['length']);

	// eslint-disable-next-line no-sparse-arrays
	proclaim.deepStrictEqual(Reflect.ownKeys([, 1]), ['1', 'length']);
	proclaim.deepStrictEqual(Reflect.ownKeys({
		a: 1
	}), ['a']);

	var obj = { a: 1 };
	if ('Symbol' in self) {
		var b = Symbol('b');
		obj[b] = 2;
		proclaim.deepStrictEqual(Reflect.ownKeys(obj), ['a', b]);
	} else {
		proclaim.deepStrictEqual(Reflect.ownKeys(obj), ['a']);
	}
});

if ('create' in Object) {
	it('does not return keys from prototype', function () {

		var o = Object.create({
			a: 1
		});
		o.b = 2;
		o.c = 3;
		proclaim.deepStrictEqual(Reflect.ownKeys(o), ['b', 'c']);
	});
}
