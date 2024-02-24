/* global ArrayCreate, CreateDataPropertyOrThrow, CreateMethodProperty, IsCallable, LengthOfArrayLike, ToObject, ToString */
// 23.1.3.34 Array.prototype.toSorted ( comparefn )
CreateMethodProperty(Array.prototype, 'toSorted', function toSorted(comparefn) {
	// 1. If comparefn is not undefined and IsCallable(comparefn) is false, throw a TypeError exception.
	if (comparefn !== undefined && IsCallable(comparefn) === false) {
		throw new TypeError(
			"The comparison function must be either a function or undefined"
		);
	}
	// 2. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// 3. Let len be ? LengthOfArrayLike(O).
	var len = LengthOfArrayLike(O);
	// 4. Let A be ? ArrayCreate(len).
	var A = ArrayCreate(len);

	// 7. Let j be 0.
	var j = 0;
	// 8. Repeat, while j < len,
	while (j < len) {
		// a. Perform ! CreateDataPropertyOrThrow(A, ! ToString(𝔽(j)), sortedList[j]).
		CreateDataPropertyOrThrow(A, ToString(j), O[j]);
		// b. Set j to j + 1.
		j = j + 1;
	}

	// Polyfill.io - These steps are handled by native `Array.prototype.sort`, below
	// 5. Let SortCompare be a new Abstract Closure with parameters (x, y) that captures comparefn and performs the following steps when called:
	// a. Return ? CompareArrayElements(x, y, comparefn).
	// 6. Let sortedList be ? SortIndexedProperties(O, len, SortCompare, read-through-holes).
	comparefn !== undefined ? A.sort(comparefn) : A.sort();

	// 9. Return A.
	return A;
});
