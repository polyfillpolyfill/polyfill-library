/* global CreateMethodProperty */
(function (nativeparseFloat, global) {
	// Polyfill.io - parseFloat is incorrect in older browsers
	var parseFloat = function parseFloat(str) {
		var string = String(str).trim();
		var result = nativeparseFloat(string);
		return result === 0 && string.charAt(0) == '-' ? -0 : result;
	}
	CreateMethodProperty(global, 'parseFloat', parseFloat);

	// 20.1.2.12. Number.parseFloat ( string )
	// The value of the Number.parseFloat data property is the same built-in function object that is the value of the  parseFloat property of the global object defined in 18.2.4.
	CreateMethodProperty(Number, 'parseFloat', global.parseFloat);
}(parseFloat, this));
