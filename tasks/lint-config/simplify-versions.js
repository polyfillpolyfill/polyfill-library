const semver = require('semver');

function simplifyVersion(version, alwaysIncludeMinor = false) {
	if (!alwaysIncludeMinor && version.minor === 0 && version.patch === 0 && version.prerelease.length === 0 && version.build.length === 0) {
		return version.major.toString()
	} else if (version.patch === 0 && version.prerelease.length === 0 && version.build.length === 0) {
		return `${version.major}.${version.minor}`
	} else {
		return version.toString()
	}
}

function simplifyRange(versions, range, alwaysIncludeMinor = false) {
	const set = []
	let min
	let minPlusOne
	let previous
	const v = versions.sort((a, b) => semver.compare(a, b))
	for (let index = 0; index < v.length; index++) {
		const version = v[index];
		const included = semver.satisfies(version, range)
		if (included) {
			previous = version
			if (!min) {
				min = version
				minPlusOne = v[index + 1];
			}
		} else {
			if (previous) {
				set.push([min, previous, version])
			}
			previous = undefined
			min = undefined
		}
	}

	if (min) {
		set.push([min, undefined, minPlusOne])
	}

	const ranges = []
	for (const [min, max, next] of set) {
		if (min === max)
			if (min === v[0] && next) {
				ranges.push(`<${simplifyVersion(next, alwaysIncludeMinor)}`)
			} else {
				ranges.push(simplifyVersion(min, alwaysIncludeMinor))
			}
		else if (!max && min === v[0])
			ranges.push('*')
		else if (!max)
			ranges.push(`>=${simplifyVersion(min, alwaysIncludeMinor)}`)
		else if (min === v[0])
			if (next) {
				ranges.push(`<${simplifyVersion(next, alwaysIncludeMinor)}`)
			} else {
				ranges.push(`<=${simplifyVersion(max)}`)
			}
		else
			ranges.push(`${simplifyVersion(min, alwaysIncludeMinor)} - ${simplifyVersion(max, alwaysIncludeMinor)}`)
	}
	const simplified = ranges.join(' || ')
	const original = typeof range.raw === 'string' ? range.raw : String(range)
	return simplified.length < original.length ? simplified : range
}

module.exports = {
	simplifyRange: simplifyRange
}
