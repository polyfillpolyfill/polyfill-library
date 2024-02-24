
/* globals proclaim, Reflect, Symbol */

it('is a function', function () {
	proclaim.isFunction(Reflect.preventExtensions);
});

it('has correct arity', function () {
	proclaim.arity(Reflect.preventExtensions, 1);
});

it('has correct name', function () {
	proclaim.hasName(Reflect.preventExtensions, 'preventExtensions');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Reflect, 'preventExtensions');
});

it('returns true after preventing extentions on an object', function () {
	proclaim.isTrue(Reflect.preventExtensions({}));
});

it('returns true even if the object already prevents extentions', function () {
	var obj = {};
	Reflect.preventExtensions(obj);
	proclaim.isTrue(Reflect.preventExtensions(obj));
});

if ('isExtensible' in Object && 'preventExtensions' in Object && (function () {
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
	it('prevents extentions on target', function () {
		var o = {};
		Reflect.preventExtensions(o);
		proclaim.isFalse(Object.isExtensible(o));
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
