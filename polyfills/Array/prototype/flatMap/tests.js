
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.flatMap);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.flatMap, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.flatMap, 'flatMap');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array.prototype, 'flatMap');
});

var supportsStrictModeTests = (function () {
	'use strict';

	return this === undefined;
}).call(undefined);

if (supportsStrictModeTests) {
	it('throws TypeError if thisArg is null', function () {
		proclaim.throws(function () {
			[].flatMap.call(null, function () {});
		}, TypeError);
	});

	it('throws TypeError if thisArg is undefined', function () {
		proclaim.throws(function () {
			[].flatMap.call(undefined, function () {});
		}, TypeError);
	});
}

it('throws TypeError if argument is not callable', function () {
	proclaim.throws(function () {
		[].flatMap({});
	}, TypeError);

	proclaim.throws(function () {
		[].flatMap(0);
	}, TypeError);

	proclaim.throws(function () {
		[].flatMap();
	}, TypeError);

	proclaim.throws(function () {
		[].flatMap(undefined);
	}, TypeError);

	proclaim.throws(function () {
		[].flatMap(null);
	}, TypeError);

	proclaim.throws(function () {
		[].flatMap(false);
	}, TypeError);

	proclaim.throws(function () {
		[].flatMap('');
	}, TypeError);
});

it('throws a TypeError if constructor property is neither undefined nor an Object', function () {
	proclaim.throws(function () {
		var a = [];
		a.constructor = null;
		a.flatMap(function () {});
	}, TypeError);

	proclaim.throws(function () {
		var a = [];
		a.constructor = 1;
		a.flatMap(function () {});
	}, TypeError);

	proclaim.throws(function () {
		var a = [];
		a.constructor = 'string';
		a.flatMap(function () {});
	}, TypeError);

	proclaim.throws(function () {
		var a = [];
		a.constructor = true;
		a.flatMap(function () {});
	}, TypeError);
});

it('calls mapper function for each item in the array and flattens one level deep if mapper function returns an array', function () {
	var actual = [1, [2],
		[
			[3]
		],
		[
			[
				[4]
			]
		]
	].flatMap(function (item, index) {
		return [item, index];
	});

	var expected = [1, 0, [2], 1, [
		[3]
	], 2, [
		[
			[4]
		]
	], 3];
	proclaim.deepStrictEqual(actual, [1, 0, [2], 1, [
		[3]
	], 2, [
		[
			[4]
		]
	], 3]);
	proclaim.deepStrictEqual(actual.length, expected.length);
});

it('can change context of mapper function with second argument', function () {
	var actual = [1, 2, 3, 4].flatMap(function (item) {
		return [this.x + item];
	}, {
		x: 'hello '
	});

	proclaim.deepStrictEqual(actual, ["hello 1", "hello 2", "hello 3", "hello 4"]);
});

it('fills in sparse/holey arrays with empty arrays', function () {
	// eslint-disable-next-line no-sparse-arrays
	proclaim.deepStrictEqual([, [1]].flatMap(function (x) {
		return x;
	}), [
		[],
		[1]
	].flatMap(function (x) {
		return x;
	}));
});
