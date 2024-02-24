
/* globals proclaim, Reflect, Symbol */

it('is a function', function () {
	proclaim.isFunction(Reflect.apply);
});

it('has correct arity', function () {
	proclaim.arity(Reflect.apply, 3);
});

it('has correct name', function () {
	proclaim.hasName(Reflect.apply, 'apply');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Reflect, 'apply');
});

it('throws a TypeError if `target` is not callable', function () {
	proclaim.throws(function () {
		Reflect.apply('');
	}, TypeError);

	proclaim.throws(function () {
		Reflect.apply(9);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.apply({});
	}, TypeError);

	proclaim.throws(function () {
		Reflect.apply([]);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.apply(/./);
	}, TypeError);

	if ('Symbol' in self) {
		proclaim.throws(function () {
			Reflect.apply(Symbol());
		}, TypeError);

		proclaim.throws(function () {
			Reflect.apply(Symbol('a'));
		}, TypeError);
	}

	proclaim.throws(function () {
		Reflect.apply(true);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.apply(Number(9));
	}, TypeError);

	proclaim.throws(function () {
		Reflect.apply(new Number(9));
	}, TypeError);
});

it('returns the result of the `target` function', function () {
	proclaim.deepStrictEqual(Reflect.apply(function () {
		return 9;
	}, 1, []), 9);
});

it('uses second argument as the `this` for the `target` function', function () {
	var context = {};
	proclaim.equal(Reflect.apply(function () {
		return this;
	}, context, []), context);
});

it('spreads third argument as the `arguments` for the `target` function', function () {
	proclaim.deepStrictEqual(Reflect.apply(function () {
		return Array.prototype.slice.call(arguments);
	}, 1, [1, 2, 3]), [1, 2, 3]);
});

it('throws a TypeError if third argument is not ArrayLike', function () {
	proclaim.throws(function () {
		Reflect.apply(function () {}, 1, 1);
	}, TypeError);
});
