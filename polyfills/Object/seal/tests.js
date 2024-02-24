/* eslint-env mocha, browser */
/* global proclaim, Symbol */

it('is a function', function () {
	proclaim.isFunction(Object.seal);
});

it('has correct arity', function () {
	proclaim.arity(Object.seal, 1);
});

it('has correct name', function () {
	proclaim.hasName(Object.seal, 'seal');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Object, 'seal');
});

it('does not throw TypeError if argument is `undefined`', function() {
	proclaim.doesNotThrow(function() {
		Object.seal(undefined);
	});
});

it('does not throw TypeError if argument is `null`', function() {
	proclaim.doesNotThrow(function() {
		Object.seal(null);
	});
});

it('does not throw TypeError if argument is `true`', function() {
	proclaim.doesNotThrow(function() {
		Object.seal(true);
	});
});

it('does not throw TypeError if argument is `false`', function() {
	proclaim.doesNotThrow(function() {
		Object.seal(false);
	});
});

it('does not throw TypeError if argument is a string', function() {
	proclaim.doesNotThrow(function() {
		Object.seal('a');
	});
});

it('does not throw TypeError if argument is a number', function() {
	proclaim.doesNotThrow(function() {
		Object.seal(0);
	});
});

it('does not throw TypeError if argument is a symbol', function() {
	if ('Symbol' in self) {
		proclaim.doesNotThrow(function() {
			Object.seal(Symbol());
		});
	}
});

it('returns the argument', function() {
	proclaim.isUndefined(Object.seal(undefined));
	proclaim.isNull(Object.seal(null));
	proclaim.isTrue(Object.seal(true));
	proclaim.isFalse(Object.seal(false));
	proclaim.deepStrictEqual(Object.seal('a'), 'a');
	proclaim.deepStrictEqual(Object.seal(0), 0);
	if ('Symbol' in self) {
		var sym = Symbol();
		proclaim.deepStrictEqual(Object.seal(sym), sym);
	}
});
