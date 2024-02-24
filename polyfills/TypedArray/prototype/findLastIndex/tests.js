/* eslint-env mocha, browser */
/* global proclaim, Int8Array */

// use "Int8Array" as a proxy for all "TypedArray" subclasses

it('is a function', function () {
	proclaim.isFunction(Int8Array.prototype.findLastIndex);
});

it('has correct arity', function () {
	proclaim.arity(Int8Array.prototype.findLastIndex, 1);
});

it('has correct name', function () {
	proclaim.hasName(Int8Array.prototype.findLastIndex, 'findLastIndex');
});

it('is not enumerable', function () {
	if ('__proto__' in Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		proclaim.isNotEnumerable(Int8Array.prototype.__proto__, 'findLastIndex');
	} else {
		proclaim.isNotEnumerable(Int8Array.prototype, 'findLastIndex');
	}
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
			new Int8Array().findLastIndex(null);
		}, TypeError);
	});

	var arr = new Int8Array([3, 4, 5, 6])

	it('should retrieve the last matching element', function () {
		proclaim.equal(arr.findLastIndex(isOdd), 2);
		proclaim.equal(arr.findLastIndex(hasOddIndex), 3);
		proclaim.equal(arr.findLastIndex(matchesThisX), -1);
		proclaim.equal(arr.findLastIndex(matchesMyLength), 1);
	});

	it('should retrieve the last matching item with `thisArg`', function () {
		proclaim.equal(arr.findLastIndex(matchesThisX, { x: 4 }), 1);
	});
});
