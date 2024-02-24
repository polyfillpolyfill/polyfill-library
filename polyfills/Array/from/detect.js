'from' in Array && (function () {
	try {
		Array.from({ length: -Infinity });

		if (Array.from(new self.Set(['a']))[0] !== 'a') {
			return false;
		}

		if (Array.from(new self.Map([['a', 'one']]))[0][0] !== 'a') {
			return false;
		}

		return true;
	} catch (e) {
		return false;
	}
}())
