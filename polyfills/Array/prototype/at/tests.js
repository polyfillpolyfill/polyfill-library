/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.at);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.at, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.at, 'at');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array.prototype, 'at');
});

describe('at', function () {
	it('retrieves values by index for arrays', function () {
		var array = ['a', 'b', 'c'];
		proclaim.equal(array.at(undefined), 'a');
		proclaim.equal(array.at(-4), undefined);
		proclaim.equal(array.at(-2), 'b');
		proclaim.equal(array.at(-0.5), 'a');
		proclaim.equal(array.at(0), 'a');
		proclaim.equal(array.at(0.5), 'a');
		proclaim.equal(array.at(2), 'c');
		proclaim.equal(array.at(4), undefined);
	});

	it('retrieves values by index for array-like objects', function () {
		var object = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 3 };
		proclaim.equal(Array.prototype.at.call(object, undefined), 'a');
		proclaim.equal(Array.prototype.at.call(object, -4), undefined);
		proclaim.equal(Array.prototype.at.call(object, -2), 'b');
		proclaim.equal(Array.prototype.at.call(object, -0.5), 'a');
		proclaim.equal(Array.prototype.at.call(object, 0), 'a');
		proclaim.equal(Array.prototype.at.call(object, 0.5), 'a');
		proclaim.equal(Array.prototype.at.call(object, 2), 'c');
		proclaim.equal(Array.prototype.at.call(object, 4), undefined);
	});
});
