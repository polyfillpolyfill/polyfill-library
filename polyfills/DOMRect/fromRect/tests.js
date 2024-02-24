/* eslint-env mocha, browser */
/* globals proclaim */

describe('DOMRect.fromRect', function () {
	it('should create DOMRect with specified x, y, width, and height properties', function () {
		var domRect = DOMRect.fromRect(new DOMRect(12, 34, 56, 78));
		proclaim.strictEqual(domRect.x, 12);
		proclaim.strictEqual(domRect.y, 34);
		proclaim.strictEqual(domRect.width, 56);
		proclaim.strictEqual(domRect.height, 78);
	});
	it('should default undefined arguments to zero', function () {
		var domRect = DOMRect.fromRect(new DOMRect());
		proclaim.strictEqual(domRect.x, 0);
		proclaim.strictEqual(domRect.y, 0);
		proclaim.strictEqual(domRect.width, 0);
		proclaim.strictEqual(domRect.height, 0);
	});
	it('should interpret non-numeric arguments as NaN', function () {
		var domRect = DOMRect.fromRect(new DOMRect('text', 34, 56, 78));
		proclaim.isTrue(isNaN(domRect.x));
		proclaim.strictEqual(domRect.y, 34);
		proclaim.strictEqual(domRect.width, 56);
		proclaim.strictEqual(domRect.height, 78);
		domRect = DOMRect.fromRect(new DOMRect(12, 'text', 56, 78));
		proclaim.strictEqual(domRect.x, 12);
		proclaim.isTrue(isNaN(domRect.y));
		proclaim.strictEqual(domRect.width, 56);
		proclaim.strictEqual(domRect.height, 78);
		domRect = DOMRect.fromRect(new DOMRect(12, 34, 'text', 78));
		proclaim.strictEqual(domRect.x, 12);
		proclaim.strictEqual(domRect.y, 34);
		proclaim.isTrue(isNaN(domRect.width));
		proclaim.strictEqual(domRect.height, 78);
		domRect = DOMRect.fromRect(new DOMRect(12, 34, 56, 'text'));
		proclaim.strictEqual(domRect.x, 12);
		proclaim.strictEqual(domRect.y, 34);
		proclaim.strictEqual(domRect.width, 56);
		proclaim.isTrue(isNaN(domRect.height));
	});
});
