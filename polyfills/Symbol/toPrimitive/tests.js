/* eslint-env mocha, browser */
/* global proclaim, Symbol */

it('has the well known symbol toPrimitive as static properties on Symbol', function() {
	proclaim.notEqual(Symbol.toPrimitive, undefined);

	var toPrimitive = Symbol.toPrimitive;
	Symbol.toPrimitive = "nope";
	proclaim.equal(Symbol.toPrimitive, toPrimitive);
});
