/* global CreateMethodProperty, Get, ToIntegerOrInfinity, ToString */
// 23.2.3.1. %TypedArray%.prototype.at ( index )
(function () {
	function at(index) {
		// 1. Let O be the this value.
		var O = this;
		// 2. Perform ? ValidateTypedArray(O).
		// TODO: Add ValidateTypedArray
		// 3. Let len be O.[[ArrayLength]].
		var len = O.length;
		// 4. Let relativeIndex be ? ToIntegerOrInfinity(index).
		var relativeIndex = ToIntegerOrInfinity(index);
		// 5. If relativeIndex ≥ 0, then
		// 5.a. Let k be relativeIndex.
		// 6. Else,
		// 6.a. Let k be len + relativeIndex.
		var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
		// 7. If k < 0 or k ≥ len, return undefined.
		if (k < 0 || k >= len) return undefined;
		// 8. Return ! Get(O, ! ToString(𝔽(k))).
		return Get(O, ToString(k));
	}

	// in IE11, `Int8Array.prototype` inherits directly from `Object.prototype`
	// in that case, don't define it on the parent; define it directly on the prototype
	if ('__proto__' in self.Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		// set this on the underlying "TypedArrayPrototype", which is shared with all "TypedArray" subclasses
		CreateMethodProperty(self.Int8Array.prototype.__proto__, 'at', at);
	} else {
		CreateMethodProperty(self.Int8Array.prototype, 'at', at);
		CreateMethodProperty(self.Uint8Array.prototype, 'at', at);
		CreateMethodProperty(self.Uint8ClampedArray.prototype, 'at', at);
		CreateMethodProperty(self.Int16Array.prototype, 'at', at);
		CreateMethodProperty(self.Uint16Array.prototype, 'at', at);
		CreateMethodProperty(self.Int32Array.prototype, 'at', at);
		CreateMethodProperty(self.Uint32Array.prototype, 'at', at);
		CreateMethodProperty(self.Float32Array.prototype, 'at', at);
		CreateMethodProperty(self.Float64Array.prototype, 'at', at);
	}
})();
