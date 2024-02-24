/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Javan Makhmali <javan@javan.us>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 *  @link https://github.com/javan/form-request-submit-polyfill
 */

/* globals */
// eslint-disable-next-line no-unused-vars

(function (prototype) {
	// Place all polyfill code within this function.
	if (typeof prototype.requestSubmit === "function") return;

	var supportsDomExceptionConstructor = false;
	try {
		new DOMException();
		supportsDomExceptionConstructor = true;
	} catch (e) { /* noop */ }

	prototype.requestSubmit = function requestSubmit() {
		if (!this.isConnected) {
			return;
		}

		var submitter = arguments[0];
		if (submitter) {
			validateSubmitter(submitter, this);
		}

		if (submitter && !submitter.disabled) {
			submitter.click();
			return;
		}

		submitter = document.createElement("input");
		submitter.type = "submit";
		submitter.hidden = true;
		this.appendChild(submitter);
		submitter.click();
		this.removeChild(submitter);
	};

	function validateSubmitter(submitter, form) {
		if (!(submitter instanceof HTMLElement)) {
			throw new TypeError(
				"Failed to execute 'requestSubmit' on 'HTMLFormElement': " +
				"parameter 1 is not of type 'HTMLElement'" +
				"."
			);
		}

		if (
			(submitter.form !== form) ||
			// Older browsers have incorrect implementations for the "form" attribute
			(submitter.hasAttribute('form') && (
				submitter.getAttribute('form') === '' ||
				submitter.getAttribute('form') !== form.id
			))
		) {
			if (supportsDomExceptionConstructor) {
				throw new DOMException(
					"Failed to execute 'requestSubmit' on 'HTMLFormElement': " +
					"The specified element is not owned by this form element" +
					".",
					"NotFoundError"
				);
			} else {
				throw new Error(
					"NotFoundError: Failed to execute 'requestSubmit' on 'HTMLFormElement': " +
					"The specified element is not owned by this form element" +
					"."
				);
			}
		}

		if (submitter.type === "submit" && submitter.tagName === "BUTTON") {
			return;
		}

		if (submitter.type === "submit" && submitter.tagName === "INPUT") {
			return;
		}

		if (submitter.type === "image" && submitter.tagName === "INPUT") {
			return;
		}

		throw new TypeError(
			"Failed to execute 'requestSubmit' on 'HTMLFormElement': " +
			"The specified element is not a submit button" +
			"."
		);
	}
})(HTMLFormElement.prototype);
