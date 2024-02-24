/* global CodePointAt, CreateMethodProperty, RequireObjectCoercible, ToString, UTF16EncodeCodePoint */

// 22.1.3.31 String.prototype.toWellFormed ( )
CreateMethodProperty(String.prototype, "toWellFormed", function toWellFormed() {
	// 1. Let O be ? RequireObjectCoercible(this value).
	var O = RequireObjectCoercible(this);
	// 2. Let S be ? ToString(O).
	var S = ToString(O);
	// 3. Let strLen be the length of S.
	var strLen = S.length;
	// 4. Let k be 0.
	var k = 0;
	// 5. Let result be the empty String.
	var result = "";
	// 6. Repeat, while k < strLen,
	while (k < strLen) {
		// a. Let cp be CodePointAt(S, k).
		var cp = CodePointAt(S, k);
		// b. If cp.[[IsUnpairedSurrogate]] is true, then
		if (cp["[[IsUnpairedSurrogate]]"] === true) {
			// i. Set result to the string-concatenation of result and 0xFFFD (REPLACEMENT CHARACTER).
			result = result + "\uFFFD";
		}
		// c. Else,
		else {
			// i. Set result to the string-concatenation of result and UTF16EncodeCodePoint(cp.[[CodePoint]]).
			result = result + UTF16EncodeCodePoint(cp["[[CodePoint]]"]);
		}
		// d. Set k to k + cp.[[CodeUnitCount]].
		k = k + cp["[[CodeUnitCount]]"];
	}
	// 7. Return result.
	return result;
});
