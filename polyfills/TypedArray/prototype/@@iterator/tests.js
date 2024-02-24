/* globals proclaim, Symbol, Int8Array */

// use "Int8Array" as a proxy for all "TypedArray" subclasses

it('is an alias to %TypedArray%.prototype.values', function () {
	if ('__proto__' in Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		proclaim.deepEqual(Int8Array.prototype.__proto__[Symbol.iterator], Int8Array.prototype.__proto__.values);
	} else {
		proclaim.deepEqual(Int8Array.prototype[Symbol.iterator], Int8Array.prototype.values);
	}
});
