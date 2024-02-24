/* eslint-env mocha, browser */
/* global proclaim, ArrayBuffer, DataView, Int8Array */

describe('ArrayBuffer', function () {
	it('should expose a property named ArrayBuffer on the global object', function() {
		proclaim.isTrue('ArrayBuffer' in window);
	});

	it('should be a function', function() {
		proclaim.isFunction(ArrayBuffer);
	});

	// TODO: add back this test once we remove support for ie9
	it.skip('should throw an error if called without `new` operator', function () {
		proclaim.throws(function () {
			ArrayBuffer();
		}, TypeError);
	});
});

describe('DataView', function () {
	it('should expose a property named DataView on the global object', function() {
		proclaim.isTrue('ArrayBuffer' in window);
	});

	it('should be a function', function() {
		proclaim.isFunction(DataView);
	});

	it('should throw an error if called without `new` operator', function () {
		proclaim.throws(function () {
			DataView();
		}, TypeError);
	});
});

// use "Int8Array" as a proxy for all "TypedArray" subclasses

describe('Int8Array', function () {
	it('should expose a property named Int8Array on the global object', function() {
		proclaim.isTrue('Int8Array' in window);
	});

	it('should be a function', function() {
		proclaim.isFunction(Int8Array);
	});

	// TODO: add back this test once we remove support for ie9
	it.skip('should throw an error if called without `new` operator', function () {
		proclaim.throws(function () {
			Int8Array();
		}, TypeError);
	});
});
