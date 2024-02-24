/* eslint-env mocha, browser */
/* global proclaim, Symbol */

it('has the well known symbol replace as static properties on Symbol', function() {
	proclaim.notEqual(Symbol.replace, undefined);

	var replace = Symbol.replace;
	Symbol.replace = "nope";
	proclaim.equal(Symbol.replace, replace);
});
