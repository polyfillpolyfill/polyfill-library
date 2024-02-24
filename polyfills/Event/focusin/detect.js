(function() {
	var support = false;

	document.documentElement.addEventListener("focusin", function() {
		support = true;
	});

	document.documentElement.dispatchEvent(new Event("focusin"));

	return support;
})()
