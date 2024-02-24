/* eslint-env mocha, browser */
/* global proclaim */

function getDOMTokenList () {
	var div = document.createElement('div');
	div.className = 'class1 class2';
	return div.classList;
}

it('is a function', function () {
	proclaim.isFunction(DOMTokenList.prototype.forEach);
});

it('has correct arity', function () {
	proclaim.arity(DOMTokenList.prototype.forEach, 1);
});

it('has correct name', function () {
	proclaim.hasName(DOMTokenList.prototype.forEach, 'forEach');
});

it('is Array.prototype.forEach', function () {
	proclaim.deepStrictEqual(DOMTokenList.prototype.forEach, Array.prototype.forEach);
});

// https://github.com/web-platform-tests/wpt/blob/92bc5ba93ff8d8b0323344b4f73bc73a31b3e651/dom/lists/DOMTokenList-iteration.html#L42-L58
it('passes WPT tests', function () {
	var tokenList = getDOMTokenList();
	tokenList.add('class3');

	var values = ['class1', 'class2', 'class3'];
	var keys = [0, 1, 2];

	var cur = 0;
	var thisObj = {};

	tokenList.forEach(function (value, key, listObj) {
		proclaim.equal(listObj, tokenList);
		proclaim.equal(this, thisObj);
		proclaim.equal(value, values[cur]);
		proclaim.equal(key, keys[cur]);
		cur++;
	}, thisObj);
});
