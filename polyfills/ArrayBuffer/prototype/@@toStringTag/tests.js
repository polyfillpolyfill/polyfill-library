/* eslint-env mocha, browser */
/* global proclaim, ArrayBuffer, DataView, Symbol */

describe('ArrayBuffer.prototype[Symbol.toStringTag]', function () {
	it('has correct descriptors defined for ArrayBuffer.prototype[Symbol.toStringTag]', function () {
		var descriptor = Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, Symbol.toStringTag);

		proclaim.isTrue(descriptor.configurable);
		proclaim.isFalse(descriptor.enumerable);
		proclaim.isFalse(descriptor.writable);
		proclaim.equal(descriptor.value, 'ArrayBuffer');
	});
});

describe('DataView.prototype[Symbol.toStringTag]', function () {
	it('has correct descriptors defined for DataView.prototype[Symbol.toStringTag]', function () {
		var descriptor = Object.getOwnPropertyDescriptor(DataView.prototype, Symbol.toStringTag);

		proclaim.isTrue(descriptor.configurable);
		proclaim.isFalse(descriptor.enumerable);
		proclaim.isFalse(descriptor.writable);
		proclaim.equal(descriptor.value, 'DataView');
	});
});
