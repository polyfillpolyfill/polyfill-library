'document' in self && "classList" in document.documentElement && 'Element' in self && 'classList' in Element.prototype && (function () {
	var e = document.createElement('span');
	e.classList.add('a', 'b');
	return e.classList.contains('b');
}())
