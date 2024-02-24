/* eslint-env mocha, browser */
/* global proclaim */

describe("Template", function() {
	var template;
	before(function() {
		var container = document.createElement('div');
		container.className = 'container';
		container.innerHTML = [
			"<template>",
			'<span id="content">Hello World!</span>',
			"</template>"
		].join("\n");
		document.body.appendChild(container);
	});
	beforeEach(function() {
		template = document.querySelector("template");
	});
	var canInnerHTML = (function() {
		var el = document.createElement("div");
		try {
			Object.defineProperty(el, "innerHTML", {
				get: function() {}, // eslint-disable-line getter-return
				set: function() {}
			});
			return true;
		} catch (e) {
			return false;
		}
	}());
	function setupTemplate(template, string) {
		if (canInnerHTML) {
			template.innerHTML = string;
		} else {
			var el = document.createElement("div");
			el.innerHTML = string;
			var nodes = Array.prototype.slice.call(el.childNodes, 0);
			for (var i = 0; i < nodes.length; i++) {
				template.content.appendChild(nodes[i]);
			}
		}
	}
	it("No rendering", function() {
		var bcr = template.getBoundingClientRect();
		proclaim.equal(bcr.height, 0);
		proclaim.equal(bcr.width, 0);
	});
	it("content", function() {
		proclaim.equal(
			template.childNodes.length,
			0,
			"template children evacipated"
		);
		proclaim.isDefined(template.content, "template content exists");
		proclaim.equal(
			template.content.childNodes.length,
			3,
			"template content has expected number of nodes"
		);
		var content = document.querySelector("#content");
		proclaim.isNull(content, "template content not in document");
	});
	it("stamping", function() {
		document.body.appendChild(document.importNode(template.content, true));
		var content = document.querySelector("#content");
		proclaim.isDefined(content, "template content stamped into document");
	});
	it("innerHTML", function() {
		if (!canInnerHTML) {
			this.skip();
		}
		var imp = document.createElement("template");
		proclaim.equal(imp.innerHTML, "");
		var s = "pre<div>Hi</div><div>Bye</div>post";
		imp.innerHTML = s;
		proclaim.equal(imp.innerHTML, s);
		proclaim.equal(imp.content.childNodes.length, 4);
		proclaim.equal(imp.content.firstChild.textContent, "pre");
		s = "foo";
		imp.innerHTML = s;
		proclaim.equal(imp.innerHTML, s);
		proclaim.equal(imp.content.childNodes.length, 1);
		proclaim.equal(imp.content.firstChild.textContent, s);
		s = '-<->-"-&-';
		var escaped = '-&lt;-&gt;-"-&amp;-';
		var div = document.createElement("div");
		imp.innerHTML = s;
		div.innerHTML = s;
		// innerHTML is properly escaped
		proclaim.equal(imp.innerHTML, escaped);
		proclaim.equal(imp.content.textContent, div.textContent);
	});
	it("innerHTML (nested)", function() {
		if (!canInnerHTML) {
			this.skip();
		}
		var imp = document.createElement("template");
		proclaim.equal(imp.innerHTML, "");
		var s =
			"pre<div><template>Hi</template></div><div><template>Bye</template></div>post";
		imp.innerHTML = s;
		proclaim.equal(imp.innerHTML, s);
	});
	it("innerHTML (comments)", function() {
		if (!canInnerHTML) {
			this.skip();
		}
		var imp = document.createElement("template");
		proclaim.equal(imp.innerHTML, "");
		var s = "<!-- This is a comment -->";
		imp.innerHTML = s;
		proclaim.equal(imp.innerHTML, s);
	});
	it("innerHTML (tr element)", function() {
		if (!canInnerHTML) {
			this.skip();
		}
		var imp = document.createElement("template");
		proclaim.equal(imp.innerHTML, "");
		var s =
			'<tr><td class="record"></td><td></td><td><span class="extra">nothing</span></td></tr>';
		imp.innerHTML = s;
		proclaim.equal(imp.innerHTML, s);
	});
	it("innerHTML (td element)", function() {
		if (!canInnerHTML) {
			this.skip();
		}
		var imp = document.createElement("template");
		proclaim.equal(imp.innerHTML, "");
		var s = '<td class="record"><span class="extra">nothing</span></td>';
		imp.innerHTML = s;
		proclaim.equal(imp.innerHTML, s);
	});
	it("innerHTML (th element)", function() {
		if (!canInnerHTML) {
			this.skip();
		}
		var imp = document.createElement("template");
		proclaim.equal(imp.innerHTML, "");
		var s = '<th class="record"><span class="extra">nothing</span></th>';
		imp.innerHTML = s;
		proclaim.equal(imp.innerHTML, s);
	});
	it("innerHTML (col element)", function() {
		if (!canInnerHTML) {
			this.skip();
		}
		var imp = document.createElement("template");
		proclaim.equal(imp.innerHTML, "");
		var s = '<col style="background-color: rgb(0, 0, 0);"><col span="2">';
		imp.innerHTML = s;
		proclaim.equal(imp.innerHTML, s);
	});
	it("innerHTML (thead element)", function() {
		if (!canInnerHTML) {
			this.skip();
		}
		var imp = document.createElement("template");
		proclaim.equal(imp.innerHTML, "");
		var s =
			"<thead><tr><th>Header content 1</th><th>Header content 2</th></tr></thead>";
		imp.innerHTML = s;
		proclaim.equal(imp.innerHTML, s);
	});
	it("innerHTML (option element)", function() {
		if (!canInnerHTML) {
			this.skip();
		}
		var imp = document.createElement("template");
		proclaim.equal(imp.innerHTML, "");
		var s = '<option value="one">One</option><option value="two">two</option>';
		imp.innerHTML = s;
		proclaim.equal(imp.innerHTML, s);
	});
	it("clone", function() {
		var imp = document.createElement("template");
		var s = "<div>Hi</div>";
		setupTemplate(imp, s);
		var clone = imp.cloneNode();
		proclaim.notEqual(clone, imp, "element is not cloned");
		proclaim.isDefined(clone.content, "cloned template content dne");
		proclaim.equal(
			clone.content.childNodes.length,
			0,
			"non-deep cloned template.content is not empty"
		);
		var deepClone = imp.cloneNode(true);
		proclaim.equal(
			deepClone.content.childNodes.length,
			1,
			"deep cloned template.content is empty"
		);
		proclaim.notEqual(
			imp.content.firstChild,
			deepClone.content.firstChild,
			"cloned content is not different from source"
		);
	});
	it("clone nested", function() {
		var imp = document.createElement("template");
		var s =
			'a<template id="a">b<template id="b">c<template id="c">d</template></template></template>';
		setupTemplate(imp, s);
		var clone = imp.cloneNode(false);
		proclaim.notEqual(clone, imp, "element is not cloned");
		proclaim.isDefined(clone.content, "cloned template content dne");
		proclaim.equal(
			clone.content.childNodes.length,
			0,
			"non-deep cloned template.content is not empty"
		);
		var deepClone = imp.cloneNode(true);
		proclaim.equal(
			deepClone.content.childNodes.length,
			2,
			"deep cloned template.content is empty"
		);
		proclaim.notEqual(
			imp.content.firstChild,
			deepClone.content.firstChild,
			"cloned content is not different from source"
		);
		var nested = deepClone.content.lastChild;
		proclaim.isDefined(nested.content, "nested cloned template content dne");
		proclaim.equal(
			nested.content.childNodes.length,
			2,
			"deep cloned template.content is empty"
		);
		nested = nested.content.lastChild;
		proclaim.isDefined(nested, "nested cloned template content dne");
		proclaim.equal(
			nested.content.childNodes.length,
			2,
			"deep cloned template.content is empty"
		);
		nested = nested.content.lastChild;
		proclaim.isDefined(nested, "nested cloned template content dne");
		proclaim.equal(
			nested.content.childNodes.length,
			1,
			"deep cloned template.content is empty"
		);
	});
	it("clone node containing templates", function() {
		var imp = document.createElement("div");
		var t = document.createElement("template");
		var s =
			'a<template id="a">b<template id="b">c<template id="c">d</template></template></template>';
		setupTemplate(t, s);
		imp.appendChild(t);
		var impClone = imp.cloneNode(true);
		imp = imp.firstChild;
		var deepClone = impClone.firstChild;
		proclaim.equal(
			deepClone.content.childNodes.length,
			2,
			"deep cloned template.content is empty"
		);
		proclaim.notEqual(
			imp.content.firstChild,
			deepClone.content.firstChild,
			"cloned content is not different from source"
		);
		var nested = deepClone.content.lastChild;
		proclaim.isDefined(nested.content, "nested cloned template content dne");
		proclaim.equal(
			nested.content.childNodes.length,
			2,
			"deep cloned template.content is empty"
		);
		nested = nested.content.lastChild;
		proclaim.isDefined(nested, "nested cloned template content dne");
		proclaim.equal(
			nested.content.childNodes.length,
			2,
			"deep cloned template.content is empty"
		);
		nested = nested.content.lastChild;
		proclaim.isDefined(nested, "nested cloned template content dne");
		proclaim.equal(
			nested.content.childNodes.length,
			1,
			"deep cloned template.content is empty"
		);
	});
	it("importNode", function() {
		var imp = document.createElement("template");
		var s = "<div>Hi</div>";
		setupTemplate(imp, s);
		var clone = document.importNode(imp, false);
		proclaim.notEqual(clone, imp, "element is not cloned");
		proclaim.isDefined(clone.content, "cloned template content dne");
		proclaim.equal(
			clone.content.childNodes.length,
			0,
			"non-deep cloned template.content is not empty"
		);
		var deepClone = document.importNode(imp, true);
		proclaim.equal(
			deepClone.content.childNodes.length,
			1,
			"deep cloned template.content is empty"
		);
		proclaim.notEqual(
			imp.content.firstChild,
			deepClone.content.firstChild,
			"cloned content is not different from source"
		);
	});
	it("importNode: nested", function() {
		var imp = document.createElement("template");
		var s =
			'a<template id="a">b<template id="b">c<template id="c">d</template></template></template>';
		setupTemplate(imp, s);
		var clone = document.importNode(imp, false);
		proclaim.notEqual(clone, imp, "element is not cloned");
		proclaim.isDefined(clone.content, "cloned template content dne");
		proclaim.equal(
			clone.content.childNodes.length,
			0,
			"non-deep cloned template.content is not empty"
		);
		var deepClone = document.importNode(imp, true);
		proclaim.equal(
			deepClone.content.childNodes.length,
			2,
			"deep cloned template.content is empty"
		);
		proclaim.notEqual(
			imp.content.firstChild,
			deepClone.content.firstChild,
			"cloned content is not different from source"
		);
		var nested = deepClone.content.lastChild;
		proclaim.isDefined(nested.content, "nested cloned template content dne");
		proclaim.equal(
			nested.content.childNodes.length,
			2,
			"deep cloned template.content is empty"
		);
		nested = nested.content.lastChild;
		proclaim.isDefined(nested, "nested cloned template content dne");
		proclaim.equal(
			nested.content.childNodes.length,
			2,
			"deep cloned template.content is empty"
		);
		nested = nested.content.lastChild;
		proclaim.isDefined(nested, "nested cloned template content dne");
		proclaim.equal(
			nested.content.childNodes.length,
			1,
			"deep cloned template.content is empty"
		);
	});
	it("importNode: element containing nested templates", function() {
		var imp = document.createElement("div");
		var t = document.createElement("template");
		var s =
			'a<template id="a">b<template id="b">c<template id="c">d</template></template></template>';
		setupTemplate(t, s);
		imp.appendChild(t);
		var impClone = document.importNode(imp, true);
		imp = imp.firstChild;
		var deepClone = impClone.firstChild;
		proclaim.equal(
			deepClone.content.childNodes.length,
			2,
			"deep cloned template.content is empty"
		);
		proclaim.notEqual(
			imp.content.firstChild,
			deepClone.content.firstChild,
			"cloned content is not different from source"
		);
		var nested = deepClone.content.lastChild;
		proclaim.isDefined(nested.content, "nested cloned template content dne");
		proclaim.equal(
			nested.content.childNodes.length,
			2,
			"deep cloned template.content is empty"
		);
		nested = nested.content.lastChild;
		proclaim.isDefined(nested, "nested cloned template content dne");
		proclaim.equal(
			nested.content.childNodes.length,
			2,
			"deep cloned template.content is empty"
		);
		nested = nested.content.lastChild;
		proclaim.isDefined(nested, "nested cloned template content dne");
		proclaim.equal(
			nested.content.childNodes.length,
			1,
			"deep cloned template.content is empty"
		);
	});
	it("importNode: templates have proper owner document", function() {
		var doc = document.implementation.createHTMLDocument("");
		var imp = doc.createElement("div");
		var t = doc.createElement("template");
		var s =
			'a<template id="a">b<template id="b">c<template id="c">d</template></template></template>';
		t.innerHTML = s;
		imp.appendChild(t);
		var impClone = document.importNode(imp, true);
		imp = imp.firstChild;
		var deepClone = impClone.firstChild;
		proclaim.notEqual(imp.ownerDocument, document);
		proclaim.equal(impClone.ownerDocument, document);
		proclaim.equal(deepClone.ownerDocument, document);
	});
	it("outerHTML", function() {
		var t = document.createElement("template");
		setupTemplate(t, "<div>foo</div>");
		proclaim.equal(t.outerHTML, "<template><div>foo</div></template>");
		document.body.appendChild(t);
		t.outerHTML = "<div>replaced</div>";
		proclaim.equal(t.parentNode, null);
		var replaced = document.body.lastElementChild;
		proclaim.equal(replaced.outerHTML, "<div>replaced</div>");
	});
	it("scripts added to template execute when stamped", function() {
		var t = document.createElement("template");
		var script = document.createElement("script");
		script.textContent = "window.executedTemplateScript=true";
		t.content.appendChild(script);
		document.body.appendChild(document.importNode(t.content, true));
		proclaim.isDefined(
			window.executedTemplateScript,
			"script should have executed but did not"
		);
	});
	it("importing empty template content works", function() {
		var t = document.createElement("template");
		document.importNode(t.content, true);
	});
	it("can work with nested templates in a svg context (importNode)", function() {
		var svgNamespace = "http://www.w3.org/2000/svg";
		var doc = document.implementation.createHTMLDocument("");
		var imp = doc.createElement("div");
		var t = document.createElement("template");
		t.innerHTML =
			'<svg><template><circle cx="150" cy="150" r="100" fill="blue" /></template></svg>';
		imp.appendChild(t);
		var impClone = document.importNode(imp, true);
		imp = imp.firstChild;
		var deepClone = impClone.firstChild;
		var svg = deepClone.content.firstChild;
		proclaim.equal(svg.namespaceURI, svgNamespace);
		var svgTemplate = svg.firstChild;
		proclaim.equal(svgTemplate.namespaceURI, svgNamespace);
		proclaim.equal(svgTemplate.firstChild.namespaceURI, svgNamespace);
	});
	it("can work with nested templates in a svg context (cloneNode)", function() {
		var svgNamespace = "http://www.w3.org/2000/svg";
		var doc = document.implementation.createHTMLDocument("");
		var imp = doc.createElement("div");
		var t = document.createElement("template");
		t.innerHTML =
			'<svg><template><circle cx="150" cy="150" r="100" fill="blue" /></template></svg>';
		imp.appendChild(t);
		var impClone = imp.cloneNode(true);
		imp = imp.firstChild;
		var deepClone = impClone.firstChild;
		var svg = deepClone.content.firstChild;
		proclaim.equal(svg.namespaceURI, svgNamespace);
		var svgTemplate = svg.firstChild;
		proclaim.equal(svgTemplate.namespaceURI, svgNamespace);
		proclaim.equal(svgTemplate.firstChild.namespaceURI, svgNamespace);
	});
	it("DOMParser constructs correct templates", function() {
		var DOM = new DOMParser().parseFromString(
			"<template></template>",
			"text/html"
		);
		proclaim.isTrue(
			DOM.querySelector("template") instanceof HTMLTemplateElement
		);
	});
	it("innerHTML on regular HTMLElement upgrades nested template", function() {
		var container = document.createElement("div");
		proclaim.equal(container.innerHTML, "");
		var innerHTML = "<template><span>In template</span></template>";
		container.innerHTML = innerHTML;
		proclaim.equal(container.innerHTML, innerHTML);
		proclaim.isTrue(container.firstChild instanceof HTMLTemplateElement);
		proclaim.ok(container.firstChild.content);
		proclaim.isTrue(
			container.firstChild.content.firstChild instanceof HTMLSpanElement
		);
	});
});

describe("Document Fragment", function() {
	it("createDocumentFragment", function() {
		var frag = document.createDocumentFragment();
		proclaim.equal(frag.nodeType, Node.DOCUMENT_FRAGMENT_NODE);
		proclaim.instanceOf(frag, DocumentFragment);
	});
	it("localName", function() {
		var frag = document.createDocumentFragment();
		// may be null or undefined depending on browser vendor
		proclaim.ok(frag.localName == null);
	});
	it("nodeType", function() {
		var frag = document.createDocumentFragment();
		proclaim.equal(frag.nodeType, Node.DOCUMENT_FRAGMENT_NODE);
	});
	it("nodeName", function() {
		var frag = document.createDocumentFragment();
		proclaim.equal(frag.nodeName, "#document-fragment");
	});
	it("tagName", function() {
		var frag = document.createDocumentFragment();
		proclaim.ok(frag.tagName == null);
	});
	it("cloneNode", function() {
		var frag = document.createDocumentFragment();
		var child = document.createElement("div");
		var grandChild = document.createElement("span");
		grandChild.textContent = "Hi!";
		child.appendChild(grandChild);
		frag.appendChild(child);
		var clone = frag.cloneNode();
		proclaim.equal(frag.childNodes.length, 1);
		proclaim.equal(clone.childNodes.length, 0);
		clone = frag.cloneNode(true);
		proclaim.equal(clone.childNodes.length, 1);
		proclaim.equal(clone.firstChild.childNodes.length, 1);
		proclaim.equal(clone.firstChild.firstChild.textContent, "Hi!");
	});
	it("importNode", function() {
		var otherDoc = document.implementation.createHTMLDocument("other");
		var frag = otherDoc.createDocumentFragment();
		var child = otherDoc.createElement("div");
		child.innerHTML = "<span>foo!</span>";
		frag.appendChild(child);
		var newFrag;
		// Edge 14 throws NotSupportedError with importNode(docFrag, false) for some reason
		if (!navigator.userAgent.match("Edge/14")) {
			newFrag = document.importNode(frag, false);
			proclaim.equal(newFrag.ownerDocument, document);
			proclaim.equal(newFrag.childNodes.length, 0);
		}
		newFrag = document.importNode(frag, true);
		proclaim.equal(newFrag.childNodes.length, 1);
		proclaim.equal(newFrag.childNodes[0].innerHTML, "<span>foo!</span>");
	});
	it("appendChild with DocumentFragment", function() {
		var div = document.createElement("div");
		var frag = document.createDocumentFragment();
		var child = document.createElement("div");
		child.innerHTML = "<span>foo!</span>";
		frag.appendChild(child);
		div.appendChild(frag);
		proclaim.equal(div.innerHTML, "<div><span>foo!</span></div>");
	});
	it("insertBefore with DocumentFragment", function() {
		var div = document.createElement("div");
		var frag = document.createDocumentFragment();
		var child = document.createElement("div");
		child.innerHTML = "<span>foo!</span>";
		frag.appendChild(child);
		div.innerHTML = "<bar></bar>";
		div.insertBefore(frag, div.firstChild);
		proclaim.equal(div.innerHTML, "<div><span>foo!</span></div><bar></bar>");
	});
	it("replaceChild with DocumentFragment", function() {
		var div = document.createElement("div");
		var frag = document.createDocumentFragment();
		var child = document.createElement("div");
		child.innerHTML = "<span>foo!</span>";
		frag.appendChild(child);
		div.innerHTML = "<bar></bar>";
		div.replaceChild(frag, div.firstChild);
		proclaim.equal(div.innerHTML, "<div><span>foo!</span></div>");
	});
});
