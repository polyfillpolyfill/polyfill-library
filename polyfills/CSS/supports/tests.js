/* eslint-env mocha, browser */
/* global proclaim */

describe("CSS", function() {
	it("is a function", function() {
		proclaim.isFunction(CSS.supports);
	});
	it("supports() 1 arg", function() {
		proclaim.doesNotThrow(function() {
			CSS.supports("background: #fff");
		});
	});
	it("supports() 2 args", function() {
		proclaim.doesNotThrow(function() {
			CSS.supports("background", "#fff");
		});
	});
	it("returns a boolean (when calling with 1 arg)", function() {
		proclaim.isBoolean(CSS.supports("background: #fff"));
	});
	it("returns a boolean 2 (when calling with 2 args)", function() {
		proclaim.isBoolean(CSS.supports("background", "#fff"));
	});
});
