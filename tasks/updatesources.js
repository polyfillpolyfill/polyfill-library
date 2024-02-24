'use strict';

const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const glob = promisify(require('glob'));
const TOML = require('@iarna/toml');
const cwd = path.join(__dirname, '../');
const globOptions = { cwd: cwd };

const loadSource = polyfillPaths => {
	return polyfillPaths.map(p => fs.readFileSync(p)).join('');
};

const installPolyfill = config => {
	const polyfillOutputFolder = path.dirname(config.src);
	const polyfillOutputPath = path.join(polyfillOutputFolder, 'polyfill.js');
	const polyfillAlreadyExists = fs.existsSync(polyfillOutputPath);

	const polyfillSourcePaths = (config.install.paths || [''])
		.map(p => require.resolve(path.join(config.install.module, p)))
	;
	const newPolyfill = loadSource(polyfillSourcePaths);

	const logPrefix = path.basename(polyfillOutputFolder) + ': ';
	if (polyfillAlreadyExists) {
		const currentPolyfill = fs.readFileSync(polyfillOutputPath, 'utf-8');
		if (newPolyfill === currentPolyfill) {
			console.log(logPrefix + 'No change');
			return;
		} else {
			console.log(logPrefix + 'Polyfill updated, replacing old version');
			fs.unlinkSync(polyfillOutputPath);
		}
	} else {
		console.log(logPrefix + 'New polyfill');
	}

	polyfillSourcePaths.map(p => console.log('  from '+path.relative(cwd, p)));
	fs.writeFileSync(polyfillOutputPath, newPolyfill);

	if (config.install.postinstall) {
		console.log(' * Running module-specific update task ' + config.install.postinstall);
		require(path.resolve(polyfillOutputFolder, config.install.postinstall));
	}
};

console.log('Updating third-party polyfills...');
glob('polyfills/**/config.toml', globOptions)
	.then(files => {
		for (const toml of files
			.map(source => {
				try {
					return Object.assign({ src: source }, TOML.parse(fs.readFileSync(source, 'utf-8')));
				} catch (error) {
					throw new Error('Failed on ' + source + '. Error: ' + error);
				}
			})
			.filter(config => 'install' in config))  installPolyfill(toml);

	})
	.then(() => console.log('Polyfills updated successfully'))
	.catch(error => {
		console.log(error);
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	})
;
