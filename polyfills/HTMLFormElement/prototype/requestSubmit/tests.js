/**
* Adapted from Web Platform Tests
* HTMLFormElement.prototype.requestSubmit()
* @link
https://github.com/web-platform-tests/wpt/blob/master/html/semantics/forms/the-form-element/form-requestsubmit.html
* Retrieved: 4 Nov 2022
*
* # The 3-Clause BSD License
*
* Copyright © web-platform-tests contributors
*
* Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.
* 2. Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation
and/or other materials provided with the distribution.
* 3. Neither the name of the copyright holder nor the names of its contributors
may be used to endorse or promote products derived from this software without
specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/* eslint-env mocha, browser */
// eslint-disable-next-line no-unused-vars
/* globals proclaim */
describe("HTMLFormElement.prototype.requestSubmit", function () {
	var supportsFormAssociatedElements = false;

	// Add <iframe> to DOM for use by several tests
	this.beforeAll(function () {
		(function () {
			var form = document.createElement("form");
			form.id = "the-form";
			var input = document.createElement("input");
			input.setAttribute("form", "the-form");

			document.body.appendChild(form);
			document.body.appendChild(input);

			supportsFormAssociatedElements = input.form === form;
			document.body.removeChild(form);
			document.body.removeChild(input);
		})();

		document.body.insertAdjacentHTML(
			"afterbegin",
			"<div id=\"test-container\"></div>"
		);

		document.body.insertAdjacentHTML(
			"afterbegin",
			'<iframe name="iframe" src="about:blank"></iframe>'
		);
	});

	this.beforeEach(function () {
		document.getElementById("test-container").innerHTML = "";
	});

	it('is a function', function () {
		proclaim.isFunction(HTMLFormElement.prototype.requestSubmit);
	});

	it('has correct arity', function () {
		proclaim.arity(HTMLFormElement.prototype.requestSubmit, 0);
	});

	it('has correct name', function () {
		proclaim.hasName(HTMLFormElement.prototype.requestSubmit, 'requestSubmit');
	});

	it("Passing anything other than an HTMLElement should throw", function () {
		document.getElementById("test-container").insertAdjacentHTML(
			"afterbegin",
			'<form action="/empty-document.html" target="iframe"></form>'
		);

		var form = document.querySelector("form");

		proclaim.throws(function () {
			form.requestSubmit('not an element');
		});
	});

	it("Passing an element which is not a submit button should throw", function () {
		document.getElementById("test-container").insertAdjacentHTML(
			"afterbegin",
			'<form action="/empty-document.html" target="iframe">' +
			'  <input type="reset">' +
			'  <input type="text">' +
			'  <button type="reset"></button>' +
			'  <button type="button"></button>' +
			'</form>'
		);

		var form = document.querySelector("form");
		proclaim.throws(function () {
			form.requestSubmit(document.body);
		});

		// These inputs/buttons are not type="submit", so they should throw when used as submitter
		for (var index = 0; index < form.elements.length; index++) {
			var control = form.elements[index];
			proclaim.throws(function () {
				form.requestSubmit(control);
			});
		}
	});

	it("Passing a submit button not owned by the context object should throw", function () {
		document.getElementById("test-container").insertAdjacentHTML(
			"afterbegin",
			'<form id="form1" action="/empty-document.html" target="iframe">' +
			'  <input id="control1" form="" type="submit">' +
			'  <button id="control2" form="form2" type="submit"></button>' +
			'</form>' +
			'<form id="form2" action="/empty-document.html" target="iframe">' +
			'  <button id="control3" type="submit"></button>' +
			'</form>' +
			'<form action="/empty-document.html" target="iframe">' +
			'  <button id="control4" form="" type="submit"></button>' +
			'</form>' +
			'<form id="" action="/empty-document.html" target="iframe">' +
			'  <button id="control5" form="" type="submit"></button>' +
			'</form>'
		);

		var form = document.getElementById("form1");
		var submitButton = document.createElement("button");
		submitButton.type = "submit";
		proclaim.throws(function () {
			form.requestSubmit(submitButton);
		});

		var control1 = document.getElementById("control1");
		proclaim.ok(!!control1);
		proclaim.throws(function () {
			form.requestSubmit(control1);
		});

		var control2 = document.getElementById("control2");
		proclaim.ok(!!control2);
		proclaim.throws(function () {
			form.requestSubmit(control2);
		});

		var control3 = document.getElementById("control3");
		proclaim.ok(!!control3);
		proclaim.throws(function () {
			form.requestSubmit(control3);
		});

		var control4 = document.getElementById("control4");
		proclaim.ok(!!control4);
		proclaim.throws(function () {
			form.requestSubmit(control4);
		});

		var control5 = document.getElementById("control5");
		proclaim.ok(!!control5);
		proclaim.throws(function () {
			form.requestSubmit(control5);
		});
	});

	it("requestSubmit() should accept button[type=submit], input[type=submit], and input[type=image]", function () {
		document.getElementById("test-container").insertAdjacentHTML(
			"afterbegin",
			'<input id="control1" type=submit form="form1">' +
			'<form id="form1" action="/empty-document.html" target="iframe">' +
			'  <button id="control2" type="submit"></button>' +
			'  <button id="control3"></button>' +
			'  <button id="control4" type="invalid"></button>' +
			'  <input id="control5" type="submit">' +
			'  <input id="control6" type="image">' +
			'</form>'
		);

		var form = document.querySelector("form");
		var didDispatchSubmit = false;
		form.addEventListener("submit", function (event) {
			event.preventDefault();
			didDispatchSubmit = true;
		});

		if (supportsFormAssociatedElements) {
			var control1 = document.getElementById("control1");
			proclaim.ok(!!control1);
			didDispatchSubmit = false;
			form.requestSubmit(control1);
			proclaim.isTrue(didDispatchSubmit);
		}

		var control2 = document.getElementById("control2");
		proclaim.ok(!!control2);
		didDispatchSubmit = false;
		form.requestSubmit(control2);
		proclaim.isTrue(didDispatchSubmit);

		var control3 = document.getElementById("control3");
		proclaim.ok(!!control3);
		didDispatchSubmit = false;
		form.requestSubmit(control3);
		proclaim.isTrue(didDispatchSubmit);

		var control4 = document.getElementById("control4");
		proclaim.ok(!!control4);
		didDispatchSubmit = false;
		form.requestSubmit(control4);
		proclaim.isTrue(didDispatchSubmit);

		var control5 = document.getElementById("control5");
		proclaim.ok(!!control5);
		didDispatchSubmit = false;
		form.requestSubmit(control5);
		proclaim.isTrue(didDispatchSubmit);

		var control6 = document.getElementById("control6");
		proclaim.ok(!!control6);
		didDispatchSubmit = false;
		form.requestSubmit(control6);
		proclaim.isTrue(didDispatchSubmit);
	});

	it("requestSubmit() should trigger interactive form validation", function () {
		document.getElementById("test-container").insertAdjacentHTML(
			"afterbegin",
			'<form action="/empty-document.html" target="iframe">' +
			'  <input id="control1" required>' +
			'  <button id="control2" type="submit">' +
			'</form>'
		);

		var form = document.querySelector("form");
		var control1 = document.getElementById("control1");
		var control2 = document.getElementById("control2");

		var didDispatchInvalid = false;
		control1.addEventListener("invalid", function () {
			didDispatchInvalid = true;
		});

		control2.click();
		if (!didDispatchInvalid) { // not all browsers support the "invalid" event
			this.skip();
			return;
		}

		didDispatchInvalid = false;
		form.requestSubmit();
		proclaim.isTrue(didDispatchInvalid);
	});

	// We can't implement this because we can't detect when a submission process ends.
	it.skip("requestSubmit() doesn't run form submission reentrantly", function () {
		document.getElementById("test-container").insertAdjacentHTML(
			"afterbegin",
			'<form action="/empty-document.html" target="iframe">' +
			'  <input type=submit>' +
			'</form>'
		);
		var form = document.querySelector("form");
		var submitButton = form.elements[0];
		var submitCounter = 0;

		function handler1(e) {
			++submitCounter;
			if (submitCounter > 1) { // not all browsers support "once"
				e.preventDefault();
				return;
			}

			form.requestSubmit();
			e.preventDefault();
		}

		submitCounter = 0;
		form.addEventListener("submit", handler1);
		form.requestSubmit();
		proclaim.strictEqual(submitCounter, 1, "handler 1 fired only once");
		form.removeEventListener("submit", handler1);

		function handler2(e) {
			++submitCounter;
			if (submitCounter > 1) {
				e.preventDefault();
				return;
			}

			submitButton.click();
			e.preventDefault();
		}

		submitCounter = 0;
		form.addEventListener("submit", handler2);
		form.requestSubmit();
		proclaim.strictEqual(submitCounter, 1, "handler 2 fired only once");
		form.removeEventListener("submit", handler2);

		function handler3(e) {
			++submitCounter;
			if (submitCounter > 1) {
				e.preventDefault();
				return;
			}

			form.requestSubmit();
			e.preventDefault();
		}

		submitCounter = 0;
		form.addEventListener("submit", handler3);
		submitButton.click();
		proclaim.strictEqual(submitCounter, 1, "handler 3 fired only once");
		form.removeEventListener("submit", handler3);
	});

	// We can't implement this because we can't detect when a submission process ends.
	it.skip("requestSubmit() doesn't run interactive validation reentrantly", function () {
		document.getElementById("test-container").insertAdjacentHTML(
			"afterbegin",
			'<form action="/empty-document.html" target="iframe"><input type=submit><input required></form>'
		);
		var form = document.querySelector("form");
		var submitButton = form.elements[0];
		var invalidControl = form.elements[1];
		var invalidCounter = 0;
		invalidControl.addEventListener(
			"invalid",
			function () {
				++invalidCounter;
				if (invalidCounter < 10) form.requestSubmit();
			},
			{ once: true }
		);
		form.requestSubmit();
		proclaim.strictEqual(invalidCounter, 1);

		invalidCounter = 0;
		invalidControl.addEventListener(
			"invalid",
			function () {
				++invalidCounter;
				if (invalidCounter < 10) submitButton.click();
			},
			{ once: true }
		);
		form.requestSubmit();
		proclaim.strictEqual(invalidCounter, 1);

		invalidCounter = 0;
		invalidControl.addEventListener(
			"invalid",
			function () {
				++invalidCounter;
				if (invalidCounter < 10) form.requestSubmit();
			},
			{ once: true }
		);
		submitButton.click();
		proclaim.strictEqual(invalidCounter, 1);
	});

	it("requestSubmit() for a disconnected form should not submit the form", function () {
		var form = document.createElement("form");
		var submitCounter = 0;
		form.addEventListener("submit", function (e) {
			++submitCounter;
			e.preventDefault();
		});
		form.requestSubmit();
		proclaim.strictEqual(submitCounter, 0);
	});

	it("The value of the submitter should be appended, and form* attributes of the submitter should be handled.", function (done) {
		document.getElementById("test-container").insertAdjacentHTML(
			"afterbegin",
			'<form action="/empty-document.html" target="iframe"><input required><input type=submit formnovalidate name="prop" value="e277b63f-a0b1-437e-a557-51c854f7d19b"></form>'
		);
		var form = document.body.querySelector("form");
		var iframe = document.body.querySelector("iframe");

		// The form should be submitted though it is invalid. Use <iframe> to accept the POST, and examine the submission there.
		iframe.addEventListener("load", function () {
			var formUrlencodedSubmission = iframe.contentWindow.location.search;
			proclaim.isTrue(formUrlencodedSubmission.indexOf("prop=e277b63f-a0b1-437e-a557-51c854f7d19b") !== -1);
			done();
		});
		form.requestSubmit(form.querySelector("[type=submit]"));
	});

	it("Using requestSubmit on a disabled button (via disabled attribute) should trigger submit", function (done) {
		document.getElementById("test-container").insertAdjacentHTML(
			"afterbegin",
			'<form action="/empty-document.html" target="iframe"><button type="submit" name="n1" value="v1" disabled=""></button></form>'
		);
		var form = document.querySelector("form");
		var submitter = form.querySelector("button[type=submit]");

		form.addEventListener("submit", function (e) {
			e.preventDefault();
			proclaim.strictEqual(e.target, form);
			done();
		});

		form.requestSubmit(submitter);
	});

	it("[Optional: Only applies if browser supports FormData] The constructed FormData object should not contain an entry for the submit button that was used to submit the form.", function () {
		// If the browser does support FormData, skip this test because it is only about
		// the behavior of the constructed FormData.
		if (!('FormData' in window) || !('has' in window.FormData.prototype)) {
			this.skip();
			return;
		}

		document.getElementById("test-container").insertAdjacentHTML(
			"afterbegin",
			'<form action="/empty-document.html" target="iframe">' +
			'  <input name="n1" value="v1">' +
			'  <button type="submit" name="n2" value="v2"></button>' +
			'</form>' +
			'<form id="form2" action="/empty-document.html" target="iframe"></form>'
		);
		var form = document.querySelector("form");
		var formDataInEvent = null;
		var submitter = form.querySelector("button[type=submit]");

		form.addEventListener("submit", function (e) {
			e.preventDefault();
			// This FormData constructor doesn't know how the form was submitted,
			// so the submitter is not present in this FormData, even though it
			// would be present in POST submissions. Only the normally-included data is here.
			formDataInEvent = new FormData(e.target);
		});

		form.requestSubmit(submitter);
		proclaim.strictEqual(formDataInEvent.get("n1"), "v1");

		// Chrome 50-53 have a bug where `FormData` includes the submitter in the constructed `FormData`.
		// Chrome 54 has a fix for `FormData` and is the first with support for `requestFullScreen`.
		if ('requestFullScreen' in Element) {
			proclaim.isFalse(formDataInEvent.has("n2"));
		}
	});

	it("[Optional: Only applies if browser supports FormData] Using requestSubmit on a disabled button (via disabled attribute) should not be visible in constructed FormData", function (done) {
		// If the browser does support FormData, skip this test because
		// it is only about the behavior of the constructed FormData.
		if (!('FormData' in window) || !('has' in window.FormData.prototype)) {
			this.skip();
			return;
		}

		document.getElementById("test-container").insertAdjacentHTML(
			"afterbegin",
			'<form action="/empty-document.html" target="iframe">' +
			'  <button type="submit" name="n1" value="v1" disabled=""></button>' +
			'</form>'
		);
		var form = document.querySelector("form");
		var formDataInEvent = null;
		var submitter = form.querySelector("button[type=submit]");

		form.addEventListener("submit", function (e) {
			e.preventDefault();
			formDataInEvent = new FormData(e.target);
			proclaim.strictEqual(e.target, form);
			proclaim.isFalse(formDataInEvent.has("n1"));
			done();
		});

		form.requestSubmit(submitter);
	});
});
