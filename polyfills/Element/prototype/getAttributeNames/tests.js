/* eslint-env mocha, browser */
// eslint-disable-next-line no-unused-vars
/* globals proclaim */

describe('Element.prototype.getAttributeNames', function () {
	it('should return the attribute names', function () {
		var el = document.body.appendChild(document.createElement('DIV'));
		el.setAttribute('alpha', '1');
		el.setAttribute('beta', '2');

		var foundAlpha = false;
		var foundBeta = false;
		var foundUnexpected = false;

		var attributeNames = el.getAttributeNames();
		for (var i = 0; i < attributeNames.length; i++) {
			var attributeName = attributeNames[i];
			if (attributeName === 'alpha') {
				foundAlpha = true;
				continue
			}

			if (attributeName === 'beta') {
				foundBeta = true;
				continue
			}

			foundUnexpected = true;
		}

		proclaim.equal(foundUnexpected, false);
		proclaim.equal(foundAlpha, true);
		proclaim.equal(foundBeta, true);
		proclaim.equal(attributeNames.length, 2);
	});

	it('does not include duplicate attribute names', function () {
		var el = document.body.appendChild(document.createElement('DIV'));
		el.innerHTML = '<div id="attributes-el" alpha="1" alpha="one" beta="2">';
		var attributesEl = document.getElementById('attributes-el');

		var foundId = false;
		var foundAlpha = false;
		var foundBeta = false;
		var foundUnexpected = false;

		var attributeNames = attributesEl.getAttributeNames();
		for (var i = 0; i < attributeNames.length; i++) {
			var attributeName = attributeNames[i];
			if (attributeName === 'id') {
				foundId = true;
				continue
			}

			if (attributeName === 'alpha') {
				foundAlpha = true;
				continue
			}

			if (attributeName === 'beta') {
				foundBeta = true;
				continue
			}

			foundUnexpected = true;
		}

		proclaim.equal(foundUnexpected, false);
		proclaim.equal(foundId, true);
		proclaim.equal(foundAlpha, true);
		proclaim.equal(foundBeta, true);
		proclaim.equal(attributeNames.length, 3);
	});

	it('should return an empty list when there are no attributes', function () {
		var el = document.body.appendChild(document.createElement('DIV'));

		proclaim.deepEqual(el.getAttributeNames(), []);
	});
});
