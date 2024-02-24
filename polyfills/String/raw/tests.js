
/* globals proclaim, Symbol */

it('is a function', function () {
	proclaim.isFunction(String.raw);
});

it('has correct arity', function () {
	proclaim.arity(String.raw, 1);
});

it('has correct name', function () {
	proclaim.hasName(String.raw, 'raw');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(String, 'raw');
});

if ('Symbol' in self) {
	it('throws a TypeError if nextKey is a Symbol', function () {
		proclaim.throws(function () {
			String.raw({
				raw: {
					length: 1,
					0: Symbol()
				}
			});
		});
	});
}

if ('Symbol' in self) {
	it('throws a TypeError if length is a Symbol', function () {
		proclaim.throws(function () {
			String.raw({
				raw: {
					length: Symbol()
				}
			});
		});
	});
}

it('calls the toString method on the keys', function () {
	proclaim.throws(function () {
		String.raw({
			raw: {
				length: 1,
				0: {
					toString: function () {
						throw new Error();
					}
				}
			}
		});
	}, Error);
});

if ('Symbol' in self) {
	it('throws a TypeError if a Symbol is used as a substitution', function () {
		proclaim.throws(function () {
			String.raw({
				raw: ['a', 'b', 'c']
			}, '', Symbol(''));
		}, TypeError);

		proclaim.throws(function () {
			String.raw({
				raw: ['a', 'b', 'c']
			}, Symbol(''), '');
		}, TypeError);
	});
}

it('returns empty string if template.raw is an empty Array', function () {
	proclaim.deepStrictEqual(String.raw({
		raw: []
	}), "");
});

it('returns empty string if template.raw.length is -Infinity', function () {
	proclaim.deepStrictEqual(String.raw({
		raw: {
			length: -Infinity
		}
	}), "");
});

it('returns empty string if template.raw.length is not defined.', function () {
	proclaim.deepStrictEqual(String.raw({
		raw: {}
	}), "");
});

it('returns empty string if template.raw.length is undefined.', function () {
	proclaim.deepStrictEqual(String.raw({
		raw: {
			length: undefined
		}
	}), "");
});

it('returns empty string if template.raw.length is NaN.', function () {
	proclaim.deepStrictEqual(String.raw({
		raw: {
			length: NaN
		}
	}), "");
});

it('returns empty string if template.raw.length is false.', function () {
	proclaim.deepStrictEqual(String.raw({
		raw: {
			length: false
		}
	}), "");
});

it('returns empty string if template.raw.length is null.', function () {
	proclaim.deepStrictEqual(String.raw({
		raw: {
			length: null
		}
	}), "");
});

it('returns empty string if template.raw.length is less than 1.', function () {
	proclaim.deepStrictEqual(String.raw({
		raw: {
			length: 0.9
		}
	}), "");
	proclaim.deepStrictEqual(String.raw({
		raw: {
			length: 0
		}
	}), "");
	proclaim.deepStrictEqual(String.raw({
		raw: {
			length: -0
		}
	}), "");
	proclaim.deepStrictEqual(String.raw({
		raw: {
			length: -1
		}
	}), "");
});

it('throws a TypeError if called with null', function () {
	proclaim.throws(function () {
		String.raw(null);
	});
});

it('throws a TypeError if called with undefined', function () {
	proclaim.throws(function () {
		String.raw(undefined);
	});
});

it('throws a TypeError if called with raw as null', function () {
	proclaim.throws(function () {
		String.raw({
			raw: null
		});
	});
});

it('throws a TypeError if called with raw as undefined', function () {
	proclaim.throws(function () {
		String.raw({
			raw: undefined
		});
	});
});

it('returns the string value appending the substitutions on the same index order.', function () {
	proclaim.deepStrictEqual(String.raw({
		raw: ['a', 'b', 'd', 'f']
	}, '', 'c', 'e'), 'abcdef');
	proclaim.deepStrictEqual(String.raw({
		raw: ['a', 'b', 'd', 'f']
	}, 1), 'a1bdf');
});

it('only appends template.raw.length - 1 amount of substitutions', function () {
	proclaim.deepStrictEqual(String.raw({
		raw: ['a', 'b', 'd', 'f']
	}, '', '', '', {
		toString: function () {
			throw new Error();
		}
	}), 'abdf');
});

it('works with unicode escape sequences', function () {
	proclaim.deepStrictEqual(
		String.raw({
			raw: ['\\u0065\\`\\r\\r\\n\\n', 'check']
		}, 'test'),
		'\\u0065\\`\\r\\r\\n\\ntestcheck'
	);
});

it('works with unicode literal characters', function () {
	proclaim.deepStrictEqual(
		String.raw({
			raw: ["\\\n\\\n\\\n"]
		}),
		'\\\n\\\n\\\n'
	);
});
