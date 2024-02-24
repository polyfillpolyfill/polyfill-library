'Intl' in self && 'NumberFormat' in self.Intl && (function () {
	try {
		new Intl.NumberFormat(undefined, {
			style: 'unit',
			unit: 'byte'
		});
	} catch (e) {
		return false;
	}
	return true;
})()
