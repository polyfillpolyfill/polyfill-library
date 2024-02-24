/* global ArrayCreate, CreateDataPropertyOrThrow, CreateMethodProperty, Get, LengthOfArrayLike, ToIntegerOrInfinity, ToObject, ToString */
// 23.1.3.39 Array.prototype.with ( index, value )
CreateMethodProperty(Array.prototype, 'with', function With(index, value) {
	// 1. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// 2. Let len be ? LengthOfArrayLike(O).
	var len = LengthOfArrayLike(O);
	// 3. Let relativeIndex be ? ToIntegerOrInfinity(index).
	var relativeIndex = ToIntegerOrInfinity(index);
	// 4. If relativeIndex ≥ 0, let actualIndex be relativeIndex.
	// 5. Else, let actualIndex be len + relativeIndex.
	var actualIndex = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
	// 6. If actualIndex ≥ len or actualIndex < 0, throw a RangeError exception.
	if (actualIndex >= len || actualIndex < 0) {
		throw new RangeError('Invalid index');
	}
	// 7. Let A be ? ArrayCreate(len).
	var A = ArrayCreate(len);
	// 8. Let k be 0.
	var k = 0;
	// 9. Repeat, while k < len,
	while (k < len) {
		// a. Let Pk be ! ToString(𝔽(k)).
		var Pk = ToString(k);
		// b. If k is actualIndex, let fromValue be value.
		// c. Else, let fromValue be ? Get(O, Pk).
		var fromValue = k === actualIndex ? value : Get(O, Pk);
		// d. Perform ! CreateDataPropertyOrThrow(A, Pk, fromValue).
		CreateDataPropertyOrThrow(A, Pk, fromValue);
		// e. Set k to k + 1.
		k = k + 1;
	}
	// 10. Return A.
	return A;
});

(function () {
	var supportsDefiningFunctionName = (function () {
		var fn = function () {};
		try {
			Object.defineProperty(fn, 'name', {
				value: 'test'
			});
			return true;
		} catch (ignore) {
			return false;
		}
	})();

	if (supportsDefiningFunctionName) {
		Object.defineProperty(Array.prototype.with, 'name', {
			value: 'with',
			writable: false,
			enumerable: false,
			configurable: true
		})
	}
})();
