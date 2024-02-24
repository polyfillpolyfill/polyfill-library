/* global CodePointAt, CreateMethodProperty, RequireObjectCoercible, ToIntegerOrInfinity, ToString */
// 21.1.3.3. String.prototype.codePointAt ( pos )
CreateMethodProperty(
	String.prototype,
	"codePointAt",
	function codePointAt(pos) {
		// 1. Let O be ? RequireObjectCoercible(this value).
		var O = RequireObjectCoercible(this);
		// 2. Let S be ? ToString(O).
		var S = ToString(O);
		// 3. Let position be ? ToIntegerOrInfinity(pos).
		var position = ToIntegerOrInfinity(pos);
		// 4. Let size be the length of S.
		var size = S.length;
		// 5. If position < 0 or position ≥ size, return undefined.
		if (position < 0 || position >= size) {
			return undefined;
		}
		// 6. Let cp be CodePointAt(S, position).
		var cp = CodePointAt(S, position);
		// 7. Return 𝔽(cp.[[CodePoint]]).
		return cp["[[CodePoint]]"];
	}
);
