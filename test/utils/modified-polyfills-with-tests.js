const exec = require('child_process').exec;
const path = require('path');
const toposort = require('toposort');
const polyfillio = require('../../lib');

module.exports = {
	modifiedPolyfillsWithTests,
	polyfillsWithTestsFrom
};

/**
 * Get a list of polyfills that have changes when compared against master.
 * Also includes a list of polyfills that must be tested again.
 */
async function modifiedPolyfillsWithTests() {
	// 1. Check git to see which files changed.
	const modifiedFiles = await getModifiedFiles();
	if (modifiedFiles.length === 0) {
		// 1.a. Indicate that everything must be tested if no changes were found in git.
		return {
			polyfills: {},
			hasOtherChanges: false,
			hasManyPolyfillChanges: false,
			testEverything: true
		};
	}

	// 2. Get all polyfills and polyfill meta data.
	const allPolyfills = await polyfillio.listAllPolyfills();
	const polyfillMetas = {};
	for (const polyfillName of allPolyfills) {
		polyfillMetas[polyfillName] = await polyfillio.describePolyfill(polyfillName);
	}

	// 3. Determine which polyfills need to be tested.
	const modified = await polyfillsWithTestsFrom(modifiedFiles, allPolyfills, polyfillMetas);
	return modified;
}

async function polyfillsWithTestsFrom(modifiedFiles, allPolyfills, polyfillMetas) {
	if (modifiedFiles.length === 0) {
		// see : modifiedPolyfillsWithTests - 1.a.
		// Only here to match behaviour when called from tests with mock data.
		return {
			polyfills: {},
			hasOtherChanges: false,
			hasManyPolyfillChanges: false,
			testEverything: true
		};
	}

	const polyfillsDirectory = path.join(process.cwd(), 'polyfills');

	const modified = {
		polyfills: {},
		hasOtherChanges: false,
		hasManyPolyfillChanges: false
	};

	// 1. Check the modified files for changes in polyfills.
	for (const modifiedFilePath of modifiedFiles) {
		// 1.a. Check if the changed file is for a polyfill or not. If not everything must be tested.
		if (!modifiedFilePath.startsWith('polyfills/')) {
			modified.hasOtherChanges = true;
			modified.testEverything = true;
			continue;
		}

		// 1.b. It likely is a polyfill, so check the path and locate it in the library.
		const polyfillPath = path.dirname(modifiedFilePath);
		const absolute = path.join(process.cwd(), polyfillPath);
		if (absolute === polyfillsDirectory) {
			// 1.b.I. This is a file directly in the "polyfills" directory. (e.g. '.eslintrc')
			modified.hasOtherChanges = true;
			modified.testEverything = true;
			continue;
		}

		const relative = path.relative(polyfillsDirectory, absolute);
		const polyfillName = relative.replace(/(\/|\\)/g, '.');
		if (!polyfillMetas[polyfillName]) {
			// 1.b.II. Polyfill was not found in the library. (this should never happen)
			modified.hasOtherChanges = true;
			modified.testEverything = true;
			continue;
		}

		// 1.b.III. This is a change to a known polyfill. Add it to the list of modified polyfills.
		modified.polyfills[polyfillName] = polyfillMetas[polyfillName];
	}

	// 2. If we already detected changes unrelated to polyfills we stop early.
	if (modified.testEverything) {
		return modified;
	}

	// 3. If there are too many polyfill changes it is better to run a full test suite for all polyfills.
	if (Object.keys(modified.polyfills).length > 20) {
		modified.hasManyPolyfillChanges = true;
		modified.testEverything = true;
		return modified;
	}

	// 4. Adding the directly modified polyfills and their aliases to a new record set.
	const changedNames = {};
	for (const polyfillName in modified.polyfills) {
		// 4.a. Add the polyfill itself.
		changedNames[polyfillName] = true;

		const polyfill = modified.polyfills[polyfillName];
		if (polyfill.aliases) {
			for (const alias of polyfill.aliases) {
				// 4.b. Add all aliases as other polyfills might declare the alias name as a depedency.
				changedNames[alias] = true;
			}
		}
	}

	// 5. Apply toposort to all polyfills.
	const toposortedPolyfills = toposortPolyfills(polyfillMetas);

	// 6. Check all polyfills for dependants and add these to the record set.
	// NOTE : There is probably a smarter more efficient algorithm to do this.
	// This basically brute forces the toposorted depedency list
	// until no more polyfills are found that depend on changed polyfills.
	let foundMore = true;
	while (foundMore) {
		foundMore = false;
		for (const changed in changedNames) {
			for (const dependencyPair of toposortedPolyfills) {
				if (changed === dependencyPair[0] && !changedNames[dependencyPair[1]]) {
					changedNames[dependencyPair[1]] = true;
					foundMore = true;
				}
			}
		}
	}

	// 7. Construct a record set with all affected Polyfills that have tests.
	// This only matches the original polyfill names, so aliases will be stripped at this point.
	const affectedPolyfills = {};
	for (const changed in changedNames) {
		for (const polyfillName of allPolyfills) {
			if (polyfillName === changed && polyfillMetas[polyfillName].hasTests) {
				affectedPolyfills[polyfillName] = polyfillMetas[polyfillName];
			}
		}
	}

	modified.affectedPolyfills = affectedPolyfills;

	// 8. There seem to be no changes for polyfills that have tests. Test everything to be sure.
	if (Object.keys(modified.affectedPolyfills).length === 0) {
		modified.testEverything = true;
		return modified;
	}

	// 9. If there are too many changes it is better to run a full test suite for all polyfills.
		// We use a higher number than before as this is the resolved depedency list.
	if (Object.keys(modified.affectedPolyfills).length > 50) {
		modified.hasManyPolyfillChanges = true;
		modified.testEverything = true;
		return modified;
	}

	return modified;
}

function toposortPolyfills(polyfillMetas) {
	const graph = [];

	for (const polyfillName in polyfillMetas) {
		const meta = polyfillMetas[polyfillName];
		if (meta.dependencies) {
			for (const dependency of meta.dependencies) {
				graph.push([dependency, polyfillName]);
			}
		}
	}

	toposort(graph);

	return graph;
}

function getModifiedFiles() {
	return new Promise((resolve) => {
		const baseBranch = process.env.GITHUB_ACTIONS ? 'upstream/master' : 'master';

		exec(`git --no-pager diff --name-only HEAD $(git merge-base --fork-point ${baseBranch})`, (error, stdout, stderr) => {
			if (error) {
				console.warn(`error while getting modified files : ${error.message}`);
				resolve([]);
				return;
			}

			if (stderr) {
				console.warn(`error while getting modified files : ${stderr}`);
				resolve([]);
				return;
			}

			const list = stdout.split(/\r\n|\r|\n/).filter((x) => {
				return !!x;
			});

			resolve(list);
		});
	});
}
