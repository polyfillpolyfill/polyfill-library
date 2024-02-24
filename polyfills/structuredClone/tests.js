/* eslint-env mocha, browser */
/* globals proclaim, BigInt, Map, Set, Uint32Array */

describe('structuredClone', function () {
	it('is a function', function () {
		proclaim.isFunction(structuredClone);
	});

	it('has correct arity', function () {
		proclaim.arity(structuredClone, 1);
	});

	var date = new Date();

	var bi = null;
	if ("BigInt" in window && typeof BigInt == "function"){
		try {
			bi = BigInt(1);
		} catch (e) {
			//no BigInt support.
		}
	}

	var obj = {
		arr: [],
		bigint: bi,
		"boolean": true,
		number: 123,
		string: '',
		undefined: void 0,
		"null": null,
		"int": new Uint32Array([1, 2, 3]),
		map: new Map([['a', 123]]),
		set: new Set(['a', 'b']),
		Bool: new Boolean(false),
		Num: new Number(0),
		Str: new String(''),
		re: new RegExp('test', 'gim'),
		error: new Error('test'),
		BI: Object(bi),
		date: date
	};

	obj.arr.push(obj, obj, obj);

	var deserialized = structuredClone(obj);

	it('has correct name', function () {
		proclaim.hasName(structuredClone, 'structuredClone');
	});

	it('serializes correct types', function () {
		proclaim.isInstanceOf(deserialized.int, Uint32Array);
		proclaim.isInstanceOf(deserialized.Bool, Boolean);
		proclaim.isInstanceOf(deserialized.Num, Number);
		proclaim.isInstanceOf(deserialized.Str, String);
		proclaim.isInstanceOf(deserialized.re, RegExp);
		proclaim.isInstanceOf(deserialized.error, Error);
		proclaim.isInstanceOf(deserialized.date, Date);

		if (bi){
			proclaim.isInstanceOf(deserialized.BI, BigInt);
		}
	});

	it('serializes values', function () {
		/* eslint-disable-next-line dot-notation */
		proclaim.equal(deserialized['boolean'], true);
		proclaim.equal(deserialized.number, 123);
		proclaim.equal(deserialized.string, '');
		proclaim.equal(deserialized.undefined, void 0);
		/* eslint-disable-next-line dot-notation */
		proclaim.equal(deserialized["null"], null);

		/* eslint-disable-next-line dot-notation */
		proclaim.equal(deserialized['int'].length, 3);
		/* eslint-disable-next-line dot-notation */
		proclaim.equal(deserialized['int'][0], 1);
		/* eslint-disable-next-line dot-notation */
		proclaim.equal(deserialized['int'][1], 2);
		/* eslint-disable-next-line dot-notation */
		proclaim.equal(deserialized['int'][2], 3);

		proclaim.equal(deserialized.map.size, 1);
		proclaim.equal(deserialized.map.get('a'), 123);

		proclaim.equal(deserialized.set.size, 2);
		proclaim.equal(deserialized.set.has('a'), true);
		proclaim.equal(deserialized.set.has('b'), true);

		proclaim.equal(deserialized.Bool.valueOf(), false);
		proclaim.equal(deserialized.Num.valueOf(), 0);
		proclaim.equal(deserialized.Str.valueOf(), '');
		proclaim.equal(deserialized.re.source, 'test');
		proclaim.equal(deserialized.re.multiline, true);
		proclaim.equal(deserialized.re.ignoreCase, true);
		proclaim.equal(deserialized.re.global, true);
		proclaim.equal(deserialized.error.message, 'test');
		proclaim.equal(deserialized.date.toISOString(), date.toISOString());

		if (bi) {
			proclaim.equal(deserialized.bigint, bi);
			proclaim.equal(deserialized.BI.valueOf(), bi);
		}
	});

	it('preserves references', function () {
		proclaim.equal(deserialized.arr.length, 3);
		proclaim.equal(deserialized.arr[0], deserialized);
		proclaim.equal(deserialized.arr[1], deserialized);
		proclaim.equal(deserialized.arr[2], deserialized);
	});
});
