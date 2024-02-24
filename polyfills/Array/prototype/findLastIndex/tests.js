/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.findLastIndex);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.findLastIndex, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.findLastIndex, 'findLastIndex');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array.prototype, 'findLastIndex');
});

describe('findLastIndex', function () {
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
			[].findLastIndex(null);
		}, TypeError);
	});

	[
		{ kind: 'array', thing: [3, 4, 5, 6] },
		{ kind: 'array-like object', thing: {0: 3, 1: 4, 2: 5, 3: 6, length: 4} }
	].forEach(function (test) {
		describe(test.kind, function () {
			var thing = test.thing;

			it('should retrieve the last matching item', function () {
				proclaim.equal(Array.prototype.findLastIndex.call(thing, isOdd), 2);
				proclaim.equal(Array.prototype.findLastIndex.call(thing, hasOddIndex), 3);
				proclaim.equal(Array.prototype.findLastIndex.call(thing, matchesThisX), -1);
				proclaim.equal(Array.prototype.findLastIndex.call(thing, matchesMyLength), 1);
			});

			it('should retrieve the last matching item with `thisArg`', function () {
				proclaim.equal(Array.prototype.findLastIndex.call(thing, matchesThisX, { x: 4 }), 1);
			});
		});
	});
});
