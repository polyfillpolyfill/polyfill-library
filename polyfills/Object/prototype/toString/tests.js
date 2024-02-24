/* eslint-env mocha, browser */
/* global proclaim, Symbol */

var hasStrictMode = (function () {
	'use strict';
	return this === null;
}).call(null);

it('is a function', function () {
	proclaim.isFunction(Object.prototype.toString);
});

it('has correct arity', function () {
	proclaim.arity(Object.prototype.toString, 0);
});

it('has correct name', function () {
	proclaim.hasName(Object.prototype.toString, 'toString');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Object.prototype, 'toString');
});

it('returns the class of an object without toStringTag', function () {
	proclaim.equal(Object.prototype.toString.call(undefined), hasStrictMode ? '[object Undefined]' : '[object Null]');
	proclaim.equal(Object.prototype.toString.call(null), '[object Null]');
	proclaim.equal(Object.prototype.toString.call({}), '[object Object]');
	proclaim.equal(Object.prototype.toString.call([]), '[object Array]');
	proclaim.equal(Object.prototype.toString.call(new Error()), '[object Error]');
});

it('returns the class of an object with toStringTag', function () {
	var x = {};
	x[Symbol.toStringTag] = 'x';
	proclaim.equal(Object.prototype.toString.call(x), '[object x]');
});
