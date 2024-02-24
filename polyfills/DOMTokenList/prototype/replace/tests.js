/* eslint-env mocha, browser */
/* global proclaim */

var div = document.createElement('div');
var tokenList = div.classList;

function testReplace(before, token, newToken, after, expectedResult, expectedExceptionName) {
	div.className = '' + before;
	try {
		var result = tokenList.replace(token, newToken);
	} catch (e) {
		proclaim.strictEqual(div.className, '' + before);
		proclaim.isTrue(e instanceof DOMException);
		proclaim.strictEqual(e.name, expectedExceptionName);
	}
	proclaim.strictEqual(div.className, '' + after);
	proclaim.strictEqual(result, expectedResult);
}

// If either token or newToken is the empty string, then throw a "SyntaxError" DOMException.
describe('should throw a "SyntaxError" DOMException', function () {
	it('if token is the empty string', function() {
		testReplace(null, '', 'a', null, undefined, 'SyntaxError');
		testReplace(null, '', ' ', null, undefined, 'SyntaxError');
	});

	it('if newToken is the empty string', function() {
		testReplace(null, 'a', '', null, undefined, 'SyntaxError');
		testReplace(null, ' ', '', null, undefined, 'SyntaxError');
	});
});

// If either token or newToken contains any ASCII whitespace, then throw an "InvalidCharacterError" DOMException.
describe('should throw an "InvalidCharacterError" DOMException', function () {
	it('if token contains whitespace', function() {
		testReplace(null, ' ', 'a', null, undefined, 'InvalidCharacterError');
		testReplace(null, '\ta', 'b', null, undefined, 'InvalidCharacterError');
		testReplace(null, 'a\t', 'b', null, undefined, 'InvalidCharacterError');
		testReplace(null, '\na', 'b', null, undefined, 'InvalidCharacterError');
		testReplace(null, 'a\n', 'b', null, undefined, 'InvalidCharacterError');
		testReplace(null, '\fa', 'b', null, undefined, 'InvalidCharacterError');
		testReplace(null, 'a\f', 'b', null, undefined, 'InvalidCharacterError');
		testReplace(null, '\ra', 'b', null, undefined, 'InvalidCharacterError');
		testReplace(null, 'a\r', 'b', null, undefined, 'InvalidCharacterError');
		testReplace(null, ' a', 'b', null, undefined, 'InvalidCharacterError');
		testReplace(null, 'a ', 'b', null, undefined, 'InvalidCharacterError');
	});

	it('if newToken contains whitespace', function() {
		testReplace(null, 'a', ' ', null, undefined, 'InvalidCharacterError');
		testReplace(null, 'b', '\ta', null, undefined, 'InvalidCharacterError');
		testReplace(null, 'b', 'a\t', null, undefined, 'InvalidCharacterError');
		testReplace(null, 'b', '\na', null, undefined, 'InvalidCharacterError');
		testReplace(null, 'b', 'a\n', null, undefined, 'InvalidCharacterError');
		testReplace(null, 'b', '\fa', null, undefined, 'InvalidCharacterError');
		testReplace(null, 'b', 'a\f', null, undefined, 'InvalidCharacterError');
		testReplace(null, 'b', '\ra', null, undefined, 'InvalidCharacterError');
		testReplace(null, 'b', 'a\r', null, undefined, 'InvalidCharacterError');
		testReplace(null, 'b', ' a', null, undefined, 'InvalidCharacterError');
		testReplace(null, 'b', 'a ', null, undefined, 'InvalidCharacterError');
	});
});

// If this’s token set does not contain token, then return false.
it('should return false if this doesn\'t contain token', function() {
	testReplace('a', 'A', 'b', 'a', false);
	testReplace('a b', 'c', 'a', 'a b', false);
	testReplace('a b c', 'd', 'e', 'a b c', false);
	testReplace('', 'a', 'b', '', false);
});

// Replace token in this’s token set with newToken.
// Run the update steps.
// Return true;
describe('should replace token with newToken', function() {
	it('if this doesn\'t already contain newToken', function() {
		testReplace('a', 'a', 'b', 'b', true);
		testReplace('a b', 'b', 'A', 'a A', true);
		testReplace('a b c', 'b', 'd', 'a d c', true);
	});

	// order is important, cfr. https://infra.spec.whatwg.org/#set-replace
	it('if newToken precedes token in this\'s token set (simply remove token)', function() {
		testReplace('a b c', 'c', 'a', 'a b', true);
	});

	it('if newToken follows token in this\'s token set (move newToken to token\'s position)', function() {
		testReplace('a', 'a', 'a', 'a', true);
		testReplace('c b a', 'c', 'a', 'a b', true);
	});
});
