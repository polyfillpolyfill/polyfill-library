/* global Construct, CreateMethodProperty, GroupBy, Map */

// 24.1.2.1 Map.groupBy ( items, callbackfn )
CreateMethodProperty(Map, "groupBy", function groupBy(items, callbackfn) {
	// 1. Let groups be ? GroupBy(items, callbackfn, zero).
	var groups = GroupBy(items, callbackfn, "zero");
	// 2. Let map be ! Construct(%Map%).
	var map = Construct(Map);
	// 3. For each Record { [[Key]], [[Elements]] } g of groups, do
	for (var i = 0; i < groups.length; i++) {
		var g = groups[i];
		// a. Let elements be CreateArrayFromList(g.[[Elements]]).
		var elements = g["[[Elements]]"];
		// b. Let entry be the Record { [[Key]]: g.[[Key]], [[Value]]: elements }.
		var entry = { "[[Key]]": g["[[Key]]"], "[[Value]]": elements };
		// c. Append entry to map.[[MapData]].
		map.set(entry["[[Key]]"], entry["[[Value]]"]);
	}
	// 4. Return map.
	return map;
});
