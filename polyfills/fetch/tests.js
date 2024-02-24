/* eslint-env mocha, browser */
/* global proclaim */

// Minimal test to ensure that fetch is included in CI
// TODO : real tests
it('exists', function () {
	proclaim.ok('fetch' in self);
});

if ('URLSearchParams' in self) {
	it('works with URLSearchParams as Request body', function (done) {
		// https://github.com/Financial-Times/polyfill-library/issues/870
		var request = new Request('#', { body: new URLSearchParams({ foo: 'baz' }), method: 'POST' });
		if (!('text' in request)) {
			proclaim.fail('expected "text" function in Request');
			return;
		}

		var text = request.text();
		if (!('then' in text)) {
			proclaim.fail('expected "then" function in text body');
			return;
		}

		text.then(function (x) {
			try {
				proclaim.equal(x, 'foo=baz');
				done();
			} catch (e) {
				done(e);
			}
		});
	});
}

if ('AbortController' in self) {
	it('sets signal on Request instantiation', function () {
		var ctrl = new AbortController();
		ctrl.abort();
		var req = new Request('#', { signal: ctrl.signal });
		proclaim.ok(req.signal);
		proclaim.ok(req.signal.aborted);
	});
}
