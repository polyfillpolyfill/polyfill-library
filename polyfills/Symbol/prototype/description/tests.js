
/* globals proclaim, Symbol */

it('is defined', function () {
	proclaim.include(Symbol.prototype, 'description');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Symbol.prototype, 'description');
});

it('is configurable', function () {
	if (Object.getOwnPropertyDescriptor) {
		proclaim.isTrue(Object.getOwnPropertyDescriptor(Symbol.prototype, 'description').configurable);
	}
});

it('works with strings', function () {
	proclaim.strictEqual(Symbol("hello").description, "hello");
});

it.skip('works with empty strings', function () {
	proclaim.strictEqual(Symbol("").description, "");
});

it('works with numbers', function () {
	proclaim.strictEqual(Symbol(1).description, "1");
});

it('works with booleans', function () {
	proclaim.strictEqual(Symbol(true).description, "true");
});

it('works with null', function () {
	proclaim.strictEqual(Symbol(null).description, "null");
});

it.skip('works with undefined', function () {
	proclaim.strictEqual(Symbol(undefined).description, undefined);
});

it.skip('works with empty arrays', function () {
	proclaim.strictEqual(Symbol([]).description, "");
});

it('works with non-empty arrays', function () {
	proclaim.strictEqual(Symbol(["a","b"]).description, "a,b");
});

it('works with objects', function () {
	proclaim.strictEqual(Symbol({}).description, "[object Object]");
});

it('works with regexes', function () {
	proclaim.strictEqual(Symbol(/./).description, "/./");
});

it('works with NaNs', function () {
	proclaim.strictEqual(Symbol(NaN).description, "NaN");
});

it('works with functions', function () {
	proclaim.strictEqual(Symbol(function(){}).description, String(function(){}));
});

it.skip('works with no input', function () {
	var s = Symbol();
	proclaim.ok(typeof s !== "undefined");
	proclaim.strictEqual(s.description, undefined);
});

// non symbols

if (Object.getOwnPropertyDescriptor) {
	var getter = Object.getOwnPropertyDescriptor(Symbol.prototype, 'description').get;

	it('does not throw an error if context is a symbol', function () {
		proclaim.doesNotThrow(function() {
			getter.call(Symbol());
		});
	});

	it('throws an error if context is a number', function () {
		proclaim.throws(function() {
			getter.call(1);
		}, TypeError);
	});

	it('throws an error if context is null', function () {
		proclaim.throws(function() {
			getter.call(null);
		}, TypeError);
	});

	it('throws an error if context is undefined', function () {
		proclaim.throws(function() {
			getter.call(undefined);
		}, TypeError);
	});

	it('throws an error if context is an array', function () {
		proclaim.throws(function() {
			getter.call([]);
		}, TypeError);
	});

	it('throws an error if context is an object', function () {
		proclaim.throws(function() {
			getter.call({});
		}, TypeError);
	});

	it('throws an error if context is a regex', function () {
		proclaim.throws(function() {
			getter.call(/./);
		}, TypeError);
	});

	it('throws an error if context is NaN', function () {
		proclaim.throws(function() {
			getter.call(NaN);
		}, TypeError);
	});

	it('throws an error if context is a function', function () {
		proclaim.throws(function() {
			getter.call(function(){});
		}, TypeError);
	});

	it('throws an error if context is a string', function () {
		proclaim.throws(function() {
			getter.call('kate');
		}, TypeError);
	});
}
