/* eslint-env mocha, browser */
/* global proclaim */

it('URL IDL', function() {
	var url = new URL('http://example.com:8080/foo/bar?a=1&b=2#p1');
	proclaim.equal(typeof url.protocol, 'string', 'protocol');
	proclaim.equal(typeof url.host, 'string', 'host');
	proclaim.equal(typeof url.hostname, 'string', 'hostname');
	proclaim.equal(typeof url.port, 'string', 'port');
	proclaim.equal(typeof url.pathname, 'string', 'pathname');
	proclaim.equal(typeof url.search, 'string', 'search');
	proclaim.equal(typeof url.hash, 'string', 'hash');
	proclaim.equal(typeof url.origin, 'string', 'origin');
	proclaim.equal(typeof url.href, 'string', 'href');
});

it('URL Stringifying', function() {
	proclaim.equal(String(new URL('http://example.com')), 'http://example.com/');
	proclaim.equal(String(new URL('http://example.com:8080')), 'http://example.com:8080/');
});

it('URL Parsing', function() {
	var url = new URL('http://example.com:8080/foo/bar?a=1&b=2#p1');
	proclaim.equal(url.protocol, 'http:');
	proclaim.equal(url.hostname, 'example.com');
	proclaim.equal(url.port, '8080');
	proclaim.equal(url.host, 'example.com:8080');
	proclaim.equal(url.pathname, '/foo/bar');
	proclaim.equal(url.search, '?a=1&b=2');
	proclaim.equal(url.hash, '#p1');
	proclaim.equal(url.origin, 'http://example.com:8080');
	proclaim.equal(url.href, 'http://example.com:8080/foo/bar?a=1&b=2#p1');
});

it('URL Mutation', function () {
	var url = new URL('http://example.com');
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.origin, 'http://example.com');
	proclaim.equal(url.host, 'example.com');

	url.protocol = 'ftp';
	proclaim.equal(url.protocol, 'ftp:');
	proclaim.equal(url.href, 'ftp://example.com/');

	// Fails in native IE13 (Edge)
	// Probable bug in IE.  https://twitter.com/patrickkettner/status/768726160070934529
	//proclaim.equal(url.origin, 'ftp://example.com');

	proclaim.equal(url.host, 'example.com');
	url.protocol = 'http';
	proclaim.equal(url.protocol, 'http:');
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.origin, 'http://example.com');
	proclaim.equal(url.host, 'example.com');

	url = new URL('http://example.com');
	url.hostname = 'example.org';
	proclaim.equal(url.href, 'http://example.org/');
	proclaim.equal(url.origin, 'http://example.org');
	proclaim.equal(url.host, 'example.org');
	url.hostname = 'example.com';
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.origin, 'http://example.com');
	proclaim.equal(url.host, 'example.com');

	url = new URL('http://example.com');
	url.port = 8080;
	proclaim.equal(url.href, 'http://example.com:8080/');
	proclaim.equal(url.origin, 'http://example.com:8080');
	proclaim.equal(url.host, 'example.com:8080');
	url.port = 80;
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.origin, 'http://example.com');
	proclaim.equal(url.host, 'example.com');

	url = new URL('http://example.com');
	url.pathname = 'foo';
	proclaim.equal(url.href, 'http://example.com/foo');
	proclaim.equal(url.origin, 'http://example.com');
	url.pathname = 'foo/bar';
	proclaim.equal(url.href, 'http://example.com/foo/bar');
	proclaim.equal(url.origin, 'http://example.com');
	url.pathname = '';
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.origin, 'http://example.com');

	url = new URL('http://example.com');
	url.search = 'a=1&b=2';
	proclaim.equal(url.href, 'http://example.com/?a=1&b=2');
	proclaim.equal(url.origin, 'http://example.com');
	url.search = '';
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.origin, 'http://example.com');

	url = new URL('http://example.com');
	url.hash = 'p1';
	proclaim.equal(url.href, 'http://example.com/#p1');
	proclaim.equal(url.origin, 'http://example.com');
	url.hash = '';
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.origin, 'http://example.com');
});

it('Parameter Mutation', function () {
	var url = new URL('http://example.com');
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.search, '');
	proclaim.equal(url.searchParams.get('a'), null);
	proclaim.equal(url.searchParams.get('b'), null);

	url.searchParams.append('a', '1');
	proclaim.equal(url.searchParams.get('a'), '1');
	proclaim.deepEqual(url.searchParams.getAll('a'), ['1']);
	proclaim.equal(url.search, '?a=1');
	proclaim.equal(url.href, 'http://example.com/?a=1');

	url.searchParams.append('b', '2');
	proclaim.equal(url.searchParams.get('b'), '2');
	proclaim.deepEqual(url.searchParams.getAll('b'), ['2']);
	proclaim.equal(url.search, '?a=1&b=2');
	proclaim.equal(url.href, 'http://example.com/?a=1&b=2');

	url.searchParams.append('a', '3');
	proclaim.equal(url.searchParams.get('a'), '1');
	proclaim.deepEqual(url.searchParams.getAll('a'), ['1', '3']);
	proclaim.equal(url.search, '?a=1&b=2&a=3');
	proclaim.equal(url.href, 'http://example.com/?a=1&b=2&a=3');

	url.searchParams.delete('a');
	proclaim.equal(url.search, '?b=2');
	proclaim.deepEqual(url.searchParams.getAll('a'), []);
	proclaim.equal(url.href, 'http://example.com/?b=2');

	url.searchParams.delete('b');
	proclaim.deepEqual(url.searchParams.getAll('b'), []);
	proclaim.equal(url.href, 'http://example.com/');

	url.href = 'http://example.com?m=9&n=3';
	proclaim.equal(url.searchParams.has('a'), false);
	proclaim.equal(url.searchParams.has('b'), false);
	proclaim.equal(url.searchParams.get('m'), 9);
	proclaim.equal(url.searchParams.get('n'), 3);

	url.href = 'http://example.com';
	url.searchParams.set('a', '1');
	proclaim.deepEqual(url.searchParams.getAll('a'), ['1']);
	url.search = 'a=1&b=1&b=2&c=1';
	url.searchParams.set('b', '3');
	proclaim.deepEqual(url.searchParams.getAll('b'), ['3']);
	proclaim.equal(url.href, 'http://example.com/?a=1&b=3&c=1');
});

it('Parameter Encoding', function () {
	var url = new URL('http://example.com');
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.search, '');
	url.searchParams.append('this\x00&that\x7f\xff', '1+2=3');
	proclaim.equal(url.searchParams.get('this\x00&that\x7f\xff'), '1+2=3');

	// The following fail in FF (tested in 38) against native impl
	//proclaim.equal(url.search, '?this%00%26that%7F%C3%BF=1%2B2%3D3');
	//proclaim.equal(url.href, 'http://example.com/?this%00%26that%7F%C3%BF=1%2B2%3D3');

	url.search = '';
	url.searchParams.append('a  b', 'a  b');
	proclaim.equal(url.search, '?a++b=a++b');
	proclaim.equal(url.searchParams.get('a  b'), 'a  b');
});


it('Base URL', function () {
	// fully qualified URL
	proclaim.equal(new URL('http://example.com', 'https://example.org').href, 'http://example.com/');
	proclaim.equal(new URL('http://example.com/foo/bar', 'https://example.org').href, 'http://example.com/foo/bar');

	// protocol relative
	proclaim.equal(new URL('//example.com', 'https://example.org').href, 'https://example.com/');

	// path relative
	proclaim.equal(new URL('/foo/bar', 'https://example.org').href, 'https://example.org/foo/bar');
	proclaim.equal(new URL('/foo/bar', 'https://example.org/baz/bat').href, 'https://example.org/foo/bar');
	proclaim.equal(new URL('./bar', 'https://example.org').href, 'https://example.org/bar');
	proclaim.equal(new URL('./bar', 'https://example.org/foo/').href, 'https://example.org/foo/bar');
	proclaim.equal(new URL('bar', 'https://example.org/foo/').href, 'https://example.org/foo/bar');
	proclaim.equal(new URL('../bar', 'https://example.org/foo/').href, 'https://example.org/bar');
	proclaim.equal(new URL('../bar', 'https://example.org/foo/').href, 'https://example.org/bar');
	proclaim.equal(new URL('../../bar', 'https://example.org/foo/baz/bat/').href, 'https://example.org/foo/bar');
	proclaim.equal(new URL('../../bar', 'https://example.org/foo/baz/bat').href, 'https://example.org/bar');
	proclaim.equal(new URL('../../bar', 'https://example.org/foo/baz/').href, 'https://example.org/bar');
	proclaim.equal(new URL('../../bar', 'https://example.org/foo/').href, 'https://example.org/bar');
	proclaim.equal(new URL('../../bar', 'https://example.org/foo/').href, 'https://example.org/bar');

	// search/hash relative
	proclaim.equal(new URL('bar?ab#cd', 'https://example.org/foo/').href, 'https://example.org/foo/bar?ab#cd');
	proclaim.equal(new URL('bar?ab#cd', 'https://example.org/foo').href, 'https://example.org/bar?ab#cd');
	proclaim.equal(new URL('?ab#cd', 'https://example.org/foo').href, 'https://example.org/foo?ab#cd');
	proclaim.equal(new URL('?ab', 'https://example.org/foo').href, 'https://example.org/foo?ab');
	proclaim.equal(new URL('#cd', 'https://example.org/foo').href, 'https://example.org/foo#cd');
});

it('URLSearchParams', function () {
	var url = new URL('http://example.com?a=1&b=2');
	proclaim.ok(url.searchParams instanceof URLSearchParams);

	proclaim.equal(String(new URLSearchParams()), '');
	proclaim.equal(String(new URLSearchParams('')), '');
	proclaim.equal(String(new URLSearchParams('a=1')), 'a=1');
	proclaim.equal(String(new URLSearchParams('a=1&b=1')), 'a=1&b=1');
	proclaim.equal(String(new URLSearchParams('a=1&b&a')), 'a=1&b=&a=');

	proclaim.equal(String(new URLSearchParams('?')), '');
	proclaim.equal(String(new URLSearchParams('?a=1')), 'a=1');
	proclaim.equal(String(new URLSearchParams('?a=1&b=1')), 'a=1&b=1');
	proclaim.equal(String(new URLSearchParams('?a=1&b&a')), 'a=1&b=&a=');

	proclaim.equal(String(new URLSearchParams(new URLSearchParams('?'))), '');
	proclaim.equal(String(new URLSearchParams(new URLSearchParams('?a=1'))), 'a=1');
	proclaim.equal(String(new URLSearchParams(new URLSearchParams('?a=1&b=1'))), 'a=1&b=1');
	proclaim.equal(String(new URLSearchParams(new URLSearchParams('?a=1&b&a'))), 'a=1&b=&a=');
});

it('URLSearchParams mutation', function () {
	var p = new URLSearchParams();
	proclaim.equal(p.get('a'), null);
	proclaim.equal(p.get('b'), null);

	p.append('a', '1');
	proclaim.equal(p.get('a'), '1');
	proclaim.deepEqual(p.getAll('a'), ['1']);
	proclaim.equal(String(p), 'a=1');

	p.append('b', '2');
	proclaim.equal(p.get('b'), '2');
	proclaim.deepEqual(p.getAll('b'), ['2']);
	proclaim.equal(String(p), 'a=1&b=2');

	p.append('a', '3');
	proclaim.equal(p.get('a'), '1');
	proclaim.deepEqual(p.getAll('a'), ['1', '3']);
	proclaim.equal(String(p), 'a=1&b=2&a=3');

	p.delete('a');
	proclaim.equal(String(p), 'b=2');
	proclaim.deepEqual(p.getAll('a'), []);

	p.delete('b');
	proclaim.deepEqual(p.getAll('b'), []);

	p = new URLSearchParams('m=9&n=3');
	proclaim.equal(p.has('a'), false);
	proclaim.equal(p.has('b'), false);
	proclaim.equal(p.get('m'), 9);
	proclaim.equal(p.get('n'), 3);

	p = new URLSearchParams();
	p.set('a', '1');
	proclaim.deepEqual(p.getAll('a'), ['1']);
	p = new URLSearchParams('a=1&b=1&b=2&c=1');
	p.set('b', '3');
	proclaim.deepEqual(p.getAll('b'), ['3']);
	proclaim.equal(String(p), 'a=1&b=3&c=1');

	// Ensure copy constructor copies by value, not reference.
	var sp1 = new URLSearchParams('a=1');
	proclaim.equal(String(sp1), 'a=1');
	var sp2 = new URLSearchParams(sp1);
	proclaim.equal(String(sp2), 'a=1');
	sp1.append('b', '2');
	sp2.append('c', '3');
	proclaim.equal(String(sp1), 'a=1&b=2');
	proclaim.equal(String(sp2), 'a=1&c=3');
});

it('URLSearchParams sort', function() {
	var url = new URL("https://example.org/?q=🏳️‍🌈&key=e1f7bc78");
	url.searchParams.sort();
	proclaim.deepEqual(url.search, '?key=e1f7bc78&q=%F0%9F%8F%B3%EF%B8%8F%E2%80%8D%F0%9F%8C%88');

	var sp = new URLSearchParams();
	sp.append('a', 3);
	sp.append('b', 2);
	sp.append('a', 1);
	sp.sort();

	proclaim.deepEqual(String(sp), 'a=3&a=1&b=2');
});

it('URLSearchParams serialization', function() {
	var p = new URLSearchParams();
	p.append('this\x00&that\x7f\xff', '1+2=3');
	proclaim.equal(p.get('this\x00&that\x7f\xff'), '1+2=3');
	proclaim.equal(String(p), 'this%00%26that%7F%C3%BF=1%2B2%3D3');
	p = new URLSearchParams();
	p.append('a  b', 'a  b');
	proclaim.equal(String(p), 'a++b=a++b');
	proclaim.equal(p.get('a  b'), 'a  b');
});

it('URLSearchParams iterable methods - entries', function () {
	var params = new URLSearchParams('a=1&b=2');
	proclaim.deepEqual(Array.from(params.entries()), [['a', '1'], ['b', '2']]);
});

it('URLSearchParams iterable methods - keys', function () {
	var params = new URLSearchParams('a=1&b=2');
	proclaim.deepEqual(Array.from(params.keys()), ['a', 'b']);
});

it('URLSearchParams iterable methods - values', function () {
	var params = new URLSearchParams('a=1&b=2');
	proclaim.deepEqual(Array.from(params.values()), ['1', '2']);
});

it('URLSearchParams iterable methods - Symbol.iterator', function () {
	var params = new URLSearchParams('a=1&b=2');

	if ('Symbol' in self && 'iterator' in self.Symbol) {
		proclaim.deepEqual(Array.from(params[self.Symbol.iterator]()), [['a', '1'], ['b', '2']]);
	}
});

// Not implemented by the polyfill!
/*
it('URL contains native static methods', function () {
		proclaim.ok(typeof URL.createObjectURL == 'function');
		proclaim.ok(typeof URL.revokeObjectURL == 'function');
});
*/

it('Regression tests', function() {
	// IE mangles the pathname when assigning to search with 'about:' URLs
	var p = new URL('about:blank').searchParams;
	p.append('a', 1);
	p.append('b', 2);
	proclaim.equal(p.toString(), 'a=1&b=2');
});

it('URLSearchParams doesnt stringify with "Object"', function() {
	var p = new URLSearchParams({ key: "730d67" });
	proclaim.equal(p.toString(), "key=730d67");
});

it('URLSearchParams constructed form a Record has working "get"', function() {
	var p1 = new URLSearchParams({ "key": "alpha" }); // eslint-disable-line
	proclaim.equal(p1.get('key'), "alpha");

	var p2 = new URLSearchParams({ key: "beta" });
	proclaim.equal(p2.get('key'), "beta");
});

describe('WPT tests', function () {
	it('appends same name correctly', function() {
		var params = new URLSearchParams();
		params.append('a', 'b');
		proclaim.equal(params + '', 'a=b');
		params.append('a', 'b');
		proclaim.equal(params + '', 'a=b&a=b');
		params.append('a', 'c');
		proclaim.equal(params + '', 'a=b&a=b&a=c');
	});

	it('appends empty strings', function() {
		var params = new URLSearchParams();
		params.append('', '');
		proclaim.equal(params + '', '=');
		params.append('', '');
		proclaim.equal(params + '', '=&=');
	});

	it('appends null', function() {
		var params = new URLSearchParams();
		params.append(null, null);
		proclaim.equal(params + '', 'null=null');
		params.append(null, null);
		proclaim.equal(params + '', 'null=null&null=null');
	});

	it('appends multiple', function() {
		var params = new URLSearchParams();
		params.append('first', 1);
		params.append('second', 2);
		params.append('third', '');
		params.append('first', 10);
		proclaim.ok(params.has('first'), 'Search params object has name "first"');
		proclaim.equal(params.get('first'), '1', 'Search params object has name "first" with value "1"');
		proclaim.equal(params.get('second'), '2', 'Search params object has name "second" with value "2"');
		proclaim.equal(params.get('third'), '', 'Search params object has name "third" with value ""');
		params.append('first', 10);
		proclaim.equal(params.get('first'), '1', 'Search params object has name "first" with value "1"');
	});

	it('constructs', function() {
		var params = new URLSearchParams();
		proclaim.equal(params + '', '');
		params = new URLSearchParams('');
		proclaim.equal(params + '', '');
		params = new URLSearchParams('a=b');
		proclaim.equal(params + '', 'a=b');
		params = new URLSearchParams(params);
		proclaim.equal(params + '', 'a=b');
	});

	it('constructs without arguments', function() {
			var params = new URLSearchParams()
			proclaim.equal(params.toString(), "")
	})

	it('removes leading ?', function() {
			var params = new URLSearchParams("?a=b")
			proclaim.equal(params.toString(), "a=b")
	})

	// TODO : does not throw
	it.skip('throws with DOMException as argument', function() {
		var params = new URLSearchParams(DOMException);
		proclaim.equal(params.toString(), "INDEX_SIZE_ERR=1&DOMSTRING_SIZE_ERR=2&HIERARCHY_REQUEST_ERR=3&WRONG_DOCUMENT_ERR=4&INVALID_CHARACTER_ERR=5&NO_DATA_ALLOWED_ERR=6&NO_MODIFICATION_ALLOWED_ERR=7&NOT_FOUND_ERR=8&NOT_SUPPORTED_ERR=9&INUSE_ATTRIBUTE_ERR=10&INVALID_STATE_ERR=11&SYNTAX_ERR=12&INVALID_MODIFICATION_ERR=13&NAMESPACE_ERR=14&INVALID_ACCESS_ERR=15&VALIDATION_ERR=16&TYPE_MISMATCH_ERR=17&SECURITY_ERR=18&NETWORK_ERR=19&ABORT_ERR=20&URL_MISMATCH_ERR=21&QUOTA_EXCEEDED_ERR=22&TIMEOUT_ERR=23&INVALID_NODE_TYPE_ERR=24&DATA_CLONE_ERR=25")
		proclaim.throws(function() { new URLSearchParams(DOMException.prototype) },
			"Constructing a URLSearchParams from DOMException.prototype should throw due to branding checks"
		);
	})

	it('constructs from an empty string', function() {
		var params = new URLSearchParams('');
		proclaim.ok(params != null, 'constructor returned non-null value.');
		proclaim.equal(Object.getPrototypeOf(params), URLSearchParams.prototype, 'expected URLSearchParams.prototype as prototype.');
	})

	it('constructs from {}', function() {
		var params = new URLSearchParams({});
		proclaim.equal(params + '', "");
	});

	// TODO : fails
	it.skip('constructs from an various weird strings', function() {
		var params = new URLSearchParams('a=b');
		proclaim.ok(params != null, 'constructor returned non-null value.');
		proclaim.ok(params.has('a'), 'Search params object has name "a"');
		proclaim.notOk(params.has('b'), 'Search params object has not got name "b"');

		params = new URLSearchParams('a=b&c');
		proclaim.ok(params != null, 'constructor returned non-null value.');
		proclaim.ok(params.has('a'), 'Search params object has name "a"');
		proclaim.ok(params.has('c'), 'Search params object has name "c"');

		params = new URLSearchParams('&a&&& &&&&&a+b=& c&m%c3%b8%c3%b8');
		proclaim.ok(params != null, 'constructor returned non-null value.');
		proclaim.ok(params.has('a'), 'Search params object has name "a"');
		proclaim.ok(params.has('a b'), 'Search params object has name "a b"');
		proclaim.ok(params.has(' '), 'Search params object has name " "');
		proclaim.notOk(params.has('c'), 'Search params object did not have the name "c"');
		proclaim.ok(params.has(' c'), 'Search params object has name " c"');
		proclaim.ok(params.has('møø'), 'Search params object has name "møø"');

		params = new URLSearchParams('id=0&value=%');
		proclaim.ok(params != null, 'constructor returned non-null value.');
		proclaim.ok(params.has('id'), 'Search params object has name "id"');
		proclaim.ok(params.has('value'), 'Search params object has name "value"');
		proclaim.equal(params.get('id'), '0');
		proclaim.equal(params.get('value'), '%');

		params = new URLSearchParams('b=%2sf%2a');
		proclaim.ok(params != null, 'constructor returned non-null value.');
		proclaim.ok(params.has('b'), 'Search params object has name "b"');
		proclaim.equal(params.get('b'), '%2sf*');

		params = new URLSearchParams('b=%2%2af%2a');
		proclaim.ok(params != null, 'constructor returned non-null value.');
		proclaim.ok(params.has('b'), 'Search params object has name "b"');
		proclaim.equal(params.get('b'), '%2*f*');

		params = new URLSearchParams('b=%%2a');
		proclaim.ok(params != null, 'constructor returned non-null value.');
		proclaim.ok(params.has('b'), 'Search params object has name "b"');
		proclaim.equal(params.get('b'), '%*');
	});

	it('constructs from URLSearchParams', function() {
		var seed = new URLSearchParams('a=b&c=d');
		var params = new URLSearchParams(seed);
		proclaim.ok(params != null, 'constructor returned non-null value.');
		proclaim.equal(params.get('a'), 'b');
		proclaim.equal(params.get('c'), 'd');
		proclaim.notOk(params.has('d'));
		// The name-value pairs are copied when created; later updates
		// should not be observable.
		seed.append('e', 'f');
		proclaim.notOk(params.has('e'));
		params.append('g', 'h');
		proclaim.notOk(seed.has('g'));
	});

	if ('FormData' in self) {
		// TODO : does not work
		it.skip('works with FormData', function () {
			var formData = new FormData()
			formData.append('a', 'b')
			formData.append('c', 'd')
			var params = new URLSearchParams(formData);
			proclaim.ok(params != null, 'constructor returned non-null value.');
			proclaim.equal(params.get('a'), 'b');
			proclaim.equal(params.get('c'), 'd');
			proclaim.notOk(params.has('d'));
			// The name-value pairs are copied when created; later updates
			// should not be observable.
			formData.append('e', 'f');
			proclaim.notOk(params.has('e'));
			params.append('g', 'h');
			proclaim.notOk(formData.has('g'));
		});
	}

	it('parses +', function() {
		var params = new URLSearchParams('a=b+c');
		proclaim.equal(params.get('a'), 'b c');
		params = new URLSearchParams('a+b=c');
		proclaim.equal(params.get('a b'), 'c');
	});

	it('parses encoded +', function() {
		var testValue = '+15555555555';
		var params = new URLSearchParams();
		params.set('query', testValue);
		var newParams = new URLSearchParams(params.toString());

		proclaim.equal(params.toString(), 'query=%2B15555555555');
		proclaim.equal(params.get('query'), testValue);
		proclaim.equal(newParams.get('query'), testValue);
	});

	it('parses space', function() {
		var params = new URLSearchParams('a=b c');
		proclaim.equal(params.get('a'), 'b c');
		params = new URLSearchParams('a b=c');
		proclaim.equal(params.get('a b'), 'c');
	});

	it('parses %20', function() {
		var params = new URLSearchParams('a=b%20c');
		proclaim.equal(params.get('a'), 'b c');
		params = new URLSearchParams('a%20b=c');
		proclaim.equal(params.get('a b'), 'c');
	});

	it('parses \\0', function() {
		var params = new URLSearchParams('a=b\0c');
		proclaim.equal(params.get('a'), 'b\0c');
		params = new URLSearchParams('a\0b=c');
		proclaim.equal(params.get('a\0b'), 'c');
	});

	it('parses %00', function() {
		var params = new URLSearchParams('a=b%00c');
		proclaim.equal(params.get('a'), 'b\0c');
		params = new URLSearchParams('a%00b=c');
		proclaim.equal(params.get('a\0b'), 'c');
	});

	it('parses \u2384', function() {
		var params = new URLSearchParams('a=b\u2384');
		proclaim.equal(params.get('a'), 'b\u2384');
		params = new URLSearchParams('a\u2384b=c');
		proclaim.equal(params.get('a\u2384b'), 'c');
	});  // Unicode Character 'COMPOSITION SYMBOL' (U+2384)

	it('parses %e2%8e%84', function() {
		var params = new URLSearchParams('a=b%e2%8e%84');
		proclaim.equal(params.get('a'), 'b\u2384');
		params = new URLSearchParams('a%e2%8e%84b=c');
		proclaim.equal(params.get('a\u2384b'), 'c');
	});  // Unicode Character 'COMPOSITION SYMBOL' (U+2384)

	it('parses \uD83D\uDCA9', function() {
		var params = new URLSearchParams('a=b\uD83D\uDCA9c');
		proclaim.equal(params.get('a'), 'b\uD83D\uDCA9c');
		params = new URLSearchParams('a\uD83D\uDCA9b=c');
		proclaim.equal(params.get('a\uD83D\uDCA9b'), 'c');
	});  // Unicode Character 'PILE OF POO' (U+1F4A9)

	it('parses %f0%9f%92%a9', function() {
		var params = new URLSearchParams('a=b%f0%9f%92%a9c');
		proclaim.equal(params.get('a'), 'b\uD83D\uDCA9c');
		params = new URLSearchParams('a%f0%9f%92%a9b=c');
		proclaim.equal(params.get('a\uD83D\uDCA9b'), 'c');
	});  // Unicode Character 'PILE OF POO' (U+1F4A9)

	it('constructs with sequence of sequences of strings', function() {
		var params = new URLSearchParams([]);
		proclaim.ok(params != null, 'constructor returned non-null value.');
		params = new URLSearchParams([['a', 'b'], ['c', 'd']]);
		proclaim.equal(params.get("a"), "b");
		proclaim.equal(params.get("c"), "d");

		proclaim.throws(function() { new URLSearchParams([[1]]); });
		proclaim.throws(function() { new URLSearchParams([[1,2,3]]); });
	});

	/* eslint-disable quote-props */
	[
		// Cases from WPT: urlencoded-parser
		// https://github.com/web-platform-tests/wpt/blob/5f5ec4cff4/url/urlencoded-parser.any.js
		{ "input": "test", "output": [["test", ""]] },
		{ "input": "\uFEFFtest=\uFEFF", "output": [["\uFEFFtest", "\uFEFF"]] },
		{ "input": "%EF%BB%BFtest=%EF%BB%BF", "output": [["\uFEFFtest", "\uFEFF"]] },
		{ "input": "%FE%FF", "output": [["\uFFFD\uFFFD", ""]] },
		{ "input": "%FF%FE", "output": [["\uFFFD\uFFFD", ""]] },
		{ "input": "†&†=x", "output": [["†", ""], ["†", "x"]] },
		{ "input": "%C2", "output": [["\uFFFD", ""]] },
		{ "input": "%C2x", "output": [["\uFFFDx", ""]] },
		{ "input": "_charset_=windows-1252&test=%C2x", "output": [["_charset_", "windows-1252"], ["test", "\uFFFDx"]] },
		{ "input": '', "output": [] },
		{ "input": 'a', "output": [['a', '']] },
		{ "input": 'a=b', "output": [['a', 'b']] },
		{ "input": 'a=', "output": [['a', '']] },
		{ "input": '=b', "output": [['', 'b']] },
		{ "input": '&', "output": [] },
		{ "input": '&a', "output": [['a', '']] },
		{ "input": 'a&', "output": [['a', '']] },
		{ "input": 'a&a', "output": [['a', ''], ['a', '']] },
		{ "input": 'a&b&c', "output": [['a', ''], ['b', ''], ['c', '']] },
		{ "input": 'a=b&c=d', "output": [['a', 'b'], ['c', 'd']] },
		{ "input": 'a=b&c=d&', "output": [['a', 'b'], ['c', 'd']] },
		{ "input": '&&&a=b&&&&c=d&', "output": [['a', 'b'], ['c', 'd']] },
		{ "input": 'a=a&a=b&a=c', "output": [['a', 'a'], ['a', 'b'], ['a', 'c']] },
		{ "input": 'a==a', "output": [['a', '=a']] },
		{ "input": 'a=a+b+c+d', "output": [['a', 'a b c d']] },
		{ "input": '%=a', "output": [['%', 'a']] },
		{ "input": '%a=a', "output": [['%a', 'a']] },
		{ "input": '%a_=a', "output": [['%a_', 'a']] },
		{ "input": '%61=a', "output": [['a', 'a']] },
		{ "input": '%61+%4d%4D=', "output": [['a MM', '']] },
		{ "input": "id=0&value=%", "output": [['id', '0'], ['value', '%']] },
		{ "input": "b=%2sf%2a", "output": [['b', '%2sf*']]},
		{ "input": "b=%2%2af%2a", "output": [['b', '%2*f*']]},
		{ "input": "b=%%2a", "output": [['b', '%*']]},

		// Cases from WPT: urlencoded-sort
		// https://github.com/web-platform-tests/wpt/blob/5f5ec4cff4/url/urlsearchparams-sort.any.js
		{
			input: "z=b&a=b&z=a&a=a",
			output: [["a", "b"], ["a", "a"], ["z", "b"], ["z", "a"]]
		},
		{
			input: "\uFFFD=x&\uFFFC&\uFFFD=a",
			output: [["\uFFFC", ""], ["\uFFFD", "x"], ["\uFFFD", "a"]]
		},
		{
			input: "ﬃ&🌈", // 🌈 > code point, but < code unit because two code units
			output: [["🌈", ""], ["ﬃ", ""]]
		},
		// Fails in Safari 9.1
		// {
		// 	input: "é&e\uFFFD&e\u0301",
		// 	output: [["e\u0301", ""], ["e\uFFFD", ""], ["é", ""]]
		// },
		{
			input: "z=z&a=a&z=y&a=b&z=x&a=c&z=w&a=d&z=v&a=e&z=u&a=f&z=t&a=g",
			output: [["a", "a"], ["a", "b"], ["a", "c"], ["a", "d"], ["a", "e"], ["a", "f"], ["a", "g"], ["z", "z"], ["z", "y"], ["z", "x"], ["z", "w"], ["z", "v"], ["z", "u"], ["z", "t"]]
		},
		{
			input: "bbb&bb&aaa&aa=x&aa=y",
			output: [["aa", "x"], ["aa", "y"], ["aaa", ""], ["bb", ""], ["bbb", ""]]
		},
		{
			input: "z=z&=f&=t&=x",
			output: [["", "f"], ["", "t"], ["", "x"], ["z", "z"]]
		},
		{
			input: "a🌈&a💩",
			output: [["a🌈", ""], ["a💩", ""]]
		}
		/* eslint-enable */
	].forEach(function(val) {
		it( "parses and sorts: " + val.input, function() {
			var params = new URLSearchParams(val.input);
			params.sort();

			var pairs = Array.from(params.entries());
			for (var i = 0; i < val.output.length; i++) {
				proclaim.deepEqual(val.output[i], pairs[i]);
			}
		})

		it("parses a URL and sorts: " + val.input, function () {
			var url = new URL("?" + val.input, "https://example/");
			url.searchParams.sort();
			var params = new URLSearchParams(url.search);
			params.sort();

			var pairs = Array.from(params.entries());
			for (var i = 0; i < val.output.length; i++) {
				proclaim.deepEqual(val.output[i], pairs[i]);
			}
		})
	})

	// TODO : does not work
	it.skip('removes ? from URL after sorting', function() {
		var url = new URL("http://example.com/?");
		url.searchParams.sort();
		proclaim.equal(url.href, "http://example.com/");
		proclaim.equal(url.search, "");
	})
});
