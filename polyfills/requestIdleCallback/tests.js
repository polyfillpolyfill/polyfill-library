/* eslint-env mocha, browser */
/* global proclaim */

describe('IdleDeadline', function () {

	it('is defined as a function', function () {
		proclaim.isTypeOf(IdleDeadline, 'function');
	});

	it('throws a type type error when used as a constructor', function () {
		proclaim.throws(function () {
			new IdleDeadline();
		}, TypeError);
	});

	// the prototype didTimeout method should be a getter which throws a type
	// error, except where getters aren't supported return undefined.
	it('has a didTimeout prototype property which throws a type error when getters are supported or undefined otherwise', function () {
		if (Object.prototype.hasOwnProperty.call(Object.prototype, '__defineGetter__')) {
			proclaim.throws(function () {
				return IdleDeadline.prototype.didTimeout;
			}, TypeError);
		} else {
			proclaim.equal(IdleDeadline.prototype.didTimeout, undefined);
		}
	});

	it('has a timeRemaining prototype function which throws a type error', function () {
		proclaim.isTypeOf(IdleDeadline.prototype.timeRemaining, 'function');
		proclaim.throws(IdleDeadline.prototype.timeRemaining, TypeError);
	});

});

describe('requestIdleCallback', function () {

	function sleep(busyFor) {
		busyFor = busyFor + Math.random(); // Prevent Safari while loop optimisation.
		var start = performance.now();
		// eslint-disable-next-line no-empty
		while (performance.now() - start < busyFor) {}
	}

	it('is defined', function () {
		proclaim.isTypeOf(window.requestIdleCallback, 'function');
	});

	it('should return a callback identifier number of "1"', function () {
		var callbackIdentifier = requestIdleCallback(function () { });
		proclaim.isTypeOf(callbackIdentifier, 'number');
		proclaim.equal(callbackIdentifier, 1);
	});

	it('should increment the callback identifier', function () {
		var firstCallbackIdentifier = requestIdleCallback(function () { });
		proclaim.equal(
			requestIdleCallback(function () { }),
			firstCallbackIdentifier + 1
		);
	});

	it('schedules a callback with one IdleDeadline argument passed to the callback', function (done) {
		requestIdleCallback(function (deadline) {
			proclaim.equal(
				arguments.length,
				1,
				'Expected the callback to receive one argument.'
			);

			proclaim.isTrue(deadline instanceof IdleDeadline);

			proclaim.isTypeOf(
				deadline.timeRemaining,
				'function',
				'Expected the callback argument to have a "timeRemaining" function.'
			);
			var timeRemaining = deadline.timeRemaining();
			proclaim.isTypeOf(
				timeRemaining,
				'number',
				'Expected the "timeRemaining" function to return a number (the remaining frame time in milliseconds).'
			);
			proclaim.lessThanOrEqual(
				Math.floor(timeRemaining),
				50,
				'Expected the "timeRemaining" to be less than or equal to 50 but found "' + timeRemaining + '".'
			);
			proclaim.isTypeOf(
				deadline.didTimeout,
				'boolean',
				'Expected the callback argument to have a  boolean "didTimeout" property.'
			);
			done();
		});
	});

	it('schedules multiple callbacks', function (done) {
		var a = 0;
		var testTimeout = setTimeout(function () {
			done(new Error('Expected two "requestIdleCallback" callbacks to have run.'));
		}, 500);
		var incrementA = function () {
			a = a + 1;
			// Expect "incrementA" to be called twice.
			if (a === 2) {
				clearTimeout(testTimeout);
				done();
			}
		};
		requestIdleCallback(incrementA);
		requestIdleCallback(incrementA);
	});

	it('schedules callbacks when requestAnimationFrame is suspended', function (done) {
		// Remove `requestAnimationFrame` so it cannot be relied on
		// to schedule idle callbacks. For example, if the browser is minimised
		// `requestAnimationFrame` might not be called.
		var requestAnimationFrameBackup = window.requestAnimationFrame;
		window.requestAnimationFrame = function(){};

		var testTimeout = setTimeout(function () {
			window.requestAnimationFrame = requestAnimationFrameBackup;
			done(new Error('Expected "requestIdleCallback" callback to have run.'));
		}, 500);

		requestIdleCallback(function () {
			window.requestAnimationFrame = requestAnimationFrameBackup;
			clearTimeout(testTimeout);
			done();
		});
	});

	it('scheduled callbacks are called in order', function (done) {
		var a = 0;
		var end = 10;
		var assertIncrement = function (i) {
			proclaim.equal(a, i);
			a = a + 1;
			if(end == i) {
				done();
			}
		};

		var createIdleCallback = function (i) {
			requestIdleCallback(function () {
				assertIncrement(i);
			});
		};

		for (var i = 0; i <= end; i++) {
			createIdleCallback(i);
		}
	});

	it('schedules callbacks with an expired timeout first regardless of order', function (done) {
		var a = 0;
		var busyFor = 40;
		var timeout = 20;

		requestIdleCallback(function () {
			a = 1;
		});

		// Although scheduled second, this should run first due to its timeout.
		requestIdleCallback(function () {
			proclaim.equal(a, 0);
			done();
		}, { timeout: timeout });

		requestIdleCallback(function () {
			a = 2;
		});

		// Keep the event loop busy.
		sleep(busyFor);
	});

	it('schedules callbacks with an expired timeout in order of their timeout', function (done) {
		var a = 0;
		var busyFor = 40;
		var timeout = 20;

		// Should run first, as its timeout expires first.
		requestIdleCallback(function () {
			a++;
		}, { timeout: timeout + 1 });

		// Should run last, as its timeout expires last.
		requestIdleCallback(function () {
			a++;
			proclaim.equal(a, 3);
			done();
		}, { timeout: timeout + 3 });

		// Should run second, as its timeout expires second.
		requestIdleCallback(function () {
			a++;
		}, { timeout: timeout + 2 });

		// Keep the event loop busy.
		sleep(busyFor);
	});

	it('schedules nested callbacks to run in different idle periods', function (done) {
		var rafTime = 10;
		requestIdleCallback(function () {
			var first = performance.now();
			window.requestAnimationFrame(function () {
				sleep(rafTime);
			});
			requestIdleCallback(function () {
				var second = performance.now();
				// Assert the nested idle callback is not immediately
				// after the first.
				proclaim.greaterThan(second - first, rafTime);
				done();
			});
		});
	});

	it('schedules a callback for the next idle period when the current idle deadline has passed', function (done) {
		var rafTime = 10;
		var busy = 55;
		var first;

		// First idle callback.
		requestIdleCallback(function () {
			window.requestAnimationFrame(function() {
				sleep(rafTime);
			});
			sleep(busy); // Keep the callback busy past this idle period's deadline.
			first = performance.now();
		});

		// Second idle callback.
		requestIdleCallback(function () {
			var second = performance.now();
			// Expected the first idle callback to have finished.
			proclaim.isTypeOf(first, 'number');
			// Assert the second idle callback is not run immediately
			// after the first as it overrun the frame deadline.
			proclaim.greaterThan(second - first, rafTime);
			done();
		});
	});

	it('schedules a callback for the same idle period when the event loop is busy but the callbacks\'s timeout has expired', function (done) {
		var raf = 20;
		var busy = 55;
		var first;

		// First idle callback.
		requestIdleCallback(function () {
			first = performance.now();
			window.requestAnimationFrame(function () {
				sleep(raf);
			});
		}, { timeout: 10 });

		// Second idle callback.
		requestIdleCallback(function () {
			var second = performance.now();
			// Expected the first idle callback to have finished.
			proclaim.isTypeOf(first, 'number');
			// Assert the second idle callback is not run immediately
			// after the first as it overrun the frame deadline.
			proclaim.lessThan(second - first, raf);
			done();
		}, { timeout: 30 });

		sleep(busy);
	});

	it('sets the callback\'s deadline "didTimeout" property to true when the callback\'s timeout is exceeded', function (done) {
		var timeout = 25;
		var busyFor = 50;

		requestIdleCallback(function (deadline) {
			proclaim.isTrue(deadline.didTimeout);
			done();
		}, { timeout: timeout });

		// Keep the even loop busy so the idle callback's timeout expires.
		sleep(busyFor);
	});

	it('sets the callback\'s deadline "didTimeout" property to false when the callback\'s timeout is not exceeded or set', function (done) {
		var timeout = 1000;
		var busyFor = 50;

		requestIdleCallback(function (deadline) {
			proclaim.isFalse(deadline.didTimeout);
		}, { timeout: timeout });

		requestIdleCallback(function (deadline) {
			proclaim.isFalse(deadline.didTimeout);
			done();
		});

		// Samsung Galaxy Tab 4, 4.4: android-4_4 did not appear to consistently
		// call the above idle callback without spinning an animation frame.
		window.requestAnimationFrame(function () {
		});

		// Keep the even loop busy but not longer than the timeout.
		sleep(busyFor);
	});
});

describe('cancelIdleCallback', function () {
	it('is defined"', function () {
		proclaim.isTypeOf(window.cancelIdleCallback, 'function');
	});

	it('should throw a type error if given no arguments', function () {
		proclaim.throws(cancelIdleCallback, TypeError);
	});

	it('cancels an idle callback', function (done) {
		var callback = requestIdleCallback(function () {
			done(new Error('The canceled idle callback should not be called.'));
		});
		cancelIdleCallback(callback);
		setTimeout(function () {
			done();
		}, 200);
	});

	it('cancels an idle callback for the current idle period', function (done) {
		requestIdleCallback(function () {
			var nestedCallback = requestIdleCallback(function () {
				done(new Error('The canceled idle callback should not be called.'));
			});
			cancelIdleCallback(nestedCallback);
		});
		setTimeout(function () {
			done();
		}, 300);
	});

	it('does nothing if there is no idle callback to cancel', function () {
		// Try to cancel with a random number that doesn't match a idle callback id.
		cancelIdleCallback(Math.round(Math.random() * 100000));
	});

	it('does nothing if the idle callback to cancel is executing', function (done) {
		var handle = requestIdleCallback(function () {
			cancelIdleCallback(handle);
			done(); //Should reach this point. The test will timeout if not.
		});
		// Samsung Galaxy Tab 4, 4.4: android-4_4 did not appear to consistently
		// call the above idle callback without spinning an animation frame.
		window.requestAnimationFrame(function() {
		});
	});

	it('should return undefined', function () {
		proclaim.equal(cancelIdleCallback(0), undefined);
	});
});
