/* eslint-env mocha, browser */
/* global proclaim */

describe("Intl.PluralRules", function () {
	before(function () {
		if (
			Intl.PluralRules &&
			typeof Intl.PluralRules.__addLocaleData === "function"
		) {
			Intl.PluralRules.__addLocaleData({
				data: {
					categories: {
						cardinal: ["one", "other"],
						ordinal: ["one", "two", "few", "other"]
					},
					fn: function (n, ord) {
						var s = String(n).split("."),
							v0 = !s[1],
							t0 = Number(s[0]) == n,
							n10 = t0 && s[0].slice(-1),
							n100 = t0 && s[0].slice(-2);
						if (ord)
							return n10 == 1 && n100 != 11
								? "one"
								: n10 == 2 && n100 != 12
								? "two"
								: n10 == 3 && n100 != 13
								? "few"
								: "other";
						return n == 1 && v0 ? "one" : "other";
					}
				},
				locale: "en"
			});
		}
	});

	it("should work for cardinal", function () {
		proclaim.equal(new Intl.PluralRules("en").select(0), "other");
		proclaim.equal(new Intl.PluralRules("en").select(1), "one");
		proclaim.equal(new Intl.PluralRules("en").select(2), "other");
		proclaim.equal(new Intl.PluralRules("en").select(-1), "one");
		proclaim.equal(new Intl.PluralRules("en").select(-2), "other");
	});

	it("should work for ordinal", function () {
		proclaim.equal(
			new Intl.PluralRules("en", { type: "ordinal" }).select(0),
			"other"
		);
		proclaim.equal(
			new Intl.PluralRules("en", { type: "ordinal" }).select(1),
			"one"
		);
		proclaim.equal(
			new Intl.PluralRules("en", { type: "ordinal" }).select(2),
			"two"
		);
		proclaim.equal(
			new Intl.PluralRules("en", { type: "ordinal" }).select(3),
			"few"
		);
		proclaim.equal(
			new Intl.PluralRules("en", { type: "ordinal" }).select(-1),
			"one"
		);
		proclaim.equal(
			new Intl.PluralRules("en", { type: "ordinal" }).select(-2),
			"two"
		);
		proclaim.equal(
			new Intl.PluralRules("en", { type: "ordinal" }).select(-3),
			"few"
		);
	});
});
