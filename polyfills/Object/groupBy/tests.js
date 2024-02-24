/* globals proclaim */

it("is a function", function () {
	proclaim.isFunction(Object.groupBy);
});

it("has correct arity", function () {
	proclaim.arity(Object.groupBy, 2);
});

it("has correct name", function () {
	proclaim.hasName(Object.groupBy, "groupBy");
});

it("is not enumerable", function () {
	proclaim.isNotEnumerable(Object, "groupBy");
});

var array = [3, 4, 5, 6, 7];
var iterable = {};
// polyfill for `Symbol.iterator` has been provided as part of `GetIterator`
iterable[self.Symbol.iterator] = function () {
	var i = -1;
	return {
		next: function () {
			i++;
			return { done: i >= array.length, value: array[i] };
		}
	};
};

it("returns an object with null prototype", function () {
	proclaim.equal(
		Object.getPrototypeOf(Object.groupBy(iterable, function () {})),
		null
	);
});

function callbackfn(item, k) {
	if (item % 2 === 1) return 0;
	if (k >= 3) return "0";
	return 1;
}

it("returns a grouped object for iterable input", function () {
	var result = Object.groupBy(iterable, callbackfn);
	proclaim.deepEqual(Object.getOwnPropertyNames(result), ["0", "1"]);
	proclaim.deepEqual(result[0], [3, 5, 6, 7]);
	proclaim.deepEqual(result[1], [4]);
});

it("throws when callbackfn is not callable", function () {
	proclaim.throws(function () {
		Object.groupBy(iterable, null);
	}, TypeError);
});
