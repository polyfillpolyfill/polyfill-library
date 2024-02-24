/* eslint-env mocha */
/* globals proclaim */

function supportsShadowRoot() {
	return typeof Element.prototype.attachShadow === "function";
}

describe('on an element', function () {
	var element = document.createElement('div');

	it("is a function", function() {
		proclaim.isFunction(element.getRootNode);
	});

	it("has correct arity", function() {
		proclaim.arity(element.getRootNode, 0);
	});

	it("has correct name", function() {
		proclaim.hasName(element.getRootNode, "getRootNode");
	});

	function createShadowRoot(document) {
		var node = document.createElement("div");
		document.body.appendChild(node);
		var shadowRoot = node.attachShadow({ mode: "open" });
		var shadowNode = document.createElement("div");
		shadowRoot.appendChild(shadowNode);

		return { root: shadowRoot, node: shadowNode };
	}

	describe("returns the root of detached trees", function testGetRootDetached() {
		function run(document) {
			var rootNode = document.createElement("div");
			var childNode = document.createElement("div");
			var descendantNode = document.createElement("div");

			rootNode.appendChild(childNode);
			childNode.appendChild(descendantNode);

			proclaim.deepStrictEqual(descendantNode.getRootNode(), rootNode);
		}

		it("current realm", function inRealm() {
			run(document);
		});
	});

	describe("returns the root of attached trees", function testGetRootAttached() {
		function run(document) {
			var rootNode = document.createElement("div");
			var childNode = document.createElement("div");
			var descendantNode = document.createElement("div");

			document.body.appendChild(rootNode);
			rootNode.appendChild(childNode);
			childNode.appendChild(descendantNode);

			proclaim.deepStrictEqual(descendantNode.getRootNode(), document);
		}

		it("current realm", function inRealm() {
			run(document);
		});
	});

	describe("returns itself if it is the root", function testGetSelf() {
		function run(document) {
			var detachedNode = document.createElement("div");

			proclaim.deepStrictEqual(detachedNode.getRootNode(), detachedNode);
			proclaim.deepStrictEqual(document.getRootNode(), document);
		}

		it("current realm", function inRealm() {
			run(document);
		});
	});

	describe("works with shadow roots", function testGetShadow() {
		function run(document) {
			var elems = createShadowRoot(document);
			proclaim.deepStrictEqual(elems.node.getRootNode(), elems.root);
		}

		it("current realm", function inRealm() {
			if (!supportsShadowRoot()) {
				this.skip();
				return;
			}

			run(document);
		});
	});

	describe("\"composed\" option returns the shadow root's host's root", function testGetShadowsRoot() {
		function run(document) {
			var elems = createShadowRoot(document);
			proclaim.deepStrictEqual(
				elems.node.getRootNode({ composed: true }),
				document
			);
		}

		it("current realm", function inRealm() {
			if (!supportsShadowRoot()) {
				this.skip();
				return;
			}

			run(document);
		});
	});

	describe('"composed" option defaults to false', function testComposed() {
		function run(document) {
			var elems = createShadowRoot(document);
			proclaim.deepStrictEqual(
				elems.node.getRootNode(),
				elems.node.getRootNode({ composed: false })
			);
		}

		it("current realm", function inRealm() {
			if (!supportsShadowRoot()) {
				this.skip();
				return;
			}

			run(document);
		});
	});
});

describe('on the document', function () {
	it("is a function", function() {
		proclaim.isFunction(document.getRootNode);
	});

	it("has correct arity", function() {
		proclaim.arity(document.getRootNode, 0);
	});

	it("has correct name", function() {
		proclaim.hasName(document.getRootNode, "getRootNode");
	});

	it("returns itself", function() {
		proclaim.equal(document.getRootNode(), document);
	});
});
