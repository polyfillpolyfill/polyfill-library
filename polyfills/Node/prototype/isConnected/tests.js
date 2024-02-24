/* eslint-env mocha */
/* globals proclaim */

describe('on an element', function () {
	var element = document.createElement('div');

	it('is enumerable', function () {
		proclaim.isTrue('isConnected' in element);
	});

	it('is false if node is not connected to a document', function() {
		proclaim.isFalse(element.isConnected);
	});

	it('is true if node is connected to a document', function() {
		document.body.appendChild(element);
		proclaim.isTrue(element.isConnected);
	});
});

describe('on the document', function () {
	it('is enumerable', function () {
		proclaim.isTrue('isConnected' in document);
	});

	it('is true for a document', function() {
		proclaim.isTrue(document.isConnected);
	});
});
