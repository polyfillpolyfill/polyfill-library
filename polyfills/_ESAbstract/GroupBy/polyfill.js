/* global AddValueToKeyedGroup, Call, GetIterator, IsCallable, IteratorClose, IteratorStep, IteratorValue, RequireObjectCoercible, ToPropertyKey */

// 7.3.36 GroupBy ( items, callbackfn, keyCoercion )
// eslint-disable-next-line no-unused-vars
function GroupBy(items, callbackfn, keyCoercion) {
	// 1. Perform ? RequireObjectCoercible(items).
	RequireObjectCoercible(items);
	// 2. If IsCallable(callbackfn) is false, throw a TypeError exception.
	if (IsCallable(callbackfn) === false) {
		throw new TypeError("callbackfn is not callable.");
	}
	// 3. Let groups be a new empty List.
	var groups = [];
	// 4. Let iteratorRecord be ? GetIterator(items, sync).
	var iteratorRecord = GetIterator(items);
	// 5. Let k be 0.
	var k = 0;
	// 6. Repeat,
	// eslint-disable-next-line no-constant-condition
	while (true) {
		// a. If k ≥ 253 - 1, then
		if (k >= Number.MAX_SAFE_INTEGER) {
			// i. Let error be ThrowCompletion(a newly created TypeError object).
			var error = new TypeError("k greater than or equal to MAX_SAFE_INTEGER");
			// ii. Return ? IteratorClose(iteratorRecord, error).
			return IteratorClose(iteratorRecord, error);
		}
		// b. Let next be ? IteratorStep(iteratorRecord).
		var next = IteratorStep(iteratorRecord);
		// c. If next is false, then
		if (next === false) {
			// i. Return groups.
			return groups;
		}
		// d. Let value be ? IteratorValue(next).
		var value = IteratorValue(next);
		// e. Let key be Completion(Call(callbackfn, undefined, « value, 𝔽(k) »)).
		var key;
		try {
			key = Call(callbackfn, undefined, [value, k]);
		} catch (err) {
			// f. IfAbruptCloseIterator(key, iteratorRecord).
			return IteratorClose(iteratorRecord, err);
		}
		// g. If keyCoercion is property, then
		if (keyCoercion === "property") {
			// i. Set key to Completion(ToPropertyKey(key)).
			try {
				key = ToPropertyKey(key);
			} catch (err) {
				// ii. IfAbruptCloseIterator(key, iteratorRecord).
				return IteratorClose(iteratorRecord, err);
			}
		}
		// h. Else,
		else {
			// i. Assert: keyCoercion is zero.
			// ii. If key is -0𝔽, set key to +0𝔽.
			// eslint-disable-next-line no-compare-neg-zero
			if (key === -0) key = 0;
		}
		// i. Perform AddValueToKeyedGroup(groups, key, value).
		AddValueToKeyedGroup(groups, key, value);
		// j. Set k to k + 1.
		k = k + 1;
	}
}
