/* global CodePointAt */

// 22.2.5.2.3 AdvanceStringIndex ( S, index, unicode )
// eslint-disable-next-line no-unused-vars
function AdvanceStringIndex(S, index, unicode) {
	// 1. Assert: index ≤ 253 - 1.
	// 2. If unicode is false, return index + 1.
	if (unicode === false) {
		return index + 1;
	}
	// 3. Let length be the length of S.
	var length = S.length;
	// 4. If index + 1 ≥ length, return index + 1.
	if (index + 1 >= length) {
		return index + 1;
	}
	// 5. Let cp be CodePointAt(S, index).
	var cp = CodePointAt(S, index);
	// 6. Return index + cp.[[CodeUnitCount]].
	return index + cp["[[CodeUnitCount]]"];
}
