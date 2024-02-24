/* eslint-env mocha, browser */
/* global proclaim, Symbol */

it('has the well known symbol species as static properties on Symbol', function() {
	proclaim.notEqual(Symbol.species, undefined);

	var species = Symbol.species;
	Symbol.species = "nope";
	proclaim.equal(Symbol.species, species);
});
