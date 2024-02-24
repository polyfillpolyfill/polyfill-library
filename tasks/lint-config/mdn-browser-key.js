function mdnBrowserKey(name) {
	switch (name) {
		case 'android': return 'webview_android';
		case 'bb': return 'bb';
		case 'chrome': return 'chrome';
		case 'edge': return 'edge';
		case 'edge_mob': return 'edge';
		case 'firefox': return 'firefox';
		case 'firefox_mob': return 'firefox_android';
		case 'ie': return 'ie';
		case 'ie_mob': return 'ie';
		case 'ios_saf': return 'safari_ios';
		case 'op_mini': return 'op_mini';
		case 'op_mob': return 'opera_android';
		case 'opera': return 'opera';
		case 'safari': return 'safari';
		case 'samsung_mob': return 'samsunginternet_android';
		default:
			throw new Error(`Unknown browser name: ${name}`);
	}
}

/*
	Trident
	EdgeHTML
	Blink
	Gecko
	Webkit
	V8
	Opera
	Presto
	IE
*/

module.exports = {
	mdnBrowserKey: mdnBrowserKey
}
