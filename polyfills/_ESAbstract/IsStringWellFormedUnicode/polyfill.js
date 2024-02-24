/* global CodePointAt */
// 7.2.9 Static Semantics: IsStringWellFormedUnicode ( string )
// eslint-disable-next-line no-unused-vars
function IsStringWellFormedUnicode(string) {
	// 1. Let len be the length of string.
	var len = string.length;
	// 2. Let k be 0.
	var k = 0;
	// 3. Repeat, while k < len,
	while (k < len) {
		// a. Let cp be CodePointAt(string, k).
		var cp = CodePointAt(string, k);
		// b. If cp.[[IsUnpairedSurrogate]] is true, return false.
		if (cp["[[IsUnpairedSurrogate]]"] === true) {
			return false;
		}
		// c. Set k to k + cp.[[CodeUnitCount]].
		k = k + cp["[[CodeUnitCount]]"];
	}
	// 4. Return true.
	return true;
}
