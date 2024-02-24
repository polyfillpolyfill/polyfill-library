"use strict";

const path = require('path');

const createPattern = function (path) {
	return {pattern: path, included: true, served: true, watched: false};
};

const fileForMiddlewareToOverride = '/lib/index.js';

const initPolyfillLibraryFile = function (files) {
		files.unshift(createPattern(path.join(__dirname, fileForMiddlewareToOverride)));
};

function isAPolyfillRequest(request) {
	return request.url.startsWith(`/base${fileForMiddlewareToOverride}`);
}

function initPolyfillLibraryMiddleware(config) {
	return async function polyfillBundleMiddleWare(request, response, next) {
		if (!isAPolyfillRequest(request)) {
			next();
		} else {
			await respondWithPolyfillBundle(config, request, response);
		}
	};
}

function createPolyfillLibraryConfigFor(features) {
	const config = {};
	for (const feature of features.split(',')) {
		config[feature] = {
			flags: new Set()
		}
	}
	return config;
}

async function respondWithPolyfillBundle(config, request, response) {
	const polyfillLibrary = require('./lib');

	const parameters = {
		features: createPolyfillLibraryConfigFor(config.features),
		minify: false,
		stream: false,
		uaString: request.headers["user-agent"]
	};

	const bundle = await polyfillLibrary.getPolyfillString(parameters);
	response.setHeader("Content-Type", "application/javascript; charset=utf-8");

	response.writeHead(200);
	response.end(bundle);
}

initPolyfillLibraryFile.$inject = ['config.files'];
initPolyfillLibraryMiddleware.$inject = ['config'];

module.exports = {
	'framework:polyfill-library': ['factory', initPolyfillLibraryFile],
	'middleware:polyfill-library': ['factory', initPolyfillLibraryMiddleware]
};
