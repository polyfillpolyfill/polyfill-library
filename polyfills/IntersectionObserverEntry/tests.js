/* eslint-env mocha, browser */
/* global proclaim */

describe('IntersectionObserverEntry', function () {
	var scrollArea;
	var childElement;

	beforeEach(function () {
		scrollArea = document.createElement('div');
		scrollArea.style = 'height: 5000px; width: 500px; overflow: scroll; position: relative;';
		scrollArea.id = 'scroll-area';

		childElement = document.createElement('div');
		childElement.id = 'child-element';
		childElement.style = 'height: 100px; width: 100px; position: absolute; top: 0px; left: 0px;';
		scrollArea.appendChild(childElement);

		document.body.appendChild(scrollArea);
	});

	afterEach(function () {
		document.body.removeChild(scrollArea);
	});

	it('has an isIntersecting property', function () {
		proclaim.ok('isIntersecting' in IntersectionObserverEntry.prototype);
	});

	it('isIntersecting property can be true', function (done) {
		var observer = new IntersectionObserver(function (entries) {
			proclaim.equal(entries.length, 1);
			proclaim.equal(entries[0].isIntersecting, true);
			done();
			observer.unobserve(childElement);
		}, {});

		observer.observe(childElement);
	});
});
