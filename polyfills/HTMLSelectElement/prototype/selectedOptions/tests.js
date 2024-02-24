/* eslint-env mocha, browser */
// eslint-disable-next-line no-unused-vars
/* globals proclaim */

describe('HTMLSelectElement.prototype.selectedOptions', function () {
	function createHTML(args) {
		var select = document.createElement('SELECT');
		if (args.multiple) {
			select.setAttribute('multiple', '');
		}

		if (args.id) {
			select.id = args.id;
		}

		document.body.appendChild(select);

		for (var i = 0; i < args.options.length; i++) {
			var option = document.createElement('OPTION');
			option.innerHTML = args.options[i].inner;

			if (args.options[i].id) {
				option.id = args.options[i].id;
			}

			if (args.options[i].selected) {
				option.setAttribute('selected', '');
			}

			if (args.options[i].disabled) {
				option.setAttribute('disabled', '');
			}

			if (args.options[i].hidden) {
				option.setAttribute('hidden', '');
			}

			select.appendChild(option);
		}

		return select;
	}

	it('doesn\'t throw with an empty select', function () {
		var select = createHTML({
			options: []
		});

		proclaim.equal(select.selectedOptions.length, 0);
	});

	// Tests from WPT :
	// https://github.com/web-platform-tests/wpt/blob/master/html/semantics/forms/the-select-element/select-selectedOptions.html

	it('returns first option in single select without explicit selected', function () {
		var select = createHTML({
			options: [
				{
					inner: 'One'
				},
				{
					inner: 'Two'
				},
				{
					inner: 'Three'
				}
			]
		});

		proclaim.equal(select.selectedOptions[0], select.children[0]);
		proclaim.equal(select.selectedOptions.length, 1);
	});

	it('returns the correct option in single select with explicit selected', function () {
		var select = createHTML({
			options: [
				{
					inner: 'One'
				},
				{
					inner: 'Two',
					selected: true
				},
				{
					inner: 'Three'
				}
			]
		});

		proclaim.equal(select.selectedOptions[0], select.children[1]);
		proclaim.equal(select.selectedOptions.length, 1);
	});

	it('returns no options in multiple select without explicit selected', function () {
		var select = createHTML({
			multiple: true,
			options: [
				{
					inner: 'One'
				},
				{
					inner: 'Two'
				},
				{
					inner: 'Three'
				}
			]
		});

		proclaim.equal(select.selectedOptions.item(0), null);
		proclaim.equal(select.selectedOptions.length, 0);
	});

	it('returns two options in multiple select with two selected', function () {
		var select = createHTML({
			multiple: true,
			options: [
				{
					inner: 'One'
				},
				{
					inner: 'Two',
					selected: true
				},
				{
					inner: 'Three',
					selected: true
				}
			]
		});

		proclaim.equal(select.selectedOptions.item(0), select.children[1]);
		proclaim.equal(select.selectedOptions.item(1), select.children[2]);
		proclaim.equal(select.selectedOptions.length, 2);
	});

	it('returns two options in multiple select with two selected and one is disabled', function () {
		var select = createHTML({
			multiple: true,
			options: [
				{
					inner: 'One'
				},
				{
					inner: 'Two',
					selected: true,
					disabled: true
				},
				{
					inner: 'Three',
					selected: true
				}
			]
		});

		proclaim.equal(select.selectedOptions.item(0), select.children[1]);
		proclaim.equal(select.selectedOptions.item(1), select.children[2]);
		proclaim.equal(select.selectedOptions.length, 2);
	});

	it('returns two options in multiple select with two selected and one is hidden', function () {
		var select = createHTML({
			multiple: true,
			options: [
				{
					inner: 'One'
				},
				{
					inner: 'Two',
					selected: true,
					hidden: true
				},
				{
					inner: 'Three',
					selected: true
				}
			]
		});

		proclaim.equal(select.selectedOptions.item(0), select.children[1]);
		proclaim.equal(select.selectedOptions.item(1), select.children[2]);
		proclaim.equal(select.selectedOptions.length, 2);
	});

	it('returns the last options in single select with two selected', function () {
		// "A select element whose multiple attribute is not specified must not have
		// more than one descendant option element with its selected attribute set."
		// - https://html.spec.whatwg.org/multipage/forms.html#the-option-element:the-select-element-6

		// "If two or more option elements in the select element's list of options
		//  have their selectedness set to true, set the selectedness of all but
		// the last option element with its selectedness set to true in the list of
		// options in tree order to false."
		// - https://html.spec.whatwg.org/multipage/forms.html#the-select-element:the-option-element-21
		var select = createHTML({
			options: [
				{
					inner: 'One',
					selected: true
				},
				{
					inner: 'Two',
					selected: true
				},
				{
					inner: 'Three'
				}
			]
		});

		proclaim.equal(select.selectedOptions.item(0), select.children[1]);
		proclaim.equal(select.selectedOptions.length, 1);
	});

	it('can be used like an HTMLCollection in single select', function () {
		var select = createHTML({
			options: [
				{
					inner: 'One'
				},
				{
					inner: 'Two'
				},
				{
					id: 'named-option',
					inner: 'Three',
					selected: true
				}
			]
		});

		proclaim.equal(select.selectedOptions.namedItem('named-option'), select.children[2]);
		proclaim.equal(select.selectedOptions.length, 1);
	});

	it('can be used like an HTMLCollection in multiple select', function () {
		var select = createHTML({
			multiple: true,
			options: [
				{
					inner: 'One'
				},
				{
					id: 'named-option-two',
					inner: 'Two',
					selected: true
				},
				{
					id: 'named-option-three',
					inner: 'Three',
					selected: true
				}
			]
		});

		proclaim.equal(select.selectedOptions.namedItem('named-option-three'), select.children[2]);
		proclaim.equal(select.selectedOptions.length, 2);
	});

	// We can't return a true live HTMLCollection in the polyfill
	it.skip('return the same object consistently', function () {
		createHTML({
			id: 'select-same-object',
			options: [
				{
					inner: 'One'
				},
				{
					inner: 'Two',
					selected: true
				},
				{
					inner: 'Three'
				}
			]
		});

		var select = document.getElementById('select-same-object');
		var selectAgain = document.getElementById('select-same-object');

		proclaim.deepEqual(select.selectedOptions, selectAgain.selectedOptions);
	});

	// We can't return a true live HTMLCollection in the polyfill
	it.skip('should return the same object after selection changes', function () {
		createHTML({
			id: 'select-same-object-change',
			multiple: true,
			options: [
				{
					inner: 'One',
					selected: true
				},
				{
					inner: 'Two',
					selected: true
				},
				{
					inner: 'Three',
					selected: true
				}
			]
		});

		var select = document.getElementById('select-same-object-change');
		var before = select.selectedOptions;
		proclaim.equal(before.length, 3);

		select.selectedOptions[1].selected = false;

		var after = select.selectedOptions;

		proclaim.equal(before, after);
		proclaim.equal(before.length, 2);
		proclaim.equal(after.length, 2);
	});
});
