(function () {
	try {
		return new Error('m', { cause: 'c' }).cause === 'c';
	} catch (e) {
		return false;
	}
})()
