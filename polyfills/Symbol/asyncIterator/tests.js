/* eslint-env mocha, browser */
/* global proclaim, Symbol */

it('has the well known symbol async-iterator as static properties on Symbol', function() {
	proclaim.notEqual(Symbol.asyncIterator, undefined);

	var asyncIterator = Symbol.asyncIterator;
	Symbol.asyncIterator = "nope";
	proclaim.equal(Symbol.asyncIterator, asyncIterator);
});
