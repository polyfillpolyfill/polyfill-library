// use "Int8Array" as a proxy for support of "TypedArray" subclasses
'Symbol' in self && 'toStringTag' in self.Symbol && 'Int8Array' in self && Object.getOwnPropertyDescriptor(('__proto__' in self.Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype && self.Int8Array.prototype.__proto__) || self.Int8Array.prototype, self.Symbol.toStringTag)
