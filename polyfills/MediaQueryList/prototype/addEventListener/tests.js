/* eslint-env mocha, browser */
/* global proclaim */

it("should define the EventTarget methods on the MediaQueryList prototype", function() {
	proclaim.ok('addEventListener' in (self.matchMedia('(min-width: 1px)')));
	proclaim.ok('removeEventListener' in (self.matchMedia('(min-width: 1px)')));
});


// WPT
// We can only test these behaviors with native `matchMedia` as iframes don't trigger resize events.
if (typeof (self.matchMedia('(min-width: 1px)').listeners) === 'undefined') {
	describe('WPT (with native matchMedia)', function () {
		// Uses network calls in iframes, this can fail.
		// Adding retries reduces test flakiness.
		this.retries(2);

		var IFRAME_DEFAULT_SIZE = "200";
		var iframes = {};

		var cleanup = [];
		afterEach(function () {
			for (var i = 0; i < cleanup.length; i++) {
				cleanup[i]();
			}
			cleanup = [];
		});

		// helpers are defined with `var` so they are globally accessible
		function createMQL(cb, cbErr) {
			createIFrame(function (iframe) {
				try {
					var mql = iframe.contentWindow.matchMedia('(max-width: ' + IFRAME_DEFAULT_SIZE + 'px)');
					proclaim.ok(mql.matches);
					iframes[mql] = iframe;
					cb(mql);
				} catch (err) {
					cbErr(err);
				}
			}, cbErr);
		}

		function createIFrame(cb, cbErr) {
			try {
				var width = IFRAME_DEFAULT_SIZE;
				var height = IFRAME_DEFAULT_SIZE;

				proclaim.ok(document.body);

				var iframe = document.createElement("iframe");
				iframe.src = document.getElementById('test-iframe-src').getAttribute('content');
				iframe.width = String(width);
				iframe.height = String(height);
				iframe.style.border = "none";

				cleanup.push(function () {
					document.body.removeChild(iframe);
				});

				iframe.addEventListener("load", function () {
					try {
						iframe.contentDocument.body.offsetWidth; // reflow
						cb(iframe);
					} catch (err) {
						cbErr(err);
					}
				});

				document.body.appendChild(iframe);
			} catch (err) {
				cbErr(err);
			}
		}

		function triggerMQLEvent(mql) {
			var iframe = iframes[mql];
			proclaim.ok(iframe);

			if (iframe.width === IFRAME_DEFAULT_SIZE) {
				iframe.width = "250";
			} else {
				iframe.width = IFRAME_DEFAULT_SIZE;
			}

			iframe.contentDocument.body.offsetWidth; // reflow
		}

		function waitForChangesReported(cb) {
			if ('requestAnimationFrame' in self) {
				requestAnimationFrame(function () {
					requestAnimationFrame(function () {
						cb();
					});
				});
			} else {
				setTimeout(function () {
					cb();
				}, 500);
			}
		}

		it("calls listeners added through addListener", function (done) {
			createMQL(function (mql) {
				var calls = 0;
				var listener = function () {
					calls++;
				};

				mql.addListener(listener);

				triggerMQLEvent(mql);

				waitForChangesReported(function () {
					try {
						proclaim.equal(calls, 1);
						done();
					} catch (err) {
						done(err);
					}
				});
			}, done);
		});

		it("calls listeners added through addEventListener", function (done) {
			createMQL(function (mql) {
				var calls = 0;
				var listener = function () {
					calls++;
				};

				mql.addEventListener('change', listener);

				triggerMQLEvent(mql);

				waitForChangesReported(function () {
					try {
						proclaim.equal(calls, 1);
						done();
					} catch (err) {
						done(err);
					}
				});
			}, done);
		});

		it("calls listeners once that are added with addListener and addEventListener", function (done) {
			createMQL(function (mql) {
				var calls = 0;
				var listener = {
					handleEvent: function handleEvent() {
						calls++;
					}
				};

				mql.addListener(listener);
				mql.addEventListener('change', listener);

				triggerMQLEvent(mql);

				waitForChangesReported(function () {
					try {
						proclaim.equal(calls, 1);
						done();
					} catch (err) {
						done(err);
					}
				});
			}, done);
		});

		it("removes listener added with addListener through removeEventListener", function (done) {
			createMQL(function (mql) {
				var calls = 0;
				var listener = {
					handleEvent: function handleEvent() {
						calls++;
					}
				};

				mql.addListener(listener);
				mql.removeEventListener('change', listener);

				triggerMQLEvent(mql);

				waitForChangesReported(function () {
					try {
						proclaim.equal(calls, 0);
						done();
					} catch (err) {
						done(err);
					}
				});
			}, done);
		});

		it("removes listener added with addEventListener through removeListener", function (done) {
			createMQL(function (mql) {
				var calls = 0;
				var listener = {
					handleEvent: function handleEvent() {
						calls++;
					}
				};

				mql.addEventListener('change', listener);
				mql.removeListener(listener);

				triggerMQLEvent(mql);

				waitForChangesReported(function () {
					try {
						proclaim.equal(calls, 0);
						done();
					} catch (err) {
						done(err);
					}
				});
			}, done);
		});

		it("does not call listeners of other types", function (done) {
			createMQL(function (mql) {
				var calls = 0;
				var listener = function () {
					calls++;
				};

				mql.addEventListener('matches', listener);

				triggerMQLEvent(mql);

				waitForChangesReported(function () {
					try {
						proclaim.equal(calls, 0);
						done();
					} catch (err) {
						done(err);
					}
				});
			}, done);
		});

		it("respects once", function (done) {
			createMQL(function (mql) {
				var calls = 0;
				var listener = function () {
					calls++;
				};

				mql.addEventListener('change', listener, { once: true });

				triggerMQLEvent(mql);
				waitForChangesReported(function () {
					try {
						proclaim.equal(calls, 1);

						triggerMQLEvent(mql);
						waitForChangesReported(function () {
							try {
								proclaim.equal(calls, 1);
								done();
							} catch (err) {
								done(err);
							}
						});

					} catch (err) {
						done(err);
					}
				});
			}, done);
		});

		it("adds a listener through onchange", function (done) {
			createMQL(function (mql) {
				var _event;
				mql.onchange = function (event) {
					_event = event;
				};

				triggerMQLEvent(mql);
				waitForChangesReported(function () {
					try {
						proclaim.ok(_event);
						proclaim.equal(_event.media, mql.media);
						proclaim.equal(_event.matches, mql.matches);
						done();
					} catch (err) {
						done(err);
					}
				});
			}, done);
		});

		it("removes a listener through onchange", function (done) {
			createMQL(function (mql) {
				var calls = 0;
				mql.onchange = function () {
					calls++;
				};

				triggerMQLEvent(mql);
				waitForChangesReported(function () {
					try {
						proclaim.equal(calls, 1);

						mql.onchange = null;

						triggerMQLEvent(mql);
						waitForChangesReported(function () {
							try {
								proclaim.equal(calls, 1);
								done();
							} catch (err) {
								done(err);
							}
						});

					} catch (err) {
						done(err);
					}
				});
			}, done);
		});

		it("does not remove an onchange listener through removeEventListener", function (done) {
			createMQL(function (mql) {
				var calls = 0;
				mql.onchange = function () {
					calls++;
				};

				mql.removeEventListener('change', mql.onchange);

				triggerMQLEvent(mql);
				waitForChangesReported(function () {
					try {
						proclaim.equal(calls, 1);
						done();
					} catch (err) {
						done(err);
					}
				});
			}, done);
		});
	});
} else {
	describe('WPT (with polyfilled matchMedia)', function () {
		it("adds listeners through addListener", function () {
			var mql = window.matchMedia('(min-width: 1px)');
			var listener = function () {
				/* noop */
			};

			mql.addListener(listener);
			proclaim.ok(mql.listeners.indexOf(listener) !== -1);
		});

		it("adds listeners through addEventListener", function () {
			var mql = window.matchMedia('(min-width: 1px)');
			var listener = function () {
				/* noop */
			};

			mql.addEventListener('change', listener);
			proclaim.ok(mql.listeners.indexOf(listener) !== -1);
		});

		it("calls listeners once that are added with addListener and addEventListener", function () {
			var mql = window.matchMedia('(min-width: 1px)');
			var listener = {
				handleEvent: function () {
					/* noop */
				}
			};

			mql.addListener(listener);
			mql.addEventListener('change', listener);
			proclaim.ok(mql.listeners.indexOf(listener.handleEvent) !== -1);
			proclaim.equal(mql.listeners.length, 1);
		});

		it("removes listener added with addListener through removeEventListener", function () {
			var mql = window.matchMedia('(min-width: 1px)');
			var listener = {
				handleEvent: function () {
					/* noop */
				}
			};

			mql.addListener(listener);
			mql.removeEventListener('change', listener);
			proclaim.ok(mql.listeners.indexOf(listener.handleEvent) === -1);
			proclaim.equal(mql.listeners.length, 0);
		});

		it("removes listener added with addEventListener through removeListener", function () {
			var mql = window.matchMedia('(min-width: 1px)');
			var listener = function () {
					/* noop */
				};

			mql.addEventListener('change', listener);
			mql.removeListener(listener);
			proclaim.ok(mql.listeners.indexOf(listener) === -1);
			proclaim.equal(mql.listeners.length, 0);
		});

		it("does not call listeners of other types", function () {
			var mql = window.matchMedia('(min-width: 1px)');
			var listener = function () {
					/* noop */
				};

			mql.addEventListener('matches', listener);
			proclaim.ok(mql.listeners.indexOf(listener) === -1);
			proclaim.equal(mql.listeners.length, 0);
		});

		it("adds a listener through onchange", function () {
			var mql = window.matchMedia('(min-width: 1px)');
			var listener = function () {
					/* noop */
				};

			mql.onchange = listener;

			proclaim.equal(mql.listeners.length, 1);
		});

		it("does not remove an onchange listener through removeEventListener", function () {
			var mql = window.matchMedia('(min-width: 1px)');
			var listener = function () {
					/* noop */
				};

			mql.onchange = listener;
			mql.removeEventListener('change', listener);

			proclaim.equal(mql.listeners.length, 1);
		});
	});
}
