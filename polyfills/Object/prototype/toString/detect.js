'Symbol' in self && 'toStringTag' in self.Symbol && 'toString' in Object.prototype &&
	(function () {
		var x = {}
		x[self.Symbol.toStringTag] = 'x'
		return Object.prototype.toString.call(x) === '[object x]'
	})() === true
