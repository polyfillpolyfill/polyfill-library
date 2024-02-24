function parseRange(range) {
	if (range === '*') {
		return {
			versions: [],
			hasBoundary: false,
			isRanged: true
		};
	}

	let versions = [];
	let operators = [];

	let operatorBuffer = '';

	for (let index = 0; index < range.length; index++) {
		const char = range[index];

		switch (char) {
			case ' ':
			case '|':
			case '<':
			case '>':
			case '=':
			case '-':
				operatorBuffer += char;
				break;

			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
			case '0':
			case '*':
				{
					if (operatorBuffer.length > 0) {
						operators.push(operatorBuffer)
						operatorBuffer = '';
					}

					const version = consumeVersionToken(range.slice(index));
					index += version.length - 1;

					if (version !== '*') {
						versions.push(version);
					}
					break;
				}

			default:
				throw new Error('Invalid range: ' + range);
		}
	}

	if (operatorBuffer.length > 0) {
		operators.push(operatorBuffer)
		operatorBuffer = '';
	}

	operators = operators.filter(operator => operator.trim().length > 0);

	return {
		versions: versions,
		isRanged: operators.length > 0,
		hasBoundary: true,
	};
}

function replaceInRange(range, replacer) {
	if (range === '*') {
		return range;
	}

	let buffer = '';

	for (let index = 0; index < range.length; index++) {
		const char = range[index];

		switch (char) {
			case ' ':
			case '|':
			case '<':
			case '>':
			case '=':
			case '-':
				buffer += char;
				break;

			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
			case '0':
			case '*':
				{
					const version = consumeVersionToken(range.slice(index));
					index += version.length - 1;

					const modifiedVersion = replacer(version);
					if (!modifiedVersion) {
						return;
					}

					buffer += modifiedVersion;
					break;
				}

			default:
				throw new Error('Invalid range: ' + range);
		}
	}

	return buffer;
}

function consumeVersionToken(x) {
	let buffer = '';

	for (const char of x) {
		switch (char) {
			case '<':
			case '>':
			case '=':
			case '|':
			case ' ':
			case '~':
			case '^':
				return buffer;

			default:
				buffer += char;
				break;
		}
	}

	return buffer;
}

module.exports = {
	parseRange: parseRange,
	replaceInRange: replaceInRange,
}
