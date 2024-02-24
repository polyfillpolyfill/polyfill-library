"seal" in Object && (function() {
	try {
		Object.seal('1');
		return true;
	} catch (err) {
		return false;
	}
}())
