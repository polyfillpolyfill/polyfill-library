(function (global) {
	if ('Intl' in global && 'DateTimeFormat' in global.Intl && 'format' in global.Intl.DateTimeFormat.prototype) {
		try {
			return (new Intl.DateTimeFormat('en', {
				timeZone: 'Australia/Sydney',
				timeZoneName: 'short'
			})).resolvedOptions().timeZone === 'Australia/Sydney';
		} catch(e) {
			return false;
		}
	}

	return false;
}(self))
