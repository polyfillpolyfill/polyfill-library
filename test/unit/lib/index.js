'use strict';

const {assert} = require('chai');
const mockery = require('mockery');
const setsToArrays = require('../../utils/sets-to-arrays');

describe("polyfillio", () => {
	const packageMock = {};
	let fs;
	let path;
	let toposort;
	let UA;
	let sourceslib;
	let handlebars;
	let streamFromPromise;
	let from2String;
	let merge2;
	let streamToString;

	beforeEach(() => {
		fs = require('../mock/graceful-fs.mock');
		mockery.registerMock('graceful-fs', fs);

		path = require('../mock/path.mock');
		mockery.registerMock('path', path);

		toposort = require('../mock/toposort.mock');
		mockery.registerMock('toposort', toposort);

		UA = require('../mock/ua.mock');
		mockery.registerMock('@financial-times/polyfill-useragent-normaliser', UA);

		sourceslib = require('../mock/sources.mock');
		mockery.registerMock('./sources', sourceslib);

		mockery.registerMock('package', packageMock);

		handlebars = require('../mock/handlebars.mock');
		mockery.registerMock('handlebars', handlebars);

		streamFromPromise = require('../mock/stream-from-promise.mock');
		mockery.registerMock('stream-from-promise', streamFromPromise);

		from2String = require('../mock/from2-string.mock');
		mockery.registerMock('from2-string', from2String);

		merge2 = require('../mock/merge2.mock');
		mockery.registerMock('merge2', merge2);

		streamToString = require('../mock/stream-to-string.mock');
		mockery.registerMock('stream-to-string', streamToString);

	});

	describe('exported property/properties', () => {
		it('is an object', () => {
			assert.isObject(require('../../../lib'));
		});

		it('describePolyfill is an exported function', () => {
			const polyfillio = require('../../../lib');
			assert.isFunction(polyfillio.describePolyfill);
		});

		it('listAllPolyfills is an exported function', () => {
			const polyfillio = require('../../../lib');
			assert.isFunction(polyfillio.listAllPolyfills);
		});

		it('listAliases is an exported function', () => {
			const polyfillio = require('../../../lib');
			assert.isFunction(polyfillio.listAliases);
		});

		it('getPolyfills is an exported function', () => {
			const polyfillio = require('../../../lib');
			assert.isFunction(polyfillio.getPolyfills);
		});

		it('getPolyfillString is an exported function', () => {
			const polyfillio = require('../../../lib');
			assert.isFunction(polyfillio.getPolyfillString);
		});

		it('normalizeUserAgent is an exported function', () => {
			const polyfillio = require('../../../lib');
			assert.isFunction(polyfillio.normalizeUserAgent);
		});
	});

	describe('.listAllPolyfills()', () => {
		it('calls and returns sourceslib.listPolyfills() without passing argument', () => {
			const polyfillio = require('../../../lib');
			sourceslib.listPolyfills.resolves('return value for sourceslib.listPolyfills');
			return polyfillio.listAllPolyfills('test').then(result => {
				assert.equal(result, 'return value for sourceslib.listPolyfills');
				assert.calledOnce(sourceslib.listPolyfills);
				assert.neverCalledWith(sourceslib.listPolyfills, 'test');
			});
		});
	});

	describe('.describePolyfill()', () => {
		it('calls and returns sourceslib.getPolyfillMeta() with passed argument', () => {
			const polyfillio = require('../../../lib');

			sourceslib.getPolyfillMeta.resolves('return value for sourceslib.getPolyfillMeta');
			return polyfillio.describePolyfill('test')
				.then(result => {
					assert.equal(result, 'return value for sourceslib.getPolyfillMeta');
					assert.calledOnce(sourceslib.getPolyfillMeta);
					assert.calledWithExactly(sourceslib.getPolyfillMeta, 'test');
				});
		});
	});

	describe('.normalizeUserAgent()', () => {
		it('calls and returns UA.normalize() with passed argument and UA', () => {
			const polyfillio = require('../../../lib');
			UA.normalize.returns('return value for UA.normalize');
			assert.equal(polyfillio.normalizeUserAgent('test'), 'return value for UA.normalize');
			assert.calledOnce(UA.normalize);
			assert.calledWithExactly(UA.normalize, 'test');
		});
	});

	describe('.getOptions(opts)', () => {
		it('returns the default options if called without any arguments', () => {
			const polyfillio = require('../../../lib');
			assert.deepStrictEqual(polyfillio.getOptions(), {
				callback: false,
				uaString: '',
				minify: true,
				unknown: 'polyfill',
				features: {},
				excludes: [],
				rum: false
			});
		});

		it('does not assign a default value if the property exists in the argument', () => {
			const polyfillio = require('../../../lib');
			assert.deepStrictEqual(polyfillio.getOptions({}), {
				callback: false,
				uaString: '',
				minify: true,
				unknown: 'polyfill',
				features: {},
				excludes: [],
				rum: false
			});
			assert.deepStrictEqual(polyfillio.getOptions({
				callback: 'app'
			}), {
				callback: 'app',
				uaString: '',
				minify: true,
				unknown: 'polyfill',
				features: {},
				excludes: [],
				rum: false
			});
			assert.deepStrictEqual(polyfillio.getOptions({
				callback: ''
			}), {
				callback: false,
				uaString: '',
				minify: true,
				unknown: 'polyfill',
				features: {},
				excludes: [],
				rum: false
			});
			assert.deepStrictEqual(polyfillio.getOptions({
				callback: 'hello world'
			}), {
				callback: false,
				uaString: '',
				minify: true,
				unknown: 'polyfill',
				features: {},
				excludes: [],
				rum: false
			});
			assert.deepStrictEqual(polyfillio.getOptions({
				uaString: 'example'
			}), {
				callback: false,
				uaString: 'example',
				minify: true,
				unknown: 'polyfill',
				features: {},
				excludes: [],
				rum: false
			});
			assert.deepStrictEqual(polyfillio.getOptions({
				minify: false
			}), {
				callback: false,
				uaString: '',
				minify: false,
				unknown: 'polyfill',
				features: {},
				excludes: [],
				rum: false
			});
			assert.deepStrictEqual(polyfillio.getOptions({
				unknown: 'ignore'
			}), {
				callback: false,
				uaString: '',
				minify: true,
				unknown: 'ignore',
				features: {},
				excludes: [],
				rum: false
			});
			assert.deepStrictEqual(polyfillio.getOptions({
				features: {
					'Array.of': {}
				}
			}), {
				callback: false,
				uaString: '',
				minify: true,
				unknown: 'polyfill',
				features: {
					'Array.of': {
						flags: new Set
					}
				},
				excludes: [],
				rum: false
			});
			assert.deepStrictEqual(polyfillio.getOptions({
				excludes: ['Array.of']
			}), {
				callback: false,
				uaString: '',
				minify: true,
				unknown: 'polyfill',
				features: {},
				excludes: ['Array.of'],
				rum: false
			});
			assert.deepStrictEqual(polyfillio.getOptions({
				rum: true
			}), {
				callback: false,
				uaString: '',
				minify: true,
				unknown: 'polyfill',
				features: {},
				excludes: [],
				rum: true
			});
		});

		it('converts feature flag Arrays into Sets', () => {
			const polyfillio = require('../../../lib');
			assert.deepStrictEqual(polyfillio.getOptions({
				features: {
					'Array.from': {
						flags: ['a', 'b', 'c']
					}
				}
			}), {
				callback: false,
				uaString: '',
				minify: true,
				unknown: 'polyfill',
				features: {
					'Array.from': {
						flags: new Set(['a', 'b', 'c'])
					}
				},
				excludes: [],
				rum: false
			});
		});
	});

	describe('.getPolyfills()', () => {

		it('issue 1137 - does not error for properties which exist directly on Object.prototype', async () => {
			const polyfillio = require('../../../lib');
			const options = {
				features: {
					'constructor': {},
					'__defineGetter__': {},
					'__defineSetter__': {},
					'hasOwnProperty': {},
					'__lookupGetter__': {},
					'__lookupSetter__': {},
					'isPrototypeOf': {},
					'propertyIsEnumerable': {},
					'toString': {},
					'valueOf': {},
					'__proto__': {},
					'toLocaleString': {},
				},
				uaString: 'ie/9'
			};
			try {
				await polyfillio.getPolyfills(options);
			} catch (error) {
				assert.fail(error, undefined, `Expected 'await polyfillio.getPolyfills(options)' to not throw an error but it threw "${error.message}"  -- ${error.stack}`)
			}
		});

		describe('when options.uaString is not set', () => {
			it('calls UA with options.uAString set to an empty string', () => {
				const polyfillio = require('../../../lib');
				const options = {};
				return polyfillio.getPolyfills(options).then(() => {
					assert.calledWithExactly(UA, '');
				});
			});
		});

		describe('when options.uaString is set', () => {
			it('calls UA with options.uAString', () => {
				const polyfillio = require('../../../lib');
				const options = {
					uaString: 'chrome/38'
				};
				return polyfillio.getPolyfills(options).then(() => {
					assert.calledWithExactly(UA, 'chrome/38');
				});
			});
		});

		it("should remove features not appropriate for the current UA", () => {
			sourceslib.getPolyfillMeta.resolves({
				"browsers": {
					"ie": "6 - 8"
				}
			});
			UA.mockUAInstance.getFamily.returns('ie');
			UA.mockUAInstance.satisfies.returns(false);

			const polyfillio = require('../../../lib');

			const options = {
				features: {
					'Array.prototype.map': {}
				},
				uaString: 'ie/9'
			};

			return polyfillio.getPolyfills(options).then(result => {
				assert.deepEqual(setsToArrays(result), {});
			});
		});

		it("should respect the always flag", () => {
			sourceslib.getPolyfillMeta.resolves({
				"browsers": {
					"ie": "6 - 8"
				}
			});
			UA.mockUAInstance.getFamily.returns('ie');
			UA.mockUAInstance.satisfies.returns(false);

			const polyfillio = require('../../../lib');

			const input = {
				features: {
					'Array.prototype.map': {
						flags: new Set(['always'])
					}
				},
				uaString: 'ie/9'
			};
			const expectedResult = {
				'Array.prototype.map': {
					flags: ['always'],
					aliasOf: [],
					dependencyOf: []
				}
			};
			return polyfillio.getPolyfills(input).then(result => {
				assert.deepEqual(setsToArrays(result), expectedResult);
			});
		});

		it("should include dependencies", () => {
			sourceslib.getPolyfillMeta.withArgs('Element.prototype.placeholder').resolves({
				"dependencies": ["setImmediate", "Event"],
				"browsers": {
					"ie": "*"
				}
			});
			sourceslib.getPolyfillMeta.withArgs('setImmediate').resolves({
				"dependencies": [],
				"browsers": {
					"ie": "*"
				}
			});
			sourceslib.getPolyfillMeta.withArgs('Array.isArray').resolves({
				"dependencies": [],
				"browsers": {
					"ie": "*"
				}
			});
			sourceslib.getPolyfillMeta.withArgs('Event').resolves({
				"dependencies": [],
				"browsers": {
					"ie": "*"
				}
			});

			UA.mockUAInstance.getFamily.returns('ie');
			UA.mockUAInstance.satisfies.returns(true);

			const polyfillio = require('../../../lib');

			const input = {
				features: {
					'Element.prototype.placeholder': {
						flags: new Set()
					}
				},
				uaString: 'ie/8'
			};

			return polyfillio.getPolyfills(input).then((polyfills) => {
				const polyfillNames = Object.keys(polyfills)
				assert.deepEqual(polyfillNames, [
					"Element.prototype.placeholder",
					"setImmediate",
					"Event"
				]);
			});
		});
	});
});
