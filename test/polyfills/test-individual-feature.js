"use strict";

// Ensure Array.prototype.flatMap exists
// We support NodeJS 8 and above and Array.prototype.flatMap was added in NodeJS 11
require('array.prototype.flatmap').shim();
const intersection = require('lodash').intersection;
const fs = require('fs');
const path = require('path');
const execa = require('execa');
const globby = require('globby');
const polyfillLibrary = require('../../lib');
const feature = process.argv.slice(2)[0];

const featureToFolder = feature => feature.replace(/\./g, path.sep);

function generateDependencyTreeForFeature(feature) {
	return polyfillLibrary.getPolyfills({
		features: {
			[feature]: {}
		},
		unknown: 'polyfill',
		uaString: ''
	}).then(Object.keys);
}

function hasOwnProperty (object, property) {
	return Object.prototype.hasOwnProperty.call(object, property);
}

function findDifferenceInObjects(inclusionObject, exclusionObject) {
	const result = {};
	for (const [key, value] of Object.entries(inclusionObject)) {
		if (hasOwnProperty(exclusionObject, key)) {
			if (exclusionObject[key] !== value) {
				result[key] = value;
			}
		} else {
			result[key] = value;
		}
	}
	return result;
}
const TOML = require('@iarna/toml');
async function findAllThirdPartyPolyfills () {
	const configs = await globby(['polyfills/**/config.toml', '!polyfills/__dist']);
	return configs.map(file => {
		const config = TOML.parse(fs.readFileSync(path.join(__dirname, '../../', file), 'utf-8'));
		return config.install && config.install.module;
	}).filter(thirdPartyPolyfills => thirdPartyPolyfills !== undefined);
}

async function featureRequiresTesting(feature) {

	const filesWhichChanged = execa.commandSync('git diff --name-only origin/master HEAD').stdout.split('\n');

	// if any of the dependencies in the tree from the feature is the same as latest commit, run the tests
	const dependencies = await generateDependencyTreeForFeature(feature);
	const dependencyFolders = dependencies.map(feature => `polyfills/${featureToFolder(feature)}`);
	const thirdPartyPolyfills = await findAllThirdPartyPolyfills();

	const filesRequiredByFeature = dependencyFolders.flatMap(folder => {
		return [
			folder + '/config.toml',
			folder + '/polyfill.js'
		];
	});

	const testsForFeature = `polyfills/${featureToFolder(feature)}/tests.js`;
	// const detectForFeature = `polyfills/${featureToFolder(feature)}/detect.js`;

	const testsForFeatureHaveNotChanged = !filesWhichChanged.includes(testsForFeature);
	const filesRequiredByFeatureWhichHaveChanged = intersection(filesRequiredByFeature, filesWhichChanged);
	const filesRequiredByFeatureHasNotChanged = filesRequiredByFeatureWhichHaveChanged.length === 0;
	const libraryFolderHasNotChanged = !filesWhichChanged.some(file => file.startsWith('lib/'));
	const karmaPolyfillPluginHasNotChanged = !filesWhichChanged.includes('karma-polyfill-library-plugin.js');
	const packageJsonDependenciesFromMaster = JSON.parse(execa.commandSync('git show origin/master:package.json').stdout).dependencies;
	const packageJsonDependenciesFromHead = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8')).dependencies;
	const packageJsonDependenciesChanges = Object.keys(findDifferenceInObjects(packageJsonDependenciesFromHead, packageJsonDependenciesFromMaster));
	const thirdPartyPolyfillsWhichHaveBeenAddedOrChanged = intersection(packageJsonDependenciesChanges, thirdPartyPolyfills);

	if (!testsForFeatureHaveNotChanged) {
		console.log(`Running tests for ${feature} because the tests have changed.`);
		return true;
	}

	if (!filesRequiredByFeatureHasNotChanged) {
		console.log(`Running tests for ${feature} because one or more of the files it depends on has changed.`);
		console.log(`The files which changed were ${filesRequiredByFeatureWhichHaveChanged}`);
		return true;
	}
	if (!libraryFolderHasNotChanged) {
		console.log(`Running tests for ${feature} because one or more of the files of the core polyfill-library has changed.`);
		return true;
	}
	if (!karmaPolyfillPluginHasNotChanged) {
		console.log(`Running tests for ${feature} because the Karma plugin used for testing has changed.`);
		return true;
	}

	const thirdPartyDependenciesForFeature = filesRequiredByFeature.filter(file => file.endsWith('/config.toml')).map(file => {
		const config = TOML.parse(fs.readFileSync(path.join(__dirname, '../../', file), 'utf-8'));
		return config.install && config.install.module;
	}).filter(thirdPartyPolyfills => thirdPartyPolyfills !== undefined);

	const thirdPartyPolyfillHasBeenAddedOrChangedForFeature = intersection(thirdPartyPolyfillsWhichHaveBeenAddedOrChanged, thirdPartyDependenciesForFeature).length > 0;
	const packageJsonHasOnlyHadThirdPartyPolyfillChangesAppliedToIt = packageJsonDependenciesChanges.every(dep => thirdPartyPolyfills.includes(dep));

	if (thirdPartyPolyfillHasBeenAddedOrChangedForFeature) {
		console.log(`Running tests for ${feature} because one of the package.json.dependencies it is built from has changed.`);
		return true;
	}
	if (packageJsonHasOnlyHadThirdPartyPolyfillChangesAppliedToIt) {
		return false;
	}

	console.log(`Running tests for ${feature} because... Well, I'm not sure why. One of these might be why ${filesWhichChanged.join(' ')}`);
	return true;
}

(async function () {
	try {
		if (await featureRequiresTesting(feature)) {
			console.log(`Testing ${feature}`);
			const result = execa('karma', ['start', path.join(__dirname, '../../', 'karma.conf.js'), `--browserstack`, `--features=${feature}`], {
				preferLocal: true
			});
			result.stdout.pipe(process.stdout);
			result.stderr.pipe(process.stderr);
			await result;
		} else {
			console.log(`${feature} has not changed, no need to run the tests.`);
			// eslint-disable-next-line unicorn/no-process-exit
			process.exit(0);
		}
	} catch (error) {
		console.log(`Errors found testing ${feature}`);
		console.error(error.stderr || error.stdout || error);
		console.log(`Errors found testing ${feature}`);
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	}
}());
