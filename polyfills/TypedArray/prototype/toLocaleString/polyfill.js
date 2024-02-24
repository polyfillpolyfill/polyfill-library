/* global CreateMethodProperty */
// 23.2.3.31 %TypedArray%.prototype.toLocaleString ( [ reserved1 [ , reserved2 ] ] )
(function () {
	var fnName = 'toLocaleString'

	// %TypedArray%.prototype.toLocaleString is a distinct function that implements the same algorithm as Array.prototype.toLocaleString
	function toLocaleString () {
		return Array.prototype.toLocaleString.call(this, arguments);
	}

	// use "Int8Array" as a proxy for all "TypedArray" subclasses

	// in IE11, `Int8Array.prototype` inherits directly from `Object.prototype`
	// in that case, don't define it on the parent; define it directly on the prototype
	if ('__proto__' in self.Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		// set this on the underlying "TypedArrayPrototype", which is shared with all "TypedArray" subclasses
		CreateMethodProperty(self.Int8Array.prototype.__proto__, fnName, toLocaleString);
	} else {
		CreateMethodProperty(self.Int8Array.prototype, fnName, toLocaleString);
		CreateMethodProperty(self.Uint8Array.prototype, fnName, toLocaleString);
		CreateMethodProperty(self.Uint8ClampedArray.prototype, fnName, toLocaleString);
		CreateMethodProperty(self.Int16Array.prototype, fnName, toLocaleString);
		CreateMethodProperty(self.Uint16Array.prototype, fnName, toLocaleString);
		CreateMethodProperty(self.Int32Array.prototype, fnName, toLocaleString);
		CreateMethodProperty(self.Uint32Array.prototype, fnName, toLocaleString);
		CreateMethodProperty(self.Float32Array.prototype, fnName, toLocaleString);
		CreateMethodProperty(self.Float64Array.prototype, fnName, toLocaleString);
	}
})();
