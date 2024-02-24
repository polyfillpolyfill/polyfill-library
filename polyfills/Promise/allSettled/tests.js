
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
	proclaim.isFunction(Promise.allSettled);
});

it('has correct arity', function () {
	proclaim.arity(Promise.allSettled, 1);
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Promise, 'allSettled');
});

describe('allSettled', function () {
	it("resolves to an array of results when passed an array", function () {
		var promises = [1, Promise.resolve(2), Promise.reject(3)];
		return Promise.allSettled(promises).then(function (results) {
			proclaim.deepStrictEqual(results, [
				{
					status: 'fulfilled',
					value: 1
				},
				{
					status: 'fulfilled',
					value: 2
				},
				{
					status: 'rejected',
					reason: 3
				}
			]);
		});
	});

	it("resolves to an array of results when passed an iterator", function () {
		var promises = [1, Promise.resolve(2), Promise.reject(3)];
		var iterator = makeArrayIterator(promises);
		return Promise.allSettled(iterator).then(function (results) {
			proclaim.deepStrictEqual(results, [
				{
					status: 'fulfilled',
					value: 1
				},
				{
					status: 'fulfilled',
					value: 2
				},
				{
					status: 'rejected',
					reason: 3
				}
			]);
		});
	});

	it("rejects with a TypeError for input that is not iterable", function () {
		return Promise.allSettled(0).catch(function (err) {
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

		var _promise = Promise.allSettled.call(_Promise, ['ok']).then(function (result) {
			proclaim.strictEqual(result[0].value, 'ok');
			proclaim.strictEqual(promised, 'ok');
		});

		proclaim.ok(_promise instanceof _Promise);

		return _promise;
	});
});
