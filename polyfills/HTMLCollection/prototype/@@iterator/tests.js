/* eslint-env mocha, browser */
/* global proclaim, Symbol */

function getHTMLCollection() {
	var element = document.createElement('div');
	element.appendChild(document.createElement('span'));
	element.appendChild(document.createElement('span'));
	return element.children;
}

it('exists', function () {
	if (!Symbol || !Symbol.iterator) {
		proclaim.fail();
		return;
	}
	proclaim.isInstanceOf(getHTMLCollection()[Symbol.iterator], Function);
});

it('returns a next-able object', function () {
	var htmlCollection = getHTMLCollection();
	var iterator = htmlCollection[Symbol.iterator]();

	proclaim.isInstanceOf(iterator.next, Function);
	proclaim.deepEqual(iterator.next(), {
		value: htmlCollection[0],
		done: false
	});
});

it('finally returns a done object', function () {
	var htmlCollection = getHTMLCollection();
	var iterator = htmlCollection[Symbol.iterator]();
	iterator.next();
	iterator.next();
	proclaim.equal(iterator.next().done, true);
});
