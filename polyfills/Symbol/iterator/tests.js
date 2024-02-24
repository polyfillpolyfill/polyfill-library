/* eslint-env mocha, browser */
/* global proclaim, Symbol, Set, Map */

it('has the well known symbol iterator as static properties on Symbol', function() {
	proclaim.notEqual(Symbol.iterator, undefined);

	var iterator = Symbol.iterator;
	Symbol.iterator = "nope";
	proclaim.equal(Symbol.iterator, iterator);
});

var hasNodeListGlobal = typeof NodeList !== 'undefined' ? it : xit;

hasNodeListGlobal('can attach to a NodeList correctly', function() {

	NodeList.prototype[Symbol.iterator] = function() {
		var called = false;
		var that = this;

		return {
			next: function() {
				if (called) {
					return {
						done: true
					};
				} else {
					called = true;
					return {
						done: false,
						value: that[0]
					};
				}
			}
		};
	};
	var ul = document.createElement('ul');
	ul.appendChild(document.createElement('li'));

	var dom = ul.childNodes;

	var iterator = dom[Symbol.iterator]();
	var entry;
	// eslint-disable-next-line no-constant-condition
	while(true) {
		entry = iterator.next();
		if (entry.done !== false) break;
		entry.value.innerHTML = 'Test';
	}

	proclaim.equal(dom[0].innerHTML, 'Test');
});

if ('from' in Array) {
	it('does not break "Array.from" with an Array', function () {
		var a = [];
		a.push('a');
		proclaim.equal(Array.from(a)[0], 'a');
	});

	if ('Set' in self) {
		it('does not break "Array.from" with a Set', function () {
			var s = new Set();
			s.add('a');
			proclaim.equal(Array.from(s)[0], 'a')
		});
	}

	if ('Map' in self) {
		it('does not break "Array.from" with a Map', function () {
			var m = new Map();
			m.set('a', '1');
			proclaim.equal(Array.from(m)[0][0], 'a');
		});
	}

	it('does not break "Array.from" with function arguments', function () {
		function f() {
			return Array.from(arguments);
		}
		proclaim.equal(Array.from(f('a', 'b'))[0], 'a');
	});

	it('does not break "Array.from" with a NodeList', function () {
		var imgA = document.createElement('IMG');
		var imgB = document.createElement('IMG');
		document.body.appendChild(imgA);
		document.body.appendChild(imgB);
		var images = document.getElementsByTagName('img');
		proclaim.equal(Array.from(images)[0], imgA);
	});
}
