/* eslint-env mocha, browser */
/* global proclaim, Symbol */

it('has the well known symbol match as static properties on Symbol', function() {
	proclaim.notEqual(Symbol.match, undefined);

	var match = Symbol.match;
	Symbol.match = "nope";
	proclaim.equal(Symbol.match, match);
});
