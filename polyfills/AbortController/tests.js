/* globals proclaim */

describe('AbortSignal', function () {
	// Because these tests make use of the network, they can be unreliable and fail for reasons outside of the polyfills concern such as a Network Timeout.
	// We increase mocha timeout from 2 seconds to 10 seconds to cater for slow responses.
	// We also retry the tests up to 3 times if they fail, this caters for failed requests.
	this.timeout(10 * 1000);
	this.retries(3);

	it('is a function', function () {
		proclaim.isFunction(AbortSignal);
	});

	it('has correct arity', function () {
		proclaim.arity(AbortSignal, 0);
	});

	// Modified from https://github.com/mo/abortcontroller-polyfill/blob/master/tests/basic.test.js
	describe('basic tests', function () {
		it('Request object has .signal', function () {
			var controller = new AbortController();
			var signal = controller.signal;
			var request = new Request('/', {
				signal: signal
			});
			proclaim.ok(request.signal);
			proclaim.isInstanceOf(request, Request);
		});

		it('abort during fetch', function (done) {
			var controller = new AbortController();
			var signal = controller.signal;
			setTimeout(function () {
				controller.abort();
			}, 500);
			fetch('/sleep?d=1000', {
				signal: signal
			}).then(function () {
				proclaim.isUndefined('Abort during fetch failed.');
			}, function (err) {
				proclaim.deepStrictEqual(err.name, 'AbortError');
				done();
			});
		});

		it('abort during fetch when Request has signal', function (done) {
			var controller = new AbortController();
			var signal = controller.signal;
			setTimeout(function () {
				controller.abort();
			}, 500);
			var request = new Request('/sleep?d=1000', {
				signal: signal
			});
			fetch(request).then(function () {
				proclaim.isUndefined('Abort during fetch failed.');
			}, function (err) {
				proclaim.deepStrictEqual(err.name, 'AbortError');
				done();
			});
		});

		it('abort before fetch started', function (done) {
			var controller = new AbortController();
			controller.abort();
			var signal = controller.signal;
			fetch('/sleep?d=1000', {
				signal: signal
			}).then(function () {
				proclaim.isUndefined('Abort during fetch failed.');
			}, function (err) {
				proclaim.deepStrictEqual(err.name, 'AbortError');
				done();
			});
		});

		it('fetch without aborting', function (done) {
			var controller = new AbortController();
			var signal = controller.signal;
			fetch('/sleep?d=50', {
				signal: signal
			}).then(function () {
				done();
			});
		});

		it('event listener fires "abort" event', function (done) {
			var controller = new AbortController();
			controller.signal.addEventListener('abort', function () {
				done();
			});
			controller.abort();
		});

		it('signal.aborted is true after abort', function (done) {
			var controller = new AbortController();
			controller.signal.addEventListener('abort', function () {
				proclaim.isTrue(controller.signal.aborted);
				done();
			});
			controller.abort();
		});

		it('event listener doesn\'t fire "abort" event after removeEventListener', function (done) {
			setTimeout(function () {
				done();
			}, 200);
			var controller = new AbortController();
			var handlerFunc = function () {
				done('FAIL');
			};
			controller.signal.addEventListener('abort', handlerFunc);
			controller.signal.removeEventListener('abort', handlerFunc);
			controller.abort();
		});

		it('signal.onabort called on abort', function (done) {
			var controller = new AbortController();
			controller.signal.onabort = function () {
				done();
			};
			controller.abort();
		});
	});
});
