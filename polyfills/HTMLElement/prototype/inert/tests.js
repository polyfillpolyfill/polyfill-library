/* eslint-env mocha, browser */
/* global proclaim */

describe('inert', function () {
	var element;

	beforeEach(function() {
		element = document.createElement('div');
		element.innerHTML = '<h1 id="inert-tests-present" inert></h1><h1 id="inert-tests-empty"></h1>';
		document.body.appendChild(element);
	});

	afterEach(function() {
		document.body.removeChild(element);
	});

	it('get', function () {
		var el = document.getElementById('inert-tests-present');

		proclaim.equal(el.inert, true);

		el = document.getElementById('inert-tests-empty');

		proclaim.equal(el.inert, false);
	});

	it('set', function (done) {
		var el = document.getElementById('inert-tests-present');
		// Polyfill.io This needs to be async due to the MutationObserver polyfill being async.
		// MutationObserver polyfill executes in a 30 ms timeout, which is why we run this in a timeout that is longer than 30 ms.
		setTimeout(function() {
			el.inert = false;
			try {
				proclaim.equal(el.inert, false, "expected property access `inert` to be `false` but was " + Object.prototype.toString(el.inert));
				proclaim.equal(el.getAttribute('inert'), null, "expected attribute access `inert` to be `null` but was " + el.getAttribute('inert'));
				done();
			} catch (err) {
				done(err);
			}
		}, 100);
	});
});
