(function() {
	'use strict';

	/**
	 * An element is connected if its shadow-including root is a document.
	 */
	function isConnected() {
		var root = this.getRootNode({ composed: true });
		return root.nodeType === 9; // Node.DOCUMENT_NODE
	}

	function defineIsConnected(object) {
		Object.defineProperty(object, 'isConnected', {
			configurable: true,
			enumerable: true,
			get: isConnected
		});
	}

	// IE
	if ('HTMLElement' in self && 'isConnected' in HTMLElement.prototype) {
		try {
			delete HTMLElement.prototype.isConnected;
			// eslint-disable-next-line no-empty
		} catch (e) {}
	}

	if ('Node' in self) {
		defineIsConnected(Node.prototype);
	} else {
		defineIsConnected(document);
		defineIsConnected(Element.prototype);
	}
}());
