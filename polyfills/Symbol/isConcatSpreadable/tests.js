/* eslint-env mocha, browser */
/* global proclaim, Symbol */

it('has the well known symbol isConcatSpreadable as static properties on Symbol', function() {
	proclaim.notEqual(Symbol.isConcatSpreadable, undefined);

	var isConcatSpreadable = Symbol.isConcatSpreadable;
	Symbol.isConcatSpreadable = "nope";
	proclaim.equal(Symbol.isConcatSpreadable, isConcatSpreadable);
});
