'getOwnPropertyNames' in Object && (function() {
	try {
		Object.getOwnPropertyNames(1);
		return true;
	} catch (e) {
		return false;
	}
})()
