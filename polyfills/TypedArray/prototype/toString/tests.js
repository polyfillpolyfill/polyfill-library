/* globals proclaim, Int8Array */

// use "Int8Array" as a proxy for all "TypedArray" subclasses

it('is an alias to Array.prototype.toString', function () {
	if ('__proto__' in Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		proclaim.deepEqual(Int8Array.prototype.__proto__.toString, Array.prototype.toString);
	} else {
		proclaim.deepEqual(Int8Array.prototype.toString, Array.prototype.toString);
	}
});
