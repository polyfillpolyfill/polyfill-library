
# Polyfill-library &middot; [![license][license-badge]][license] [![PRs Welcome][pull-requests-badge]][contributing-guide]

> NodeJS module to create polyfill bundles tailored to individual user-agents

## Install

```bash
npm install polyfill-library --save
```

## Usage

```javascript
const polyfillLibrary = require('polyfill-library');

const polyfillBundle = polyfillLibrary.getPolyfillString({
	uaString: 'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)',
	minify: true,
	features: {
		'es6': { flags: ['gated'] }
	}
}).then(function(bundleString) {
	console.log(bundleString);
});
```

## API

### `polyfillLibrary.listAllPolyfills()`

Get a list of all the polyfills which exist within the collection of polyfill sources.

Returns a Promise which resolves with an array of all the polyfills within the collection.

### `polyfillLibrary.describePolyfill(featureName)`

Get the metadata for a specific polyfill within the collection of polyfill sources.

- `@param {String} featureName` - The name of a polyfill whose metadata should be returned.

Returns a Promise which resolves with the metadata or with `undefined` if no metadata exists for the polyfill.

### `polyfillLibrary.getOptions(opts = {})`

Create an options object for use with `getPolyfills` or `getPolyfillString`.

- `@param {object} opts` - Valid keys are uaString, minify, unknown, excludes, rum and features.
- `@param {Boolean} [opts.minify=true]` - Whether to return the minified or raw implementation of the polyfills.
- `@param {'ignore'|'polyfill'} [opts.unknown='polyfill']` - Whether to return all polyfills or no polyfills if the user-agent is unknown or unsupported.
- `@param {Object} [opts.features={}]` - Which features should be returned if the user-agent does not support them natively.
- `@param {Array<String>} [opts.excludes=[]]` - Which features should be excluded from the returned object.
- `@param {String} [opts.uaString='']` - The user-agent string to check each feature against.
- `@param {Boolean} [opts.rum=false]` - Whether to include a script that reports anonymous usage data in the polyfill bundle.

Returns an object which has merged `opts` with the defaults option values.

### `polyfillLibrary.getPolyfills(opts)`

Given a set of features that should be polyfilled in 'opts.features' (with flags i.e. `{<featurename>: {flags:Set[<flaglist>]}, ...}`), determine which have a configuration valid for the given opts.uaString, and return a promise of set of canonical (unaliased) features (with flags) and polyfills.

- `@param {object} opts` - Valid keys are uaString, minify, unknown, excludes, rum and features.
- `@param {Boolean} [opts.minify=true]` - Whether to return the minified or raw implementation of the polyfills.
- `@param {'ignore'|'polyfill'} [opts.unknown='polyfill']` - Whether to return all polyfills or no polyfills if the user-agent is unknown or unsupported.
- `@param {Object} [opts.features={}]` - Which features should be returned if the user-agent does not support them natively.
- `@param {Array<String>} [opts.excludes=[]]` - Which features should be excluded from the returned object.
- `@param {String} [opts.uaString='']` - The user-agent string to check each feature against.
- `@param {Boolean} [opts.rum=false]` - Whether to include a script that reports anonymous usage data in the polyfill bundle.

Returns a Promise which resolves to an Object which contains the canonicalised feature definitions filtered for UA.

### `polyfillLibrary.getPolyfillString(opts)`

Create a polyfill bundle.

- `@param {object} opts` - Valid keys are uaString, minify, unknown, excludes, rum and features.
- `@param {Boolean} [opts.minify=true]` - Whether to return the minified or raw implementation of the polyfills.
- `@param {'ignore'|'polyfill'} [opts.unknown='polyfill']` - Whether to return all polyfills or no polyfills if the user-agent is unknown or unsupported.
- `@param {Object} [opts.features={}]` - Which features should be returned if the user-agent does not support them natively.
- `@param {Array<String>} [opts.excludes=[]]` - Which features should be excluded from the returned object.
- `@param {String} [opts.uaString='']` - The user-agent string to check each feature against.
- `@param {Boolean} [opts.rum=false]` - Whether to include a script that reports anonymous usage data in the polyfill bundle.
- `@param {Boolean} [opts.stream=false]` - Whether to return a stream or a string of the polyfill bundle.

Returns a polyfill bundle as either a utf-8 ReadStream or as a Promise of a utf-8 String.

## AWS Lambda

To use this package in an AWS Lambda function, you need to include the distribution Polyfills located in `./node_modules/polyfill-library/polyfills/__dist` in the root directory of your Lambda. In AWS, Lambdas are executed in the `/var/task/...` directory. Therefore, during execution, the directory where the polyfills will be located will be `/var/task/polyfill-library/__dist`.

### Example of a script to copy files

The following snippet will allow us to copy the polyfills to our already compiled Lambda. To do this, we will first install the necessary dependencies.

```bash
yarn add -D make-dir fs-extra
```

Once the dependencies are installed, we will create the file with the script at `/scripts/polyfills-serverless.mjs` and replace `YOUR_BUNDELED_LAMBDA_DIRECTORY` with the directory that contains our packaged Lambda.

In the example, we will use the directory `./.serverless_nextjs/api-lambda`, which is the one used when using Serverless Next.js.

```js
import { copySync } from 'fs-extra/esm';
import makeDir from 'make-dir';

const DIR_POLYFILLS = './node_modules/polyfill-library/polyfills/__dist';
// const DIR_SERVERLESS = 'YOUR_BUNDELED_LAMBDA_DIRECTORY/polyfills/__dist';
const DIR_SERVERLESS = './.serverless_nextjs/api-lambda/polyfills/__dist';

const paths = await makeDir(DIR_SERVERLESS);
console.log(`The directory ${paths} is created successfully.`);

try {
  console.log('Copying polyfills to serverless directory...');
  copySync(DIR_POLYFILLS, DIR_SERVERLESS, { overwrite: false });
  console.log('Polyfills copied successfully!');
} catch (err) {
  console.error(err);
}
```

To execute the script, you will need to run the following command:

```bash
node ./scripts/polyfills-serverless.mjs
```

## Contributing

Development of polyfill-library happens on GitHub. Read below to learn how you can take part in contributing to Polyfill.io.

### [Contributing Guide][contributing-guide]

Read our [contributing guide][contributing-guide] to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

```
# To test on BrowserStack you will need to have a BrowserStack account
# We test pull-requests using BrowserStack
npm run test-all-polyfills # Run the tests for all polyfills using BrowserStack
npm run test-polyfills -- --features=Array.from # Run the tests for Array.from
npm run test-polyfills -- --features=Array.from --browserstack # Run the tests for Array.from using BrowserStack
```

### License

Polyfill-library is [MIT licensed][license].

[contributing-guide]: https://github.com/Financial-Times/polyfill-library/blob/master/.github/contributing.md
[license]: https://github.com/Financial-Times/polyfill-library/blob/master/LICENSE.md
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[pull-requests-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
