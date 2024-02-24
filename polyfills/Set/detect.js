'Set' in self && (function() {
	try {
		var s = new self.Set([1, 2]);
		if (self.Set.length === 0) {
			if (s.size === 2) {
				if ('Symbol' in self &&
					'iterator' in self.Symbol && typeof s[self.Symbol.iterator] === 'function' &&
					'toStringTag' in self.Symbol && typeof s[self.Symbol.toStringTag] !== 'undefined'
				) {
					return true;
				}
			}
		}
		return false;
	} catch (e) {
		return false;
	}
}())
