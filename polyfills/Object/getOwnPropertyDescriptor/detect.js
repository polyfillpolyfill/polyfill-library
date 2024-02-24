'getOwnPropertyDescriptor' in Object && typeof Object.getOwnPropertyDescriptor === 'function' && (function() {
	try {
		return Object.getOwnPropertyDescriptor('13.7', 1).value === '3';
	} catch (exception) {
		return false
	}
}())
