/* global CreateMethodProperty, Get, ToString, TypedArrayCreateSameType */
// 23.2.3.32 %TypedArray%.prototype.toReversed ( )
(function () {
	function toReversed() {
		// 1. Let O be the this value.
		var O = this;
		// 2. Perform ? ValidateTypedArray(O).
		// TODO: Add ValidateTypedArray
		// 3. Let length be O.[[ArrayLength]].
		var length = O.length;
		// 4. Let A be ? TypedArrayCreateSameType(O, « 𝔽(length) »).
		var A = TypedArrayCreateSameType(O, [ length ]);
		// 5. Let k be 0.
		var k = 0;
		// 6. Repeat, while k < length,
		while (k < length) {
			// a. Let from be ! ToString(𝔽(length - k - 1)).
			var from = ToString(length - k - 1);
			// b. Let Pk be ! ToString(𝔽(k)).
			var Pk = ToString(k);
			// c. Let fromValue be ! Get(O, from).
			var fromValue = Get(O, from);
			// d. Perform ! Set(A, Pk, fromValue, true).
			A[Pk] = fromValue;
			// e. Set k to k + 1.
			k = k + 1;
		}
		// 7. Return A.
		return A;
	}

	// in IE11, `Int8Array.prototype` inherits directly from `Object.prototype`
	// in that case, don't define it on the parent; define it directly on the prototype
	if ('__proto__' in self.Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		// set this on the underlying "TypedArrayPrototype", which is shared with all "TypedArray" subclasses
		CreateMethodProperty(self.Int8Array.prototype.__proto__, 'toReversed', toReversed);
	} else {
		CreateMethodProperty(self.Int8Array.prototype, 'toReversed', toReversed);
		CreateMethodProperty(self.Uint8Array.prototype, 'toReversed', toReversed);
		CreateMethodProperty(self.Uint8ClampedArray.prototype, 'toReversed', toReversed);
		CreateMethodProperty(self.Int16Array.prototype, 'toReversed', toReversed);
		CreateMethodProperty(self.Uint16Array.prototype, 'toReversed', toReversed);
		CreateMethodProperty(self.Int32Array.prototype, 'toReversed', toReversed);
		CreateMethodProperty(self.Uint32Array.prototype, 'toReversed', toReversed);
		CreateMethodProperty(self.Float32Array.prototype, 'toReversed', toReversed);
		CreateMethodProperty(self.Float64Array.prototype, 'toReversed', toReversed);
	}
})();
