/* global CreateMethodProperty, IsStringWellFormedUnicode, RequireObjectCoercible, ToString */

// 22.1.3.10 String.prototype.isWellFormed ( )
CreateMethodProperty(String.prototype, "isWellFormed", function isWellFormed() {
	// 1. Let O be ? RequireObjectCoercible(this value).
	var O = RequireObjectCoercible(this);
	// 2. Let S be ? ToString(O).
	var S = ToString(O);
	// 3. Return IsStringWellFormedUnicode(S).
	return IsStringWellFormedUnicode(S);
});
