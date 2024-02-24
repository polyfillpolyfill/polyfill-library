/* global SameValue */

// 7.3.35 AddValueToKeyedGroup ( groups, key, value )
// eslint-disable-next-line no-unused-vars
function AddValueToKeyedGroup(groups, key, value) {
	// 1. For each Record { [[Key]], [[Elements]] } g of groups, do
	for (var i = 0; i < groups.length; i++) {
		var g = groups[i];
		// a. If SameValue(g.[[Key]], key) is true, then
		if (SameValue(g["[[Key]]"], key)) {
			// i. Assert: Exactly one element of groups meets this criterion.
			// ii. Append value to g.[[Elements]].
			g["[[Elements]]"].push(value);
			// iii. Return unused.
			return;
		}
	}
	// 2. Let group be the Record { [[Key]]: key, [[Elements]]: « value » }.
	var group = {
		"[[Key]]": key,
		"[[Elements]]": [value]
	};
	// 3. Append group to groups.
	groups.push(group);
	// 4. Return unused.
}
