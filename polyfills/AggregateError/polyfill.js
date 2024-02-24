/* global _ErrorConstructor, CreateDataPropertyOrThrow, CreateMethodProperty, IterableToList */
(function () {
	var hasErrorCause = (function () {
		try {
			return new Error('m', { cause: 'c' }).cause === 'c';
		} catch (e) {
			return false;
		}
	})();

	function AggregateError (errors, message) {
		if (!(this instanceof AggregateError)) return new AggregateError(errors, message);

		var temp = typeof message === 'undefined' ? new Error() : new Error(message);

		CreateDataPropertyOrThrow(this, 'name', 'AggregateError');
		CreateDataPropertyOrThrow(this, 'message', temp.message);
		CreateDataPropertyOrThrow(this, 'stack', temp.stack);

		var errorsList;
		if (Array.isArray(errors)) {
			errorsList = errors.slice();
		} else {
			try {
				errorsList = IterableToList(errors);
			} catch (_error) {
				throw new TypeError('Argument is not iterable');
			}
		}

		CreateDataPropertyOrThrow(this, 'errors', errorsList);
	}

	AggregateError.prototype = Object.create(Error.prototype);
	AggregateError.prototype.constructor = AggregateError;

	CreateMethodProperty(self, 'AggregateError', AggregateError);

	// If `Error.cause` is available, add it to `AggregateError`
	if (hasErrorCause) {
		CreateMethodProperty(self, 'AggregateError', _ErrorConstructor('AggregateError'));
	}
})();
