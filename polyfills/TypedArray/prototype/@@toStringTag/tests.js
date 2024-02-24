/* eslint-env mocha, browser */
/* global proclaim, Int8Array, Symbol */

var supportsDefiningFunctionName = (function () {
	var fn = function () {};
	try {
		Object.defineProperty(fn, 'name', {
			value: 'test'
		});
		return true;
	} catch (ignore) {
		return false;
	}
})();

describe('TypedArray.prototype[Symbol.toStringTag]', function () {
	// use "Int8Array" as a proxy for all "TypedArray" subclasses
	it('Int8Array.prototype[Symbol.toStringTag]', function () {
		var descriptor = Object.getOwnPropertyDescriptor((self.Int8Array.prototype.__proto__ !== Object.prototype && self.Int8Array.prototype.__proto__) || self.Int8Array.prototype, Symbol.toStringTag);

		proclaim.isFunction(descriptor.get);
		if (supportsDefiningFunctionName) {
			proclaim.equal(descriptor.get.name, 'get [Symbol.toStringTag]');
		}
	});
	it('new Int8Array()[Symbol.toStringTag]', function () {
		proclaim.equal(new Int8Array()[Symbol.toStringTag], 'Int8Array');
	});
});
