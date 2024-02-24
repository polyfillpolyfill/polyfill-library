
/* globals proclaim, Reflect */

it('is a function', function () {
	proclaim.isFunction(Reflect.construct);
});

it('has correct arity', function () {
	proclaim.arity(Reflect.construct, 2);
});

it('has correct name', function () {
	proclaim.hasName(Reflect.construct, 'construct');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Reflect, 'construct');
});

it('throws TypeError if `newTarget` is not a constuctor', function () {
	proclaim.throws(function () {
		Reflect.construct(function () {}, [], 1);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.construct(function () {}, [], null);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.construct(function () {}, [], {});
	}, TypeError);

	proclaim.throws(function () {
		Reflect.construct(function () {}, [], Math.sin);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.construct(function () {}, [], 'a');
	}, TypeError);

	proclaim.throws(function () {
		Reflect.construct(function () {}, [], /./);
	}, TypeError);
});

it('if `newTarget` is absent, let `newTarget` be `target`', function () {
	var o = {};

	function E() {
		this.o = o;
	}
	var result = Reflect.construct(E, []);
	proclaim.isInstanceOf(result, E);
	proclaim.equal(result.o, o);
});

it('throws TypeError is `target` is not a constructor', function () {
	proclaim.throws(function () {
		Reflect.construct(1, []);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.construct(null, []);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.construct({}, []);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.construct(Math.sin, []);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.construct('a', []);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.construct(/./, []);
	}, TypeError);
});

it('spreads `argumentsList` as the arguments for the `target` constructor', function () {
	proclaim.deepStrictEqual(Reflect.construct(function E() {
		this.args = Array.prototype.slice.call(arguments);
	}, [1, 2, 3]).args, [1, 2, 3]);
});

it('throws TypeError is `argumentsList` is not ArrayLike', function () {
	proclaim.throws(function () {
		Reflect.construct(function () {}, 9);
	}, TypeError);
});
