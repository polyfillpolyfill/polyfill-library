// use "Int8Array" as a proxy for support of "TypedArray" subclasses
'Symbol' in self && 'iterator' in self.Symbol && 'Int8Array' in self && self.Symbol.iterator in self.Int8Array.prototype
