/* global Symbol, CreateMethodProperty */
// 23.2.3.34 %TypedArray%.prototype [ @@iterator ] ( )
// The initial value of the @@iterator property is %TypedArray.prototype.values%

// in IE11, `Int8Array.prototype` inherits directly from `Object.prototype`
// in that case, don't define it on the parent; define it directly on the prototype
if ('__proto__' in self.Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
	// set this on the underlying "TypedArrayPrototype", which is shared with all "TypedArray" subclasses
	CreateMethodProperty(self.Int8Array.prototype.__proto__, Symbol.iterator, self.Int8Array.prototype.__proto__.values);
} else {
	CreateMethodProperty(self.Int8Array.prototype, Symbol.iterator, self.Int8Array.prototype.values);
	CreateMethodProperty(self.Uint8Array.prototype, Symbol.iterator, self.Uint8Array.prototype.values);
	CreateMethodProperty(self.Uint8ClampedArray.prototype, Symbol.iterator, self.Uint8ClampedArray.prototype.values);
	CreateMethodProperty(self.Int16Array.prototype, Symbol.iterator, self.Int16Array.prototype.values);
	CreateMethodProperty(self.Uint16Array.prototype, Symbol.iterator, self.Uint16Array.prototype.values);
	CreateMethodProperty(self.Int32Array.prototype, Symbol.iterator, self.Int32Array.prototype.values);
	CreateMethodProperty(self.Uint32Array.prototype, Symbol.iterator, self.Uint32Array.prototype.values);
	CreateMethodProperty(self.Float32Array.prototype, Symbol.iterator, self.Float32Array.prototype.values);
	CreateMethodProperty(self.Float64Array.prototype, Symbol.iterator, self.Float64Array.prototype.values);
}
