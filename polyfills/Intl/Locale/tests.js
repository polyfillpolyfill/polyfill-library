/* eslint-env mocha, browser */
/* global proclaim */

describe('Intl.Locale', function () {
	it('should be able to resolve locale list', function () {
		proclaim.deepEqual(new Intl.Locale('en-US').minimize().toString(), 'en');
	});
});
