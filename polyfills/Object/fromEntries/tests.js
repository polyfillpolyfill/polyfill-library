
/* globals proclaim, Symbol */

it('is a function', function () {
	proclaim.isFunction(Object.fromEntries);
});

it('has correct arity', function () {
	proclaim.arity(Object.fromEntries, 1);
});

it('has correct name', function () {
	proclaim.hasName(Object.fromEntries, 'fromEntries');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Object, 'fromEntries');
});

it('throws when an entry object is a primitive string', function () {
	proclaim.throws(function () {
		Object.fromEntries(['ab']);
	}, TypeError);
});

it('throws when an entry object is a undefined', function () {
	proclaim.throws(function () {
		Object.fromEntries(undefined);
	}, TypeError);
});
it('throws when an entry object is null', function () {
	proclaim.throws(function () {
		Object.fromEntries(null);
	}, TypeError);
});
it('throws when an entry object is absent', function () {
	proclaim.throws(function () {
		Object.fromEntries();
	}, TypeError);
});

it('returns empty object if given an empty array', function () {
	proclaim.deepStrictEqual(Object.fromEntries([]), {});
});

if ('getOwnPropertyDescriptor' in Object) {
	it('Creates data properties which are enumerable, writable, and configurable', function () {
		var result = Object.fromEntries([
			['key', 'value']
		]);
		proclaim.deepStrictEqual(Object.getOwnPropertyDescriptor(result, "key"), {
			value: 'value',
			enumerable: true,
			writable: true,
			configurable: true
		});
	});
}

it('succeeds when an entry object is a boxed Object', function () {
	proclaim.deepStrictEqual(Object.fromEntries([Object('ab')]).a, 'b');
});

it('succeeds when an entry object is a boxed String', function () {
	proclaim.deepStrictEqual(Object.fromEntries([new String('ab')]).a, 'b');
});

it('works with expected input', function () {
	var a = {};
	var b = {};
	var c = {};
	var entries = [
		['a', a],
		['b', b],
		['c', c]
	];

	proclaim.deepStrictEqual(Object.fromEntries(entries), {
		a: a,
		b: b,
		c: c
	});
});

if('Symbol' in self && 'iterator' in self.Symbol && !!Array.prototype[Symbol.iterator]) {
	it('works with Symbols', function () {
		var key = Symbol();
		var result = Object.fromEntries([
			[key, 'value']
		]);
		proclaim.deepStrictEqual(result[key], 'value');
	});

}
