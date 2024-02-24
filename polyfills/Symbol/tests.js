
/* globals proclaim, Symbol */

it('is a function', function () {
	proclaim.isFunction(Symbol);
});

it('has correct arity', function () {
	proclaim.arity(Symbol, 0);
});

it('has correct name', function () {
	proclaim.hasName(Symbol, 'Symbol');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(window, 'Symbol');
});

var strictModeSupported = (function(){ return this; }).call(null) === null;

// https://tc39.github.io/ecma262/#sec-symbol-constructor
it('should throw if being used via `new`', function() {
	var test = function () {
		// eslint-disable-next-line no-new-symbol
		return new Symbol();
	};
	proclaim.throws(test);
});

it('should have Symbol as the constructor property', function() {
	proclaim.equal(Symbol().constructor, Symbol);
});

xit('should silently fail when assigning new properties', function (){
	var a = Symbol("1");
	a.b = '1';
	proclaim.equal(a.b, undefined);
});

// A tough one right now
xit('should have Symbol.prototype as the prototype of an instance', function() {
	proclaim.equal(Object.getPrototypeOf(Symbol()), Symbol.prototype);
});

it('should return "[object Symbol]" when called with Object.prototype.toString()', function() {
	proclaim.equal(Object.prototype.toString.call(Symbol()), '[object Symbol]');
});

if(strictModeSupported) {
	it('Object.prototype.toString.call(window) should be [object Window]', function() {
		proclaim.equal(Object.prototype.toString.call(window), '[object Window]');
	});

	it('window.toString() should be [object Window]', function() {
		proclaim.equal(window.toString(), '[object Window]');
	});
}

it('Object.prototype.toString.call(null) should be [object Null]', function() {
	proclaim.equal(Object.prototype.toString.call(null), '[object Null]');
});

it('should silently fail when overwriting properties', function() {
	var sym = Symbol("2");
	sym.toString = 0;
	proclaim.isInstanceOf(sym.toString, Function);
	sym.valueOf = 0;
	proclaim.isInstanceOf(sym.valueOf, Function);
});

it('should create unique symbols', function() {
	proclaim.notEqual(Symbol("3"), Symbol("3"));
});

it('has for, and keyFor static methods', function() {
	proclaim.isInstanceOf(Symbol.for, Function);
	proclaim.isInstanceOf(Symbol.keyFor, Function);
});

it('Symbol.keyFor should throw if not given a symbol', function() {
	var stringKeyFor = function() {
		return Symbol.keyFor('a');
	};
	var numberKeyFor = function() {
		return Symbol.keyFor(1);
	};
	var arrayKeyFor = function() {
		return Symbol.keyFor([]);
	};
	var objectKeyFor = function() {
		return Symbol.keyFor({});
	};
	var boolKeyFor = function() {
		return Symbol.keyFor(true);
	};
	var undefinedKeyFor = function() {
		return Symbol.keyFor(undefined);
	};
	var symbolKeyFor = function() {
		return Symbol.keyFor(Symbol("4"));
	};

	proclaim.throws(stringKeyFor);
	proclaim.throws(numberKeyFor);
	proclaim.throws(arrayKeyFor);
	proclaim.throws(objectKeyFor);
	proclaim.throws(boolKeyFor);
	proclaim.throws(undefinedKeyFor);
	proclaim.doesNotThrow(symbolKeyFor);
});

xit('Symbol.keyFor should return undefined if can not find symbol in global registry', function() {
	proclaim.equal(Symbol.keyFor(Symbol("5")), undefined);
});

xit('Symbol() should not add the symbol to the global registry', function() {
	var sym = Symbol("6");
	proclaim.equal(Symbol.keyFor(sym), undefined);
});

it('Symbol["for"] should create new symbol if can not find symbol in global registry', function() {
	var sym1 = Symbol("7");
	var sym2 = Symbol.for("7");
	proclaim.notEqual(sym1, sym2);
});

it('Symbol["for"] should return symbol if can find symbol in global registry', function() {
	var sym = Symbol.for("8");
	proclaim.equal(sym, Symbol.for("8"));
});

it('Symbol.keyFor should return key of symbol if can find symbol in global registry', function() {
	var key = "9";
	var sym = Symbol.for(key);
	proclaim.equal(Symbol.keyFor(sym), key);
});

it('has toString and valueOf instance methods', function() {
	proclaim.isInstanceOf(Symbol.prototype.toString, Function);
	proclaim.isInstanceOf(Symbol.prototype.valueOf, Function);
});

// https://kangax.github.io/compat-table/es6/#Symbol_symbol_keys_are_hidden_to_pre-ES6_code
it('should make symbols non-enumerable', function() {
	var object = {};
	var symbol = Symbol();
	object[symbol] = 1;

	// eslint-disable-next-line no-empty
	for (var x in object){}
	var passed = !x;

	proclaim.equal(passed, true);
	proclaim.equal(Object.keys(object).length, 0);
	proclaim.equal(Object.getOwnPropertyNames(object).length, 0);
	proclaim.equal(Object.prototype.propertyIsEnumerable.call(object, symbol), true);
});

it('should return false from propertyIsEnumerable for symbols defined non-enumerable', function() {
	var object = {};
	var symbol = Symbol();
	Object.defineProperty(object, symbol, { enumerable: false });

	// eslint-disable-next-line no-empty
	for (var x in object){}
	var passed = !x;

	proclaim.equal(passed, true);
	proclaim.equal(Object.keys(object).length, 0);
	proclaim.equal(Object.getOwnPropertyNames(object).length, 0);
	proclaim.equal(Object.prototype.propertyIsEnumerable.call(object, symbol), false);
});

it('should not fail on propertyIsEnumerable for deep clones', function() {
	// See: https://github.com/Financial-Times/polyfill-service/issues/1058
	var symbol0 = Symbol();
	var symbol1 = Symbol();

	proclaim.equal(Object.getOwnPropertySymbols(Object.prototype).length, 0);
	Object.prototype[symbol0] = 'Symbol(0)';
	proclaim.equal(Object.getOwnPropertySymbols(Object.prototype).length, 1);
	Object.defineProperty(Object.prototype, symbol1, { value: 'Symbol(1)'});
	proclaim.equal(Object.getOwnPropertySymbols(Object.prototype).length, 2);
});

// Not really possible on a polyfill
xit('should perform correctly with toString operations', function() {
	proclaim.equal(String(Symbol('10')), 'Symbol(10)');
	proclaim.equal(Symbol('10').toString(), 'Symbol(10)');
	proclaim.equal(Object(Symbol('10')).toString(), 'Symbol(10)');
	proclaim.equal(Symbol.prototype.toString.call(Symbol('10')), 'Symbol(10)');
});

// Not really possible on a polyfill
xit('should not allow implicit string coercion', function() {
	var implicitStringCoercion = function() {
		return Symbol('10') + '';
	};
	proclaim.throws(implicitStringCoercion);
});

it('should create Object without symbols', function () {
	var Obj = function () {};
	var obj = Object.create(Obj.prototype);
	proclaim.equal(obj instanceof Obj, true);
});

it('should create Object without symbols, second argument undefined', function () {
	var Obj = function () {};
	var obj = Object.create(Obj.prototype, undefined);
	proclaim.equal(obj instanceof Obj, true);
});

it('does not break when an iframe is added', function () {
	var div = document.createElement('div');
	div.innerHTML = '<iframe src="https://xkcd.com"></iframe>';
	document.body.appendChild(div);
	setTimeout(function () {
		document.body.removeChild(div);
	}, 0);
	proclaim.equal(Object.prototype.toString.call(Object.getOwnPropertyNames(window)) === '[object Array]', true);
});

// Match tests for "Polyfill.prototype.description"
// The polyfill for this feature is done separately for modern browsers, but also here in the Symbol polyfill.
describe('Polyfill.prototype.description', function () {
	it('is defined', function () {
		proclaim.include(Symbol.prototype, 'description');
	});

	it('is not enumerable', function () {
		proclaim.isNotEnumerable(Symbol.prototype, 'description');
	});

	it('is configurable', function () {
		if (Object.getOwnPropertyDescriptor) {
			proclaim.isTrue(Object.getOwnPropertyDescriptor(Symbol.prototype, 'description').configurable);
		}
	});

	it('works with strings', function () {
		proclaim.strictEqual(Symbol("hello").description, "hello");
	});

	it('works with empty strings', function () {
		proclaim.strictEqual(Symbol("").description, "");
	});

	it('works with numbers', function () {
		proclaim.strictEqual(Symbol(1).description, "1");
	});

	it('works with booleans', function () {
		proclaim.strictEqual(Symbol(true).description, "true");
	});

	it('works with null', function () {
		proclaim.strictEqual(Symbol(null).description, "null");
	});

	it('works with undefined', function () {
		proclaim.strictEqual(Symbol(undefined).description, undefined);
	});

	it('works with empty arrays', function () {
		proclaim.strictEqual(Symbol([]).description, "");
	});

	it('works with non-empty arrays', function () {
		proclaim.strictEqual(Symbol(["a","b"]).description, "a,b");
	});

	it('works with objects', function () {
		proclaim.strictEqual(Symbol({}).description, "[object Object]");
	});

	it('works with regexes', function () {
		proclaim.strictEqual(Symbol(/./).description, "/./");
	});

	it('works with NaNs', function () {
		proclaim.strictEqual(Symbol(NaN).description, "NaN");
	});

	it('works with functions', function () {
		proclaim.strictEqual(Symbol(function(){}).description, String(function(){}));
	});

	it('works with no input', function () {
		proclaim.strictEqual(Symbol().description, undefined);
	});

	// non symbols

	if (Object.getOwnPropertyDescriptor) {
		var getter = Object.getOwnPropertyDescriptor(Symbol.prototype, 'description').get;

		it('does not throw an error if context is a symbol', function () {
			proclaim.doesNotThrow(function() {
				getter.call(Symbol());
			});
		});

		it('throws an error if context is a number', function () {
			proclaim.throws(function() {
				getter.call(1);
			}, TypeError);
		});

		it('throws an error if context is null', function () {
			proclaim.throws(function() {
				getter.call(null);
			}, TypeError);
		});

		it('throws an error if context is undefined', function () {
			proclaim.throws(function() {
				getter.call(undefined);
			}, TypeError);
		});

		it('throws an error if context is an array', function () {
			proclaim.throws(function() {
				getter.call([]);
			}, TypeError);
		});

		it('throws an error if context is an object', function () {
			proclaim.throws(function() {
				getter.call({});
			}, TypeError);
		});

		it('throws an error if context is a regex', function () {
			proclaim.throws(function() {
				getter.call(/./);
			}, TypeError);
		});

		it('throws an error if context is NaN', function () {
			proclaim.throws(function() {
				getter.call(NaN);
			}, TypeError);
		});

		it('throws an error if context is a function', function () {
			proclaim.throws(function() {
				getter.call(function(){});
			}, TypeError);
		});

		it('throws an error if context is a string', function () {
			proclaim.throws(function() {
				getter.call('kate');
			}, TypeError);
		});
	}
});
