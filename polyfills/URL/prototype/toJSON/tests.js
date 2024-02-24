/* eslint-env mocha, browser */
// eslint-disable-next-line no-unused-vars
/* globals proclaim */

// minimal test
describe('URL.prototype.toJSON', function () {
	it('is a function', function () {
		proclaim.isFunction(URL.prototype.toJSON);
	});

	it('has correct arity', function () {
		proclaim.arity(URL.prototype.toJSON, 0);
	});

	it('has correct name', function () {
		proclaim.hasName(URL.prototype.toJSON, 'toJSON');
	});

	it('gives the same value as "href"', function () {
		var url = new URL("http://example.com");
		proclaim.equal(url.toJSON(), url.href);
		proclaim.equal(url.toJSON(), "http://example.com/");
	});
});
