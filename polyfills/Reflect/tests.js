
/* globals proclaim, Reflect */

it('is an object', function () {
	proclaim.isObject(Reflect);
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(window, 'Reflect');
});

if ('getPrototypeOf' in Object) {
	it('has a prototype of Object.prototype', function () {
		proclaim.deepStrictEqual(Object.getPrototypeOf(Reflect), Object.prototype);
	});
}

it('cannot be called or constructed', function () {
	proclaim.throws(function () {
		// eslint-disable-next-line no-obj-calls
		Reflect();
	});
	proclaim.throws(function () {
		// eslint-disable-next-line no-obj-calls
		new Reflect;
	});
});
