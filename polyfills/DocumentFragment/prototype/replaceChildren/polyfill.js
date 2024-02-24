(function (global) {
	function replaceChildren() {
		while (this.firstChild) {
			this.removeChild(this.firstChild);
		}
		this.append.apply(this, arguments);
	}

	var fragmentProto = document.createDocumentFragment().constructor.prototype;
	fragmentProto.replaceChildren = replaceChildren;

	global.DocumentFragment.prototype.replaceChildren = replaceChildren;
}(self));
