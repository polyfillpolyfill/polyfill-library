'fetch' in self && 'Request' in self && (function () {
	try {
		return ( 'signal' in ( new Request('') ) );
	} catch (e) {
		return false;
	}
}())
