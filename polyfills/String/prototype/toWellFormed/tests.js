/* eslint-env mocha, browser */
/* globals proclaim */

it("is a function", function () {
	proclaim.isFunction(String.prototype.toWellFormed);
});

it("has correct arity", function () {
	proclaim.arity(String.prototype.toWellFormed, 0);
});

it("has correct name", function () {
	proclaim.hasName(String.prototype.toWellFormed, "toWellFormed");
});

it("is not enumerable", function () {
	proclaim.isNotEnumerable(String.prototype, "toWellFormed");
});

var leadingSmile = "\ud83d";
var trailingSmile = "\ude0d";
var wholeSmile = leadingSmile + trailingSmile;
var replacementCharacter = "\ufffd";

describe("toWellFormed", function () {
	it("returns itself for a well-formed string", function () {
		[
			wholeSmile,
			"abc",
			"a😍c",
			"a\ud83d\ude0dc",
			"a" + leadingSmile + trailingSmile + "c",
			"a\u25a8c"
		].forEach(function (string) {
			proclaim.equal(string.toWellFormed(), string);
		});
	});

	it("returns a well-formed string for an ill-formed string", function () {
		[
			[leadingSmile, replacementCharacter],
			[trailingSmile, replacementCharacter],
			[
				"a" + leadingSmile + "b" + leadingSmile + "c",
				"a" + replacementCharacter + "b" + replacementCharacter + "c"
			],
			[
				"a" + trailingSmile + "b" + trailingSmile + "c",
				"a" + replacementCharacter + "b" + replacementCharacter + "c"
			],
			[
				"a" + trailingSmile + leadingSmile + "c",
				"a" + replacementCharacter + replacementCharacter + "c"
			],
			[wholeSmile.slice(0, 1), replacementCharacter],
			[wholeSmile.slice(1), replacementCharacter]
		].forEach(function (scenario) {
			var string = scenario[0];
			var expected = scenario[1];
			proclaim.equal(string.toWellFormed(), expected);
		});
	});
});
