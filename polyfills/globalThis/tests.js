
/* globals proclaim, globalThis */

describe("globalThis", function() {
	it("is an object", function() {
		proclaim.isObject(globalThis);
	});

	it("is not enumerable", function() {
		proclaim.isNotEnumerable(globalThis, "globalThis");
	});

	it("is not possible to invoke the global object as a function", function() {
		proclaim.throws(function() {
			globalThis();
		}, TypeError);
	});

	it("is not possible to use the global object as a constructor  with the new operator", function() {
		proclaim.throws(function() {
			new globalThis();
		}, TypeError);
	});

	it("should be the global object", function() {
		proclaim.deepStrictEqual(globalThis.globalThis, globalThis);
		proclaim.deepStrictEqual(Array, globalThis.Array);
		proclaim.deepStrictEqual(Boolean, globalThis.Boolean);
		proclaim.deepStrictEqual(Date, globalThis.Date);
		proclaim.deepStrictEqual(Error, globalThis.Error);
		proclaim.deepStrictEqual(Function, globalThis.Function);
		proclaim.deepStrictEqual(JSON, globalThis.JSON);
		proclaim.deepStrictEqual(Math, globalThis.Math);
		proclaim.deepStrictEqual(Number, globalThis.Number);
		proclaim.deepStrictEqual(RegExp, globalThis.RegExp);
		proclaim.deepStrictEqual(String, globalThis.String);
		Function("thirteen_point_seven=13.7")();
		proclaim.deepStrictEqual(
			thirteen_point_seven, // eslint-disable-line no-undef
			globalThis.thirteen_point_seven
		);
	});

	it("has correct descriptors defined", function() {
		var descriptor = Object.getOwnPropertyDescriptor(
			globalThis,
			"globalThis"
		);

		proclaim.isTrue(descriptor.configurable);
		proclaim.isFalse(descriptor.enumerable);
		proclaim.isTrue(descriptor.writable);
		proclaim.doesNotInclude(descriptor, "get");
		proclaim.doesNotInclude(descriptor, "set");
		proclaim.isObject(descriptor.value);
	});
});
