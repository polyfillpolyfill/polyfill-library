/* global _ErrorConstructor, CreateMethodProperty */

(function () {
	var _errorNames = [
		'Error',
		'EvalError',
		'RangeError',
		'ReferenceError',
		'SyntaxError',
		'TypeError',
		'URIError'
	];

	if ('AggregateError' in self) {
		_errorNames.push('AggregateError');
	}

	for (var i = 0; i < _errorNames.length; i++) {
		var name = _errorNames[i];
		CreateMethodProperty(self, name, _ErrorConstructor(name));
	}
})();
