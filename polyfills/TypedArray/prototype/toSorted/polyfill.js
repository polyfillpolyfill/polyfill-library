/* global CreateMethodProperty, IsCallable, TypedArrayCreateSameType */
// 23.2.3.33 %TypedArray%.prototype.toSorted ( comparefn )
(function () {
	function toSorted(comparefn) {
		// 1. If comparefn is not undefined and IsCallable(comparefn) is false, throw a TypeError exception.
		if (comparefn !== undefined && IsCallable(comparefn) === false) {
			throw new TypeError(
				"The comparison function must be either a function or undefined"
			);
		}
		// 2. Let O be the this value.
		var O = this;
		// 3. Perform ? ValidateTypedArray(O).
		// TODO: Add ValidateTypedArray
		// 4. Let len be O.[[ArrayLength]].
		var len = O.length;
		// 5. Let A be ? TypedArrayCreateSameType(O, « 𝔽(len) »).
		var A = TypedArrayCreateSameType(O, [ len ]);

		// 9. Let j be 0.
		var j = 0;
		// 10. Repeat, while j < len,
		while (j < len) {
			// a. Perform ! Set(A, ! ToString(𝔽(j)), sortedList[j], true).
			A[j] = O[j];
			// b. Set j to j + 1.
			j = j + 1;
		}

		// Polyfill.io - These steps are handled by native `%TypedArray%.prototype.sort`, below
		// 6. NOTE: The following closure performs a numeric comparison rather than the string comparison used in 23.1.3.34.
		// 7. Let SortCompare be a new Abstract Closure with parameters (x, y) that captures comparefn and performs the following steps when called:
		// a. Return ? CompareTypedArrayElements(x, y, comparefn).
		// 8. Let sortedList be ? SortIndexedProperties(O, len, SortCompare, read-through-holes).
		comparefn !== undefined ? A.sort(comparefn) : A.sort();

		// 11. Return A.
		return A;
	}

	// in IE11, `Int8Array.prototype` inherits directly from `Object.prototype`
	// in that case, don't define it on the parent; define it directly on the prototype
	if ('__proto__' in self.Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		// set this on the underlying "TypedArrayPrototype", which is shared with all "TypedArray" subclasses
		CreateMethodProperty(self.Int8Array.prototype.__proto__, 'toSorted', toSorted);
	} else {
		CreateMethodProperty(self.Int8Array.prototype, 'toSorted', toSorted);
		CreateMethodProperty(self.Uint8Array.prototype, 'toSorted', toSorted);
		CreateMethodProperty(self.Uint8ClampedArray.prototype, 'toSorted', toSorted);
		CreateMethodProperty(self.Int16Array.prototype, 'toSorted', toSorted);
		CreateMethodProperty(self.Uint16Array.prototype, 'toSorted', toSorted);
		CreateMethodProperty(self.Int32Array.prototype, 'toSorted', toSorted);
		CreateMethodProperty(self.Uint32Array.prototype, 'toSorted', toSorted);
		CreateMethodProperty(self.Float32Array.prototype, 'toSorted', toSorted);
		CreateMethodProperty(self.Float64Array.prototype, 'toSorted', toSorted);
	}
})();
