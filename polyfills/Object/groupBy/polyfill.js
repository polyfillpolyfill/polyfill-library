/* global CreateDataPropertyOrThrow, CreateMethodProperty, GroupBy */

// 20.1.2.13 Object.groupBy ( items, callbackfn )
CreateMethodProperty(Object, "groupBy", function groupBy(items, callbackfn) {
	// 1. Let groups be ? GroupBy(items, callbackfn, property).
	var groups = GroupBy(items, callbackfn, "property");
	// 2. Let obj be OrdinaryObjectCreate(null).
	var obj = Object.create(null);
	// 3. For each Record { [[Key]], [[Elements]] } g of groups, do
	for (var i = 0; i < groups.length; i++) {
		var g = groups[i];
		// a. Let elements be CreateArrayFromList(g.[[Elements]]).
		var elements = g["[[Elements]]"];
		// b. Perform ! CreateDataPropertyOrThrow(obj, g.[[Key]], elements).
		CreateDataPropertyOrThrow(obj, g["[[Key]]"], elements);
	}
	// 4. Return obj.
	return obj;
});
