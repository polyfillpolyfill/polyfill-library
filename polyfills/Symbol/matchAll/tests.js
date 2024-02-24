/* eslint-env mocha, browser */
/* global proclaim, Symbol */

it('has the well known symbol matchAll as static properties on Symbol', function() {
	proclaim.notEqual(Symbol.matchAll, undefined);

	var matchAll = Symbol.matchAll;
	Symbol.matchAll = "nope";
	proclaim.equal(Symbol.matchAll, matchAll);
});
