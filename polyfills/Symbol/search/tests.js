/* eslint-env mocha, browser */
/* global proclaim, Symbol */

it('has the well known symbol search as static properties on Symbol', function() {
	proclaim.notEqual(Symbol.search, undefined);

	var search = Symbol.search;
	Symbol.search = "nope";
	proclaim.equal(Symbol.search, search);
});
