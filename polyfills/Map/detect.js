'Map' in self && (function(self) {
	try {
		var m = new self.Map([[1, 1], [2, 2]]);
		if (self.Map.length === 0) {
			if (m.size === 2) {
				if ('Symbol' in self &&
					'iterator' in self.Symbol && typeof m[self.Symbol.iterator] === 'function' &&
					'toStringTag' in self.Symbol && typeof m[self.Symbol.toStringTag] !== 'undefined'
				) {
					return true;
				}
			}
		}
		return false;
	} catch (e) {
		return false;
	}
}(self))
