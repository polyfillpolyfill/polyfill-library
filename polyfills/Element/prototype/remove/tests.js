/* eslint-env mocha, browser */
/* global proclaim */

var element, child;

function nameOf(fn) {
	return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
}

beforeEach(function () {
	element = document.createElement('div');
	child = document.createElement('div');

	element.appendChild(child);
});

it('has correct instance', function () {
	proclaim.isInstanceOf(element.remove, Function);
});

it('has correct name', function () {
	proclaim.equal(nameOf(element.remove), 'remove');
});

it('has correct argument length', function () {
	proclaim.equal(element.remove.length, 0);
});

it('can remove itself', function () {
	proclaim.equal(child.remove(), undefined);

	proclaim.equal(element.childNodes.length, 0);
});

it('can remove itself from nothing', function () {
	proclaim.equal(child.remove(), undefined);
	proclaim.equal(child.remove(), undefined);

	proclaim.equal(element.childNodes.length, 0);
});

it('can remove a select', function () {
	child.remove();

	var select = document.createElement('select');
	element.appendChild(select);

	proclaim.equal(select.remove(), undefined);

	proclaim.equal(element.childNodes.length, 0);
});

it('does not break the ability for a select to remove an option', function () {
	child.remove();

	var select = document.createElement('select');
	var option = document.createElement('option');
	element.appendChild(select);
	select.appendChild(option);

	proclaim.equal(select.remove(0), undefined);

	proclaim.equal(select.childNodes.length, 0);
	proclaim.equal(element.childNodes.length, 1);
});

it('does not remove a select when passed `undefined`', function () {
	child.remove();

	var select = document.createElement('select');
	element.appendChild(select);

	proclaim.equal(select.remove(undefined), undefined);

	proclaim.equal(element.childNodes.length, 1);
});
