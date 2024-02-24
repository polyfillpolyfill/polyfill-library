/* globals proclaim, Map */

it("is a function", function () {
	proclaim.isFunction(Map.groupBy);
});

it("has correct arity", function () {
	proclaim.arity(Map.groupBy, 2);
});

it("has correct name", function () {
	proclaim.hasName(Map.groupBy, "groupBy");
});

it("is not enumerable", function () {
	proclaim.isNotEnumerable(Map, "groupBy");
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

it("returns a Map", function () {
	proclaim.isInstanceOf(
		Map.groupBy(iterable, function () {}),
		Map
	);
});

function callbackfn(item, k) {
	if (item % 2 === 1) return 0;
	if (k >= 3) return "0";
	return 1;
}

it("returns a grouped map for iterable input", function () {
	var result = Map.groupBy(iterable, callbackfn);
	var entries = result.entries();
	proclaim.deepEqual(entries.next().value, [0, [3, 5, 7]]);
	proclaim.deepEqual(entries.next().value, [1, [4]]);
	proclaim.deepEqual(entries.next().value, ["0", [6]]);
	proclaim.isTrue(entries.next().done);
});

it("throws when callbackfn is not callable", function () {
	proclaim.throws(function () {
		Map.groupBy(iterable, null);
	}, TypeError);
});
