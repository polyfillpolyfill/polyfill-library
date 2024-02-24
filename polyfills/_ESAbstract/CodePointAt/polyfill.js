/* global UTF16SurrogatePairToCodePoint */
// 11.1.4 Static Semantics: CodePointAt ( string, position )
// eslint-disable-next-line no-unused-vars
function CodePointAt(string, position) {
	// 1. Let size be the length of string.
	var size = string.length;
	// 2. Assert: position ≥ 0 and position < size.
	// 3. Let first be the code unit at index position within string.
	var first = String.prototype.charCodeAt.call(string, position);
	// 4. Let cp be the code point whose numeric value is the numeric value of first.
	var cp = first;

	var firstIsLeading = first >= 0xd800 && first <= 0xdbff;
	var firstIsTrailing = first >= 0xdc00 && first <= 0xdfff;

	// 5. If first is neither a leading surrogate nor a trailing surrogate, then
	if (!firstIsLeading && !firstIsTrailing) {
		// a. Return the Record { [[CodePoint]]: cp, [[CodeUnitCount]]: 1, [[IsUnpairedSurrogate]]: false }.
		return {
			"[[CodePoint]]": cp,
			"[[CodeUnitCount]]": 1,
			"[[IsUnpairedSurrogate]]": false
		};
	}
	// 6. If first is a trailing surrogate or position + 1 = size, then
	if (firstIsTrailing || position + 1 === size) {
		// a. Return the Record { [[CodePoint]]: cp, [[CodeUnitCount]]: 1, [[IsUnpairedSurrogate]]: true }.
		return {
			"[[CodePoint]]": cp,
			"[[CodeUnitCount]]": 1,
			"[[IsUnpairedSurrogate]]": true
		};
	}
	// 7. Let second be the code unit at index position + 1 within string.
	var second = String.prototype.charCodeAt.call(string, position + 1);

	var secondIsTrailing = second >= 0xdc00 && second <= 0xdfff;

	// 8. If second is not a trailing surrogate, then
	if (!secondIsTrailing) {
		// a. Return the Record { [[CodePoint]]: cp, [[CodeUnitCount]]: 1, [[IsUnpairedSurrogate]]: true }.
		return {
			"[[CodePoint]]": cp,
			"[[CodeUnitCount]]": 1,
			"[[IsUnpairedSurrogate]]": true
		};
	}
	// 9. Set cp to UTF16SurrogatePairToCodePoint(first, second).
	cp = UTF16SurrogatePairToCodePoint(first, second);
	// 10. Return the Record { [[CodePoint]]: cp, [[CodeUnitCount]]: 2, [[IsUnpairedSurrogate]]: false }.
	return {
		"[[CodePoint]]": cp,
		"[[CodeUnitCount]]": 2,
		"[[IsUnpairedSurrogate]]": false
	};
}
