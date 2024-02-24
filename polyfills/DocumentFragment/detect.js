'DocumentFragment' in self && (function () {
	try {
		new DocumentFragment();
		return true;
	} catch (_) {
		return false;
	}
}())
