'use strict';

const vm = require('vm');

/**
 * Validate JS source code by compiling it in a separate V8 context
 *
 * @param {string} code JS source code
 * @param {string} label identifier for error messages
 *
 * @throws When code parsing fails
 */
module.exports = function validateSource(code, label) {
	try {
		new vm.Script(code);
	} catch (error) {
		throw {
			name: "Parse error",
			message: `Error parsing source code for ${label}`,
			error
		};
	}
}
