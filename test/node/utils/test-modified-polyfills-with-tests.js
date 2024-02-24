'use strict';

const {assert} = require('chai');
const { polyfillsWithTestsFrom } = require('../../utils/modified-polyfills-with-tests');


describe("polyfills subset for tests based on git changes", function () {
	it("should test everything on non-polyfill changes", async () => {
		const modified = await polyfillsWithTestsFrom(['foo'], ['a.polyfill'], { 'a.polyfill': {} });
		assert.ok(modified.testEverything);
	});

	it("should test everything on non-polyfill changes in the polyfill directory", async () => {
		const modified = await polyfillsWithTestsFrom(['polyfills/foo'], ['a.polyfill'], { 'a.polyfill': {} });
		assert.ok(modified.testEverything);
	});

	it("should test everything if a polyfill was deleted", async () => {
		const modified = await polyfillsWithTestsFrom(['polyfills/a/polyfill'], ['b.polyfill'], { 'b.polyfill': {} });
		assert.ok(modified.testEverything);
	});

	it("should test a subset on a small change in polyfills directory", async () => {
		const modified = await polyfillsWithTestsFrom(
			['polyfills/a/polyfill/polyfill.js'],
			['a.polyfill', 'b.polyfill'],
			{
				'a.polyfill': {
					hasTests: true,
				},
				'b.polyfill': {
					hasTests: true,
				}
			}
		);

		assert.ok(!modified.testEverything);

		assert.deepEqual(modified.polyfills, {
			'a.polyfill': {
				hasTests: true,
			}
		});

		assert.deepEqual(modified.affectedPolyfills, {
			'a.polyfill': {
				hasTests: true,
			}
		});
	});

	it("should include polyfill dependants", async () => {
		const modified = await polyfillsWithTestsFrom(
			['polyfills/a/polyfill/polyfill.js'],
			['a.polyfill', 'b.polyfill'],
			{
				'a.polyfill': {
					hasTests: true
				},
				'b.polyfill': {
					hasTests: true,
					dependencies: ['a.polyfill']
				}
			}
		);

		assert.ok(!modified.testEverything);

		assert.deepEqual(modified.polyfills, {
			'a.polyfill': {
				hasTests: true,
			}
		});

		assert.deepEqual(modified.affectedPolyfills, {
			'a.polyfill': {
				hasTests: true
			},
			'b.polyfill': {
				hasTests: true,
				dependencies: ['a.polyfill']
			}
		});
	});

	it("should include polyfill dependants, even when the graph has gaps in tests", async () => {
		const modified = await polyfillsWithTestsFrom(
			['polyfills/a/polyfill/polyfill.js'],
			['a.polyfill', 'b.polyfill', 'c.polyfill'],
			{
				'a.polyfill': {
					hasTests: true
				},
				'b.polyfill': {
					hasTests: false,
					dependencies: ['a.polyfill']
				},
				'c.polyfill': {
					hasTests: true,
					dependencies: ['b.polyfill']
				}
			}
		);

		assert.ok(!modified.testEverything);

		assert.deepEqual(modified.polyfills, {
			'a.polyfill': {
				hasTests: true,
			}
		});

		assert.deepEqual(modified.affectedPolyfills, {
			'a.polyfill': {
				hasTests: true
			},
			'c.polyfill': {
				hasTests: true,
				dependencies: ['b.polyfill']
			}
		});
	});

	it("should skip polyfills without tests", async () => {
		const modified = await polyfillsWithTestsFrom(
			['polyfills/a/polyfill/polyfill.js'],
			['a.polyfill', 'b.polyfill'],
			{
				'a.polyfill': {
					hasTests: false,
				},
				'b.polyfill': {
					hasTests: true,
				}
			}
		);

		assert.ok(modified.testEverything);

		assert.deepEqual(modified.polyfills, {
			'a.polyfill': {
				hasTests: false,
			}
		});

		assert.deepEqual(modified.affectedPolyfills, {});
	});

	it("should skip polyfills without tests but include it's dependants", async () => {
		const modified = await polyfillsWithTestsFrom(
			['polyfills/a/polyfill/polyfill.js'],
			['a.polyfill', 'b.polyfill'],
			{
				'a.polyfill': {
					hasTests: false
				},
				'b.polyfill': {
					hasTests: true,
					dependencies: ['a.polyfill']
				}
			}
		);

		assert.ok(!modified.testEverything);

		assert.deepEqual(modified.polyfills, {
			'a.polyfill': {
				hasTests: false,
			}
		});

		assert.deepEqual(modified.affectedPolyfills, {
			'b.polyfill': {
				hasTests: true,
				dependencies: ['a.polyfill']
			}
		});
	});
});
