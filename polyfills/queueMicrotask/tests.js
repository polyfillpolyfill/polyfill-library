/* eslint-env mocha, browser */
/* global proclaim Promise*/

describe('queueMicrotask', function() {
	it('is defined as a function in the global scope', function() {
		proclaim.deepStrictEqual(typeof queueMicrotask, 'function');
	});

	it('throws type error if an argument is 0', function() {
		proclaim.throws(function() { queueMicrotask(0) }, TypeError);
	});

	it('throws type error if no argument is supplied', function() {
		proclaim.throws(function() { queueMicrotask() }, TypeError);
	});

	it('throws type error if an argument is undefined', function() {
		proclaim.throws(function() { queueMicrotask(undefined) }, TypeError);
	});

	it('throws type error if an argument is null', function() {
		proclaim.throws(function() { queueMicrotask(null) }, TypeError);
	});

	it('throws type error if an argument is of a String type', function() {
		proclaim.throws(function() { queueMicrotask('test') }, TypeError);
	});

	it('rethrows exceptions from the microtask callback', function(done) {
		var mochaError = self.onerror;
		self.onerror = Function.prototype;
		var taskError;
		self.addEventListener('error', function checkError(event) {
			proclaim.deepStrictEqual(event.error, taskError);
			self.onerror = mochaError;
			self.removeEventListener('error', checkError);
			done();
		});
		queueMicrotask(function () {
			taskError = new Error("uh oh");
			throw taskError;
		});
	});

	it('array elements are inserted in the correct order',  function(done) {
		var testArray = [];
		Promise.resolve().then(function() { testArray.push('1')} );
		queueMicrotask(function () { testArray.push('2') } );
		Promise.resolve().then(function() {
			testArray.push('3');
			try {
				proclaim.deepEqual(testArray, ['1', '2', '3']);
				done();
			} catch (e) {
				done(e);
			}
		})
	});

	it('runs all queued microtasks even if previous ones threw errors',  function(done) {
		var mochaError = self.onerror;
		self.onerror = Function.prototype;
		var testArray = [];
		queueMicrotask(function () { testArray.push('1') } );
		queueMicrotask(function () { throw new Error('oops')} );
		queueMicrotask(function () { testArray.push('2') } );
		Promise.resolve().then(function() {
			testArray.push('3');
			try {
				proclaim.deepEqual(testArray, ['1', '2', '3']);
				self.onerror = mochaError;
				done();
			} catch (e) {
				done(e);
			}
		})
	});

	it('does not pass any arguments to the callback', function() {
		queueMicrotask(function () {
			proclaim.deepStrictEqual(arguments, []);
		}, 1, 2);

	});
});
