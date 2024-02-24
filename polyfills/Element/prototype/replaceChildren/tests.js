/* eslint-env mocha, browser */
/* global proclaim */

var element;

function nameOf(fn) {
	return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
}

beforeEach(function () {
	element = document.createElement('div');
});

it('has correct instance', function () {
	proclaim.isInstanceOf(element.replaceChildren, Function);
});

it('has correct name', function () {
	proclaim.equal(nameOf(element.replaceChildren), 'replaceChildren');
});

it('has correct argument length', function () {
	proclaim.equal(element.replaceChildren.length, 0);
});

it('can replace children', function () {
	var child1 = document.createElement('div');
	element.appendChild(child1);

	var child2 = document.createElement('div');
	var child3 = document.createElement('div');
	var child4 = 'text';
	proclaim.equal(element.replaceChildren(child2, child3, child4), undefined);
	proclaim.equal(element.childNodes.length, 3);
	proclaim.equal(element.childNodes.item(0), child2);
	proclaim.equal(element.childNodes.item(1), child3);
	proclaim.equal(element.lastChild.nodeName, '#text');

	proclaim.equal(element.replaceChildren(), undefined);
	proclaim.equal(element.childNodes.length, 0);
});
