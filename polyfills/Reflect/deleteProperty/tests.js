
/* globals proclaim, Reflect, Symbol */

it('is a function', function () {
	proclaim.isFunction(Reflect.deleteProperty);
});

it('has correct arity', function () {
	proclaim.arity(Reflect.deleteProperty, 2);
});

it('has correct name', function () {
	proclaim.hasName(Reflect.deleteProperty, 'deleteProperty');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Reflect, 'deleteProperty');
});

it('can delete a string property', function () {
	var o = {
		a: 1
	};

	Reflect.deleteProperty(o, 'a');

	proclaim.isFalse(Object.prototype.hasOwnProperty.call(o, 'a'));
});

if('Symbol' in self) {
	it('can delete a Symbol property', function () {
		var a = Symbol();
		var o = {};
		o[a] = 1;

		Reflect.deleteProperty(o, a);

		proclaim.isFalse(Object.prototype.hasOwnProperty.call(o, a));
	});
}

it('returns true if deleting property was a success', function () {
	var o = {
		a: 1
	};
	proclaim.isTrue(Reflect.deleteProperty(o, 'a'));
});

if ('freeze' in Object && (function () {
	// check for Object.freeze polyfill which doesn't really freeze things.
	var frozen = Object.freeze({});
	frozen.foo = true;
	return (typeof frozen.foo === 'undefined');
}())) {
	it('returns false if deleting property was not a success', function () {
		var o = {
			a: 1
		};
		Object.freeze(o);
		proclaim.isFalse(Reflect.deleteProperty(o, 'a'));
	});
}

it('throws a TypeError if target is not an Object', function () {
	proclaim.throws(function () {
		Reflect.deleteProperty(1, 'a');
	}, TypeError);

	proclaim.throws(function () {
		Reflect.deleteProperty(null, 'a');
	}, TypeError);

	proclaim.throws(function () {
		Reflect.deleteProperty(undefined, 'a');
	}, TypeError);

	proclaim.throws(function () {
		Reflect.deleteProperty('', 'a');
	}, TypeError);

	if ('Symbol' in self) {
		proclaim.throws(function () {
			Reflect.deleteProperty(Symbol(), 'a');
		}, TypeError);
	}
});
