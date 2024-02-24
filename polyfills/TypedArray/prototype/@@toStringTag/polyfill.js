/* global Symbol, Type */
// 23.2.3.33 get %TypedArray%.prototype [ @@toStringTag ]
(function () {
	var supportsDefiningFunctionName = (function () {
		var fn = function () {};
		try {
			Object.defineProperty(fn, 'name', {
				value: 'test'
			});
			return true;
		} catch (ignore) {
			return false;
		}
	})();

	function _get() {
		// 1. Let O be the this value.
		var O = this;
		// 2. If Type(O) is not Object, return undefined.
		if (Type(O) !== 'object') {
			return undefined;
		}
		// 3. If O does not have a [[TypedArrayName]] internal slot, return undefined.
		if (!('_name' in O)) {
			return undefined;
		}
		// 4. Let name be O.[[TypedArrayName]].
		var name = O._name;
		// 5. Assert: Type(name) is String.
		if (Type(name) !== 'string') {
			throw TypeError();
		}
		// 6. Return name.
		return name;
	}

	if (supportsDefiningFunctionName) {
		Object.defineProperty(_get, 'name', {
			value: 'get [Symbol.toStringTag]',
			writable: false,
			enumerable: false,
			configurable: true
		});
	}

	function defineToStringTag(proto) {
		Object.defineProperty(proto, Symbol.toStringTag, {
			get: _get,
			enumerable: false,
			configurable: true
		});
	}

	function defineNameInternalSlot(proto, name) {
		Object.defineProperty(proto, '_name', {
			value: name,
			writable: false,
			enumerable: false,
			configurable: false
		});
	}

	defineNameInternalSlot(self.Int8Array.prototype, 'Int8Array');
	defineNameInternalSlot(self.Uint8Array.prototype, 'Uint8Array');
	defineNameInternalSlot(self.Uint8ClampedArray.prototype, 'Uint8ClampedArray');
	defineNameInternalSlot(self.Int16Array.prototype, 'Int16Array');
	defineNameInternalSlot(self.Uint16Array.prototype, 'Uint16Array');
	defineNameInternalSlot(self.Int32Array.prototype, 'Int32Array');
	defineNameInternalSlot(self.Uint32Array.prototype, 'Uint32Array');
	defineNameInternalSlot(self.Float32Array.prototype, 'Float32Array');
	defineNameInternalSlot(self.Float64Array.prototype, 'Float64Array');

	// IE11, and potentially other browsers, have `Int8Array.prototype` inherit directly from `Object.prototype`
	// in that case, don't define it on the parent; define it directly on the prototype
	if ('__proto__' in self.Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		// set this on the underlying "TypedArrayPrototype", which is shared with all "TypedArray" subclasses
		defineToStringTag(self.Int8Array.prototype.__proto__);
	} else {
		defineToStringTag(self.Int8Array.prototype);
		defineToStringTag(self.Uint8Array.prototype);
		defineToStringTag(self.Uint8ClampedArray.prototype);
		defineToStringTag(self.Int16Array.prototype);
		defineToStringTag(self.Uint16Array.prototype);
		defineToStringTag(self.Int32Array.prototype);
		defineToStringTag(self.Uint32Array.prototype);
		defineToStringTag(self.Float32Array.prototype);
		defineToStringTag(self.Float64Array.prototype);
	}
})();
