/* global DefinePropertyOrThrow */
// 7.3.8 CreateNonEnumerableDataPropertyOrThrow ( O, P, V )
function CreateNonEnumerableDataPropertyOrThrow (O, P, V) { // eslint-disable-line no-unused-vars
	// 1. Assert: O is an ordinary, extensible object with no non-configurable properties.
	// 2. Let newDesc be the PropertyDescriptor { [[Value]]: V, [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: true }.
	var newDesc = {
		value: V,
		writable: true,
		enumerable: false,
		configurable: true
	};
	// 3. Perform ! DefinePropertyOrThrow(O, P, newDesc).
	DefinePropertyOrThrow(O, P, newDesc);
	// 4. Return unused.
}
