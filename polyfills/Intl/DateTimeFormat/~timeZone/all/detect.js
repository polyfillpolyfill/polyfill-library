(function (global) {
	if ('Intl' in global && 'DateTimeFormat' in global.Intl && 'format' in global.Intl.DateTimeFormat.prototype) {
		try {
			return (new Intl.DateTimeFormat('en', {
				timeZone: 'Africa/Dakar',
				timeZoneName: 'short'
			})).resolvedOptions().timeZone === 'Africa/Dakar';
		} catch(e) {
			return false;
		}
	}

	return false;
}(self))
