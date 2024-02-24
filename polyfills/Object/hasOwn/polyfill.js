/* global CreateMethodProperty, HasOwnProperty, ToObject, ToPropertyKey */

// 20.1.2.13 Object.hasOwn ( O, P )
CreateMethodProperty(Object, 'hasOwn', function hasOwn(O, P) {
	// Let obj be ? ToObject(O).
	var obj = ToObject(O);
	// 2. Let key be ? ToPropertyKey(P).
	var key = ToPropertyKey(P);
	// 3. Return ? HasOwnProperty(obj, key).
	return HasOwnProperty(obj, key);
});
