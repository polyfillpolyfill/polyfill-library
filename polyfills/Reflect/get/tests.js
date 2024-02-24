
/* globals proclaim, Reflect, Symbol */

it('is a function', function () {
	proclaim.isFunction(Reflect.get);
});

it('has correct arity', function () {
	proclaim.arity(Reflect.get, 2);
});

it('has correct name', function () {
	proclaim.hasName(Reflect.get, 'get');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Reflect, 'get');
});

it('throws a TypeError if target is not an Object', function () {
	proclaim.throws(function () {
		Reflect.get(1, 'a');
	}, TypeError);

	proclaim.throws(function () {
		Reflect.get(null, 'a');
	}, TypeError);

	proclaim.throws(function () {
		Reflect.get(undefined, 'a');
	}, TypeError);

	proclaim.throws(function () {
		Reflect.get('', 'a');
	}, TypeError);

	if ('Symbol' in self) {
		proclaim.throws(function () {
			Reflect.get(Symbol(), 'a');
		}, TypeError);
	}
});

it('returns value from a receiver', function () {
	try {
		var o = {};
		var n = {
			b: 2
		};

		Object.defineProperty(o, 'a', {
			get: function () {
				return this.b;
			}
		});

		proclaim.deepStrictEqual(Reflect.get(o, 'a', n), 2);
	} catch (e) {
		if (e.message !== "Getters & setters cannot be defined on this javascript engine") {
			throw e;
		}
	}
});

if ('create' in Object && function () { // supports getters
	try {
		Object.defineProperty({}, 'x', {
			configurable: true,
			enumerable: true,
			get: function () {
				return 1;
			}
		});

		return true;
	} catch (_) {
		return false;
	}
}()) {
	it('returns prototype property value using a receiver', function () {
		var o = {};
		var n = {
			b: 2
		};

		Object.defineProperty(o, 'a', {
			get: function () {
				return this.b;
			}
		});
		var p = Object.create(o);
		proclaim.deepStrictEqual(Reflect.get(p, 'a', n), 2);
	});
}

it('if no receiver argument, receiver is set to target', function () {
	var o = {
		a: 1
	};
	proclaim.deepStrictEqual(Reflect.get(o, 'a'), 1);
});

if ('Symbol' in self) {
	it('can return value where property key is a symbol', function () {
		var o = {};
		var a = Symbol('');
		o[a] = 1;

		proclaim.deepStrictEqual(Reflect.get(o, a), 1);
	});
}
