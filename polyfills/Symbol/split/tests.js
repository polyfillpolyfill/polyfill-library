/* eslint-env mocha, browser */
/* global proclaim, Symbol */

it('has the well known symbol split as static properties on Symbol', function() {
	proclaim.notEqual(Symbol.split, undefined);

	var split = Symbol.split;
	Symbol.split = "nope";
	proclaim.equal(Symbol.split, split);
});
