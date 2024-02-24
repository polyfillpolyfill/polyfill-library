(function (global) {
	/*
	 * Browsers may have:
	 * No global URL object
	 * URL with static methods only - may have a dummy constructor
	 * URL with members except searchParams
	 * Full URL API support
	 */
	'use strict';

	try {
		var nativeURL = new global.URL('http://example.com');

		if ('href' in nativeURL && 'searchParams' in nativeURL) {
			var url = new URL('http://example.com');
			url.search = 'a=1&b=2';
			if (url.href === 'http://example.com/?a=1&b=2') {
				url.search = '';
				if (url.href === 'http://example.com/') {
					if (!('sort' in global.URLSearchParams.prototype)) {
						return false
					}

					var sp1 = new global.URLSearchParams('a=1');
					var sp2 = new global.URLSearchParams(sp1);
					if (String(sp2) !== 'a=1') {
						return false;
					}

					var sp3 = new global.URLSearchParams({a: '1'});
					if (String(sp3) !== 'a=1') {
						return false;
					}

					var sp4 = new global.URLSearchParams([['a', '1']]);
					if (String(sp4) !== 'a=1') {
						return false;
					}

					return true;
				}
			}
		}
		return false;
	} catch (error) {
		return false;
	}
}(self))
