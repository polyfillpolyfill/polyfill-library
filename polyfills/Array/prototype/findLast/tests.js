/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.findLast);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.findLast, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.findLast, 'findLast');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array.prototype, 'findLast');
});

describe('findLast', function () {
	function isOdd (v) {
		return v % 2 === 1;
	}

	function hasOddIndex (_v, i) {
		return isOdd(i)
	}

	function matchesThisX (v) {
		return v === this.x
	}

	function matchesMyLength (v, _i, self) {
		return v === self.length;
	}

	it('should throw when `predicate` is not callable', function () {
		proclaim.throws(function () {
			[].findLast(null);
		}, TypeError);
	});

	[
		{ kind: 'array', thing: [3, 4, 5, 6] },
		{ kind: 'array-like object', thing: {0: 3, 1: 4, 2: 5, 3: 6, length: 4} }
	].forEach(function (test) {
		describe(test.kind, function () {
			var thing = test.thing;

			it('should retrieve the last matching item', function () {
				proclaim.equal(Array.prototype.findLast.call(thing, isOdd), 5);
				proclaim.equal(Array.prototype.findLast.call(thing, hasOddIndex), 6);
				proclaim.equal(Array.prototype.findLast.call(thing, matchesThisX), undefined);
				proclaim.equal(Array.prototype.findLast.call(thing, matchesMyLength), 4);
			});

			it('should retrieve the last matching item with `thisArg`', function () {
				proclaim.equal(Array.prototype.findLast.call(thing, matchesThisX, { x: 4 }), 4);
			});
		});
	});
});
