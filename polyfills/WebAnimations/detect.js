typeof document.head.animate === "function" && (function () {
	try {
		return !!(document.createElement('DIV').animate({
			opacity: [0, 1]
		}, {
			direction: 'alternate',
			duration: 1,
			iterations: 1
		}));
	} catch (_) {
		return false;
	}
}())
