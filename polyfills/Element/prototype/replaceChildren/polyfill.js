Document.prototype.replaceChildren = Element.prototype.replaceChildren = function replaceChildren() {
	while (this.firstChild) {
		this.removeChild(this.firstChild);
	}
	this.append.apply(this, arguments);
};
