'use strict';

const path = require('path');

const Polyfill = require('./polyfill');

// Listen for messages from the parent process.
process.on('message', function (message) {
	// Validate the message from the parent.
	if (!message.source || !message.destination || !message.list) {
		if (!process.connected) {
			return;
		}

		process.send({
			child: process.pid,
			error: new Error('Invalid message send to child process')
		}, () => {
			process.disconnect();
		});
		return;
	}

	// Process the list requested by the parent process.
	handleList(message).then((polyfills) => {
		if (!process.connected) {
			return;
		}

		// Send the list back to the parent process.
		process.send({
			child: process.pid,
			result: polyfills
		}, () => {
			process.disconnect();
		});
	}).catch((error) => {
		if (!process.connected) {
			return;
		}

		process.send({
			child: process.pid,
			error: error
		}, () => {
			process.disconnect();
		});
	});
});

/**
 * Handle a list of Polyfills.
 *
 * @param {{source: string, destination: string, list: Array<string>, onlyBuildFeature: string}} options
 * @returns {Promise<Array<Polyfill>>} The list of processed Polyfills.
 * @throws When a Polyfills fails to be build.
 */
async function handleList(options) {
	const source = options.source;
	const destination = options.destination;
	const list = options.list;
	const onlyBuildFeature = options.onlyBuildFeature;

	const polyfills = [];

	for (const absolute of list) {
		try {
			const polyfill = new Polyfill(absolute, path.relative(source, absolute))
			if (!polyfill.hasConfigFile) {
				continue;
			}

			await polyfill.loadConfig();

			polyfill.checkLicense();

			if (!onlyBuildFeature || polyfill.name == onlyBuildFeature) {
				polyfill.loadDetect();
				await polyfill.loadSources();
				polyfill.updateConfig();

				await polyfill.writeOutput(destination);
			}

			polyfill.sources = {}; // No need to communicate this back to the parent process, output files have been written.
			polyfills.push(polyfill);
		} catch (error) {
			if (error instanceof Error) {
				throw {
					name: "Build error",
					message: `Error while building: ${path.relative(source, absolute)}`,
					error: {
						message: error.message,
						error: error
					}
				};
			}

			throw {
				name: "Build error",
				message: `Error while building: ${path.relative(source, absolute)}`,
				error
			};
		}
	}

	return polyfills;
}
