/* globals proclaim, Symbol */

it('is an alias to Array.prototype.values', function () {
	proclaim.deepEqual(Array.prototype[Symbol.iterator], Array.prototype.values);
});

it('ArrayIteratorPrototype[Symbol.toStringTag]', function () {
	proclaim.strictEqual(Object.getPrototypeOf([][Symbol.iterator]())[Symbol.toStringTag], 'Array Iterator');
});
