/* eslint-env mocha, browser */
/* globals proclaim */

it("is a function", function () {
	proclaim.isFunction(String.prototype.isWellFormed);
});

it("has correct arity", function () {
	proclaim.arity(String.prototype.isWellFormed, 0);
});

it("has correct name", function () {
	proclaim.hasName(String.prototype.isWellFormed, "isWellFormed");
});

it("is not enumerable", function () {
	proclaim.isNotEnumerable(String.prototype, "isWellFormed");
});

var leadingSmile = "\ud83d";
var trailingSmile = "\ude0d";
var wholeSmile = leadingSmile + trailingSmile;

describe("isWellFormed", function () {
	it("returns true for a well-formed string", function () {
		[
			wholeSmile,
			"abc",
			"a😍c",
			"a\ud83d\ude0dc",
			"a" + leadingSmile + trailingSmile + "c",
			"a\u25a8c"
		].forEach(function (string) {
			proclaim.isTrue(string.isWellFormed());
		});
	});

	it("returns false for an ill-formed string", function () {
		[
			leadingSmile,
			trailingSmile,
			"a" + leadingSmile + "b" + leadingSmile + "c",
			"a" + trailingSmile + "b" + trailingSmile + "c",
			"a" + trailingSmile + leadingSmile + "c",
			wholeSmile.slice(0, 1),
			wholeSmile.slice(1)
		].forEach(function (string) {
			proclaim.isFalse(string.isWellFormed());
		});
	});
});
