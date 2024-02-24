/* global CreateMethodProperty, IsCallable */
// 23.2.3.29 %TypedArray%.prototype.sort ( comparefn )
(function () {
	function sort(comparefn) {
		// 1. If comparefn is not undefined and IsCallable(comparefn) is false, throw a TypeError exception.
		if (comparefn !== undefined && IsCallable(comparefn) === false) {
			throw new TypeError(
				"The comparison function must be either a function or undefined"
			);
		}
		// 2. Let obj be the this value.
		var obj = this;
		// 3. Perform ? ValidateTypedArray(obj).
		// TODO: Add ValidateTypedArray
		// 4. Let len be obj.[[ArrayLength]].
		var len = obj.length;

		// Polyfill.io - This is based on https://github.com/inexorabletash/polyfill/blob/716a3f36ca10fad032083014faf1a47c638e2502/typedarray.js#L848-L858
		// 5. NOTE: The following closure performs a numeric comparison rather than the string comparison used in 23.1.3.30.
		// 6. Let SortCompare be a new Abstract Closure with parameters (x, y) that captures comparefn and performs the following steps when called:
		// a. Return ? CompareTypedArrayElements(x, y, comparefn).
		function sortCompare(x, y) {
			if (x !== x && y !== y) return +0;
			if (x !== x) return 1;
			if (y !== y) return -1;
			if (comparefn !== undefined) {
				return comparefn(x, y);
			}
			if (x < y) return -1;
			if (x > y) return 1;
			return +0;
		}

		// 7. Let sortedList be ? SortIndexedProperties(obj, len, SortCompare, read-through-holes).
		var sortedList = Array(len);
		for (var i = 0; i < len; i++) sortedList[i] = obj[i];
		sortedList.sort(sortCompare);

		// 8. Let j be 0.
		var j = 0;
		// 9. Repeat, while j < len,
		while (j < len) {
			// a. Perform ! Set(obj, ! ToString(𝔽(j)), sortedList[j], true).
			obj[j] = sortedList[j];
			// b. Set j to j + 1.
			j = j + 1;
		}

		// 10. Return obj.
		return obj;
	}

	// in IE11, `Int8Array.prototype` inherits directly from `Object.prototype`
	// in that case, don't define it on the parent; define it directly on the prototype
	if ('__proto__' in self.Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		// set this on the underlying "TypedArrayPrototype", which is shared with all "TypedArray" subclasses
		CreateMethodProperty(self.Int8Array.prototype.__proto__, 'sort', sort);
	} else {
		CreateMethodProperty(self.Int8Array.prototype, 'sort', sort);
		CreateMethodProperty(self.Uint8Array.prototype, 'sort', sort);
		CreateMethodProperty(self.Uint8ClampedArray.prototype, 'sort', sort);
		CreateMethodProperty(self.Int16Array.prototype, 'sort', sort);
		CreateMethodProperty(self.Uint16Array.prototype, 'sort', sort);
		CreateMethodProperty(self.Int32Array.prototype, 'sort', sort);
		CreateMethodProperty(self.Uint32Array.prototype, 'sort', sort);
		CreateMethodProperty(self.Float32Array.prototype, 'sort', sort);
		CreateMethodProperty(self.Float64Array.prototype, 'sort', sort);
	}
})();
