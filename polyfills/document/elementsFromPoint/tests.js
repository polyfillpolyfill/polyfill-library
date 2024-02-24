/* eslint-env mocha, browser */
// eslint-disable-next-line no-unused-vars
/* globals proclaim */

describe('document.elementsFromPoint', function () {
	function getElementCenter(el) {
		var elBounds = el.getBoundingClientRect();

		var width = elBounds.right - elBounds.left;
		var height = elBounds.bottom - elBounds.top;
		var x = elBounds.left + width / 2;
		var y = elBounds.top + height / 2;

		return [x, y];
	}

	function mapToTagName(elements) {
		var elementTagNames = [];
		for (var i = 0; i < elements.length; i++) {
			elementTagNames.push(elements[i].tagName.toLowerCase());
		}

		return elementTagNames;
	}

	it('should return and empty array if negative coordinates are passed', function() {
		var result = document.elementsFromPoint(-1000, 1000);
		proclaim.isArray(result);
	});

	it('should return all the elements at the specified coordinates', function() {
		var container = document.body.appendChild(document.createElement('div'));
		var p = container.appendChild(document.createElement('p'));

		p.innerHTML = 'Some text';

		var center = getElementCenter(p);

		var elements = mapToTagName(document.elementsFromPoint(center[0], center[1]));
		proclaim.deepStrictEqual(elements, ['p', 'div', 'body', 'html']);
		proclaim.deepStrictEqual(elements, ['p', 'div', 'body', 'html']);
	});

	it('should not change hit-testing property if set', function() {
		var container = document.body.appendChild(document.createElement('div'));
		var isIE =  (/msie|trident/i).test(navigator && navigator.userAgent);
		var expectedPriority = 'important';
		var expectedValue = isIE
			? 'visible'
			: 'all';
		var supportedProperty = isIE
			? 'visibility'
			: 'pointer-events';
		var supportCSSStyleDeclarationMethods = typeof document.body.style.getPropertyPriority !== 'undefined';

		var p = container.appendChild(document.createElement('p'));
		p.innerHTML = 'Some text';

		if (supportCSSStyleDeclarationMethods) {
			p.style.setProperty(supportedProperty, expectedValue, expectedPriority);
		} else {
			p.style[supportedProperty] = expectedValue;
		}

		var center = getElementCenter(p);

		document.elementsFromPoint(center[0], center[1]);

		var propertyValue;
		var propertyPriority;
		if (supportCSSStyleDeclarationMethods) {
			propertyValue = p.style.getPropertyValue(supportedProperty);
			propertyPriority = p.style.getPropertyPriority(supportedProperty);

			proclaim.strictEqual(propertyValue, expectedValue);
			proclaim.strictEqual(propertyPriority, expectedPriority);

			propertyValue = container.style.getPropertyValue(supportedProperty);
			propertyPriority = container.style.getPropertyPriority(supportedProperty);

			// It may be null or empty string on some browsers
			proclaim.notOk(propertyValue);
			proclaim.notOk(propertyPriority);
		} else {
			propertyValue = p.style[supportedProperty];
			proclaim.strictEqual(propertyValue, expectedValue);

			propertyValue = container.style[supportedProperty];

			// It may be null or empty string on some browsers
			proclaim.notOk(propertyValue);
		}
	});
});
