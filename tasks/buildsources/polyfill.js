'use strict';

const fs = require('fs');
const path = require('path');
const uglify = require('uglify-js');
const {
	promisify
} = require('util');
const spdxLicenses = require('spdx-licenses');
const UA = require('@financial-times/polyfill-useragent-normaliser');
const TOML = require('@iarna/toml');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const validateSource = require('./validate-source');
const semver = require('semver');

const uaBaselines = UA.getBaselines();
delete uaBaselines.ios_chr; // https://github.com/Financial-Times/polyfill-library/issues/1202#issuecomment-1193403165
const supportedBrowsers = Object.keys(uaBaselines).sort((a, b) => a.localeCompare(b));

/**
 * Polyfill represents a single polyfill directory.
 */
module.exports = class Polyfill {

	/**
	 * new Polyfill
	 * @param  {string} absolute Path to polyfill.
	 * @param  {string} relative Path to polyfill.
	 */
	constructor(absolute, relative) {
		this.path = {
			absolute,
			relative
		};
		this.name = relative.replace(/(\/|\\)/g, '.');
		this.config = {};
		this.sources = {};
	}

	/**
	 * Construct a Polyfill from JSON data.
	 *
	 * @param {any} data JSON data representing a Polyfill.
	 *
	 * @returns {Polyfill|undefined} A Polyfill or undefined when data is invalid.
	 */
	static fromJSON(data) {
		if (!data) {
			return;
		}

		if (!data.path) {
			return;
		}

		const polyfill = new this(data.path.absolute, data.path.relative);

		polyfill.name = data.name;
		polyfill.config = data.config;
		polyfill.sources = data.sources;

		return polyfill;
	}

	/**
	 *  Aliases for the Polyfill.
	 *
	 * @type {Array<string>}
	 */
	get aliases() {
		return ['all', ...(this.config.aliases || [])];
	}

	/**
	 * Depedencies for the Polyfill.
	 *
	 * @type {Array<string>}
	 */
	get dependencies() {
		return this.config.dependencies || [];
	}

	/**
	 * Path to "config.toml".
	 *
	 * @type {string}
	 */
	get configPath() {
		return path.join(this.path.absolute, 'config.toml');
	}

	/**
	 * Path to "detect.js".
	 *
	 * @type {string}
	 */
	get detectPath() {
		return path.join(this.path.absolute, 'detect.js');
	}

	/**
	 * Path to "polyfill.js".
	 *
	 * @type {string}
	 */
	get sourcePath() {
		return path.join(this.path.absolute, 'polyfill.js');
	}

	/**
	 * Path to "tests.js".
	 *
	 * @type {string}
	 */
	get testsPath() {
		return path.join(this.path.absolute, 'tests.js');
	}

	/**
	 * True when a "config.toml" file exists.
	 *
	 * @type {boolean}
	 */
	get hasConfigFile() {
		return fs.existsSync(this.configPath);
	}

	/**
	 * Update internal config after handling source files.
	 */
	updateConfig() {
		this.config.size = this.sources.min.length;
	}

	/**
	 * Load config for Polyfill.
	 * Call this before doing any work with the Polyfill.
	 *
	 * @throws When the Polyfill has missing or invalid config.
	 */
	loadConfig() {
		return readFile(this.configPath)
			.catch(error => {
				throw {
					name: "Invalid config",
					message: `Unable to read config from ${this.configPath}`,
					error
				};
			})
			.then(data => {
				this.config = TOML.parse(data);

				// Each internal polyfill needs to target all supported browsers at all versions.
				if (this.path.relative.startsWith('_') && !supportedBrowsers.every(browser => this.config.browsers[browser] === "*")) {
					const browserSupport = {};
					for (const browser of supportedBrowsers)  browserSupport[browser] = "*";
					throw new Error("Internal polyfill called " + this.name + " is not targeting all supported browsers correctly. It should be: \n" + TOML.stringify(browserSupport));
				}

				if (this.config.browsers) {
					for (const browser of Object.keys(this.config.browsers)) {
						// Must parse as a semver range.
						// This throws on invalid ranges, which in turn fails the build, acting as a smell.
						try {
							new semver.Range(this.config.browsers[browser])
						} catch (_) {
							throw new Error("Polyfill " + this.name + " has an incorrect version range for " + browser + ": " + this.config.browsers[browser]);
						}
					}
				}

				this.config.detectSource = '';
				this.config.baseDir = this.path.relative;

				if ('licence' in this.config) {
					throw new Error(`Incorrect spelling of license property in ${this.name}`);
				}

				this.config.hasTests = fs.existsSync(path.join(this.path.absolute, 'tests.js'));
				this.config.isTestable = !('test' in this.config && 'ci' in this.config.test && this.config.test.ci === false);
				this.config.isPublic = this.name.indexOf('_') !== 0;
			});
	}

	/**
	 * Check if the Polyfill has a License that allows it to be part of polyfill-library.
	 *
	 * @throws When the License isn't ok.
	 */
	checkLicense() {
		if ('license' in this.config) {
			const license = spdxLicenses.spdx(this.config.license);
			if (license) {
				// We allow CC0-1.0 and WTFPL as they are GPL compatible.
				// https://www.gnu.org/licenses/license-list.html#WTFPL
				// https://www.gnu.org/licenses/license-list.en.html#CC0
				if (this.config.license !== 'CC0-1.0' && this.config.license !== 'WTFPL' && !license.OSIApproved) {
					throw new Error(`The license ${this.config.license} (${license.name}) is not OSI approved.`);
				}
			} else {
				throw new Error(`The license ${this.config.license} is not on the SPDX list of licenses ( https://spdx.org/licenses/ ).`);
			}
		}
	}

	/**
	 * Load "detect.js" if it exists and validate.
	 *
	 * @throws When "detect.js" exists but isn't valid.
	 */
	loadDetect() {
		if (fs.existsSync(this.detectPath)) {
			this.config.detectSource = fs.readFileSync(this.detectPath, 'utf8').replace(/\s*$/, '') || '';
			this.config.detectSource = this.minifyDetect(this.config.detectSource).min;
			validateSource(`if (${this.config.detectSource}) true;`, `${this.name} feature detect from ${this.detectPath}`);
		}
	}

	/**
	 * Load "polyfill.js", minify, validate and remove source maps.
	 *
	 * @throws When "polyfill.js" doesn't exists or isn't valid.
	 * @returns {Promise<void>} When done.
	 */
	loadSources() {
		return readFile(this.sourcePath, 'utf8')
			.catch(error => {
				throw {
					name: "Invalid source",
					message: `Unable to read source from ${this.sourcePath}`,
					error
				};
			})
			.then(raw => this.minifyPolyfill(raw))
			.catch(error => {
				throw {
					message: `Error minifying ${this.name}`,
					error
				};
			})
			.then(this.removeSourceMaps)
			.then(sources => {
				this.sources = sources;
			});
	}

	/**
	 * Minify "polyfill.js" and validate.
	 *
	 * @param {string} source Code found in "polyfill.js".
	 * @throws When "polyfill.js" is invalid.
	 * @returns {{raw: string, min: string}}
	 */
	minifyPolyfill(source) {
		const raw = `\n// ${this.name}\n${source}`;

		if (this.config.build && this.config.build.minify === false) {
			// skipping any validation or minification process since
			// the raw source is supposed to be production ready.
			// Add a line break in case the final line is a comment
			return {
				raw: raw + '\n',
				min: source + '\n'
			};
		} else {
			validateSource(source, `${this.name} from ${this.sourcePath}`);

			const minified = uglify.minify(source, {
				compress: {
					keep_fnames: true
				},
				mangle: {},
				output: {
					beautify: false
				}
			});

			return {
				raw,
				min: minified.code
			};
		}
	}

	/**
	 * Minify "detect.js" and validate.
	 *
	 * @param {string} source Code found in "detect.js".
	 * @throws When "detect.js" is invalid.
	 * @returns {{raw: string, min: string}}
	 */
	minifyDetect(source) {
		const raw = `\n// ${this.name}\n${source}`;

		if (this.config.build && this.config.build.minify === false) {
			// skipping any validation or minification process since
			// the raw source is supposed to be production ready.
			// Add a line break in case the final line is a comment
			return {
				raw: raw + '\n',
				min: source + '\n'
			};
		} else {
			validateSource(source, `${this.name} from ${this.sourcePath}`);

			const minified = uglify.minify(source, {
				compress: {
					expression: true,
					keep_fnames: true,
					inline: false,
				},
				mangle: {},
				output: {
					beautify: false,
					semicolons: false
				}
			});

			return {
				raw,
				min: minified.code
			};
		}
	}

	/**
	 * Remove source maps from source code.
	 *
	 * @param {{raw: string, min: string}} source JS source code.
	 * @returns {{raw: string, min: string}} Cleaned source code.
	 */
	removeSourceMaps(source) {
		const re = /^\/\/#\ssourceMappingURL(.+)$/gm;

		return {
			raw: source.raw.replace(re, ''),
			min: source.min.replace(re, '')
		};
	}

	/**
	 * Write processed files to the output directory.
	 *
	 * @param {string} root The output directory.
	 * @returns {Promise<void>} When done.
	 */
	writeOutput(root) {
		const destination = path.join(root, this.name);
		const files = [
			['meta.json', JSON.stringify(this.config)],
			['raw.js', this.sources.raw],
			['min.js', this.sources.min]
		];

		fs.mkdirSync(destination, { recursive: true });

		return Promise.all(files
			.map(([name, contents]) => [path.join(destination, name), contents])
			.map(([path, contents]) => writeFile(path, contents)));
	}
}
