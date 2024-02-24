'use strict';

const chai = require('chai');
const mockery = require('mockery');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, {
	includeFail: false,
	prefix: ''
});

beforeEach(() => {
	mockery.enable({
		useCleanCache: true,
		warnOnUnregistered: false,
		warnOnReplace: false
	});
});

afterEach(() => {
	mockery.deregisterAll();
	mockery.disable();
});
