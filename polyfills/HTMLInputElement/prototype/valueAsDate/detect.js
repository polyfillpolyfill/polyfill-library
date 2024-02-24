(function () {
	if (!("HTMLInputElement" in self && "valueAsDate" in HTMLInputElement.prototype)) {
		return false;
	}

	try {
		var input = document.createElement("INPUT");
		var types = [
			["date", "2006-01-02", new Date("2006-01-02T00:00:00.000Z")],
			["month", "2019-12", new Date("2019-12-01T00:00:00.000Z")],
			["week", "2015-W53", new Date("2015-12-28T00:00:00.000Z")],
			["time", "21:59", new Date("1970-01-01T21:59:00.000Z")]
		]

		for (var i = 0; i < types.length; i++) {
			var type = types[i];
			try { input.type = type[0]; } catch (_) { /* noop */ }
			input.setAttribute("type", type[0]);

			input.value = type[1];
			if (input.valueAsDate.getTime() !== type[2].getTime()) {
				return false;
			}
		}

	} catch (err) {
		return false;
	}

	return true;
})()
