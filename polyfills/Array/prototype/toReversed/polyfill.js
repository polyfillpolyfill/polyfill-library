/* global ArrayCreate, CreateDataPropertyOrThrow, CreateMethodProperty, Get, LengthOfArrayLike, ToObject, ToString */
// 23.1.3.33 Array.prototype.toReversed ( )
CreateMethodProperty(Array.prototype, 'toReversed', function toReversed() {
	// 1. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// 2. Let len be ? LengthOfArrayLike(O).
	var len = LengthOfArrayLike(O);
	// 3. Let A be ? ArrayCreate(len).
	var A = ArrayCreate(len);
	// 4. Let k be 0.
	var k = 0;
	// 5. Repeat, while k < len,
	while (k < len) {
		// a. Let from be ! ToString(𝔽(len - k - 1)).
		var from = ToString(len - k - 1);
		// b. Let Pk be ! ToString(𝔽(k)).
		var Pk = ToString(k);
		// c. Let fromValue be ? Get(O, from).
		var fromValue = Get(O, from);
		// d. Perform ! CreateDataPropertyOrThrow(A, Pk, fromValue).
		CreateDataPropertyOrThrow(A, Pk, fromValue);
		// e. Set k to k + 1.
		k = k + 1;
	}
	// 6. Return A.
	return A;
});
