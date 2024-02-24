(function(global) {

	if (!('Event' in global)) return false;

	try {

		// In IE 9-11 and Android 4.x, the Event object exists but cannot be instantiated
		new Event('click');
		return true;
	} catch(e) {
		return false;
	}
}(self))
