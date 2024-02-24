'sort' in Array.prototype && (function() {
	// Check it does a stable sort
	var obj = {length:3, 0:2, 1:1,2:3};
	return Array.prototype.sort.call(obj, function(a,b) {return a-b}) === obj;
}())
