// 11.1.3 Static Semantics: UTF16SurrogatePairToCodePoint ( lead, trail )
// eslint-disable-next-line no-unused-vars
function UTF16SurrogatePairToCodePoint(lead, trail) {
	// 1. Assert: lead is a leading surrogate and trail is a trailing surrogate.
	// 2. Let cp be (lead - 0xD800) × 0x400 + (trail - 0xDC00) + 0x10000.
	var cp = (lead - 0xd800) * 0x400 + (trail - 0xdc00) + 0x10000;
	// 3. Return the code point cp.
	return cp;
}
