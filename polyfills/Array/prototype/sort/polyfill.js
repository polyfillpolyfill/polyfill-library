/* global CreateMethodProperty, IsCallable */
"use strict";

var origSort = Array.prototype.sort;

// 22.1.3.27 Array.prototype.sort ( comparefn )
// The elements of this array are sorted. The sort must be stable (that is,
// elements that compare equal must remain in their original order). If
// comparefn is not undefined, it should be a function that accepts two
// arguments x and y and returns a negative value
// if x < y, zero if x = y, or a positive value if x > y.

CreateMethodProperty(Array.prototype, "sort", function sort(compareFn) {
	// 1. If comparefn is not undefined and IsCallable(comparefn) is false, throw
	//    a TypeError exception.
	if (compareFn !== undefined && IsCallable(compareFn) === false) {
		throw new TypeError(
			"The comparison function must be either a function or undefined"
		);
	}

	// Polyfill.io - the steps below are handled by the native
	// Array.prototype.sort method that we call.
	// 2.Let obj be ? ToObject(this value).
	// 3.Let len be ? LengthOfArrayLike(obj).

	// if comprateFn does not exist, use the spec defined in-built SortCompare.
	if (compareFn === undefined) {
		origSort.call(this);
	} else {
		// if compareFn exists, sort the array, breaking sorting ties by using the
		// items' original index position.

		var index;

		// Keep track of the items starting index position.
		var that = [];
		for (index = 0; index < this.length; index++) {
			if (index in this) {
				that.push({ item: this[index], index: index });
			}
		}
		origSort.call(that, function(a, b) {
			// this implementation is based on https://github.com/zloirock/core-js/blob/master/packages/core-js/modules/es.array.sort.js#L69-L76
			if (b.item === undefined) return -1;
			if (a.item === undefined) return 1;
			var compareResult = +(compareFn.call(undefined, a.item, b.item)) || 0;
			return compareResult === 0 ? a.index - b.index : compareResult;
		});
		// update the original object (`this`) with the new position for the items
		// which were moved.
		index = 0;
		while (index < that.length) {
			if (that[index]) {
				this[index] = that[index].item;
			}
			index++;
		}
		while (index < this.length) {
			delete this[index++];
		}
	}

	return this;
});
