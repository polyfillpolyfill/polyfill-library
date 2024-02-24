/* eslint-env mocha, browser */
/* global proclaim, Symbol */

it('has the well known symbol unscopables as static properties on Symbol', function() {
	proclaim.notEqual(Symbol.unscopables, undefined);
	var unscopables = Symbol.unscopables;
	Symbol.unscopables = "nope";
	proclaim.equal(Symbol.unscopables, unscopables);
});
