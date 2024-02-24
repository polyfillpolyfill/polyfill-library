/* eslint-env mocha, browser */
/* global proclaim */

describe("TextEncoder", function() {
	it("has a valid constructor", function() {
		proclaim.isInstanceOf(new TextEncoder(), TextEncoder);
	});
});

describe("TextDecoder", function() {
	it("has a valid constructor", function() {
		proclaim.isInstanceOf(new TextDecoder(), TextDecoder);
	});

	it("decodes encoded strings", function() {
		var encoder = new TextEncoder();
		var decoder = new TextDecoder();
		var originalString = "hello world";
		var encodedString = encoder.encode(originalString);
		var decodedString = decoder.decode(encodedString);

		proclaim.deepEqual(decodedString, originalString);
	});
});
