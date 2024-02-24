
/* globals proclaim, Promise */

function makeArrayIterator (array) {
	var i = 0;
	var iterator = {};
	// polyfill for `Symbol.iterator` has been provided as part of `IterableToList`
	iterator[self.Symbol.iterator] = function () {
		return {
			next: function() {
				return i >= array.length
					? { done: true }
					: { value: array[i++] };
			}
		};
	};
	return iterator;
}

it('is a function', function () {
	proclaim.isFunction(Promise.any);
});

it('has correct arity', function () {
	proclaim.arity(Promise.any, 1);
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Promise, 'any');
});

describe('any', function () {
	it("resolves to the first fulfilled promise when passed an array", function () {
		var promises = [Promise.reject(1), Promise.resolve(2), 3];
		return Promise.any(promises).then(function (result) {
			proclaim.strictEqual(result, 2);
		});
	});

	it("rejects with an AggregateError when passed an array of rejected promises", function () {
		var promises = [Promise.reject(1)];
		return Promise.any(promises).catch(function (err) {
			return err;
		}).then(function (err) {
			proclaim.equal(err.name, 'AggregateError');
			proclaim.deepStrictEqual(err.errors, [1]);
		});
	});

	it("rejects with an AggregateError when passed an empty array", function () {
		return Promise.any([]).catch(function (err) {
			return err;
		}).then(function (err) {
			proclaim.equal(err.name, 'AggregateError');
			proclaim.deepStrictEqual(err.errors, []);
		});
	});

	it("resolves to the first fulfilled promise when passed an iterator", function () {
		var promises = [Promise.reject(1), Promise.resolve(2), 3];
		var iterator = makeArrayIterator(promises);
		return Promise.any(iterator).then(function (result) {
			proclaim.strictEqual(result, 2);
		});
	});

	it("rejects with an AggregateError when passed an iterator containing rejected promises", function () {
		var promises = [Promise.reject(1)];
		var iterator = makeArrayIterator(promises);
		return Promise.any(iterator).catch(function (err) {
			return err;
		}).then(function (err) {
			proclaim.equal(err.name, 'AggregateError');
			proclaim.deepStrictEqual(err.errors, [1]);
		});
	});

	it("rejects with an AggregateError when passed an empty iterable", function () {
		var promises = [];
		var iterator = makeArrayIterator(promises);
		return Promise.any(iterator).catch(function (err) {
			return err;
		}).then(function (err) {
			proclaim.equal(err.name, 'AggregateError');
			proclaim.deepStrictEqual(err.errors, []);
		});
	});

	it("rejects with a TypeError for input that is not iterable", function () {
		return Promise.any(0).catch(function (err) {
			return err;
		}).then(function (err) {
			proclaim.ok(err instanceof TypeError);
			proclaim.include(err.message, 'is not iterable');
		});
	});

	it("supports `this` as a Promise subclass", function () {
		function _Promise (executor) {
			return new Promise(executor);
		}
		_Promise.prototype = Promise.prototype;
		var promised;
		function _resolve (value) {
			promised = promised || value;
			return Promise.resolve(value);
		}
		_Promise.resolve = _resolve;
		_Promise.reject = Promise.reject;
		_Promise.all = Promise.all;

		var _promise = Promise.any.call(_Promise, ['ok']).then(function (result) {
			proclaim.strictEqual(result, 'ok');
			proclaim.strictEqual(promised, 'ok');
		});

		proclaim.ok(_promise instanceof _Promise);

		return _promise;
	});
});
