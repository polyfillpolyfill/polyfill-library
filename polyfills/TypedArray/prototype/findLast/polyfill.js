/* global Call, CreateMethodProperty, Get, IsCallable, ToBoolean, ToString */
// 23.2.3.13 %TypedArray%.prototype.findLast ( predicate [ , thisArg ] )
(function () {
	function findLast(predicate /*[ , thisArg ]*/) {
		// 1. Let O be the this value.
		var O = this;
		// 2. Perform ? ValidateTypedArray(O).
		// TODO: Add ValidateTypedArray
		// 3. Let len be O.[[ArrayLength]].
		var len = O.length;
		// 4. If IsCallable(predicate) is false, throw a TypeError exception.
		if (!IsCallable(predicate)) throw TypeError();
		// 5. Let k be len - 1.
		var k = len - 1;
		// 6. Repeat, while k ≥ 0,
		while (k >= 0) {
			// a. Let Pk be ! ToString(𝔽(k)).
			var Pk = ToString(k);
			// b. Let kValue be ! Get(O, Pk).
			var kValue = Get(O, Pk);
			// c. Let testResult be ToBoolean(? Call(predicate, thisArg, « kValue, 𝔽(k), O »)).
			var testResult = ToBoolean(Call(predicate, arguments.length > 1 ? arguments[1] : undefined, [kValue, k, O]))
			// d. If testResult is true, return kValue.
			if (testResult) {
				return kValue;
			}
			// e. Set k to k - 1.
			k = k - 1;
		}
		// 7. Return undefined.
		return undefined;
	}

	var fnName = 'findLast'
	// in IE11, `Int8Array.prototype` inherits directly from `Object.prototype`
	// in that case, don't define it on the parent; define it directly on the prototype
	if ('__proto__' in self.Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		// set this on the underlying "TypedArrayPrototype", which is shared with all "TypedArray" subclasses
		CreateMethodProperty(self.Int8Array.prototype.__proto__, fnName, findLast);
	} else {
		CreateMethodProperty(self.Int8Array.prototype, fnName, findLast);
		CreateMethodProperty(self.Uint8Array.prototype, fnName, findLast);
		CreateMethodProperty(self.Uint8ClampedArray.prototype, fnName, findLast);
		CreateMethodProperty(self.Int16Array.prototype, fnName, findLast);
		CreateMethodProperty(self.Uint16Array.prototype, fnName, findLast);
		CreateMethodProperty(self.Int32Array.prototype, fnName, findLast);
		CreateMethodProperty(self.Uint32Array.prototype, fnName, findLast);
		CreateMethodProperty(self.Float32Array.prototype, fnName, findLast);
		CreateMethodProperty(self.Float64Array.prototype, fnName, findLast);
	}
})();
