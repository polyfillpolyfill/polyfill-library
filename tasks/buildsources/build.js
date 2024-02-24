'use strict';

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const source = path.join(__dirname, '../../polyfills');
const destination = path.join(source, '__dist');

const Polyfill = require('./polyfill');
const checkDependenciesExist = require('./check-dependencies-exist');
const checkForCircularDependencies = require('./check-for-circular-dependencies');
const flattenPolyfillDirectories = require('./flatten-polyfill-directories');
const writeAliasFile = require('./write-alias-file');

/**
 * Build all or a single polyfill.
 *
 * @param {string|undefined} feature An optional feature to build. When omitted all polyfills will be build.
 * @returns {Promise<void>} When done.
 */
module.exports = function build(feature) {
	return Promise.resolve()
		.then(async () => {
			fs.mkdirSync(destination, { recursive: true });

			const queues = [];

			const maxProc = Math.max(
				require("os").cpus().length,
				6
			);

			const slicedPolyfillPaths = [];
			const polyfillPaths = flattenPolyfillDirectories(source);

			for (let queue = 0; queue < maxProc; queue++) {
				const start = Math.floor((polyfillPaths.length / maxProc) * queue);
				const end = Math.floor((polyfillPaths.length / maxProc) * (queue + 1));
				slicedPolyfillPaths.push(polyfillPaths.slice(start, end));
			}

			const children = [];

			for (const slice of slicedPolyfillPaths) {
				queues.push(new Promise((resolve, reject) => {
					const child = child_process.fork(path.join(__dirname, 'buildsources-child-proc'));
					children.push(child);

					child.on('message', function (message) {
						if (message.result) {
							resolve(message.result.map((polyfillData) => {
								return Polyfill.fromJSON(polyfillData);
							}));
						} else {
							reject(message.error);

							for (const c of children) {
								c.kill();
							}
						}
					});

					child.send({
						source: source,
						destination: destination,
						list: slice,
						onlyBuildFeature: feature
					});
				}));
			}

			return Promise.all(queues).then((resolvedQueues) => {
				return resolvedQueues.flat();
			});
		})
		.then(async (polyfills) => {
			await checkForCircularDependencies(polyfills)
				.then(() => checkDependenciesExist(polyfills))
				.then(() => console.log('Waiting for files to be written to disk...'))
				.then(() => writeAliasFile(polyfills, destination))
		})
}
