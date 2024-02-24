/* global ArrayCreate, CreateDataPropertyOrThrow, CreateMethodProperty, Get, LengthOfArrayLike, ToIntegerOrInfinity, ToObject, ToString */
// 23.1.3.35 Array.prototype.toSpliced ( start, skipCount, ...items )
CreateMethodProperty(Array.prototype, 'toSpliced', function toSpliced(start, skipCount) {
	// 1. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// 2. Let len be ? LengthOfArrayLike(O).
	var len = LengthOfArrayLike(O);
	// 3. Let relativeStart be ? ToIntegerOrInfinity(start).
	var relativeStart = ToIntegerOrInfinity(start);

	var actualStart;
	// 4. If relativeStart is -∞, let actualStart be 0.
	if (relativeStart === -Infinity) {
		actualStart = 0
	}
	// 5. Else if relativeStart < 0, let actualStart be max(len + relativeStart, 0).
	else if (relativeStart < 0) {
		actualStart = Math.max(len + relativeStart, 0);
	}
	// 6. Else, let actualStart be min(relativeStart, len).
	else {
		actualStart = Math.min(relativeStart, len);
	}

	// 7. Let insertCount be the number of elements in items.
	var items = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : [];
	var insertCount = items.length;

	var actualSkipCount;
	// 8. If start is not present, then
	if (arguments.length === 0) {
		// a. Let actualSkipCount be 0.
		actualSkipCount = 0;
	}
	// 9. Else if skipCount is not present, then
	else if (arguments.length === 1) {
		// a. Let actualSkipCount be len - actualStart.
		actualSkipCount = len - actualStart;
	}
	// 10. Else,
	else {
		// a. Let sc be ? ToIntegerOrInfinity(skipCount).
		var sc = ToIntegerOrInfinity(skipCount);
		// b. Let actualSkipCount be the result of clamping sc between 0 and len - actualStart.
		actualSkipCount = Math.min(Math.max(0, sc), len - actualStart);
	}

	// 11. Let newLen be len + insertCount - actualSkipCount.
	var newLen = len + insertCount - actualSkipCount;
	// 12. If newLen > 253 - 1, throw a TypeError exception.
	if (newLen > Number.MAX_SAFE_INTEGER) {
		throw new TypeError('Length exceeded the maximum array length');
	}
	// 13. Let A be ? ArrayCreate(newLen).
	var A = ArrayCreate(newLen);
	// 14. Let i be 0.
	var i = 0;
	// 15. Let r be actualStart + actualSkipCount.
	var r = actualStart + actualSkipCount;
	// 16. Repeat, while i < actualStart,
	while (i < actualStart) {
		// a. Let Pi be ! ToString(𝔽(i)).
		var Pi = ToString(i);
		// b. Let iValue be ? Get(O, Pi).
		var iValue = Get(O, Pi);
		// c. Perform ! CreateDataPropertyOrThrow(A, Pi, iValue).
		CreateDataPropertyOrThrow(A, Pi, iValue);
		// d. Set i to i + 1.
		i = i + 1;
	}
	// 17. For each element E of items, do
	items.forEach(function (E) {
		var Pi = ToString(i);
		CreateDataPropertyOrThrow(A, Pi, E);
		i = i + 1;
	});
	// 18. Repeat, while i < newLen,
	while (i < newLen) {
		// a. Let Pi be ! ToString(𝔽(i)).
		var Pi2 = ToString(i);
		// b. Let from be ! ToString(𝔽(r)).
		var from = ToString(r);
		// c. Let fromValue be ? Get(O, from).
		var fromValue = Get(O, from);
		// d. Perform ! CreateDataPropertyOrThrow(A, Pi, fromValue).
		CreateDataPropertyOrThrow(A, Pi2, fromValue);
		// e. Set i to i + 1.
		i = i + 1;
		// f. Set r to r + 1.
		r = r + 1;
	}
	// 19. Return A.
	return A;
});
