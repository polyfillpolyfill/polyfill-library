/* eslint-env mocha, browser */
/* global proclaim */

describe('Element.prototype.toggleAttribute', function() {
	var el;

	beforeEach(function () {
		el = document.body.appendChild(document.createElement("div"));
	});

	afterEach(function () {
		document.body.removeChild(el);
	});

	it("should throw an error if the attribute name is not valid", function () {
		proclaim.throws(function () {
			el.toggleAttribute('$');
		});
	});

	describe("if the attribute value is not set", function () {

		describe("and force is not given", function () {
			it("should create the attribute with the value of an empty string", function () {
				el.toggleAttribute('a');
				proclaim.equal(el.getAttribute('a'), '');
			});

			it("should return true", function () {
				proclaim.equal(el.toggleAttribute('a'), true);
			});
		});

		describe("and force is true", function () {
			it("should create the attribute with the value of an empty string", function () {
				el.toggleAttribute('a', true);
				proclaim.equal(el.getAttribute('a'), '');
			});

			it("should return true", function () {
				proclaim.equal(el.toggleAttribute('a', true), true);
			});
		});

		describe("and force is false", function () {
			it("should return false", function () {
				proclaim.equal(el.toggleAttribute('a', false), false);
			});
		});
	});

	describe("if the attribute value is set", function () {

		beforeEach(function () {
			el.setAttribute('a', true);
		});

		describe("and force is not given", function () {
			it("should remove the attribute", function () {
				el.toggleAttribute('a');
				proclaim.isFalse(el.hasAttribute('a'));
			});

			it("should return false", function () {
				proclaim.equal(el.toggleAttribute('a'), false);
			});
		});

		describe("and force is false", function () {
			it("should remove the attribute", function () {
				el.toggleAttribute('a', false);
				proclaim.isFalse(el.hasAttribute('a'));
			});

			it("should return false", function () {
				proclaim.equal(el.toggleAttribute('a', false), false);
			});
		});

		describe("and force is true", function () {
			it("should return true", function () {
				proclaim.equal(el.toggleAttribute('a', true), true);
			});
		});
	});

	it("should lowercase its name argument", function () {
		el.toggleAttribute('A-b-C');
		proclaim.isTrue(el.hasAttribute('a-b-c'));
	});
});
