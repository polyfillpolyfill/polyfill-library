/* eslint-env mocha, browser */
/* global proclaim, Symbol */

it('has the well known symbol toStringTag as static properties on Symbol', function() {
	proclaim.notEqual(Symbol.toStringTag, undefined);

	var toStringTag = Symbol.toStringTag;
	Symbol.toStringTag = "nope";
	proclaim.equal(Symbol.toStringTag, toStringTag);
});
