/* eslint-env mocha, browser */
/* global proclaim */

var fragment;

function nameOf(fn) {
	return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
}

beforeEach(function () {
	fragment = document.createDocumentFragment();
});

it('has correct instance', function () {
	proclaim.isInstanceOf(fragment.replaceChildren, Function);
});

it('has correct name', function () {
	proclaim.equal(nameOf(fragment.replaceChildren), 'replaceChildren');
});

it('has correct argument length', function () {
	proclaim.equal(fragment.replaceChildren.length, 0);
});

it('can replace children', function () {
	var child1 = document.createElement('div');
	fragment.appendChild(child1);

	var child2 = document.createElement('div');
	var child3 = document.createElement('div');
	var child4 = 'text';
	proclaim.equal(fragment.replaceChildren(child2, child3, child4), undefined);
	proclaim.equal(fragment.childNodes.length, 3);
	proclaim.equal(fragment.childNodes.item(0), child2);
	proclaim.equal(fragment.childNodes.item(1), child3);
	proclaim.equal(fragment.lastChild.nodeName, '#text');

	proclaim.equal(fragment.replaceChildren(), undefined);
	proclaim.equal(fragment.childNodes.length, 0);
});
