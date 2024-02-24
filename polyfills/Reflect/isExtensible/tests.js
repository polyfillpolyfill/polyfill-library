
/* globals proclaim, Reflect, Symbol */

it('is a function', function () {
	proclaim.isFunction(Reflect.isExtensible);
});

it('has correct arity', function () {
	proclaim.arity(Reflect.isExtensible, 1);
});

it('has correct name', function () {
	proclaim.hasName(Reflect.isExtensible, 'isExtensible');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Reflect, 'isExtensible');
});

it('returns true if object is extensible', function () {
	proclaim.isTrue(Reflect.isExtensible({}));
});

if ('preventExtensions' in Object && (function () {
	// check for Object.preventExtensions polyfill which doesn't really prevent anything.
	var notExtensible = {};
	Object.preventExtensions(notExtensible)

	try {
		Object.defineProperty(notExtensible, 'property1', {
			value: 42
		});
		return false
	} catch (_) {
		return true
	}
}())) {
	it('returns false if object is not extensible', function () {
		var o = {};
		Object.preventExtensions(o);
		proclaim.isFalse(Reflect.isExtensible(o));
	});
}

it('throws a TypeError if target is not an Object', function () {
	proclaim.throws(function () {
		Reflect.isExtensible(1);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.isExtensible(null);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.isExtensible(undefined);
	}, TypeError);

	proclaim.throws(function () {
		Reflect.isExtensible('');
	}, TypeError);

	if ('Symbol' in self) {
		proclaim.throws(function () {
			Reflect.isExtensible(Symbol());
		}, TypeError);
	}
});
