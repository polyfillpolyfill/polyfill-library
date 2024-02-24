// 7.3.9 DefinePropertyOrThrow ( O, P, desc )
function DefinePropertyOrThrow (O, P, desc) { // eslint-disable-line no-unused-vars
	// 1. Let success be ? O.[[DefineOwnProperty]](P, desc).
	var success;
	try {
		Object.defineProperty(O, P, desc);
		success = true;
	} catch (e) {
		success = false;
	}
	// 2. If success is false, throw a TypeError exception.
	if (!success) {
		throw new TypeError('Cannot define property `' + Object.prototype.toString.call(P) + '` on object `' + Object.prototype.toString.call(O) + '`');
	}
	// 3. Return unused.
}
