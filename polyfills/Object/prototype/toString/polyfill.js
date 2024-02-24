/* global CreateMethodProperty, Get, Symbol, ToObject, Type */

// 20.1.3.6 Object.prototype.toString ( )
(function () {
	var ObjectProtoToStringOriginal = Object.prototype.toString;

	CreateMethodProperty(Object.prototype, 'toString', function toString () {
		'use strict';

		// 1. If the this value is undefined, return "[object Undefined]".
		if (this === undefined) return '[object Undefined]';
		// 2. If the this value is null, return "[object Null]".
		if (this === null) return '[object Null]';
		// 3. Let O be ! ToObject(this value).
		var O = ToObject(this);

		// Polyfill.io - We will not implement these; we will use the original `Object.prototype.toString` to determine the object class
		// 4. Let isArray be ? IsArray(O).
		// 5. If isArray is true, let builtinTag be "Array".
		// 6. Else if O has a [[ParameterMap]] internal slot, let builtinTag be "Arguments".
		// 7. Else if O has a [[Call]] internal method, let builtinTag be "Function".
		// 8. Else if O has an [[ErrorData]] internal slot, let builtinTag be "Error".
		// 9. Else if O has a [[BooleanData]] internal slot, let builtinTag be "Boolean".
		// 10. Else if O has a [[NumberData]] internal slot, let builtinTag be "Number".
		// 11. Else if O has a [[StringData]] internal slot, let builtinTag be "String".
		// 12. Else if O has a [[DateValue]] internal slot, let builtinTag be "Date".
		// 13. Else if O has a [[RegExpMatcher]] internal slot, let builtinTag be "RegExp".
		// 14. Else, let builtinTag be "Object".

		// 15. Let tag be ? Get(O, @@toStringTag).
		var tag = Get(O, Symbol.toStringTag);
		// 16. If Type(tag) is not String, set tag to builtinTag.
		if (Type(tag) !== 'string') return ObjectProtoToStringOriginal.call(O);
		// 17. Return the string-concatenation of "[object ", tag, and "]".
		return '[object ' + tag + ']';
	});
})();
