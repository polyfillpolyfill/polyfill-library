/* globals proclaim, ArrayBuffer, DataView, Int8Array */

it('is a function', function () {
	proclaim.isFunction(ArrayBuffer.isView);
});

it('has correct arity', function () {
	proclaim.arity(ArrayBuffer.isView, 1);
});

it('has correct name', function () {
	proclaim.hasName(ArrayBuffer.isView, 'isView');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(ArrayBuffer, 'isView');
});

describe('isView', function () {
	it('returns a boolean', function () {
		proclaim.equal(ArrayBuffer.isView(), false);
		proclaim.equal(ArrayBuffer.isView([]), false);
		proclaim.equal(ArrayBuffer.isView({}), false);
		proclaim.equal(ArrayBuffer.isView(null), false);
		proclaim.equal(ArrayBuffer.isView(undefined), false);
		proclaim.equal(ArrayBuffer.isView(new ArrayBuffer()), false);

		proclaim.equal(ArrayBuffer.isView(new Int8Array()), true);
		proclaim.equal(ArrayBuffer.isView(new Int8Array().subarray(0, 0)), true);
		proclaim.equal(ArrayBuffer.isView(new DataView(new ArrayBuffer())), true);
	});
});
