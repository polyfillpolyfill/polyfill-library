/* eslint-env mocha, browser */
/* global proclaim */

it('has a working constructor', function () {
	proclaim.doesNotThrow(function () {
	new DocumentFragment();
	});

	proclaim.ok(!!(new DocumentFragment()));
});

// TODO : needs full test suite.
// This had insufficient tests. Adding a simple test to check if the basics work.
it('can be used to add elements to the document', function () {
	var fragment = new DocumentFragment()

	var el = document.createElement('div')
	el.id = 'added-with-fragment';
	fragment.appendChild(el)
	document.body.appendChild(el);

	proclaim.equal(el, document.getElementById('added-with-fragment'));
});
