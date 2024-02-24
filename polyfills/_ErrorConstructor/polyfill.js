/* global CreateMethodProperty, CreateNonEnumerableDataPropertyOrThrow, Get, HasProperty, Type */

// eslint-disable-next-line no-unused-vars
var _ErrorConstructor;

(function () {
	// 20.5.8.1 InstallErrorCause ( O, options )
	function InstallErrorCause(O, options) {
		// 1. If options is an Object and ? HasProperty(options, "cause") is true, then
		if (Type(options) === 'object' && HasProperty(options, 'cause')) {
			// a. Let cause be ? Get(options, "cause").
			var cause = Get(options, 'cause');
			// b. Perform CreateNonEnumerableDataPropertyOrThrow(O, "cause", cause).
			CreateNonEnumerableDataPropertyOrThrow(O, 'cause', cause);
		}
		// 2. Return unused.
	}

	// based on https://github.com/es-shims/error-cause/blob/de17ea05/Error/implementation.js#L12-L20
	function _makeErrorConstructor (name, _Error) {
		var _NativeError = _nativeErrors[name];
		var arity = _Error.length;
		return function () {
			var O = arity === 2
				? _NativeError.call(null, arguments[0], arguments[1])
				: _NativeError.call(null, arguments[0]);
			InstallErrorCause(O, arguments.length > arity && arguments[arity]);
			CreateMethodProperty(O, 'constructor', _Error);
			return O;
		}
	}

	// based on https://github.com/es-shims/error-cause/blob/de17ea05/Error/implementation.js#L22-L29
	function _inheritErrorPrototype (name, _Error) {
		if (name !== 'Error') {
			Object.setPrototypeOf(_Error, self.Error);
		}
		_Error.prototype = _nativeErrors[name].prototype;
		Object.defineProperty(_Error, 'prototype', { writable: false });
		// in IE11, the constructor name needs to be corrected
		if (_Error.name !== name) {
			Object.defineProperty(_Error, 'name', { value: name, configurable: true });
		}
		return _Error;
	}

	var _newErrors = {
		Error:          function Error          (_message) { return _errorConstructors.Error.apply(null, arguments); },
		EvalError:      function EvalError      (_message) { return _errorConstructors.EvalError.apply(null, arguments); },
		RangeError:     function RangeError     (_message) { return _errorConstructors.RangeError.apply(null, arguments); },
		ReferenceError: function ReferenceError (_message) { return _errorConstructors.ReferenceError.apply(null, arguments); },
		SyntaxError:    function SyntaxError    (_message) { return _errorConstructors.SyntaxError.apply(null, arguments); },
		TypeError:      function TypeError      (_message) { return _errorConstructors.TypeError.apply(null, arguments); },
		URIError:       function URIError       (_message) { return _errorConstructors.URIError.apply(null, arguments); },
		AggregateError: function AggregateError (_errors, _message) { return _errorConstructors.AggregateError.apply(null, arguments); }
	};

	var _nativeErrors = {};
	var _errorConstructors = {};

	_ErrorConstructor = function (name) {
		_nativeErrors[name] = self[name];
		_errorConstructors[name] = _makeErrorConstructor(name, _newErrors[name]);
		_inheritErrorPrototype(name, _newErrors[name]);
		return _newErrors[name];
	}
})();
