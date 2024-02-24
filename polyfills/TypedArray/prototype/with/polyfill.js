/* global CreateMethodProperty, Get, IsValidIntegerIndex, ToIntegerOrInfinity, ToNumber, ToString, TypedArrayCreateSameType */
// 23.2.3.36 %TypedArray%.prototype.with ( index, value )
(function () {
	function With(index, value) {
		// 1. Let O be the this value.
		var O = this;
		// 2. Perform ? ValidateTypedArray(O).
		// TODO: Add ValidateTypedArray
		// 3. Let len be O.[[ArrayLength]].
		var len = O.length;
		// 4. Let relativeIndex be ? ToIntegerOrInfinity(index).
		var relativeIndex = ToIntegerOrInfinity(index);
		// 5. If relativeIndex ≥ 0, let actualIndex be relativeIndex.
		// 6. Else, let actualIndex be len + relativeIndex.
		var actualIndex = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
		// 7. If O.[[ContentType]] is BigInt, let numericValue be ? ToBigInt(value).
		// TODO: Add BigInt support
		// 8. Else, let numericValue be ? ToNumber(value).
		var numericValue = ToNumber(value);
		// 9. If IsValidIntegerIndex(O, 𝔽(actualIndex)) is false, throw a RangeError exception.
		if (IsValidIntegerIndex(O, actualIndex) === false) {
			throw new RangeError('Invalid index');
		}
		// 10. Let A be ? TypedArrayCreateSameType(O, « 𝔽(len) »).
		var A = TypedArrayCreateSameType(O, [ len ]);
		// 11. Let k be 0.
		var k = 0;
		// 12. Repeat, while k < len,
		while (k < len) {
			// a. Let Pk be ! ToString(𝔽(k)).
			var Pk = ToString(k);
			// b. If k is actualIndex, let fromValue be numericValue.
			// c. Else, let fromValue be ! Get(O, Pk).
			var fromValue = k === actualIndex ? numericValue : Get(O, Pk);
			// d. Perform ! Set(A, Pk, fromValue, true).
			A[Pk] = fromValue;
			// e. Set k to k + 1.
			k = k + 1;
		}
		// 13. Return A.
		return A;
	}

	var supportsDefiningFunctionName = (function () {
		var fn = function () {};
		try {
			Object.defineProperty(fn, 'name', {
				value: 'test'
			});
			return true;
		} catch (ignore) {
			return false;
		}
	})();

	if (supportsDefiningFunctionName) {
		Object.defineProperty(With, 'name', {
			value: 'with',
			writable: false,
			enumerable: false,
			configurable: true
		})
	}

	// in IE11, `Int8Array.prototype` inherits directly from `Object.prototype`
	// in that case, don't define it on the parent; define it directly on the prototype
	if ('__proto__' in self.Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		// set this on the underlying "TypedArrayPrototype", which is shared with all "TypedArray" subclasses
		CreateMethodProperty(self.Int8Array.prototype.__proto__, 'with', With);
	} else {
		CreateMethodProperty(self.Int8Array.prototype, 'with', With);
		CreateMethodProperty(self.Uint8Array.prototype, 'with', With);
		CreateMethodProperty(self.Uint8ClampedArray.prototype, 'with', With);
		CreateMethodProperty(self.Int16Array.prototype, 'with', With);
		CreateMethodProperty(self.Uint16Array.prototype, 'with', With);
		CreateMethodProperty(self.Int32Array.prototype, 'with', With);
		CreateMethodProperty(self.Uint32Array.prototype, 'with', With);
		CreateMethodProperty(self.Float32Array.prototype, 'with', With);
		CreateMethodProperty(self.Float64Array.prototype, 'with', With);
	}
})();
