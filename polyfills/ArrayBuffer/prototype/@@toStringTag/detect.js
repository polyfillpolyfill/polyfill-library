'Symbol' in self && 'toStringTag' in self.Symbol && 'ArrayBuffer' in self && self.Symbol.toStringTag in self.ArrayBuffer.prototype && self.ArrayBuffer.prototype[self.Symbol.toStringTag] !== undefined
