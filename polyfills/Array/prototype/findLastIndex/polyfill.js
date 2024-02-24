/* global Call, CreateMethodProperty, Get, IsCallable, LengthOfArrayLike, ToBoolean, ToObject, ToString */
// 23.1.3.12 Array.prototype.findLastIndex ( predicate [ , thisArg ] )
CreateMethodProperty(Array.prototype, 'findLastIndex', function findLastIndex(predicate /*[ , thisArg ]*/) {
	// 1. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// 2. Let len be ? LengthOfArrayLike(O).
	var len = LengthOfArrayLike(O);
	// 3. If IsCallable(predicate) is false, throw a TypeError exception.
	if (!IsCallable(predicate)) throw TypeError();
	// 4. Let k be len - 1.
	var k = len - 1;
	// 5. Repeat, while k ≥ 0,
	while (k >= 0) {
		// a. Let Pk be ! ToString(𝔽(k)).
		var Pk = ToString(k);
		// b. Let kValue be ? Get(O, Pk).
		var kValue = Get(O, Pk);
		// c. Let testResult be ToBoolean(? Call(predicate, thisArg, « kValue, 𝔽(k), O »)).
		var testResult = ToBoolean(Call(predicate, arguments.length > 1 ? arguments[1] : undefined, [kValue, k, O]))
		// d. If testResult is true, return 𝔽(k).
		if (testResult) {
			return k;
		}
		// e. Set k to k - 1.
		k = k - 1;
	}
	// 6. Return -1𝔽.
	return -1;
});
