// 11.1.1 Static Semantics: UTF16EncodeCodePoint ( cp )
// eslint-disable-next-line no-unused-vars
function UTF16EncodeCodePoint(cp) {
	// 1. Assert: 0 ≤ cp ≤ 0x10FFFF.
	// 2. If cp ≤ 0xFFFF, return the String value consisting of the code unit whose numeric value is cp.
	if (cp <= 0xffff) {
		return String.fromCharCode(cp);
	}
	// 3. Let cu1 be the code unit whose numeric value is floor((cp - 0x10000) / 0x400) + 0xD800.
	var cu1 = String.fromCharCode(Math.floor((cp - 0x10000) / 0x400) + 0xd800);
	// 4. Let cu2 be the code unit whose numeric value is ((cp - 0x10000) modulo 0x400) + 0xDC00.
	var cu2 = String.fromCharCode(((cp - 0x10000) % 0x400) + 0xdc00);
	// 5. Return the string-concatenation of cu1 and cu2.
	return cu1 + cu2;
}
