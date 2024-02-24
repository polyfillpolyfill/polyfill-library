(function() {
	'use strict';

	/**
	 * Returns `this`’s shadow-including root if options’s `composed` is true.
	 * Returns `this`’s root otherwise.
	 *
	 * The root of an object is itself, if its parent is null, or else it is the root of its parent.
	 *
	 * The shadow-including root of an object is its root’s host’s shadow-including root,
	 * if the object’s root is a shadow root, and its root otherwise.
	 *
	 * https://dom.spec.whatwg.org/#dom-node-getrootnode
	 *
	 */
	function getRootNode() {
		var options = arguments[0];
		var composed = typeof options === 'object' && Boolean(options.composed);

		return composed ? getShadowIncludingRoot(this) : getRoot(this);
	}

	function getShadowIncludingRoot(node) {
		var root = getRoot(node);

		if (isShadowRoot(root)) {
			return getShadowIncludingRoot(root.host);
		}

		return root;
	}

	function getRoot(node) {
		if (node.parentNode != null) {
			return getRoot(node.parentNode);
		}

		return node;
	}

	function isShadowRoot(node) {
		return node.nodeName === '#document-fragment' && node.constructor.name === 'ShadowRoot';
	}

	// IE
	if ('HTMLElement' in self && 'getRootNode' in HTMLElement.prototype) {
		try {
			delete HTMLElement.prototype.getRootNode;
			// eslint-disable-next-line no-empty
		} catch (e) {}
	}

	if ('Node' in self) {
		Node.prototype.getRootNode = getRootNode;
	} else {
		document.getRootNode = Element.prototype.getRootNode = getRootNode;
	}
}());
