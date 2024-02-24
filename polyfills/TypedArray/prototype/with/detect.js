// use "Int8Array" as a proxy for support of "TypedArray" subclasses
'Int8Array' in self && 'with' in self.Int8Array.prototype
