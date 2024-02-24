/* global CreateMethodProperty, IsInteger, ToNumber, UTF16EncodeCodePoint */

// 21.1.2.2. String.fromCodePoint ( ...codePoints )
CreateMethodProperty(String, "fromCodePoint", function fromCodePoint(_) {
	// 1. Let result be the empty String.
	var result = "";
	// 2. For each element next of codePoints, do
	var codePoints = arguments;
	for (var i = 0; i < codePoints.length; i++) {
		var next = codePoints[i];
		// a. Let nextCP be ? ToNumber(next).
		var nextCP = ToNumber(next);
		// b. If IsIntegralNumber(nextCP) is false, throw a RangeError exception.
		if (IsInteger(nextCP) === false) {
			throw new RangeError(
				"Invalid code point " + Object.prototype.toString.call(nextCP)
			);
		}
		// c. If ℝ(nextCP) < 0 or ℝ(nextCP) > 0x10FFFF, throw a RangeError exception.
		if (nextCP < 0 || nextCP > 0x10ffff) {
			throw new RangeError(
				"Invalid code point " + Object.prototype.toString.call(nextCP)
			);
		}
		// d. Set result to the string-concatenation of result and UTF16EncodeCodePoint(ℝ(nextCP)).
		result = result + UTF16EncodeCodePoint(nextCP);
	}
	// 3. Assert: If codePoints is empty, then result is the empty String.
	// 4. Return result.
	return result;
});
