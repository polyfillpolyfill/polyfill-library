/* global CreateMethodProperty, ArrayIterator */
// 23.2.3.7 %TypedArray%.prototype.entries ( )
(function () {
	function entries() {
		// 1. Let O be the this value.
		var O = this;
		// 2. Perform ? ValidateTypedArray(O).
		// TODO: Add ValidateTypedArray
		// 3. Return CreateArrayIterator(O, key).
		// TODO: Add CreateArrayIterator
		return new ArrayIterator(O, 'key+value');
	}

	// use "Int8Array" as a proxy for support of "TypedArray" subclasses
	var fnName = 'entries'
	// in IE11, `Int8Array.prototype` inherits directly from `Object.prototype`
	// in that case, don't define it on the parent; define it directly on the prototype
	if ('__proto__' in self.Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		// set this on the underlying "TypedArrayPrototype", which is shared with all "TypedArray" subclasses
		CreateMethodProperty(self.Int8Array.prototype.__proto__, fnName, entries);
	} else {
		CreateMethodProperty(self.Int8Array.prototype, fnName, entries);
		CreateMethodProperty(self.Uint8Array.prototype, fnName, entries);
		CreateMethodProperty(self.Uint8ClampedArray.prototype, fnName, entries);
		CreateMethodProperty(self.Int16Array.prototype, fnName, entries);
		CreateMethodProperty(self.Uint16Array.prototype, fnName, entries);
		CreateMethodProperty(self.Int32Array.prototype, fnName, entries);
		CreateMethodProperty(self.Uint32Array.prototype, fnName, entries);
		CreateMethodProperty(self.Float32Array.prototype, fnName, entries);
		CreateMethodProperty(self.Float64Array.prototype, fnName, entries);
	}
})();
