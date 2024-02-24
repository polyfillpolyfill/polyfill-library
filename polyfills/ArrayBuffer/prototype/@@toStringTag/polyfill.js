/* global ArrayBuffer, DataView, Symbol */
// 25.1.5.4 ArrayBuffer.prototype [ @@toStringTag ]
(function () {
	Object.defineProperty(ArrayBuffer.prototype, Symbol.toStringTag, {
		value: 'ArrayBuffer',
		writable: false,
		enumerable: false,
		configurable: true
	});

	Object.defineProperty(DataView.prototype, Symbol.toStringTag, {
		value: 'DataView',
		writable: false,
		enumerable: false,
		configurable: true
	});
})();
