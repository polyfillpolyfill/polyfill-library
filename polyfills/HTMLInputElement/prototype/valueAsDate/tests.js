/* eslint-env mocha, browser */
// eslint-disable-next-line no-unused-vars
/* globals proclaim */

function testValueAsDateGetter(element, cases) {
	for (var i = 0; i < cases.length; i++) {
		var testCase = cases[i];
		var actualValue = testCase[0];
		var expectedValueAsDate = testCase[1];

		element.value = actualValue;

		var	actualValueAsDateA = element.valueAsDate;
		if (actualValueAsDateA instanceof Date && expectedValueAsDate) {
			proclaim.equal(
				actualValueAsDateA.toISOString(),
				expectedValueAsDate.toISOString(),
				"expected : " + expectedValueAsDate.toISOString() + ", got : " + actualValueAsDateA.toISOString() +  ", from : " + actualValue
			);

			proclaim.equal(
				actualValueAsDateA.getTime(),
				expectedValueAsDate.getTime(),
				"expected : " + expectedValueAsDate.getTime() + ", got : " + actualValueAsDateA.getTime() +  ", from : " + actualValue
			);
		} else {
			proclaim.equal(
				actualValueAsDateA,
				expectedValueAsDate,
				"expected : " + JSON.stringify(expectedValueAsDate) + ", got : " + JSON.stringify(actualValueAsDateA) + ", from : " + JSON.stringify(actualValue)
			);
		}
	}
}

function testValueAsDateSetter(element, cases) {
	for (var i = 0; i < cases.length; i++) {
		var testCase = cases[i];
		var valueAsDate = testCase[0];
		var expectedValue = testCase[1];

		element.valueAsDate = valueAsDate;
		proclaim.equal(
			element.value,
			expectedValue,
			"expected : " + JSON.stringify(expectedValue) + ", got : " + JSON.stringify(element.value) + ", from : " + JSON.stringify(valueAsDate)
		);
	}
}

var unsupportedTypes = [
	"button",
	"checkbox",
	"color",
	"datetime-local",
	"email",
	// "file", /* value can't be set on file type inputs. */
	"hidden",
	"image",
	"number",
	"password",
	"radio",
	"range",
	"reset",
	"search",
	"submit",
	"tel",
	"text",
	"url"
];

var unsupportedInputsViaAttribute = {};
var unsupportedInputsViaProperty = {};
for (var i = 0; i < unsupportedTypes.length; i++) {
	var type = unsupportedTypes[i];
	var inputA = document.createElement("INPUT");
	inputA.setAttribute("type", type);
	unsupportedInputsViaAttribute[type] = inputA;


	var inputB = document.createElement("INPUT");
	try {
		inputB.type = type;
	} catch (_) {
		// Throws at this point are not fatal.
		// They indicate that the browser does not support this type.
		// Fallback to setting through the attribute.
		inputA.setAttribute("type", type);
	}
	unsupportedInputsViaProperty[type] = inputB;
}

// https://html.spec.whatwg.org/multipage/input.html#the-input-element
// See "Content attributes"
// Only "date"|"month"|"week"|"time"
var dateInput = document.createElement("INPUT");
dateInput.setAttribute("type", "date");

var monthInput = document.createElement("INPUT");
monthInput.setAttribute("type", "month");

var weekInput = document.createElement("INPUT");
weekInput.setAttribute("type", "week");

var timeInput = document.createElement("INPUT");
timeInput.setAttribute("type", "time");

describe("HTMLInputElement.prototype.valueAsDate", function () {
	it("ignores unsupported types - getter", function () {
		for (var i = 0; i < unsupportedTypes.length; i++) {
			var type = unsupportedTypes[i];
			var inputA = unsupportedInputsViaAttribute[type];
			var inputB = unsupportedInputsViaProperty[type];

			testValueAsDateGetter(inputA, [
				["", null],
				["1000000", null],
				["123456", null]
			]);

			testValueAsDateGetter(inputB, [
				["", null],
				["1000000", null],
				["123456", null]
			]);
		}
	});

	it("throws on unsupported types - setter", function () {
		for (var i = 0; i < unsupportedTypes.length; i++) {
			var type = unsupportedTypes[i];
			var inputA = unsupportedInputsViaAttribute[type];
			var inputB = unsupportedInputsViaProperty[type];

			proclaim.throws(function () {
				testValueAsDateSetter(inputA, [
					[null, ""]
				]);
			});

			proclaim.throws(function () {
				testValueAsDateSetter(inputA, [
					[new Date("2019-12-10T00:00:00.000Z"), ""]
				]);
			});

			proclaim.throws(function () {
				testValueAsDateSetter(inputB, [
					[null, ""]
				]);
			});

			proclaim.throws(function () {
				testValueAsDateSetter(inputB, [
					[new Date("2019-12-10T00:00:00.000Z"), ""]
				]);
			});
		}
	});

	it("works with type=\"date\" - getter", function () {
		testValueAsDateGetter(dateInput, [
			["", null],
			["0001-12-10", new Date("0001-12-10T00:00:00.000Z")],
			["0000-12-10", null],
			["2019-00-12", null],
			["2019-12-00", null],
			["2019.4-12-00", null],
			["2019-13-10", null],
			["2019-02-29", null],
			["2019-03-32", null],
			["2019-04-31", null],
			["2019-12-10", new Date("2019-12-10T00:00:00.000Z")],
			["2016-02-29", new Date("2016-02-29T00:00:00.000Z")], // Leap year

			["2019a-12-10", null], // Bogus suffix
			["2019-12a-10", null], // Bogus suffix
			["2019-12-10a", null] // Bogus suffix
		]);
	});

	it("works with type=\"date\" - setter", function () {
		testValueAsDateSetter(dateInput, [
			[null, ""],
			[new Date("2019-12-10T00:00:00.000Z"), "2019-12-10"],
			[new Date("2016-02-29T00:00:00.000Z"), "2016-02-29"] // Leap year
		]);
	});

	it("works with type=\"month\" - getter", function () {
		testValueAsDateGetter(monthInput, [
			["", null],
			["0000-12", null],
			["2019-00", null],
			["2019-01.5", null],
			["2019-12", new Date("2019-12-01T00:00:00.000Z")],

			["2019a-12", null], // Bogus suffix
			["2019-12a", null] // Bogus suffix
		]);
	});

	it("works with type=\"month\" - setter", function () {
		testValueAsDateSetter(monthInput, [
			[null, ""],
			[new Date("2019-12-01T00:00:00.000Z"), "2019-12"]
		]);
	});

	it("works with type=\"week\" - getter", function () {
		testValueAsDateGetter(weekInput, [
			["", null],
			["0000-W50", null],
			["2019-W00", null],
			["2019-W01.5", null],
			["2019-W60", null],
			// Non-4 digit years
			["0900-W50", new Date("0900-12-13T00:00:00.000Z")],
			["11000-W50", new Date("+011000-12-08T00:00:00.000Z")],
			// Non-leap year
			["2019-W50", new Date("2019-12-09T00:00:00.000Z")],
			["2019-W51", new Date("2019-12-16T00:00:00.000Z")],
			["2019-W52", new Date("2019-12-23T00:00:00.000Z")],
			["2019-W53", null],
			["2019-W54", null],
			["2020-W01", new Date("2019-12-30T00:00:00.000Z")],

			// The first day of the calendar year (January 1) is a Thursday.
			// 1st of january in 2015 is a Thursday and 2015 is not a leap year.
			["2015-W50", new Date("2015-12-07T00:00:00.000Z")],
			["2015-W51", new Date("2015-12-14T00:00:00.000Z")],
			["2015-W52", new Date("2015-12-21T00:00:00.000Z")],
			["2015-W53", new Date("2015-12-28T00:00:00.000Z")],
			["2015-W54", null],
			["2016-W01", new Date("2016-01-04T00:00:00.000Z")],

			// The first day of the year (January 1) is a Wednesday and the year is a leap year.
			// 1st of january in 2020 is a Wednesday and 2020 is a leap year.
			["2020-W50", new Date("2020-12-07T00:00:00.000Z")],
			["2020-W51", new Date("2020-12-14T00:00:00.000Z")],
			["2020-W52", new Date("2020-12-21T00:00:00.000Z")],
			["2020-W53", new Date("2020-12-28T00:00:00.000Z")],
			["2020-W54", null],
			["2021-W01", new Date("2021-01-04T00:00:00.000Z")],

			["2021a-W01", null], // Bogus suffix
			["2021-W01a", null] // Bogus suffix
		]);
	});

	it("works with type=\"week\" - setter", function () {
		testValueAsDateSetter(weekInput, [
			[null, ""],
			// Non-4 digit years
			[new Date("0900-12-13T00:00:00.000Z"), "0900-W50"],
			[new Date("+011000-12-08T00:00:00.000Z"), "11000-W50"],

			[new Date("2015-12-28T00:00:00.000Z"), "2015-W53"],
			[new Date("2019-12-09T00:00:00.000Z"), "2019-W50"],
			[new Date("1898-12-31T12:00:00.000Z"), "1898-W52"],
			[new Date("1898-12-31T23:59:00.000Z"), "1898-W52"],
			[new Date("1899-01-01T00:00:00.000Z"), "1898-W52"],
			[new Date("1899-01-01T00:01:00.000Z"), "1898-W52"],
			[new Date("1899-01-01T12:00:00.000Z"), "1898-W52"],
			[new Date("1899-04-30T12:00:00.000Z"), "1899-W17"],
			[new Date("1899-05-01T00:00:00.000Z"), "1899-W18"],
			[new Date("1899-05-01T12:00:00.000Z"), "1899-W18"]
		]);
	});

	it("works with type=\"time\" - getter", function () {
		testValueAsDateGetter(timeInput, [
			["", null],
			["24:00", null],
			["23:-10", null],
			["23.5:10", null],
			["25:00", null],
			["00:60", null],
			["00:00", new Date("1970-01-01T00:00:00.000Z")],
			["12:00", new Date("1970-01-01T12:00:00.000Z")],
			["23:59", new Date("1970-01-01T23:59:00.000Z")],

			["23a:59", null], // Bogus suffix
			["23:59a", null] // Bogus suffix
		]);
	});

	it("works with type=\"time\" - setter", function () {
		testValueAsDateSetter(timeInput, [
			[null, ""],
			[new Date("1970-01-01T00:00:00.000Z"), "00:00"],
			[new Date("1970-01-01T12:00:00.000Z"), "12:00"],
			[new Date("1970-01-01T23:59:00.000Z"), "23:59"]
		]);
	});
});
