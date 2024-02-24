/* global CreateMethodProperty */
// 23.2.3.32 %TypedArray%.prototype.toString ( )
// The initial value of the "toString" property is %Array.prototype.toString%

// use "Int8Array" as a proxy for all "TypedArray" subclasses

(function () {
	var fnName = 'toString'
	var fn = Array.prototype.toString

	// in IE11, `Int8Array.prototype` inherits directly from `Object.prototype`
	// in that case, don't define it on the parent; define it directly on the prototype
	if ('__proto__' in self.Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		// set this on the underlying "TypedArrayPrototype", which is shared with all "TypedArray" subclasses
		CreateMethodProperty(self.Int8Array.prototype.__proto__, fnName, fn);
	} else {
		CreateMethodProperty(self.Int8Array.prototype, fnName, fn);
		CreateMethodProperty(self.Uint8Array.prototype, fnName, fn);
		CreateMethodProperty(self.Uint8ClampedArray.prototype, fnName, fn);
		CreateMethodProperty(self.Int16Array.prototype, fnName, fn);
		CreateMethodProperty(self.Uint16Array.prototype, fnName, fn);
		CreateMethodProperty(self.Int32Array.prototype, fnName, fn);
		CreateMethodProperty(self.Uint32Array.prototype, fnName, fn);
		CreateMethodProperty(self.Float32Array.prototype, fnName, fn);
		CreateMethodProperty(self.Float64Array.prototype, fnName, fn);
	}
})();
