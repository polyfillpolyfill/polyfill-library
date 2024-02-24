/* eslint-env mocha, browser */
/* global proclaim */

describe("Intl.ListFormat", function () {
	before(function () {
		if (
			Intl.ListFormat &&
			typeof Intl.ListFormat.__addLocaleData === "function"
		) {
			Intl.ListFormat.__addLocaleData({
				data: {
					conjunction: {
						"long": {
							start: "{0}, {1}",
							middle: "{0}, {1}",
							end: "{0}, and {1}",
							pair: "{0} and {1}"
						},
						"short": {
							start: "{0}, {1}",
							middle: "{0}, {1}",
							end: "{0}, & {1}",
							pair: "{0} & {1}"
						},
						narrow: {
							start: "{0}, {1}",
							middle: "{0}, {1}",
							end: "{0}, {1}",
							pair: "{0}, {1}"
						}
					},
					disjunction: {
						"long": {
							start: "{0}, {1}",
							middle: "{0}, {1}",
							end: "{0}, or {1}",
							pair: "{0} or {1}"
						},
						"short": {
							start: "{0}, {1}",
							middle: "{0}, {1}",
							end: "{0}, or {1}",
							pair: "{0} or {1}"
						},
						narrow: {
							start: "{0}, {1}",
							middle: "{0}, {1}",
							end: "{0}, or {1}",
							pair: "{0} or {1}"
						}
					},
					unit: {
						"long": {
							start: "{0}, {1}",
							middle: "{0}, {1}",
							end: "{0}, {1}",
							pair: "{0}, {1}"
						},
						"short": {
							start: "{0}, {1}",
							middle: "{0}, {1}",
							end: "{0}, {1}",
							pair: "{0}, {1}"
						},
						narrow: {
							start: "{0} {1}",
							middle: "{0} {1}",
							end: "{0} {1}",
							pair: "{0} {1}"
						}
					}
				},
				locale: "en"
			});
		}
	});
	it("format should work for style conjunction", function () {
		proclaim.equal(
			new Intl.ListFormat("en", { type: "conjunction", style: "long" }).format([
				"a",
				"b",
				"c"
			]),
			"a, b, and c"
		);
	});
});
