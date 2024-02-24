'use strict';

const path = require('path');

const source = path.join(__dirname, '../../polyfills');
const destination = path.join(source, '__dist');

const build = require('./build');

console.log(`Writing compiled polyfill sources to ${destination}/...`);

build()
	.then(() => {
		console.log('Sources built successfully');
	})
	.catch(error => {
		console.log(error);
		console.log(JSON.stringify(error));
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	});
