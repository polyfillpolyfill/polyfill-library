/* eslint-env mocha, browser */
/* global proclaim */

// Note: Function length is incorrectly reported as 0 in MS Edge (IE12), but this is intentionally not tested

describe('on an element', function () {
	var
	documentElement = document.documentElement,
	documentHead = document.getElementsByTagName('head')[0],
	detached = document.createElement('div');

	it('is a function', function () {
		proclaim.isFunction(documentElement.isSameNode);
	});

	it('functions correctly', function () {
		proclaim.equal(documentElement.isSameNode(documentElement), true);

		proclaim.equal(documentElement.isSameNode(documentHead), false);
		proclaim.equal(documentElement.isSameNode(null), false);
	});

	it('functions correctly (on detached elements)', function () {
		proclaim.equal(detached.isSameNode(detached), true);

		proclaim.equal(detached.isSameNode(documentElement), false);
		proclaim.equal(detached.isSameNode(null), false);
	});

	// Native implementations on Safari (desktop and iOS) as of v9 return false when no argument is supplied
	it.skip('throws when missing the argument', function () {
		proclaim.throws(function () {
			documentElement.isSameNode();
		});
	});
});

describe('on the document', function () {
	var documentElement = document.documentElement;

	it('is a function', function () {
		proclaim.isInstanceOf(document.isSameNode, Function);
	});

	it('functions correctly', function () {
		proclaim.equal(document.isSameNode(document), true);

		proclaim.equal(document.isSameNode(documentElement), false);
	});

	// Native implementations on Safari (desktop and iOS) as of v9 return false when no argument is supplied
	it.skip('throws when missing the argument', function () {
		proclaim.throws(function () {
			document.isSameNode();
		});
	});
});
