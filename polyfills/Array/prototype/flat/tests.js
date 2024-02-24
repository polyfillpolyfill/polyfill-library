
/* globals proclaim, Symbol */

var supportsStrictModeTests = (function () {
	'use strict';

	return this === undefined;
}).call(undefined);

it('is a function', function () {
	proclaim.isFunction(Array.prototype.flat);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.flat, 0);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.flat, 'flat');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array.prototype, 'flat');
});

it('throws a TypeError if constructor property is neither undefined nor an Object', function () {
	proclaim.throws(function () {
		var a = [];
		a.constructor = null;
		a.flat();
	}, TypeError);

	proclaim.throws(function () {
		var a = [];
		a.constructor = 1;
		a.flat();
	}, TypeError);

	proclaim.throws(function () {
		var a = [];
		a.constructor = 'string';
		a.flat();
	}, TypeError);

	proclaim.throws(function () {
		var a = [];
		a.constructor = true;
		a.flat();
	}, TypeError);
});

if (supportsStrictModeTests) {
	it('throws TypeError if thisArg is null', function () {
		proclaim.throws(function () {
			[].flat.call(null);
		}, TypeError);
	});
	it('throws TypeError if thisArg is missing', function () {
		proclaim.throws(function () {
			[].flat.call();
		}, TypeError);
	});
	it('throws TypeError if thisArg is undefined', function () {
		proclaim.throws(function () {
			[].flat.call(undefined);
		}, TypeError);
	});
}
if ('Symbol' in self) {
	it('throws TypeError if argument is a Symbol', function () {
		proclaim.throws(function () {
			[].flat(Symbol());
		}, TypeError);
	});
}

it('flattens 1 level deep if no argument is given', function () {
	proclaim.deepStrictEqual([1, [null],
		[
			[void 0]
		],
		[
			[
				[{}]
			]
		]
	].flat(), [1, null, [void 0],
		[
			[{}]
		]
	]);
});

it('flattens 1 level deep if argument is 1', function () {
	proclaim.deepStrictEqual([1, [null],
		[
			[void 0]
		],
		[
			[
				[{}]
			]
		]
	].flat(1), [1, null, [void 0],
		[
			[{}]
		]
	]);
});

it('flattens 2 levels deep if argument is 2', function () {
	proclaim.deepStrictEqual([1, [2],
		[
			[3]
		],
		[
			[
				[4]
			]
		]
	].flat(2), [1, 2, 3, [4]]);
});

it('flattens 3 levels deep if argument is 3', function () {
	proclaim.deepStrictEqual([1, [2],
		[
			[3]
		],
		[
			[
				[4]
			]
		]
	].flat(3), [1, 2, 3, 4]);
});

it('flattens all levels deep if argument is Infinity', function () {
	proclaim.deepStrictEqual([1, [2],
		[
			[3]
		],
		[
			[
				[4]
			]
		]
	].flat(Infinity), [1, 2, 3, 4]);
});

it('fills holes in holey/sparse arrays', function () {
	// eslint-disable-next-line no-sparse-arrays
	proclaim.deepStrictEqual([, [2]].flat(), [
		[],
		[2]
	].flat());
});

it('does not flatten is argument is not coercible to an integer', function () {
	proclaim.deepStrictEqual([1, [2]].flat('one'), [1, [2]]);
	proclaim.deepStrictEqual([1, [2]].flat({}), [1, [2]]);
});

it('does not flatten if given negative infinity', function () {
	proclaim.deepStrictEqual([1, [2]].flat(-Infinity), [1, [2]]);
});

it('does flatten if given a string which can coerce to an integer', function () {
	proclaim.deepStrictEqual([1, [2]].flat("1"), [1, 2]);
});

it('does not include empty arrays in the result', function () {
	proclaim.deepStrictEqual([
		[],
		[]
	].flat(), []);
});

it('can be rebound', function () {
	proclaim.deepStrictEqual([].flat.bind([
		[1],
		[{}]
	])(), [1, {}]);
});

it('works with array-like objects', function () {
	proclaim.deepStrictEqual([].flat.call({
		length: 1,
		0: [1]
	}), [1]);

	proclaim.deepStrictEqual([].flat.call({
		length: undefined,
		0: [1]
	}), []);
});
