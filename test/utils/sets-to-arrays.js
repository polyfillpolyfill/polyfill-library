'use strict';

// Proclaim appears to be unable to compare sets in a deepEqual
// (any two sets are considered the same), so convert sets to
// arrays.  Since sets do not have order, sort the resulting
// arrays to ensure they are comparable.
module.exports = function setsToArrays(object) {
	if (typeof object !== 'object') return object;
	if (object.constructor === Set) return [...object].sort();
	for (const k of Object.keys(object)) {
		object[k] = setsToArrays(object[k]);
	}
	return object;
};
