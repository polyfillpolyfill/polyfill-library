
/* globals proclaim, Reflect, Symbol */

it('is a function', function () {
	proclaim.isFunction(Reflect.getOwnPropertyDescriptor);
});

it('has correct arity', function () {
	proclaim.arity(Reflect.getOwnPropertyDescriptor, 2);
});

it('has correct name', function () {
	proclaim.hasName(Reflect.getOwnPropertyDescriptor, 'getOwnPropertyDescriptor');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Reflect, 'getOwnPropertyDescriptor');
});

it('throws a TypeError if target is not an Object',function(){
	proclaim.throws(function() {
		Reflect.getOwnPropertyDescriptor(1, 'a');
	}, TypeError);

	proclaim.throws(function() {
		Reflect.getOwnPropertyDescriptor(null, 'a');
	}, TypeError);

	proclaim.throws(function() {
		Reflect.getOwnPropertyDescriptor(undefined, 'a');
	}, TypeError);

	proclaim.throws(function() {
		Reflect.getOwnPropertyDescriptor('', 'a');
	}, TypeError);

	if('Symbol' in self) {
		proclaim.throws(function() {
			Reflect.getOwnPropertyDescriptor(Symbol(), 'a');
		}, TypeError);
	}
});

describe('Basic functionality', function () {
	it('should return undefined because the object does not own the property', function () {
		var descr = Reflect.getOwnPropertyDescriptor({}, 'name');

		proclaim.equal(descr, undefined);
	});

	it('should return a data descriptor', function () {
		var descr = Reflect.getOwnPropertyDescriptor({
			name: 'Testing'
		}, 'name');
		var expected = {
			enumerable: true,
			configurable: true,
			value: 'Testing',
			writable: true
		};

		proclaim.deepEqual(descr, expected);
	});

	if ('create' in Object) {
		it('should return undefined because the object does not own the property', function () {
			var descr = Reflect.getOwnPropertyDescriptor(Object.create({
				name: 'Testing'
			}, {}), 'name');

			proclaim.equal(descr, undefined);
		});

		it('should return a data descriptor', function () {
			var expected = {
				value: 'Testing',
				configurable: true,
				enumerable: true,
				writable: true
			};
			var obj = Object.create({}, {
				name: expected
			});

			var descr = Reflect.getOwnPropertyDescriptor(obj, 'name');

			proclaim.deepEqual(descr, expected);
		});
	}

	it('should throw error for non object', function () {
		try {
			// note: in ES6, we expect this to return undefined.
			proclaim.isUndefined(Reflect.getOwnPropertyDescriptor(42, 'name'));
		} catch (err) {
			proclaim.isInstanceOf(err, TypeError);
		}
	});
});
