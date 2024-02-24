/* eslint-env mocha, browser */
/* global proclaim, Symbol */

it('has the well known symbol hasInstance as static properties on Symbol', function() {
	proclaim.notEqual(Symbol.hasInstance, undefined);

	var hasInstance = Symbol.hasInstance;
	Symbol.hasInstance = "nope";
	proclaim.equal(Symbol.hasInstance, hasInstance);
});
