
/* globals proclaim, Reflect, Symbol */

it('is a function', function () {
	proclaim.isFunction(Reflect.defineProperty);
});

it('has correct arity', function () {
	proclaim.arity(Reflect.defineProperty, 3);
});

it('has correct name', function () {
	proclaim.hasName(Reflect.defineProperty, 'defineProperty');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Reflect, 'defineProperty');
});

it('returns true if defining the property was a success', function () {
	var o = {};
	proclaim.isTrue(Reflect.defineProperty(o, 'a', {}));
	proclaim.isTrue(Object.prototype.hasOwnProperty.call(o, 'a'));
});

if ('freeze' in Object && (function () {
	// check for Object.freeze polyfill which doesn't really freeze things.
	var frozen = Object.freeze({});
	frozen.foo = true;
	return (typeof frozen.foo === 'undefined');
}())) {
	it('returns false if defining the property was not a success', function () {
		var o = {};
		Object.freeze(o);
		proclaim.isFalse(Reflect.defineProperty(o, 'a', {
			value: 1
		}));
	});
}

it('throws a TypeError if target is not an Object.', function () {
	proclaim.throws(function () {
		Reflect.defineProperty(1, 'a', {});
	}, TypeError);

	proclaim.throws(function () {
		Reflect.defineProperty(null, 'a', {});
	}, TypeError);

	proclaim.throws(function () {
		Reflect.defineProperty(undefined, 'a', {});
	}, TypeError);

	proclaim.throws(function () {
		Reflect.defineProperty('', 'a', {});
	}, TypeError);

	if ('Symbol' in self) {
		proclaim.throws(function() {
			Reflect.defineProperty(Symbol(), 'a', {});
		}, TypeError);
	}
});
