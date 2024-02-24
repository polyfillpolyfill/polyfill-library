/* eslint-env mocha, browser */
/* global proclaim */

before(function () {
	if (
		Intl.PluralRules &&
		typeof Intl.PluralRules.__addLocaleData === "function"
	) {
		Intl.PluralRules.__addLocaleData({
			data: {
				categories: {
					cardinal: ["one", "other"],
					ordinal: ["one", "two", "few", "other"]
				},
				fn: function (n, ord) {
					var s = String(n).split("."),
						v0 = !s[1],
						t0 = Number(s[0]) == n,
						n10 = t0 && s[0].slice(-1),
						n100 = t0 && s[0].slice(-2);
					if (ord)
						return n10 == 1 && n100 != 11
							? "one"
							: n10 == 2 && n100 != 12
							? "two"
							: n10 == 3 && n100 != 13
							? "few"
							: "other";
					return n == 1 && v0 ? "one" : "other";
				}
			},
			locale: "en"
		});
	}

	if (
		Intl.NumberFormat &&
		typeof Intl.NumberFormat.__addLocaleData === "function"
	) {
		Intl.NumberFormat.__addLocaleData({
			data: {
				units: {
					simple: {
						degree: {
							"long": { other: "{0} degrees", one: "{0} degree" },
							"short": { other: "{0} deg" },
							narrow: { other: "{0}°" },
							perUnit: {}
						},
						hectare: {
							"long": { other: "{0} hectares", one: "{0} hectare" },
							"short": { other: "{0} ha" },
							narrow: { other: "{0}ha" },
							perUnit: {}
						},
						acre: {
							"long": { other: "{0} acres", one: "{0} acre" },
							"short": { other: "{0} ac" },
							narrow: { other: "{0}ac" },
							perUnit: {}
						},
						percent: {
							"long": { other: "{0} percent" },
							"short": { other: "{0}%" },
							narrow: { other: "{0}%" },
							perUnit: {}
						},
						"liter-per-kilometer": {
							"long": {
								other: "{0} liters per kilometer",
								one: "{0} liter per kilometer"
							},
							"short": { other: "{0} L/km" },
							narrow: { other: "{0}L/km" },
							perUnit: {}
						},
						"mile-per-gallon": {
							"long": {
								other: "{0} miles per gallon",
								one: "{0} mile per gallon"
							},
							"short": { other: "{0} mpg" },
							narrow: { other: "{0}mpg" },
							perUnit: {}
						},
						petabyte: {
							"long": { other: "{0} petabytes", one: "{0} petabyte" },
							"short": { other: "{0} PB" },
							narrow: { other: "{0}PB" },
							perUnit: {}
						},
						terabyte: {
							"long": { other: "{0} terabytes", one: "{0} terabyte" },
							"short": { other: "{0} TB" },
							narrow: { other: "{0}TB" },
							perUnit: {}
						},
						terabit: {
							"long": { other: "{0} terabits", one: "{0} terabit" },
							"short": { other: "{0} Tb" },
							narrow: { other: "{0}Tb" },
							perUnit: {}
						},
						gigabyte: {
							"long": { other: "{0} gigabytes", one: "{0} gigabyte" },
							"short": { other: "{0} GB" },
							narrow: { other: "{0}GB" },
							perUnit: {}
						},
						gigabit: {
							"long": { other: "{0} gigabits", one: "{0} gigabit" },
							"short": { other: "{0} Gb" },
							narrow: { other: "{0}Gb" },
							perUnit: {}
						},
						megabyte: {
							"long": { other: "{0} megabytes", one: "{0} megabyte" },
							"short": { other: "{0} MB" },
							narrow: { other: "{0}MB" },
							perUnit: {}
						},
						megabit: {
							"long": { other: "{0} megabits", one: "{0} megabit" },
							"short": { other: "{0} Mb" },
							narrow: { other: "{0}Mb" },
							perUnit: {}
						},
						kilobyte: {
							"long": { other: "{0} kilobytes", one: "{0} kilobyte" },
							"short": { other: "{0} kB" },
							narrow: { other: "{0}kB" },
							perUnit: {}
						},
						kilobit: {
							"long": { other: "{0} kilobits", one: "{0} kilobit" },
							"short": { other: "{0} kb" },
							narrow: { other: "{0}kb" },
							perUnit: {}
						},
						"byte": {
							"long": { other: "{0} bytes", one: "{0} byte" },
							"short": { other: "{0} byte" },
							narrow: { other: "{0}B" },
							perUnit: {}
						},
						bit: {
							"long": { other: "{0} bits", one: "{0} bit" },
							"short": { other: "{0} bit" },
							narrow: { other: "{0}bit" },
							perUnit: {}
						},
						year: {
							"long": { other: "{0} years", one: "{0} year" },
							"short": { other: "{0} yrs", one: "{0} yr" },
							narrow: { other: "{0}y" },
							perUnit: { "long": "{0} per year", "short": "{0}/y", narrow: "{0}/y" }
						},
						month: {
							"long": { other: "{0} months", one: "{0} month" },
							"short": { other: "{0} mths", one: "{0} mth" },
							narrow: { other: "{0}m" },
							perUnit: {
								"long": "{0} per month",
								"short": "{0}/m",
								narrow: "{0}/m"
							}
						},
						week: {
							"long": { other: "{0} weeks", one: "{0} week" },
							"short": { other: "{0} wks", one: "{0} wk" },
							narrow: { other: "{0}w" },
							perUnit: { "long": "{0} per week", "short": "{0}/w", narrow: "{0}/w" }
						},
						day: {
							"long": { other: "{0} days", one: "{0} day" },
							"short": { other: "{0} days", one: "{0} day" },
							narrow: { other: "{0}d" },
							perUnit: { "long": "{0} per day", "short": "{0}/d", narrow: "{0}/d" }
						},
						hour: {
							"long": { other: "{0} hours", one: "{0} hour" },
							"short": { other: "{0} hr" },
							narrow: { other: "{0}h" },
							perUnit: { "long": "{0} per hour", "short": "{0}/h", narrow: "{0}/h" }
						},
						minute: {
							"long": { other: "{0} minutes", one: "{0} minute" },
							"short": { other: "{0} min" },
							narrow: { other: "{0}m" },
							perUnit: {
								"long": "{0} per minute",
								"short": "{0}/min",
								narrow: "{0}/min"
							}
						},
						second: {
							"long": { other: "{0} seconds", one: "{0} second" },
							"short": { other: "{0} sec" },
							narrow: { other: "{0}s" },
							perUnit: {
								"long": "{0} per second",
								"short": "{0}/s",
								narrow: "{0}/s"
							}
						},
						millisecond: {
							"long": { other: "{0} milliseconds", one: "{0} millisecond" },
							"short": { other: "{0} ms" },
							narrow: { other: "{0}ms" },
							perUnit: {}
						},
						kilometer: {
							"long": { other: "{0} kilometers", one: "{0} kilometer" },
							"short": { other: "{0} km" },
							narrow: { other: "{0}km" },
							perUnit: {
								"long": "{0} per kilometer",
								"short": "{0}/km",
								narrow: "{0}/km"
							}
						},
						meter: {
							"long": { other: "{0} meters", one: "{0} meter" },
							"short": { other: "{0} m" },
							narrow: { other: "{0}m" },
							perUnit: {
								"long": "{0} per meter",
								"short": "{0}/m",
								narrow: "{0}/m"
							}
						},
						centimeter: {
							"long": { other: "{0} centimeters", one: "{0} centimeter" },
							"short": { other: "{0} cm" },
							narrow: { other: "{0}cm" },
							perUnit: {
								"long": "{0} per centimeter",
								"short": "{0}/cm",
								narrow: "{0}/cm"
							}
						},
						millimeter: {
							"long": { other: "{0} millimeters", one: "{0} millimeter" },
							"short": { other: "{0} mm" },
							narrow: { other: "{0}mm" },
							perUnit: {}
						},
						mile: {
							"long": { other: "{0} miles", one: "{0} mile" },
							"short": { other: "{0} mi" },
							narrow: { other: "{0}mi" },
							perUnit: {}
						},
						yard: {
							"long": { other: "{0} yards", one: "{0} yard" },
							"short": { other: "{0} yd" },
							narrow: { other: "{0}yd" },
							perUnit: {}
						},
						foot: {
							"long": { other: "{0} feet", one: "{0} foot" },
							"short": { other: "{0} ft" },
							narrow: { other: "{0}′" },
							perUnit: {
								"long": "{0} per foot",
								"short": "{0}/ft",
								narrow: "{0}/ft"
							}
						},
						inch: {
							"long": { other: "{0} inches", one: "{0} inch" },
							"short": { other: "{0} in" },
							narrow: { other: "{0}″" },
							perUnit: {
								"long": "{0} per inch",
								"short": "{0}/in",
								narrow: "{0}/in"
							}
						},
						"mile-scandinavian": {
							"long": {
								other: "{0} miles-scandinavian",
								one: "{0} mile-scandinavian"
							},
							"short": { other: "{0} smi" },
							narrow: { other: "{0}smi" },
							perUnit: {}
						},
						kilogram: {
							"long": { other: "{0} kilograms", one: "{0} kilogram" },
							"short": { other: "{0} kg" },
							narrow: { other: "{0}kg" },
							perUnit: {
								"long": "{0} per kilogram",
								"short": "{0}/kg",
								narrow: "{0}/kg"
							}
						},
						gram: {
							"long": { other: "{0} grams", one: "{0} gram" },
							"short": { other: "{0} g" },
							narrow: { other: "{0}g" },
							perUnit: { "long": "{0} per gram", "short": "{0}/g", narrow: "{0}/g" }
						},
						stone: {
							"long": { other: "{0} stones", one: "{0} stone" },
							"short": { other: "{0} st" },
							narrow: { other: "{0}st" },
							perUnit: {}
						},
						pound: {
							"long": { other: "{0} pounds", one: "{0} pound" },
							"short": { other: "{0} lb" },
							narrow: { other: "{0}#" },
							perUnit: {
								"long": "{0} per pound",
								"short": "{0}/lb",
								narrow: "{0}/lb"
							}
						},
						ounce: {
							"long": { other: "{0} ounces", one: "{0} ounce" },
							"short": { other: "{0} oz" },
							narrow: { other: "{0}oz" },
							perUnit: {
								"long": "{0} per ounce",
								"short": "{0}/oz",
								narrow: "{0}/oz"
							}
						},
						"kilometer-per-hour": {
							"long": {
								other: "{0} kilometers per hour",
								one: "{0} kilometer per hour"
							},
							"short": { other: "{0} km/h" },
							narrow: { other: "{0}km/h" },
							perUnit: {}
						},
						"meter-per-second": {
							"long": {
								other: "{0} meters per second",
								one: "{0} meter per second"
							},
							"short": { other: "{0} m/s" },
							narrow: { other: "{0}m/s" },
							perUnit: {}
						},
						"mile-per-hour": {
							"long": { other: "{0} miles per hour", one: "{0} mile per hour" },
							"short": { other: "{0} mph" },
							narrow: { other: "{0}mph" },
							perUnit: {}
						},
						celsius: {
							"long": { other: "{0} degrees Celsius", one: "{0} degree Celsius" },
							"short": { other: "{0}°C" },
							narrow: { other: "{0}°C" },
							perUnit: {}
						},
						fahrenheit: {
							"long": {
								other: "{0} degrees Fahrenheit",
								one: "{0} degree Fahrenheit"
							},
							"short": { other: "{0}°F" },
							narrow: { other: "{0}°" },
							perUnit: {}
						},
						liter: {
							"long": { other: "{0} liters", one: "{0} liter" },
							"short": { other: "{0} L" },
							narrow: { other: "{0}L" },
							perUnit: {
								"long": "{0} per liter",
								"short": "{0}/L",
								narrow: "{0}/L"
							}
						},
						milliliter: {
							"long": { other: "{0} milliliters", one: "{0} milliliter" },
							"short": { other: "{0} mL" },
							narrow: { other: "{0}mL" },
							perUnit: {}
						},
						gallon: {
							"long": { other: "{0} gallons", one: "{0} gallon" },
							"short": { other: "{0} gal" },
							narrow: { other: "{0}gal" },
							perUnit: {
								"long": "{0} per gallon",
								"short": "{0}/gal US",
								narrow: "{0}/gal"
							}
						},
						"fluid-ounce": {
							"long": { other: "{0} fluid ounces", one: "{0} fluid ounce" },
							"short": { other: "{0} fl oz" },
							narrow: { other: "{0}fl oz" },
							perUnit: {}
						}
					},
					compound: {
						per: { "long": "{0} per {1}", "short": "{0}/{1}", narrow: "{0}/{1}" }
					}
				},
				currencies: {
					ADP: {
						displayName: { other: "Andorran pesetas", one: "Andorran peseta" },
						symbol: "ADP",
						narrow: "ADP"
					},
					AED: {
						displayName: { other: "UAE dirhams", one: "UAE dirham" },
						symbol: "AED",
						narrow: "AED"
					},
					AFA: {
						displayName: {
							other: "Afghan afghanis (1927–2002)",
							one: "Afghan afghani (1927–2002)"
						},
						symbol: "AFA",
						narrow: "AFA"
					},
					AFN: {
						displayName: { other: "Afghan Afghanis", one: "Afghan Afghani" },
						symbol: "AFN",
						narrow: "؋"
					},
					ALK: {
						displayName: {
							other: "Albanian lekë (1946–1965)",
							one: "Albanian lek (1946–1965)"
						},
						symbol: "ALK",
						narrow: "ALK"
					},
					ALL: {
						displayName: { other: "Albanian lekë", one: "Albanian lek" },
						symbol: "ALL",
						narrow: "ALL"
					},
					AMD: {
						displayName: { other: "Armenian drams", one: "Armenian dram" },
						symbol: "AMD",
						narrow: "֏"
					},
					ANG: {
						displayName: {
							other: "Netherlands Antillean guilders",
							one: "Netherlands Antillean guilder"
						},
						symbol: "ANG",
						narrow: "ANG"
					},
					AOA: {
						displayName: { other: "Angolan kwanzas", one: "Angolan kwanza" },
						symbol: "AOA",
						narrow: "Kz"
					},
					AOK: {
						displayName: {
							other: "Angolan kwanzas (1977–1991)",
							one: "Angolan kwanza (1977–1991)"
						},
						symbol: "AOK",
						narrow: "AOK"
					},
					AON: {
						displayName: {
							other: "Angolan new kwanzas (1990–2000)",
							one: "Angolan new kwanza (1990–2000)"
						},
						symbol: "AON",
						narrow: "AON"
					},
					AOR: {
						displayName: {
							other: "Angolan readjusted kwanzas (1995–1999)",
							one: "Angolan readjusted kwanza (1995–1999)"
						},
						symbol: "AOR",
						narrow: "AOR"
					},
					ARA: {
						displayName: {
							other: "Argentine australs",
							one: "Argentine austral"
						},
						symbol: "ARA",
						narrow: "ARA"
					},
					ARL: {
						displayName: {
							other: "Argentine pesos ley (1970–1983)",
							one: "Argentine peso ley (1970–1983)"
						},
						symbol: "ARL",
						narrow: "ARL"
					},
					ARM: {
						displayName: {
							other: "Argentine pesos (1881–1970)",
							one: "Argentine peso (1881–1970)"
						},
						symbol: "ARM",
						narrow: "ARM"
					},
					ARP: {
						displayName: {
							other: "Argentine pesos (1983–1985)",
							one: "Argentine peso (1983–1985)"
						},
						symbol: "ARP",
						narrow: "ARP"
					},
					ARS: {
						displayName: { other: "Argentine pesos", one: "Argentine peso" },
						symbol: "ARS",
						narrow: "$"
					},
					ATS: {
						displayName: {
							other: "Austrian schillings",
							one: "Austrian schilling"
						},
						symbol: "ATS",
						narrow: "ATS"
					},
					AUD: {
						displayName: {
							other: "Australian dollars",
							one: "Australian dollar"
						},
						symbol: "A$",
						narrow: "$"
					},
					AWG: {
						displayName: { other: "Aruban florin" },
						symbol: "AWG",
						narrow: "AWG"
					},
					AZM: {
						displayName: {
							other: "Azerbaijani manats (1993–2006)",
							one: "Azerbaijani manat (1993–2006)"
						},
						symbol: "AZM",
						narrow: "AZM"
					},
					AZN: {
						displayName: {
							other: "Azerbaijani manats",
							one: "Azerbaijani manat"
						},
						symbol: "AZN",
						narrow: "₼"
					},
					BAD: {
						displayName: {
							other: "Bosnia-Herzegovina dinars (1992–1994)",
							one: "Bosnia-Herzegovina dinar (1992–1994)"
						},
						symbol: "BAD",
						narrow: "BAD"
					},
					BAM: {
						displayName: {
							other: "Bosnia-Herzegovina convertible marks",
							one: "Bosnia-Herzegovina convertible mark"
						},
						symbol: "BAM",
						narrow: "KM"
					},
					BAN: {
						displayName: {
							other: "Bosnia-Herzegovina new dinars (1994–1997)",
							one: "Bosnia-Herzegovina new dinar (1994–1997)"
						},
						symbol: "BAN",
						narrow: "BAN"
					},
					BBD: {
						displayName: {
							other: "Barbadian dollars",
							one: "Barbadian dollar"
						},
						symbol: "BBD",
						narrow: "$"
					},
					BDT: {
						displayName: {
							other: "Bangladeshi takas",
							one: "Bangladeshi taka"
						},
						symbol: "BDT",
						narrow: "৳"
					},
					BEC: {
						displayName: {
							other: "Belgian francs (convertible)",
							one: "Belgian franc (convertible)"
						},
						symbol: "BEC",
						narrow: "BEC"
					},
					BEF: {
						displayName: { other: "Belgian francs", one: "Belgian franc" },
						symbol: "BEF",
						narrow: "BEF"
					},
					BEL: {
						displayName: {
							other: "Belgian francs (financial)",
							one: "Belgian franc (financial)"
						},
						symbol: "BEL",
						narrow: "BEL"
					},
					BGL: {
						displayName: {
							other: "Bulgarian hard leva",
							one: "Bulgarian hard lev"
						},
						symbol: "BGL",
						narrow: "BGL"
					},
					BGM: {
						displayName: {
							other: "Bulgarian socialist leva",
							one: "Bulgarian socialist lev"
						},
						symbol: "BGM",
						narrow: "BGM"
					},
					BGN: {
						displayName: { other: "Bulgarian leva", one: "Bulgarian lev" },
						symbol: "BGN",
						narrow: "BGN"
					},
					BGO: {
						displayName: {
							other: "Bulgarian leva (1879–1952)",
							one: "Bulgarian lev (1879–1952)"
						},
						symbol: "BGO",
						narrow: "BGO"
					},
					BHD: {
						displayName: { other: "Bahraini dinars", one: "Bahraini dinar" },
						symbol: "BHD",
						narrow: "BHD"
					},
					BIF: {
						displayName: { other: "Burundian francs", one: "Burundian franc" },
						symbol: "BIF",
						narrow: "BIF"
					},
					BMD: {
						displayName: { other: "Bermudan dollars", one: "Bermudan dollar" },
						symbol: "BMD",
						narrow: "$"
					},
					BND: {
						displayName: { other: "Brunei dollars", one: "Brunei dollar" },
						symbol: "BND",
						narrow: "$"
					},
					BOB: {
						displayName: {
							other: "Bolivian bolivianos",
							one: "Bolivian boliviano"
						},
						symbol: "BOB",
						narrow: "Bs"
					},
					BOL: {
						displayName: {
							other: "Bolivian bolivianos (1863–1963)",
							one: "Bolivian boliviano (1863–1963)"
						},
						symbol: "BOL",
						narrow: "BOL"
					},
					BOP: {
						displayName: { other: "Bolivian pesos", one: "Bolivian peso" },
						symbol: "BOP",
						narrow: "BOP"
					},
					BOV: {
						displayName: { other: "Bolivian mvdols", one: "Bolivian mvdol" },
						symbol: "BOV",
						narrow: "BOV"
					},
					BRB: {
						displayName: {
							other: "Brazilian new cruzeiros (1967–1986)",
							one: "Brazilian new cruzeiro (1967–1986)"
						},
						symbol: "BRB",
						narrow: "BRB"
					},
					BRC: {
						displayName: {
							other: "Brazilian cruzados (1986–1989)",
							one: "Brazilian cruzado (1986–1989)"
						},
						symbol: "BRC",
						narrow: "BRC"
					},
					BRE: {
						displayName: {
							other: "Brazilian cruzeiros (1990–1993)",
							one: "Brazilian cruzeiro (1990–1993)"
						},
						symbol: "BRE",
						narrow: "BRE"
					},
					BRL: {
						displayName: { other: "Brazilian reals", one: "Brazilian real" },
						symbol: "R$",
						narrow: "R$"
					},
					BRN: {
						displayName: {
							other: "Brazilian new cruzados (1989–1990)",
							one: "Brazilian new cruzado (1989–1990)"
						},
						symbol: "BRN",
						narrow: "BRN"
					},
					BRR: {
						displayName: {
							other: "Brazilian cruzeiros (1993–1994)",
							one: "Brazilian cruzeiro (1993–1994)"
						},
						symbol: "BRR",
						narrow: "BRR"
					},
					BRZ: {
						displayName: {
							other: "Brazilian cruzeiros (1942–1967)",
							one: "Brazilian cruzeiro (1942–1967)"
						},
						symbol: "BRZ",
						narrow: "BRZ"
					},
					BSD: {
						displayName: { other: "Bahamian dollars", one: "Bahamian dollar" },
						symbol: "BSD",
						narrow: "$"
					},
					BTN: {
						displayName: {
							other: "Bhutanese ngultrums",
							one: "Bhutanese ngultrum"
						},
						symbol: "BTN",
						narrow: "BTN"
					},
					BUK: {
						displayName: { other: "Burmese kyats", one: "Burmese kyat" },
						symbol: "BUK",
						narrow: "BUK"
					},
					BWP: {
						displayName: { other: "Botswanan pulas", one: "Botswanan pula" },
						symbol: "BWP",
						narrow: "P"
					},
					BYB: {
						displayName: {
							other: "Belarusian rubles (1994–1999)",
							one: "Belarusian ruble (1994–1999)"
						},
						symbol: "BYB",
						narrow: "BYB"
					},
					BYN: {
						displayName: {
							other: "Belarusian rubles",
							one: "Belarusian ruble"
						},
						symbol: "BYN",
						narrow: "р."
					},
					BYR: {
						displayName: {
							other: "Belarusian rubles (2000–2016)",
							one: "Belarusian ruble (2000–2016)"
						},
						symbol: "BYR",
						narrow: "BYR"
					},
					BZD: {
						displayName: { other: "Belize dollars", one: "Belize dollar" },
						symbol: "BZD",
						narrow: "$"
					},
					CAD: {
						displayName: { other: "Canadian dollars", one: "Canadian dollar" },
						symbol: "CA$",
						narrow: "$"
					},
					CDF: {
						displayName: { other: "Congolese francs", one: "Congolese franc" },
						symbol: "CDF",
						narrow: "CDF"
					},
					CHE: {
						displayName: { other: "WIR euros", one: "WIR euro" },
						symbol: "CHE",
						narrow: "CHE"
					},
					CHF: {
						displayName: { other: "Swiss francs", one: "Swiss franc" },
						symbol: "CHF",
						narrow: "CHF"
					},
					CHW: {
						displayName: { other: "WIR francs", one: "WIR franc" },
						symbol: "CHW",
						narrow: "CHW"
					},
					CLE: {
						displayName: { other: "Chilean escudos", one: "Chilean escudo" },
						symbol: "CLE",
						narrow: "CLE"
					},
					CLF: {
						displayName: {
							other: "Chilean units of account (UF)",
							one: "Chilean unit of account (UF)"
						},
						symbol: "CLF",
						narrow: "CLF"
					},
					CLP: {
						displayName: { other: "Chilean pesos", one: "Chilean peso" },
						symbol: "CLP",
						narrow: "$"
					},
					CNH: {
						displayName: { other: "Chinese yuan (offshore)" },
						symbol: "CNH",
						narrow: "CNH"
					},
					CNX: {
						displayName: {
							other: "Chinese People’s Bank dollars",
							one: "Chinese People’s Bank dollar"
						},
						symbol: "CNX",
						narrow: "CNX"
					},
					CNY: {
						displayName: { other: "Chinese yuan" },
						symbol: "CN¥",
						narrow: "¥"
					},
					COP: {
						displayName: { other: "Colombian pesos", one: "Colombian peso" },
						symbol: "COP",
						narrow: "$"
					},
					COU: {
						displayName: {
							other: "Colombian real value units",
							one: "Colombian real value unit"
						},
						symbol: "COU",
						narrow: "COU"
					},
					CRC: {
						displayName: {
							other: "Costa Rican colóns",
							one: "Costa Rican colón"
						},
						symbol: "CRC",
						narrow: "₡"
					},
					CSD: {
						displayName: {
							other: "Serbian dinars (2002–2006)",
							one: "Serbian dinar (2002–2006)"
						},
						symbol: "CSD",
						narrow: "CSD"
					},
					CSK: {
						displayName: {
							other: "Czechoslovak hard korunas",
							one: "Czechoslovak hard koruna"
						},
						symbol: "CSK",
						narrow: "CSK"
					},
					CUC: {
						displayName: {
							other: "Cuban convertible pesos",
							one: "Cuban convertible peso"
						},
						symbol: "CUC",
						narrow: "$"
					},
					CUP: {
						displayName: { other: "Cuban pesos", one: "Cuban peso" },
						symbol: "CUP",
						narrow: "$"
					},
					CVE: {
						displayName: {
							other: "Cape Verdean escudos",
							one: "Cape Verdean escudo"
						},
						symbol: "CVE",
						narrow: "CVE"
					},
					CYP: {
						displayName: { other: "Cypriot pounds", one: "Cypriot pound" },
						symbol: "CYP",
						narrow: "CYP"
					},
					CZK: {
						displayName: { other: "Czech korunas", one: "Czech koruna" },
						symbol: "CZK",
						narrow: "Kč"
					},
					DDM: {
						displayName: {
							other: "East German marks",
							one: "East German mark"
						},
						symbol: "DDM",
						narrow: "DDM"
					},
					DEM: {
						displayName: { other: "German marks", one: "German mark" },
						symbol: "DEM",
						narrow: "DEM"
					},
					DJF: {
						displayName: {
							other: "Djiboutian francs",
							one: "Djiboutian franc"
						},
						symbol: "DJF",
						narrow: "DJF"
					},
					DKK: {
						displayName: { other: "Danish kroner", one: "Danish krone" },
						symbol: "DKK",
						narrow: "kr"
					},
					DOP: {
						displayName: { other: "Dominican pesos", one: "Dominican peso" },
						symbol: "DOP",
						narrow: "$"
					},
					DZD: {
						displayName: { other: "Algerian dinars", one: "Algerian dinar" },
						symbol: "DZD",
						narrow: "DZD"
					},
					ECS: {
						displayName: {
							other: "Ecuadorian sucres",
							one: "Ecuadorian sucre"
						},
						symbol: "ECS",
						narrow: "ECS"
					},
					ECV: {
						displayName: {
							other: "Ecuadorian units of constant value",
							one: "Ecuadorian unit of constant value"
						},
						symbol: "ECV",
						narrow: "ECV"
					},
					EEK: {
						displayName: { other: "Estonian kroons", one: "Estonian kroon" },
						symbol: "EEK",
						narrow: "EEK"
					},
					EGP: {
						displayName: { other: "Egyptian pounds", one: "Egyptian pound" },
						symbol: "EGP",
						narrow: "E£"
					},
					ERN: {
						displayName: { other: "Eritrean nakfas", one: "Eritrean nakfa" },
						symbol: "ERN",
						narrow: "ERN"
					},
					ESA: {
						displayName: {
							other: "Spanish pesetas (A account)",
							one: "Spanish peseta (A account)"
						},
						symbol: "ESA",
						narrow: "ESA"
					},
					ESB: {
						displayName: {
							other: "Spanish pesetas (convertible account)",
							one: "Spanish peseta (convertible account)"
						},
						symbol: "ESB",
						narrow: "ESB"
					},
					ESP: {
						displayName: { other: "Spanish pesetas", one: "Spanish peseta" },
						symbol: "ESP",
						narrow: "₧"
					},
					ETB: {
						displayName: { other: "Ethiopian birrs", one: "Ethiopian birr" },
						symbol: "ETB",
						narrow: "ETB"
					},
					EUR: {
						displayName: { other: "euros", one: "euro" },
						symbol: "€",
						narrow: "€"
					},
					FIM: {
						displayName: { other: "Finnish markkas", one: "Finnish markka" },
						symbol: "FIM",
						narrow: "FIM"
					},
					FJD: {
						displayName: { other: "Fijian dollars", one: "Fijian dollar" },
						symbol: "FJD",
						narrow: "$"
					},
					FKP: {
						displayName: {
							other: "Falkland Islands pounds",
							one: "Falkland Islands pound"
						},
						symbol: "FKP",
						narrow: "£"
					},
					FRF: {
						displayName: { other: "French francs", one: "French franc" },
						symbol: "FRF",
						narrow: "FRF"
					},
					GBP: {
						displayName: { other: "British pounds", one: "British pound" },
						symbol: "£",
						narrow: "£"
					},
					GEK: {
						displayName: {
							other: "Georgian kupon larits",
							one: "Georgian kupon larit"
						},
						symbol: "GEK",
						narrow: "GEK"
					},
					GEL: {
						displayName: { other: "Georgian laris", one: "Georgian lari" },
						symbol: "GEL",
						narrow: "₾"
					},
					GHC: {
						displayName: {
							other: "Ghanaian cedis (1979–2007)",
							one: "Ghanaian cedi (1979–2007)"
						},
						symbol: "GHC",
						narrow: "GHC"
					},
					GHS: {
						displayName: { other: "Ghanaian cedis", one: "Ghanaian cedi" },
						symbol: "GHS",
						narrow: "GH₵"
					},
					GIP: {
						displayName: { other: "Gibraltar pounds", one: "Gibraltar pound" },
						symbol: "GIP",
						narrow: "£"
					},
					GMD: {
						displayName: { other: "Gambian dalasis", one: "Gambian dalasi" },
						symbol: "GMD",
						narrow: "GMD"
					},
					GNF: {
						displayName: { other: "Guinean francs", one: "Guinean franc" },
						symbol: "GNF",
						narrow: "FG"
					},
					GNS: {
						displayName: { other: "Guinean sylis", one: "Guinean syli" },
						symbol: "GNS",
						narrow: "GNS"
					},
					GQE: {
						displayName: { other: "Equatorial Guinean ekwele" },
						symbol: "GQE",
						narrow: "GQE"
					},
					GRD: {
						displayName: { other: "Greek drachmas", one: "Greek drachma" },
						symbol: "GRD",
						narrow: "GRD"
					},
					GTQ: {
						displayName: {
							other: "Guatemalan quetzals",
							one: "Guatemalan quetzal"
						},
						symbol: "GTQ",
						narrow: "Q"
					},
					GWE: {
						displayName: {
							other: "Portuguese Guinea escudos",
							one: "Portuguese Guinea escudo"
						},
						symbol: "GWE",
						narrow: "GWE"
					},
					GWP: {
						displayName: {
							other: "Guinea-Bissau pesos",
							one: "Guinea-Bissau peso"
						},
						symbol: "GWP",
						narrow: "GWP"
					},
					GYD: {
						displayName: {
							other: "Guyanaese dollars",
							one: "Guyanaese dollar"
						},
						symbol: "GYD",
						narrow: "$"
					},
					HKD: {
						displayName: {
							other: "Hong Kong dollars",
							one: "Hong Kong dollar"
						},
						symbol: "HK$",
						narrow: "$"
					},
					HNL: {
						displayName: {
							other: "Honduran lempiras",
							one: "Honduran lempira"
						},
						symbol: "HNL",
						narrow: "L"
					},
					HRD: {
						displayName: { other: "Croatian dinars", one: "Croatian dinar" },
						symbol: "HRD",
						narrow: "HRD"
					},
					HRK: {
						displayName: { other: "Croatian kunas", one: "Croatian kuna" },
						symbol: "HRK",
						narrow: "kn"
					},
					HTG: {
						displayName: { other: "Haitian gourdes", one: "Haitian gourde" },
						symbol: "HTG",
						narrow: "HTG"
					},
					HUF: {
						displayName: {
							other: "Hungarian forints",
							one: "Hungarian forint"
						},
						symbol: "HUF",
						narrow: "Ft"
					},
					IDR: {
						displayName: {
							other: "Indonesian rupiahs",
							one: "Indonesian rupiah"
						},
						symbol: "IDR",
						narrow: "Rp"
					},
					IEP: {
						displayName: { other: "Irish pounds", one: "Irish pound" },
						symbol: "IEP",
						narrow: "IEP"
					},
					ILP: {
						displayName: { other: "Israeli pounds", one: "Israeli pound" },
						symbol: "ILP",
						narrow: "ILP"
					},
					ILR: {
						displayName: {
							other: "Israeli shekels (1980–1985)",
							one: "Israeli shekel (1980–1985)"
						},
						symbol: "ILR",
						narrow: "ILR"
					},
					ILS: {
						displayName: {
							other: "Israeli new shekels",
							one: "Israeli new shekel"
						},
						symbol: "₪",
						narrow: "₪"
					},
					INR: {
						displayName: { other: "Indian rupees", one: "Indian rupee" },
						symbol: "₹",
						narrow: "₹"
					},
					IQD: {
						displayName: { other: "Iraqi dinars", one: "Iraqi dinar" },
						symbol: "IQD",
						narrow: "IQD"
					},
					IRR: {
						displayName: { other: "Iranian rials", one: "Iranian rial" },
						symbol: "IRR",
						narrow: "IRR"
					},
					ISJ: {
						displayName: {
							other: "Icelandic krónur (1918–1981)",
							one: "Icelandic króna (1918–1981)"
						},
						symbol: "ISJ",
						narrow: "ISJ"
					},
					ISK: {
						displayName: { other: "Icelandic krónur", one: "Icelandic króna" },
						symbol: "ISK",
						narrow: "kr"
					},
					ITL: {
						displayName: { other: "Italian liras", one: "Italian lira" },
						symbol: "ITL",
						narrow: "ITL"
					},
					JMD: {
						displayName: { other: "Jamaican dollars", one: "Jamaican dollar" },
						symbol: "JMD",
						narrow: "$"
					},
					JOD: {
						displayName: { other: "Jordanian dinars", one: "Jordanian dinar" },
						symbol: "JOD",
						narrow: "JOD"
					},
					JPY: {
						displayName: { other: "Japanese yen" },
						symbol: "¥",
						narrow: "¥"
					},
					KES: {
						displayName: { other: "Kenyan shillings", one: "Kenyan shilling" },
						symbol: "KES",
						narrow: "KES"
					},
					KGS: {
						displayName: { other: "Kyrgystani soms", one: "Kyrgystani som" },
						symbol: "KGS",
						narrow: "KGS"
					},
					KHR: {
						displayName: { other: "Cambodian riels", one: "Cambodian riel" },
						symbol: "KHR",
						narrow: "៛"
					},
					KMF: {
						displayName: { other: "Comorian francs", one: "Comorian franc" },
						symbol: "KMF",
						narrow: "CF"
					},
					KPW: {
						displayName: { other: "North Korean won" },
						symbol: "KPW",
						narrow: "₩"
					},
					KRH: {
						displayName: { other: "South Korean hwan (1953–1962)" },
						symbol: "KRH",
						narrow: "KRH"
					},
					KRO: {
						displayName: { other: "South Korean won (1945–1953)" },
						symbol: "KRO",
						narrow: "KRO"
					},
					KRW: {
						displayName: { other: "South Korean won" },
						symbol: "₩",
						narrow: "₩"
					},
					KWD: {
						displayName: { other: "Kuwaiti dinars", one: "Kuwaiti dinar" },
						symbol: "KWD",
						narrow: "KWD"
					},
					KYD: {
						displayName: {
							other: "Cayman Islands dollars",
							one: "Cayman Islands dollar"
						},
						symbol: "KYD",
						narrow: "$"
					},
					KZT: {
						displayName: {
							other: "Kazakhstani tenges",
							one: "Kazakhstani tenge"
						},
						symbol: "KZT",
						narrow: "₸"
					},
					LAK: {
						displayName: { other: "Laotian kips", one: "Laotian kip" },
						symbol: "LAK",
						narrow: "₭"
					},
					LBP: {
						displayName: { other: "Lebanese pounds", one: "Lebanese pound" },
						symbol: "LBP",
						narrow: "L£"
					},
					LKR: {
						displayName: {
							other: "Sri Lankan rupees",
							one: "Sri Lankan rupee"
						},
						symbol: "LKR",
						narrow: "Rs"
					},
					LRD: {
						displayName: { other: "Liberian dollars", one: "Liberian dollar" },
						symbol: "LRD",
						narrow: "$"
					},
					LSL: {
						displayName: { other: "Lesotho lotis", one: "Lesotho loti" },
						symbol: "LSL",
						narrow: "LSL"
					},
					LTL: {
						displayName: { other: "Lithuanian litai", one: "Lithuanian litas" },
						symbol: "LTL",
						narrow: "Lt"
					},
					LTT: {
						displayName: {
							other: "Lithuanian talonases",
							one: "Lithuanian talonas"
						},
						symbol: "LTT",
						narrow: "LTT"
					},
					LUC: {
						displayName: {
							other: "Luxembourgian convertible francs",
							one: "Luxembourgian convertible franc"
						},
						symbol: "LUC",
						narrow: "LUC"
					},
					LUF: {
						displayName: {
							other: "Luxembourgian francs",
							one: "Luxembourgian franc"
						},
						symbol: "LUF",
						narrow: "LUF"
					},
					LUL: {
						displayName: {
							other: "Luxembourg financial francs",
							one: "Luxembourg financial franc"
						},
						symbol: "LUL",
						narrow: "LUL"
					},
					LVL: {
						displayName: { other: "Latvian lati", one: "Latvian lats" },
						symbol: "LVL",
						narrow: "Ls"
					},
					LVR: {
						displayName: { other: "Latvian rubles", one: "Latvian ruble" },
						symbol: "LVR",
						narrow: "LVR"
					},
					LYD: {
						displayName: { other: "Libyan dinars", one: "Libyan dinar" },
						symbol: "LYD",
						narrow: "LYD"
					},
					MAD: {
						displayName: { other: "Moroccan dirhams", one: "Moroccan dirham" },
						symbol: "MAD",
						narrow: "MAD"
					},
					MAF: {
						displayName: { other: "Moroccan francs", one: "Moroccan franc" },
						symbol: "MAF",
						narrow: "MAF"
					},
					MCF: {
						displayName: {
							other: "Monegasque francs",
							one: "Monegasque franc"
						},
						symbol: "MCF",
						narrow: "MCF"
					},
					MDC: {
						displayName: { other: "Moldovan cupon" },
						symbol: "MDC",
						narrow: "MDC"
					},
					MDL: {
						displayName: { other: "Moldovan lei", one: "Moldovan leu" },
						symbol: "MDL",
						narrow: "MDL"
					},
					MGA: {
						displayName: { other: "Malagasy ariaries", one: "Malagasy ariary" },
						symbol: "MGA",
						narrow: "Ar"
					},
					MGF: {
						displayName: { other: "Malagasy francs", one: "Malagasy franc" },
						symbol: "MGF",
						narrow: "MGF"
					},
					MKD: {
						displayName: {
							other: "Macedonian denari",
							one: "Macedonian denar"
						},
						symbol: "MKD",
						narrow: "MKD"
					},
					MKN: {
						displayName: {
							other: "Macedonian denari (1992–1993)",
							one: "Macedonian denar (1992–1993)"
						},
						symbol: "MKN",
						narrow: "MKN"
					},
					MLF: {
						displayName: { other: "Malian francs", one: "Malian franc" },
						symbol: "MLF",
						narrow: "MLF"
					},
					MMK: {
						displayName: { other: "Myanmar kyats", one: "Myanmar kyat" },
						symbol: "MMK",
						narrow: "K"
					},
					MNT: {
						displayName: {
							other: "Mongolian tugriks",
							one: "Mongolian tugrik"
						},
						symbol: "MNT",
						narrow: "₮"
					},
					MOP: {
						displayName: { other: "Macanese patacas", one: "Macanese pataca" },
						symbol: "MOP",
						narrow: "MOP"
					},
					MRO: {
						displayName: {
							other: "Mauritanian ouguiyas (1973–2017)",
							one: "Mauritanian ouguiya (1973–2017)"
						},
						symbol: "MRO",
						narrow: "MRO"
					},
					MRU: {
						displayName: {
							other: "Mauritanian ouguiyas",
							one: "Mauritanian ouguiya"
						},
						symbol: "MRU",
						narrow: "MRU"
					},
					MTL: {
						displayName: { other: "Maltese lira" },
						symbol: "MTL",
						narrow: "MTL"
					},
					MTP: {
						displayName: { other: "Maltese pounds", one: "Maltese pound" },
						symbol: "MTP",
						narrow: "MTP"
					},
					MUR: {
						displayName: { other: "Mauritian rupees", one: "Mauritian rupee" },
						symbol: "MUR",
						narrow: "Rs"
					},
					MVP: {
						displayName: {
							other: "Maldivian rupees (1947–1981)",
							one: "Maldivian rupee (1947–1981)"
						},
						symbol: "MVP",
						narrow: "MVP"
					},
					MVR: {
						displayName: {
							other: "Maldivian rufiyaas",
							one: "Maldivian rufiyaa"
						},
						symbol: "MVR",
						narrow: "MVR"
					},
					MWK: {
						displayName: { other: "Malawian kwachas", one: "Malawian kwacha" },
						symbol: "MWK",
						narrow: "MWK"
					},
					MXN: {
						displayName: { other: "Mexican pesos", one: "Mexican peso" },
						symbol: "MX$",
						narrow: "$"
					},
					MXP: {
						displayName: {
							other: "Mexican silver pesos (1861–1992)",
							one: "Mexican silver peso (1861–1992)"
						},
						symbol: "MXP",
						narrow: "MXP"
					},
					MXV: {
						displayName: {
							other: "Mexican investment units",
							one: "Mexican investment unit"
						},
						symbol: "MXV",
						narrow: "MXV"
					},
					MYR: {
						displayName: {
							other: "Malaysian ringgits",
							one: "Malaysian ringgit"
						},
						symbol: "MYR",
						narrow: "RM"
					},
					MZE: {
						displayName: {
							other: "Mozambican escudos",
							one: "Mozambican escudo"
						},
						symbol: "MZE",
						narrow: "MZE"
					},
					MZM: {
						displayName: {
							other: "Mozambican meticals (1980–2006)",
							one: "Mozambican metical (1980–2006)"
						},
						symbol: "MZM",
						narrow: "MZM"
					},
					MZN: {
						displayName: {
							other: "Mozambican meticals",
							one: "Mozambican metical"
						},
						symbol: "MZN",
						narrow: "MZN"
					},
					NAD: {
						displayName: { other: "Namibian dollars", one: "Namibian dollar" },
						symbol: "NAD",
						narrow: "$"
					},
					NGN: {
						displayName: { other: "Nigerian nairas", one: "Nigerian naira" },
						symbol: "NGN",
						narrow: "₦"
					},
					NIC: {
						displayName: {
							other: "Nicaraguan córdobas (1988–1991)",
							one: "Nicaraguan córdoba (1988–1991)"
						},
						symbol: "NIC",
						narrow: "NIC"
					},
					NIO: {
						displayName: {
							other: "Nicaraguan córdobas",
							one: "Nicaraguan córdoba"
						},
						symbol: "NIO",
						narrow: "C$"
					},
					NLG: {
						displayName: { other: "Dutch guilders", one: "Dutch guilder" },
						symbol: "NLG",
						narrow: "NLG"
					},
					NOK: {
						displayName: { other: "Norwegian kroner", one: "Norwegian krone" },
						symbol: "NOK",
						narrow: "kr"
					},
					NPR: {
						displayName: { other: "Nepalese rupees", one: "Nepalese rupee" },
						symbol: "NPR",
						narrow: "Rs"
					},
					NZD: {
						displayName: {
							other: "New Zealand dollars",
							one: "New Zealand dollar"
						},
						symbol: "NZ$",
						narrow: "$"
					},
					OMR: {
						displayName: { other: "Omani rials", one: "Omani rial" },
						symbol: "OMR",
						narrow: "OMR"
					},
					PAB: {
						displayName: {
							other: "Panamanian balboas",
							one: "Panamanian balboa"
						},
						symbol: "PAB",
						narrow: "PAB"
					},
					PEI: {
						displayName: { other: "Peruvian intis", one: "Peruvian inti" },
						symbol: "PEI",
						narrow: "PEI"
					},
					PEN: {
						displayName: { other: "Peruvian soles", one: "Peruvian sol" },
						symbol: "PEN",
						narrow: "PEN"
					},
					PES: {
						displayName: {
							other: "Peruvian soles (1863–1965)",
							one: "Peruvian sol (1863–1965)"
						},
						symbol: "PES",
						narrow: "PES"
					},
					PGK: {
						displayName: { other: "Papua New Guinean kina" },
						symbol: "PGK",
						narrow: "PGK"
					},
					PHP: {
						displayName: { other: "Philippine pisos", one: "Philippine piso" },
						symbol: "₱",
						narrow: "₱"
					},
					PKR: {
						displayName: { other: "Pakistani rupees", one: "Pakistani rupee" },
						symbol: "PKR",
						narrow: "Rs"
					},
					PLN: {
						displayName: { other: "Polish zlotys", one: "Polish zloty" },
						symbol: "PLN",
						narrow: "zł"
					},
					PLZ: {
						displayName: {
							other: "Polish zlotys (PLZ)",
							one: "Polish zloty (PLZ)"
						},
						symbol: "PLZ",
						narrow: "PLZ"
					},
					PTE: {
						displayName: {
							other: "Portuguese escudos",
							one: "Portuguese escudo"
						},
						symbol: "PTE",
						narrow: "PTE"
					},
					PYG: {
						displayName: {
							other: "Paraguayan guaranis",
							one: "Paraguayan guarani"
						},
						symbol: "PYG",
						narrow: "₲"
					},
					QAR: {
						displayName: { other: "Qatari rials", one: "Qatari rial" },
						symbol: "QAR",
						narrow: "QAR"
					},
					RHD: {
						displayName: {
							other: "Rhodesian dollars",
							one: "Rhodesian dollar"
						},
						symbol: "RHD",
						narrow: "RHD"
					},
					ROL: {
						displayName: {
							other: "Romanian Lei (1952–2006)",
							one: "Romanian leu (1952–2006)"
						},
						symbol: "ROL",
						narrow: "ROL"
					},
					RON: {
						displayName: { other: "Romanian lei", one: "Romanian leu" },
						symbol: "RON",
						narrow: "lei"
					},
					RSD: {
						displayName: { other: "Serbian dinars", one: "Serbian dinar" },
						symbol: "RSD",
						narrow: "RSD"
					},
					RUB: {
						displayName: { other: "Russian rubles", one: "Russian ruble" },
						symbol: "RUB",
						narrow: "₽"
					},
					RUR: {
						displayName: {
							other: "Russian rubles (1991–1998)",
							one: "Russian ruble (1991–1998)"
						},
						symbol: "RUR",
						narrow: "р."
					},
					RWF: {
						displayName: { other: "Rwandan francs", one: "Rwandan franc" },
						symbol: "RWF",
						narrow: "RF"
					},
					SAR: {
						displayName: { other: "Saudi riyals", one: "Saudi riyal" },
						symbol: "SAR",
						narrow: "SAR"
					},
					SBD: {
						displayName: {
							other: "Solomon Islands dollars",
							one: "Solomon Islands dollar"
						},
						symbol: "SBD",
						narrow: "$"
					},
					SCR: {
						displayName: {
							other: "Seychellois rupees",
							one: "Seychellois rupee"
						},
						symbol: "SCR",
						narrow: "SCR"
					},
					SDD: {
						displayName: {
							other: "Sudanese dinars (1992–2007)",
							one: "Sudanese dinar (1992–2007)"
						},
						symbol: "SDD",
						narrow: "SDD"
					},
					SDG: {
						displayName: { other: "Sudanese pounds", one: "Sudanese pound" },
						symbol: "SDG",
						narrow: "SDG"
					},
					SDP: {
						displayName: {
							other: "Sudanese pounds (1957–1998)",
							one: "Sudanese pound (1957–1998)"
						},
						symbol: "SDP",
						narrow: "SDP"
					},
					SEK: {
						displayName: { other: "Swedish kronor", one: "Swedish krona" },
						symbol: "SEK",
						narrow: "kr"
					},
					SGD: {
						displayName: {
							other: "Singapore dollars",
							one: "Singapore dollar"
						},
						symbol: "SGD",
						narrow: "$"
					},
					SHP: {
						displayName: {
							other: "St. Helena pounds",
							one: "St. Helena pound"
						},
						symbol: "SHP",
						narrow: "£"
					},
					SIT: {
						displayName: { other: "Slovenian tolars", one: "Slovenian tolar" },
						symbol: "SIT",
						narrow: "SIT"
					},
					SKK: {
						displayName: { other: "Slovak korunas", one: "Slovak koruna" },
						symbol: "SKK",
						narrow: "SKK"
					},
					SLL: {
						displayName: {
							other: "Sierra Leonean leones",
							one: "Sierra Leonean leone"
						},
						symbol: "SLL",
						narrow: "SLL"
					},
					SOS: {
						displayName: { other: "Somali shillings", one: "Somali shilling" },
						symbol: "SOS",
						narrow: "SOS"
					},
					SRD: {
						displayName: {
							other: "Surinamese dollars",
							one: "Surinamese dollar"
						},
						symbol: "SRD",
						narrow: "$"
					},
					SRG: {
						displayName: {
							other: "Surinamese guilders",
							one: "Surinamese guilder"
						},
						symbol: "SRG",
						narrow: "SRG"
					},
					SSP: {
						displayName: {
							other: "South Sudanese pounds",
							one: "South Sudanese pound"
						},
						symbol: "SSP",
						narrow: "£"
					},
					STD: {
						displayName: {
							other: "São Tomé & Príncipe dobras (1977–2017)",
							one: "São Tomé & Príncipe dobra (1977–2017)"
						},
						symbol: "STD",
						narrow: "STD"
					},
					STN: {
						displayName: {
							other: "São Tomé & Príncipe dobras",
							one: "São Tomé & Príncipe dobra"
						},
						symbol: "STN",
						narrow: "Db"
					},
					SUR: {
						displayName: { other: "Soviet roubles", one: "Soviet rouble" },
						symbol: "SUR",
						narrow: "SUR"
					},
					SVC: {
						displayName: {
							other: "Salvadoran colones",
							one: "Salvadoran colón"
						},
						symbol: "SVC",
						narrow: "SVC"
					},
					SYP: {
						displayName: { other: "Syrian pounds", one: "Syrian pound" },
						symbol: "SYP",
						narrow: "£"
					},
					SZL: {
						displayName: { other: "Swazi emalangeni", one: "Swazi lilangeni" },
						symbol: "SZL",
						narrow: "SZL"
					},
					THB: {
						displayName: { other: "Thai baht" },
						symbol: "THB",
						narrow: "฿"
					},
					TJR: {
						displayName: {
							other: "Tajikistani rubles",
							one: "Tajikistani ruble"
						},
						symbol: "TJR",
						narrow: "TJR"
					},
					TJS: {
						displayName: {
							other: "Tajikistani somonis",
							one: "Tajikistani somoni"
						},
						symbol: "TJS",
						narrow: "TJS"
					},
					TMM: {
						displayName: { other: "Turkmenistani manat (1993–2009)" },
						symbol: "TMM",
						narrow: "TMM"
					},
					TMT: {
						displayName: { other: "Turkmenistani manat" },
						symbol: "TMT",
						narrow: "TMT"
					},
					TND: {
						displayName: { other: "Tunisian dinars", one: "Tunisian dinar" },
						symbol: "TND",
						narrow: "TND"
					},
					TOP: {
						displayName: { other: "Tongan paʻanga" },
						symbol: "TOP",
						narrow: "T$"
					},
					TPE: {
						displayName: { other: "Timorese escudos", one: "Timorese escudo" },
						symbol: "TPE",
						narrow: "TPE"
					},
					TRL: {
						displayName: {
							other: "Turkish Lira (1922–2005)",
							one: "Turkish lira (1922–2005)"
						},
						symbol: "TRL",
						narrow: "TRL"
					},
					TRY: {
						displayName: { other: "Turkish Lira", one: "Turkish lira" },
						symbol: "TRY",
						narrow: "₺"
					},
					TTD: {
						displayName: {
							other: "Trinidad & Tobago dollars",
							one: "Trinidad & Tobago dollar"
						},
						symbol: "TTD",
						narrow: "$"
					},
					TWD: {
						displayName: {
							other: "New Taiwan dollars",
							one: "New Taiwan dollar"
						},
						symbol: "NT$",
						narrow: "$"
					},
					TZS: {
						displayName: {
							other: "Tanzanian shillings",
							one: "Tanzanian shilling"
						},
						symbol: "TZS",
						narrow: "TZS"
					},
					UAH: {
						displayName: {
							other: "Ukrainian hryvnias",
							one: "Ukrainian hryvnia"
						},
						symbol: "UAH",
						narrow: "₴"
					},
					UAK: {
						displayName: {
							other: "Ukrainian karbovantsiv",
							one: "Ukrainian karbovanets"
						},
						symbol: "UAK",
						narrow: "UAK"
					},
					UGS: {
						displayName: {
							other: "Ugandan shillings (1966–1987)",
							one: "Ugandan shilling (1966–1987)"
						},
						symbol: "UGS",
						narrow: "UGS"
					},
					UGX: {
						displayName: {
							other: "Ugandan shillings",
							one: "Ugandan shilling"
						},
						symbol: "UGX",
						narrow: "UGX"
					},
					USD: {
						displayName: { other: "US dollars", one: "US dollar" },
						symbol: "$",
						narrow: "$"
					},
					USN: {
						displayName: {
							other: "US dollars (next day)",
							one: "US dollar (next day)"
						},
						symbol: "USN",
						narrow: "USN"
					},
					USS: {
						displayName: {
							other: "US dollars (same day)",
							one: "US dollar (same day)"
						},
						symbol: "USS",
						narrow: "USS"
					},
					UYI: {
						displayName: {
							other: "Uruguayan pesos (indexed units)",
							one: "Uruguayan peso (indexed units)"
						},
						symbol: "UYI",
						narrow: "UYI"
					},
					UYP: {
						displayName: {
							other: "Uruguayan pesos (1975–1993)",
							one: "Uruguayan peso (1975–1993)"
						},
						symbol: "UYP",
						narrow: "UYP"
					},
					UYU: {
						displayName: { other: "Uruguayan pesos", one: "Uruguayan peso" },
						symbol: "UYU",
						narrow: "$"
					},
					UYW: {
						displayName: {
							other: "Uruguayan nominal wage index units",
							one: "Uruguayan nominal wage index unit"
						},
						symbol: "UYW",
						narrow: "UYW"
					},
					UZS: {
						displayName: { other: "Uzbekistani som" },
						symbol: "UZS",
						narrow: "UZS"
					},
					VEB: {
						displayName: {
							other: "Venezuelan bolívars (1871–2008)",
							one: "Venezuelan bolívar (1871–2008)"
						},
						symbol: "VEB",
						narrow: "VEB"
					},
					VEF: {
						displayName: {
							other: "Venezuelan bolívars (2008–2018)",
							one: "Venezuelan bolívar (2008–2018)"
						},
						symbol: "VEF",
						narrow: "Bs"
					},
					VES: {
						displayName: {
							other: "Venezuelan bolívars",
							one: "Venezuelan bolívar"
						},
						symbol: "VES",
						narrow: "VES"
					},
					VND: {
						displayName: { other: "Vietnamese dong" },
						symbol: "₫",
						narrow: "₫"
					},
					VNN: {
						displayName: { other: "Vietnamese dong (1978–1985)" },
						symbol: "VNN",
						narrow: "VNN"
					},
					VUV: {
						displayName: { other: "Vanuatu vatus", one: "Vanuatu vatu" },
						symbol: "VUV",
						narrow: "VUV"
					},
					WST: {
						displayName: { other: "Samoan tala" },
						symbol: "WST",
						narrow: "WST"
					},
					XAF: {
						displayName: {
							other: "Central African CFA francs",
							one: "Central African CFA franc"
						},
						symbol: "FCFA",
						narrow: "FCFA"
					},
					XAG: {
						displayName: {
							other: "troy ounces of silver",
							one: "troy ounce of silver"
						},
						symbol: "XAG",
						narrow: "XAG"
					},
					XAU: {
						displayName: {
							other: "troy ounces of gold",
							one: "troy ounce of gold"
						},
						symbol: "XAU",
						narrow: "XAU"
					},
					XBA: {
						displayName: {
							other: "European composite units",
							one: "European composite unit"
						},
						symbol: "XBA",
						narrow: "XBA"
					},
					XBB: {
						displayName: {
							other: "European monetary units",
							one: "European monetary unit"
						},
						symbol: "XBB",
						narrow: "XBB"
					},
					XBC: {
						displayName: {
							other: "European units of account (XBC)",
							one: "European unit of account (XBC)"
						},
						symbol: "XBC",
						narrow: "XBC"
					},
					XBD: {
						displayName: {
							other: "European units of account (XBD)",
							one: "European unit of account (XBD)"
						},
						symbol: "XBD",
						narrow: "XBD"
					},
					XCD: {
						displayName: {
							other: "East Caribbean dollars",
							one: "East Caribbean dollar"
						},
						symbol: "EC$",
						narrow: "$"
					},
					XDR: {
						displayName: { other: "special drawing rights" },
						symbol: "XDR",
						narrow: "XDR"
					},
					XEU: {
						displayName: {
							other: "European currency units",
							one: "European currency unit"
						},
						symbol: "XEU",
						narrow: "XEU"
					},
					XFO: {
						displayName: {
							other: "French gold francs",
							one: "French gold franc"
						},
						symbol: "XFO",
						narrow: "XFO"
					},
					XFU: {
						displayName: {
							other: "French UIC-francs",
							one: "French UIC-franc"
						},
						symbol: "XFU",
						narrow: "XFU"
					},
					XOF: {
						displayName: {
							other: "West African CFA francs",
							one: "West African CFA franc"
						},
						symbol: "F CFA",
						narrow: "F CFA"
					},
					XPD: {
						displayName: {
							other: "troy ounces of palladium",
							one: "troy ounce of palladium"
						},
						symbol: "XPD",
						narrow: "XPD"
					},
					XPF: {
						displayName: { other: "CFP francs", one: "CFP franc" },
						symbol: "CFPF",
						narrow: "CFPF"
					},
					XPT: {
						displayName: {
							other: "troy ounces of platinum",
							one: "troy ounce of platinum"
						},
						symbol: "XPT",
						narrow: "XPT"
					},
					XRE: {
						displayName: {
							other: "RINET Funds units",
							one: "RINET Funds unit"
						},
						symbol: "XRE",
						narrow: "XRE"
					},
					XSU: {
						displayName: { other: "Sucres", one: "Sucre" },
						symbol: "XSU",
						narrow: "XSU"
					},
					XTS: {
						displayName: {
							other: "Testing Currency units",
							one: "Testing Currency unit"
						},
						symbol: "XTS",
						narrow: "XTS"
					},
					XUA: {
						displayName: {
							other: "ADB units of account",
							one: "ADB unit of account"
						},
						symbol: "XUA",
						narrow: "XUA"
					},
					XXX: {
						displayName: {
							other: "(unknown currency)",
							one: "(unknown unit of currency)"
						},
						symbol: "¤",
						narrow: "¤"
					},
					YDD: {
						displayName: { other: "Yemeni dinars", one: "Yemeni dinar" },
						symbol: "YDD",
						narrow: "YDD"
					},
					YER: {
						displayName: { other: "Yemeni rials", one: "Yemeni rial" },
						symbol: "YER",
						narrow: "YER"
					},
					YUD: {
						displayName: {
							other: "Yugoslavian hard dinars (1966–1990)",
							one: "Yugoslavian hard dinar (1966–1990)"
						},
						symbol: "YUD",
						narrow: "YUD"
					},
					YUM: {
						displayName: {
							other: "Yugoslavian new dinars (1994–2002)",
							one: "Yugoslavian new dinar (1994–2002)"
						},
						symbol: "YUM",
						narrow: "YUM"
					},
					YUN: {
						displayName: {
							other: "Yugoslavian convertible dinars (1990–1992)",
							one: "Yugoslavian convertible dinar (1990–1992)"
						},
						symbol: "YUN",
						narrow: "YUN"
					},
					YUR: {
						displayName: {
							other: "Yugoslavian reformed dinars (1992–1993)",
							one: "Yugoslavian reformed dinar (1992–1993)"
						},
						symbol: "YUR",
						narrow: "YUR"
					},
					ZAL: {
						displayName: {
							other: "South African rands (financial)",
							one: "South African rand (financial)"
						},
						symbol: "ZAL",
						narrow: "ZAL"
					},
					ZAR: {
						displayName: { other: "South African rand" },
						symbol: "ZAR",
						narrow: "R"
					},
					ZMK: {
						displayName: {
							other: "Zambian kwachas (1968–2012)",
							one: "Zambian kwacha (1968–2012)"
						},
						symbol: "ZMK",
						narrow: "ZMK"
					},
					ZMW: {
						displayName: { other: "Zambian kwachas", one: "Zambian kwacha" },
						symbol: "ZMW",
						narrow: "ZK"
					},
					ZRN: {
						displayName: {
							other: "Zairean new zaires (1993–1998)",
							one: "Zairean new zaire (1993–1998)"
						},
						symbol: "ZRN",
						narrow: "ZRN"
					},
					ZRZ: {
						displayName: {
							other: "Zairean zaires (1971–1993)",
							one: "Zairean zaire (1971–1993)"
						},
						symbol: "ZRZ",
						narrow: "ZRZ"
					},
					ZWD: {
						displayName: {
							other: "Zimbabwean dollars (1980–2008)",
							one: "Zimbabwean dollar (1980–2008)"
						},
						symbol: "ZWD",
						narrow: "ZWD"
					},
					ZWL: {
						displayName: {
							other: "Zimbabwean dollars (2009)",
							one: "Zimbabwean dollar (2009)"
						},
						symbol: "ZWL",
						narrow: "ZWL"
					},
					ZWR: {
						displayName: {
							other: "Zimbabwean dollars (2008)",
							one: "Zimbabwean dollar (2008)"
						},
						symbol: "ZWR",
						narrow: "ZWR"
					}
				},
				numbers: {
					nu: ["latn"],
					symbols: {
						latn: {
							decimal: ".",
							group: ",",
							list: ";",
							percentSign: "%",
							plusSign: "+",
							minusSign: "-",
							approximatelySign: "~",
							exponential: "E",
							superscriptingExponent: "×",
							perMille: "‰",
							infinity: "∞",
							nan: "NaN",
							timeSeparator: ":"
						}
					},
					percent: { latn: "#,##0%" },
					decimal: {
						latn: {
							standard: "#,##0.###",
							"long": {
								1000: { other: "0 thousand" },
								10000: { other: "00 thousand" },
								100000: { other: "000 thousand" },
								1000000: { other: "0 million" },
								10000000: { other: "00 million" },
								100000000: { other: "000 million" },
								1000000000: { other: "0 billion" },
								10000000000: { other: "00 billion" },
								100000000000: { other: "000 billion" },
								1000000000000: { other: "0 trillion" },
								10000000000000: { other: "00 trillion" },
								100000000000000: { other: "000 trillion" }
							},
							"short": {
								1000: { other: "0K" },
								10000: { other: "00K" },
								100000: { other: "000K" },
								1000000: { other: "0M" },
								10000000: { other: "00M" },
								100000000: { other: "000M" },
								1000000000: { other: "0B" },
								10000000000: { other: "00B" },
								100000000000: { other: "000B" },
								1000000000000: { other: "0T" },
								10000000000000: { other: "00T" },
								100000000000000: { other: "000T" }
							}
						}
					},
					currency: {
						latn: {
							currencySpacing: {
								beforeInsertBetween: " ",
								afterInsertBetween: " "
							},
							standard: "¤#,##0.00",
							accounting: "¤#,##0.00;(¤#,##0.00)",
							unitPattern: "{0} {1}",
							"short": {
								1000: { other: "¤0K" },
								10000: { other: "¤00K" },
								100000: { other: "¤000K" },
								1000000: { other: "¤0M" },
								10000000: { other: "¤00M" },
								100000000: { other: "¤000M" },
								1000000000: { other: "¤0B" },
								10000000000: { other: "¤00B" },
								100000000000: { other: "¤000B" },
								1000000000000: { other: "¤0T" },
								10000000000000: { other: "¤00T" },
								100000000000000: { other: "¤000T" }
							}
						}
					}
				},
				nu: ["latn"]
			},
			locale: "en"
		});
	}

	if (
		Intl.DateTimeFormat &&
		typeof Intl.DateTimeFormat.__addLocaleData === "function"
	) {
		Intl.DateTimeFormat.__addLocaleData({
			data: {
				am: "AM",
				pm: "PM",
				weekday: {
					narrow: ["S", "M", "T", "W", "T", "F", "S"],
					"short": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
					"long": [
						"Sunday",
						"Monday",
						"Tuesday",
						"Wednesday",
						"Thursday",
						"Friday",
						"Saturday"
					]
				},
				era: {
					narrow: { BC: "B", AD: "A" },
					"short": { BC: "BC", AD: "AD" },
					"long": { BC: "Before Christ", AD: "Anno Domini" }
				},
				month: {
					narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
					"short": [
						"Jan",
						"Feb",
						"Mar",
						"Apr",
						"May",
						"Jun",
						"Jul",
						"Aug",
						"Sep",
						"Oct",
						"Nov",
						"Dec"
					],
					"long": [
						"January",
						"February",
						"March",
						"April",
						"May",
						"June",
						"July",
						"August",
						"September",
						"October",
						"November",
						"December"
					]
				},
				timeZoneName: {
					"America/Rio_Branco": {
						"long": ["Acre Standard Time", "Acre Summer Time"]
					},
					"Asia/Kabul": { "long": ["Afghanistan Time", "Afghanistan Time"] },
					"Africa/Maputo": {
						"long": ["Central Africa Time", "Central Africa Time"]
					},
					"Africa/Bujumbura": {
						"long": ["Central Africa Time", "Central Africa Time"]
					},
					"Africa/Gaborone": {
						"long": ["Central Africa Time", "Central Africa Time"]
					},
					"Africa/Lubumbashi": {
						"long": ["Central Africa Time", "Central Africa Time"]
					},
					"Africa/Blantyre": {
						"long": ["Central Africa Time", "Central Africa Time"]
					},
					"Africa/Kigali": {
						"long": ["Central Africa Time", "Central Africa Time"]
					},
					"Africa/Lusaka": {
						"long": ["Central Africa Time", "Central Africa Time"]
					},
					"Africa/Harare": {
						"long": ["Central Africa Time", "Central Africa Time"]
					},
					"Africa/Nairobi": { "long": ["East Africa Time", "East Africa Time"] },
					"Africa/Djibouti": { "long": ["East Africa Time", "East Africa Time"] },
					"Africa/Asmera": { "long": ["East Africa Time", "East Africa Time"] },
					"Africa/Addis_Ababa": {
						"long": ["East Africa Time", "East Africa Time"]
					},
					"Indian/Comoro": { "long": ["East Africa Time", "East Africa Time"] },
					"Indian/Antananarivo": {
						"long": ["East Africa Time", "East Africa Time"]
					},
					"Africa/Mogadishu": {
						"long": ["East Africa Time", "East Africa Time"]
					},
					"Africa/Dar_es_Salaam": {
						"long": ["East Africa Time", "East Africa Time"]
					},
					"Africa/Kampala": { "long": ["East Africa Time", "East Africa Time"] },
					"Indian/Mayotte": { "long": ["East Africa Time", "East Africa Time"] },
					"Africa/Johannesburg": {
						"long": ["South Africa Standard Time", "South Africa Standard Time"]
					},
					"Africa/Maseru": {
						"long": ["South Africa Standard Time", "South Africa Standard Time"]
					},
					"Africa/Mbabane": {
						"long": ["South Africa Standard Time", "South Africa Standard Time"]
					},
					"Africa/Lagos": {
						"long": ["West Africa Standard Time", "West Africa Summer Time"]
					},
					"Africa/Luanda": {
						"long": ["West Africa Standard Time", "West Africa Summer Time"]
					},
					"Africa/Porto-Novo": {
						"long": ["West Africa Standard Time", "West Africa Summer Time"]
					},
					"Africa/Kinshasa": {
						"long": ["West Africa Standard Time", "West Africa Summer Time"]
					},
					"Africa/Bangui": {
						"long": ["West Africa Standard Time", "West Africa Summer Time"]
					},
					"Africa/Brazzaville": {
						"long": ["West Africa Standard Time", "West Africa Summer Time"]
					},
					"Africa/Douala": {
						"long": ["West Africa Standard Time", "West Africa Summer Time"]
					},
					"Africa/Libreville": {
						"long": ["West Africa Standard Time", "West Africa Summer Time"]
					},
					"Africa/Malabo": {
						"long": ["West Africa Standard Time", "West Africa Summer Time"]
					},
					"Africa/Niamey": {
						"long": ["West Africa Standard Time", "West Africa Summer Time"]
					},
					"Africa/Ndjamena": {
						"long": ["West Africa Standard Time", "West Africa Summer Time"]
					},
					"Asia/Aqtobe": {
						"long": ["West Kazakhstan Time", "West Kazakhstan Time"]
					},
					"America/Juneau": {
						"long": ["Alaska Standard Time", "Alaska Daylight Time"],
						"short": ["AKST", "AKDT"]
					},
					"Asia/Almaty": {
						"long": ["East Kazakhstan Time", "East Kazakhstan Time"]
					},
					"America/Manaus": {
						"long": ["Amazon Standard Time", "Amazon Summer Time"]
					},
					"America/Chicago": {
						"long": ["Central Standard Time", "Central Daylight Time"],
						"short": ["CST", "CDT"]
					},
					"America/Belize": {
						"long": ["Central Standard Time", "Central Daylight Time"],
						"short": ["CST", "CDT"]
					},
					"America/Winnipeg": {
						"long": ["Central Standard Time", "Central Daylight Time"],
						"short": ["CST", "CDT"]
					},
					"America/Costa_Rica": {
						"long": ["Central Standard Time", "Central Daylight Time"],
						"short": ["CST", "CDT"]
					},
					"America/Guatemala": {
						"long": ["Central Standard Time", "Central Daylight Time"],
						"short": ["CST", "CDT"]
					},
					"America/Tegucigalpa": {
						"long": ["Central Standard Time", "Central Daylight Time"],
						"short": ["CST", "CDT"]
					},
					"America/Mexico_City": {
						"long": ["Central Standard Time", "Central Daylight Time"],
						"short": ["CST", "CDT"]
					},
					"America/El_Salvador": {
						"long": ["Central Standard Time", "Central Daylight Time"],
						"short": ["CST", "CDT"]
					},
					"America/New_York": {
						"long": ["Eastern Standard Time", "Eastern Daylight Time"],
						"short": ["EST", "EDT"]
					},
					"America/Nassau": {
						"long": ["Eastern Standard Time", "Eastern Daylight Time"],
						"short": ["EST", "EDT"]
					},
					"America/Toronto": {
						"long": ["Eastern Standard Time", "Eastern Daylight Time"],
						"short": ["EST", "EDT"]
					},
					"America/Port-au-Prince": {
						"long": ["Eastern Standard Time", "Eastern Daylight Time"],
						"short": ["EST", "EDT"]
					},
					"America/Jamaica": {
						"long": ["Eastern Standard Time", "Eastern Daylight Time"],
						"short": ["EST", "EDT"]
					},
					"America/Cayman": {
						"long": ["Eastern Standard Time", "Eastern Daylight Time"],
						"short": ["EST", "EDT"]
					},
					"America/Panama": {
						"long": ["Eastern Standard Time", "Eastern Daylight Time"],
						"short": ["EST", "EDT"]
					},
					"America/Denver": {
						"long": ["Mountain Standard Time", "Mountain Daylight Time"],
						"short": ["MST", "MDT"]
					},
					"America/Edmonton": {
						"long": ["Mountain Standard Time", "Mountain Daylight Time"],
						"short": ["MST", "MDT"]
					},
					"America/Hermosillo": {
						"long": ["Mountain Standard Time", "Mountain Daylight Time"],
						"short": ["MST", "MDT"]
					},
					"America/Los_Angeles": {
						"long": ["Pacific Standard Time", "Pacific Daylight Time"],
						"short": ["PST", "PDT"]
					},
					"America/Vancouver": {
						"long": ["Pacific Standard Time", "Pacific Daylight Time"],
						"short": ["PST", "PDT"]
					},
					"America/Tijuana": {
						"long": ["Pacific Standard Time", "Pacific Daylight Time"],
						"short": ["PST", "PDT"]
					},
					"Asia/Anadyr": {
						"long": ["Anadyr Standard Time", "Anadyr Summer Time"]
					},
					"Pacific/Apia": {
						"long": ["Apia Standard Time", "Apia Daylight Time"]
					},
					"Asia/Riyadh": {
						"long": ["Arabian Standard Time", "Arabian Daylight Time"]
					},
					"Asia/Bahrain": {
						"long": ["Arabian Standard Time", "Arabian Daylight Time"]
					},
					"Asia/Baghdad": {
						"long": ["Arabian Standard Time", "Arabian Daylight Time"]
					},
					"Asia/Kuwait": {
						"long": ["Arabian Standard Time", "Arabian Daylight Time"]
					},
					"Asia/Qatar": {
						"long": ["Arabian Standard Time", "Arabian Daylight Time"]
					},
					"Asia/Aden": {
						"long": ["Arabian Standard Time", "Arabian Daylight Time"]
					},
					"America/Buenos_Aires": {
						"long": ["Argentina Standard Time", "Argentina Summer Time"]
					},
					"America/Argentina/San_Luis": {
						"long": [
							"Western Argentina Standard Time",
							"Western Argentina Summer Time"
						]
					},
					"Asia/Ashgabat": {
						"long": ["Turkmenistan Standard Time", "Turkmenistan Summer Time"]
					},
					"America/Halifax": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/Antigua": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/Anguilla": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/Aruba": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/Barbados": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"Atlantic/Bermuda": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/Kralendijk": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/Curacao": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/Dominica": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/Grenada": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/Thule": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/Guadeloupe": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/St_Kitts": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/St_Lucia": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/Marigot": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/Martinique": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/Montserrat": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/Puerto_Rico": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/Lower_Princes": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/Port_of_Spain": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/St_Vincent": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/Tortola": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"America/St_Thomas": {
						"long": ["Atlantic Standard Time", "Atlantic Daylight Time"],
						"short": ["AST", "ADT"]
					},
					"Australia/Adelaide": {
						"long": [
							"Australian Central Standard Time",
							"Australian Central Daylight Time"
						]
					},
					"Australia/Eucla": {
						"long": [
							"Australian Central Western Standard Time",
							"Australian Central Western Daylight Time"
						]
					},
					"Australia/Sydney": {
						"long": [
							"Australian Eastern Standard Time",
							"Australian Eastern Daylight Time"
						]
					},
					"Australia/Perth": {
						"long": [
							"Australian Western Standard Time",
							"Australian Western Daylight Time"
						]
					},
					"Atlantic/Azores": {
						"long": ["Azores Standard Time", "Azores Summer Time"]
					},
					"Asia/Thimphu": { "long": ["Bhutan Time", "Bhutan Time"] },
					"America/La_Paz": { "long": ["Bolivia Time", "Bolivia Time"] },
					"Asia/Kuching": { "long": ["Malaysia Time", "Malaysia Time"] },
					"America/Sao_Paulo": {
						"long": ["Brasilia Standard Time", "Brasilia Summer Time"]
					},
					"Europe/London": {
						"long": ["Greenwich Mean Time", "Greenwich Mean Time"],
						"short": ["GMT", "GMT"]
					},
					"Asia/Brunei": {
						"long": ["Brunei Darussalam Time", "Brunei Darussalam Time"]
					},
					"Atlantic/Cape_Verde": {
						"long": ["Cape Verde Standard Time", "Cape Verde Summer Time"]
					},
					"Antarctica/Casey": { "long": ["Casey Time", "Casey Time"] },
					"Pacific/Saipan": {
						"long": ["North Mariana Islands Time", "North Mariana Islands Time"]
					},
					"Pacific/Guam": {
						"long": ["Guam Standard Time", "Guam Standard Time"]
					},
					"Pacific/Chatham": {
						"long": ["Chatham Standard Time", "Chatham Daylight Time"]
					},
					"America/Santiago": {
						"long": ["Chile Standard Time", "Chile Summer Time"]
					},
					"Asia/Shanghai": {
						"long": ["China Standard Time", "China Daylight Time"]
					},
					"Asia/Choibalsan": {
						"long": ["Choibalsan Standard Time", "Choibalsan Summer Time"]
					},
					"Indian/Christmas": {
						"long": ["Christmas Island Time", "Christmas Island Time"]
					},
					"Indian/Cocos": {
						"long": ["Cocos Islands Time", "Cocos Islands Time"]
					},
					"America/Bogota": {
						"long": ["Colombia Standard Time", "Colombia Summer Time"]
					},
					"Pacific/Rarotonga": {
						"long": [
							"Cook Islands Standard Time",
							"Cook Islands Half Summer Time"
						]
					},
					"America/Havana": {
						"long": ["Cuba Standard Time", "Cuba Daylight Time"]
					},
					"Antarctica/Davis": { "long": ["Davis Time", "Davis Time"] },
					"Antarctica/DumontDUrville": {
						"long": ["Dumont-d’Urville Time", "Dumont-d’Urville Time"]
					},
					"Asia/Dushanbe": { "long": ["Tajikistan Time", "Tajikistan Time"] },
					"America/Paramaribo": { "long": ["Suriname Time", "Suriname Time"] },
					"Asia/Dili": { "long": ["East Timor Time", "East Timor Time"] },
					"Pacific/Easter": {
						"long": ["Easter Island Standard Time", "Easter Island Summer Time"]
					},
					"America/Guayaquil": { "long": ["Ecuador Time", "Ecuador Time"] },
					"Europe/Paris": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Andorra": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Tirane": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Vienna": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Sarajevo": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Brussels": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Zurich": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Prague": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Berlin": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Copenhagen": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Madrid": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Gibraltar": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Zagreb": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Budapest": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Rome": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Vaduz": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Luxembourg": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Monaco": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Podgorica": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Skopje": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Malta": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Amsterdam": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Oslo": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Warsaw": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Belgrade": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Stockholm": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Ljubljana": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Arctic/Longyearbyen": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Bratislava": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/San_Marino": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Africa/Tunis": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Vatican": {
						"long": [
							"Central European Standard Time",
							"Central European Summer Time"
						]
					},
					"Europe/Bucharest": {
						"long": [
							"Eastern European Standard Time",
							"Eastern European Summer Time"
						]
					},
					"Europe/Mariehamn": {
						"long": [
							"Eastern European Standard Time",
							"Eastern European Summer Time"
						]
					},
					"Europe/Sofia": {
						"long": [
							"Eastern European Standard Time",
							"Eastern European Summer Time"
						]
					},
					"Asia/Nicosia": {
						"long": [
							"Eastern European Standard Time",
							"Eastern European Summer Time"
						]
					},
					"Africa/Cairo": {
						"long": [
							"Eastern European Standard Time",
							"Eastern European Summer Time"
						]
					},
					"Europe/Helsinki": {
						"long": [
							"Eastern European Standard Time",
							"Eastern European Summer Time"
						]
					},
					"Europe/Athens": {
						"long": [
							"Eastern European Standard Time",
							"Eastern European Summer Time"
						]
					},
					"Asia/Amman": {
						"long": [
							"Eastern European Standard Time",
							"Eastern European Summer Time"
						]
					},
					"Asia/Beirut": {
						"long": [
							"Eastern European Standard Time",
							"Eastern European Summer Time"
						]
					},
					"Asia/Damascus": {
						"long": [
							"Eastern European Standard Time",
							"Eastern European Summer Time"
						]
					},
					"Europe/Minsk": {
						"long": [
							"Further-eastern European Time",
							"Further-eastern European Time"
						]
					},
					"Europe/Kaliningrad": {
						"long": [
							"Further-eastern European Time",
							"Further-eastern European Time"
						]
					},
					"Atlantic/Canary": {
						"long": [
							"Western European Standard Time",
							"Western European Summer Time"
						]
					},
					"Atlantic/Faeroe": {
						"long": [
							"Western European Standard Time",
							"Western European Summer Time"
						]
					},
					"Atlantic/Stanley": {
						"long": [
							"Falkland Islands Standard Time",
							"Falkland Islands Summer Time"
						]
					},
					"Pacific/Fiji": { "long": ["Fiji Standard Time", "Fiji Summer Time"] },
					"America/Cayenne": {
						"long": ["French Guiana Time", "French Guiana Time"]
					},
					"Indian/Kerguelen": {
						"long": [
							"French Southern & Antarctic Time",
							"French Southern & Antarctic Time"
						]
					},
					"Asia/Bishkek": { "long": ["Kyrgyzstan Time", "Kyrgyzstan Time"] },
					"Pacific/Galapagos": { "long": ["Galapagos Time", "Galapagos Time"] },
					"Pacific/Gambier": { "long": ["Gambier Time", "Gambier Time"] },
					"Pacific/Tarawa": {
						"long": ["Gilbert Islands Time", "Gilbert Islands Time"]
					},
					"Atlantic/Reykjavik": {
						"long": ["Greenwich Mean Time", "Greenwich Mean Time"],
						"short": ["GMT", "GMT"]
					},
					"Africa/Ouagadougou": {
						"long": ["Greenwich Mean Time", "Greenwich Mean Time"],
						"short": ["GMT", "GMT"]
					},
					"Africa/Abidjan": {
						"long": ["Greenwich Mean Time", "Greenwich Mean Time"],
						"short": ["GMT", "GMT"]
					},
					"Africa/Accra": {
						"long": ["Greenwich Mean Time", "Greenwich Mean Time"],
						"short": ["GMT", "GMT"]
					},
					"Africa/Banjul": {
						"long": ["Greenwich Mean Time", "Greenwich Mean Time"],
						"short": ["GMT", "GMT"]
					},
					"Africa/Conakry": {
						"long": ["Greenwich Mean Time", "Greenwich Mean Time"],
						"short": ["GMT", "GMT"]
					},
					"Africa/Bamako": {
						"long": ["Greenwich Mean Time", "Greenwich Mean Time"],
						"short": ["GMT", "GMT"]
					},
					"Africa/Nouakchott": {
						"long": ["Greenwich Mean Time", "Greenwich Mean Time"],
						"short": ["GMT", "GMT"]
					},
					"Atlantic/St_Helena": {
						"long": ["Greenwich Mean Time", "Greenwich Mean Time"],
						"short": ["GMT", "GMT"]
					},
					"Africa/Freetown": {
						"long": ["Greenwich Mean Time", "Greenwich Mean Time"],
						"short": ["GMT", "GMT"]
					},
					"Africa/Dakar": {
						"long": ["Greenwich Mean Time", "Greenwich Mean Time"],
						"short": ["GMT", "GMT"]
					},
					"Africa/Lome": {
						"long": ["Greenwich Mean Time", "Greenwich Mean Time"],
						"short": ["GMT", "GMT"]
					},
					"America/Scoresbysund": {
						"long": ["East Greenland Standard Time", "East Greenland Summer Time"]
					},
					"America/Godthab": {
						"long": ["West Greenland Standard Time", "West Greenland Summer Time"]
					},
					"Asia/Dubai": { "long": ["Gulf Standard Time", "Gulf Standard Time"] },
					"Asia/Muscat": { "long": ["Gulf Standard Time", "Gulf Standard Time"] },
					"America/Guyana": { "long": ["Guyana Time", "Guyana Time"] },
					"Pacific/Honolulu": {
						"long": [
							"Hawaii-Aleutian Standard Time",
							"Hawaii-Aleutian Daylight Time"
						],
						"short": ["HAST", "HADT"]
					},
					"Asia/Hong_Kong": {
						"long": ["Hong Kong Standard Time", "Hong Kong Summer Time"]
					},
					"Asia/Hovd": { "long": ["Hovd Standard Time", "Hovd Summer Time"] },
					"Asia/Calcutta": {
						"long": ["India Standard Time", "India Standard Time"]
					},
					"Asia/Colombo": { "long": ["Lanka Time", "Lanka Time"] },
					"Indian/Chagos": { "long": ["Indian Ocean Time", "Indian Ocean Time"] },
					"Asia/Bangkok": { "long": ["Indochina Time", "Indochina Time"] },
					"Asia/Phnom_Penh": { "long": ["Indochina Time", "Indochina Time"] },
					"Asia/Vientiane": { "long": ["Indochina Time", "Indochina Time"] },
					"Asia/Makassar": {
						"long": ["Central Indonesia Time", "Central Indonesia Time"]
					},
					"Asia/Jayapura": {
						"long": ["Eastern Indonesia Time", "Eastern Indonesia Time"]
					},
					"Asia/Jakarta": {
						"long": ["Western Indonesia Time", "Western Indonesia Time"]
					},
					"Asia/Tehran": { "long": ["Iran Standard Time", "Iran Daylight Time"] },
					"Asia/Irkutsk": {
						"long": ["Irkutsk Standard Time", "Irkutsk Summer Time"]
					},
					"Asia/Jerusalem": {
						"long": ["Israel Standard Time", "Israel Daylight Time"]
					},
					"Asia/Tokyo": {
						"long": ["Japan Standard Time", "Japan Daylight Time"]
					},
					"Asia/Kamchatka": {
						"long": [
							"Petropavlovsk-Kamchatski Standard Time",
							"Petropavlovsk-Kamchatski Summer Time"
						]
					},
					"Asia/Karachi": {
						"long": ["Pakistan Standard Time", "Pakistan Summer Time"]
					},
					"Asia/Qyzylorda": {
						"long": ["Qyzylorda Standard Time", "Qyzylorda Summer Time"]
					},
					"Asia/Seoul": {
						"long": ["Korean Standard Time", "Korean Daylight Time"]
					},
					"Pacific/Kosrae": { "long": ["Kosrae Time", "Kosrae Time"] },
					"Asia/Krasnoyarsk": {
						"long": ["Krasnoyarsk Standard Time", "Krasnoyarsk Summer Time"]
					},
					"Europe/Samara": {
						"long": ["Samara Standard Time", "Samara Summer Time"]
					},
					"Pacific/Kiritimati": {
						"long": ["Line Islands Time", "Line Islands Time"]
					},
					"Australia/Lord_Howe": {
						"long": ["Lord Howe Standard Time", "Lord Howe Daylight Time"]
					},
					"Asia/Macau": { "long": ["Macao Standard Time", "Macao Summer Time"] },
					"Antarctica/Macquarie": {
						"long": ["Macquarie Island Time", "Macquarie Island Time"]
					},
					"Asia/Magadan": {
						"long": ["Magadan Standard Time", "Magadan Summer Time"]
					},
					"Indian/Maldives": { "long": ["Maldives Time", "Maldives Time"] },
					"Pacific/Marquesas": { "long": ["Marquesas Time", "Marquesas Time"] },
					"Pacific/Majuro": {
						"long": ["Marshall Islands Time", "Marshall Islands Time"]
					},
					"Indian/Mauritius": {
						"long": ["Mauritius Standard Time", "Mauritius Summer Time"]
					},
					"Antarctica/Mawson": { "long": ["Mawson Time", "Mawson Time"] },
					"America/Santa_Isabel": {
						"long": [
							"Northwest Mexico Standard Time",
							"Northwest Mexico Daylight Time"
						]
					},
					"America/Mazatlan": {
						"long": [
							"Mexican Pacific Standard Time",
							"Mexican Pacific Daylight Time"
						]
					},
					"Asia/Ulaanbaatar": {
						"long": ["Ulaanbaatar Standard Time", "Ulaanbaatar Summer Time"]
					},
					"Europe/Moscow": {
						"long": ["Moscow Standard Time", "Moscow Summer Time"]
					},
					"Asia/Rangoon": { "long": ["Myanmar Time", "Myanmar Time"] },
					"Pacific/Nauru": { "long": ["Nauru Time", "Nauru Time"] },
					"Asia/Katmandu": { "long": ["Nepal Time", "Nepal Time"] },
					"Pacific/Noumea": {
						"long": ["New Caledonia Standard Time", "New Caledonia Summer Time"]
					},
					"Pacific/Auckland": {
						"long": ["New Zealand Standard Time", "New Zealand Daylight Time"]
					},
					"Antarctica/McMurdo": {
						"long": ["New Zealand Standard Time", "New Zealand Daylight Time"]
					},
					"America/St_Johns": {
						"long": ["Newfoundland Standard Time", "Newfoundland Daylight Time"]
					},
					"Pacific/Niue": { "long": ["Niue Time", "Niue Time"] },
					"Pacific/Norfolk": {
						"long": [
							"Norfolk Island Standard Time",
							"Norfolk Island Daylight Time"
						]
					},
					"America/Noronha": {
						"long": [
							"Fernando de Noronha Standard Time",
							"Fernando de Noronha Summer Time"
						]
					},
					"Asia/Novosibirsk": {
						"long": ["Novosibirsk Standard Time", "Novosibirsk Summer Time"]
					},
					"Asia/Omsk": { "long": ["Omsk Standard Time", "Omsk Summer Time"] },
					"Pacific/Palau": { "long": ["Palau Time", "Palau Time"] },
					"Pacific/Port_Moresby": {
						"long": ["Papua New Guinea Time", "Papua New Guinea Time"]
					},
					"America/Asuncion": {
						"long": ["Paraguay Standard Time", "Paraguay Summer Time"]
					},
					"America/Lima": { "long": ["Peru Standard Time", "Peru Summer Time"] },
					"Asia/Manila": {
						"long": ["Philippine Standard Time", "Philippine Summer Time"]
					},
					"Pacific/Enderbury": {
						"long": ["Phoenix Islands Time", "Phoenix Islands Time"]
					},
					"America/Miquelon": {
						"long": [
							"St. Pierre & Miquelon Standard Time",
							"St. Pierre & Miquelon Daylight Time"
						]
					},
					"Pacific/Pitcairn": { "long": ["Pitcairn Time", "Pitcairn Time"] },
					"Pacific/Ponape": { "long": ["Ponape Time", "Ponape Time"] },
					"Asia/Pyongyang": { "long": ["Pyongyang Time", "Pyongyang Time"] },
					"Indian/Reunion": { "long": ["Réunion Time", "Réunion Time"] },
					"Antarctica/Rothera": { "long": ["Rothera Time", "Rothera Time"] },
					"Asia/Sakhalin": {
						"long": ["Sakhalin Standard Time", "Sakhalin Summer Time"]
					},
					"Pacific/Pago_Pago": {
						"long": ["Samoa Standard Time", "Samoa Daylight Time"]
					},
					"Indian/Mahe": { "long": ["Seychelles Time", "Seychelles Time"] },
					"Asia/Singapore": {
						"long": ["Singapore Standard Time", "Singapore Standard Time"]
					},
					"Pacific/Guadalcanal": {
						"long": ["Solomon Islands Time", "Solomon Islands Time"]
					},
					"Atlantic/South_Georgia": {
						"long": ["South Georgia Time", "South Georgia Time"]
					},
					"Asia/Yekaterinburg": {
						"long": ["Yekaterinburg Standard Time", "Yekaterinburg Summer Time"]
					},
					"Antarctica/Syowa": { "long": ["Syowa Time", "Syowa Time"] },
					"Pacific/Tahiti": { "long": ["Tahiti Time", "Tahiti Time"] },
					"Asia/Taipei": {
						"long": ["Taipei Standard Time", "Taipei Daylight Time"]
					},
					"Asia/Tashkent": {
						"long": ["Uzbekistan Standard Time", "Uzbekistan Summer Time"]
					},
					"Pacific/Fakaofo": { "long": ["Tokelau Time", "Tokelau Time"] },
					"Pacific/Tongatapu": {
						"long": ["Tonga Standard Time", "Tonga Summer Time"]
					},
					"Pacific/Truk": { "long": ["Chuuk Time", "Chuuk Time"] },
					"Pacific/Funafuti": { "long": ["Tuvalu Time", "Tuvalu Time"] },
					"America/Montevideo": {
						"long": ["Uruguay Standard Time", "Uruguay Summer Time"]
					},
					"Pacific/Efate": {
						"long": ["Vanuatu Standard Time", "Vanuatu Summer Time"]
					},
					"America/Caracas": { "long": ["Venezuela Time", "Venezuela Time"] },
					"Asia/Vladivostok": {
						"long": ["Vladivostok Standard Time", "Vladivostok Summer Time"]
					},
					"Europe/Volgograd": {
						"long": ["Volgograd Standard Time", "Volgograd Summer Time"]
					},
					"Antarctica/Vostok": { "long": ["Vostok Time", "Vostok Time"] },
					"Pacific/Wake": { "long": ["Wake Island Time", "Wake Island Time"] },
					"Pacific/Wallis": {
						"long": ["Wallis & Futuna Time", "Wallis & Futuna Time"]
					},
					"Asia/Yakutsk": {
						"long": ["Yakutsk Standard Time", "Yakutsk Summer Time"]
					},
					UTC: {
						"long": ["Coordinated Universal Time", "Coordinated Universal Time"],
						"short": ["UTC", "UTC"]
					}
				},
				gmtFormat: "GMT{0}",
				hourFormat: "+HH:mm;-HH:mm",
				dateFormat: {
					full: "EEEE, MMMM d, y",
					"long": "MMMM d, y",
					medium: "MMM d, y",
					"short": "M/d/yy"
				},
				timeFormat: {
					full: "h:mm:ss a zzzz",
					"long": "h:mm:ss a z",
					medium: "h:mm:ss a",
					"short": "h:mm a"
				},
				dateTimeFormat: {
					full: "{1} 'at' {0}",
					"long": "{1} 'at' {0}",
					medium: "{1}, {0}",
					"short": "{1}, {0}"
				},
				formats: {
					gregory: {
						Bh: "h B",
						Bhm: "h:mm B",
						Bhms: "h:mm:ss B",
						d: "d",
						E: "ccc",
						EBhm: "E h:mm B",
						EBhms: "E h:mm:ss B",
						Ed: "d E",
						Ehm: "E h:mm a",
						EHm: "E HH:mm",
						Ehms: "E h:mm:ss a",
						EHms: "E HH:mm:ss",
						Gy: "y G",
						GyMMM: "MMM y G",
						GyMMMd: "MMM d, y G",
						GyMMMEd: "E, MMM d, y G",
						h: "h a",
						H: "HH",
						hm: "h:mm a",
						Hm: "HH:mm",
						hms: "h:mm:ss a",
						Hms: "HH:mm:ss",
						hmsv: "h:mm:ss a v",
						Hmsv: "HH:mm:ss v",
						hmv: "h:mm a v",
						Hmv: "HH:mm v",
						M: "L",
						Md: "M/d",
						MEd: "E, M/d",
						MMM: "LLL",
						MMMd: "MMM d",
						MMMEd: "E, MMM d",
						MMMMd: "MMMM d",
						ms: "mm:ss",
						y: "y",
						yM: "M/y",
						yMd: "M/d/y",
						yMEd: "E, M/d/y",
						yMMM: "MMM y",
						yMMMd: "MMM d, y",
						yMMMEd: "E, MMM d, y",
						yMMMM: "MMMM y",
						"EEEE, MMMM d, y": "EEEE, MMMM d, y",
						"MMMM d, y": "MMMM d, y",
						"MMM d, y": "MMM d, y",
						"M/d/yy": "M/d/yy",
						"h:mm:ss a zzzz": "h:mm:ss a zzzz",
						"h:mm:ss a z": "h:mm:ss a z",
						"h:mm:ss a": "h:mm:ss a",
						"h:mm a": "h:mm a",
						"EEEE, MMMM d, y 'at' h:mm:ss a zzzz":
							"EEEE, MMMM d, y 'at' h:mm:ss a zzzz",
						"MMMM d, y 'at' h:mm:ss a zzzz": "MMMM d, y 'at' h:mm:ss a zzzz",
						"MMM d, y, h:mm:ss a zzzz": "MMM d, y, h:mm:ss a zzzz",
						"M/d/yy, h:mm:ss a zzzz": "M/d/yy, h:mm:ss a zzzz",
						"d, h:mm:ss a zzzz": "d, h:mm:ss a zzzz",
						"E, h:mm:ss a zzzz": "ccc, h:mm:ss a zzzz",
						"Ed, h:mm:ss a zzzz": "d E, h:mm:ss a zzzz",
						"Gy, h:mm:ss a zzzz": "y G, h:mm:ss a zzzz",
						"GyMMM, h:mm:ss a zzzz": "MMM y G, h:mm:ss a zzzz",
						"GyMMMd, h:mm:ss a zzzz": "MMM d, y G, h:mm:ss a zzzz",
						"GyMMMEd, h:mm:ss a zzzz": "E, MMM d, y G, h:mm:ss a zzzz",
						"M, h:mm:ss a zzzz": "L, h:mm:ss a zzzz",
						"Md, h:mm:ss a zzzz": "M/d, h:mm:ss a zzzz",
						"MEd, h:mm:ss a zzzz": "E, M/d, h:mm:ss a zzzz",
						"MMM, h:mm:ss a zzzz": "LLL, h:mm:ss a zzzz",
						"MMMd, h:mm:ss a zzzz": "MMM d, h:mm:ss a zzzz",
						"MMMEd, h:mm:ss a zzzz": "E, MMM d, h:mm:ss a zzzz",
						"MMMMd 'at' h:mm:ss a zzzz": "MMMM d 'at' h:mm:ss a zzzz",
						"y, h:mm:ss a zzzz": "y, h:mm:ss a zzzz",
						"yM, h:mm:ss a zzzz": "M/y, h:mm:ss a zzzz",
						"yMd, h:mm:ss a zzzz": "M/d/y, h:mm:ss a zzzz",
						"yMEd, h:mm:ss a zzzz": "E, M/d/y, h:mm:ss a zzzz",
						"yMMM, h:mm:ss a zzzz": "MMM y, h:mm:ss a zzzz",
						"yMMMd, h:mm:ss a zzzz": "MMM d, y, h:mm:ss a zzzz",
						"yMMMEd, h:mm:ss a zzzz": "E, MMM d, y, h:mm:ss a zzzz",
						"yMMMM 'at' h:mm:ss a zzzz": "MMMM y 'at' h:mm:ss a zzzz",
						"EEEE, MMMM d, y 'at' h:mm:ss a z":
							"EEEE, MMMM d, y 'at' h:mm:ss a z",
						"MMMM d, y 'at' h:mm:ss a z": "MMMM d, y 'at' h:mm:ss a z",
						"MMM d, y, h:mm:ss a z": "MMM d, y, h:mm:ss a z",
						"M/d/yy, h:mm:ss a z": "M/d/yy, h:mm:ss a z",
						"d, h:mm:ss a z": "d, h:mm:ss a z",
						"E, h:mm:ss a z": "ccc, h:mm:ss a z",
						"Ed, h:mm:ss a z": "d E, h:mm:ss a z",
						"Gy, h:mm:ss a z": "y G, h:mm:ss a z",
						"GyMMM, h:mm:ss a z": "MMM y G, h:mm:ss a z",
						"GyMMMd, h:mm:ss a z": "MMM d, y G, h:mm:ss a z",
						"GyMMMEd, h:mm:ss a z": "E, MMM d, y G, h:mm:ss a z",
						"M, h:mm:ss a z": "L, h:mm:ss a z",
						"Md, h:mm:ss a z": "M/d, h:mm:ss a z",
						"MEd, h:mm:ss a z": "E, M/d, h:mm:ss a z",
						"MMM, h:mm:ss a z": "LLL, h:mm:ss a z",
						"MMMd, h:mm:ss a z": "MMM d, h:mm:ss a z",
						"MMMEd, h:mm:ss a z": "E, MMM d, h:mm:ss a z",
						"MMMMd 'at' h:mm:ss a z": "MMMM d 'at' h:mm:ss a z",
						"y, h:mm:ss a z": "y, h:mm:ss a z",
						"yM, h:mm:ss a z": "M/y, h:mm:ss a z",
						"yMd, h:mm:ss a z": "M/d/y, h:mm:ss a z",
						"yMEd, h:mm:ss a z": "E, M/d/y, h:mm:ss a z",
						"yMMM, h:mm:ss a z": "MMM y, h:mm:ss a z",
						"yMMMd, h:mm:ss a z": "MMM d, y, h:mm:ss a z",
						"yMMMEd, h:mm:ss a z": "E, MMM d, y, h:mm:ss a z",
						"yMMMM 'at' h:mm:ss a z": "MMMM y 'at' h:mm:ss a z",
						"EEEE, MMMM d, y 'at' h:mm:ss a": "EEEE, MMMM d, y 'at' h:mm:ss a",
						"MMMM d, y 'at' h:mm:ss a": "MMMM d, y 'at' h:mm:ss a",
						"MMM d, y, h:mm:ss a": "MMM d, y, h:mm:ss a",
						"M/d/yy, h:mm:ss a": "M/d/yy, h:mm:ss a",
						"d, h:mm:ss a": "d, h:mm:ss a",
						"E, h:mm:ss a": "ccc, h:mm:ss a",
						"Ed, h:mm:ss a": "d E, h:mm:ss a",
						"Gy, h:mm:ss a": "y G, h:mm:ss a",
						"GyMMM, h:mm:ss a": "MMM y G, h:mm:ss a",
						"GyMMMd, h:mm:ss a": "MMM d, y G, h:mm:ss a",
						"GyMMMEd, h:mm:ss a": "E, MMM d, y G, h:mm:ss a",
						"M, h:mm:ss a": "L, h:mm:ss a",
						"Md, h:mm:ss a": "M/d, h:mm:ss a",
						"MEd, h:mm:ss a": "E, M/d, h:mm:ss a",
						"MMM, h:mm:ss a": "LLL, h:mm:ss a",
						"MMMd, h:mm:ss a": "MMM d, h:mm:ss a",
						"MMMEd, h:mm:ss a": "E, MMM d, h:mm:ss a",
						"MMMMd 'at' h:mm:ss a": "MMMM d 'at' h:mm:ss a",
						"y, h:mm:ss a": "y, h:mm:ss a",
						"yM, h:mm:ss a": "M/y, h:mm:ss a",
						"yMd, h:mm:ss a": "M/d/y, h:mm:ss a",
						"yMEd, h:mm:ss a": "E, M/d/y, h:mm:ss a",
						"yMMM, h:mm:ss a": "MMM y, h:mm:ss a",
						"yMMMd, h:mm:ss a": "MMM d, y, h:mm:ss a",
						"yMMMEd, h:mm:ss a": "E, MMM d, y, h:mm:ss a",
						"yMMMM 'at' h:mm:ss a": "MMMM y 'at' h:mm:ss a",
						"EEEE, MMMM d, y 'at' h:mm a": "EEEE, MMMM d, y 'at' h:mm a",
						"MMMM d, y 'at' h:mm a": "MMMM d, y 'at' h:mm a",
						"MMM d, y, h:mm a": "MMM d, y, h:mm a",
						"M/d/yy, h:mm a": "M/d/yy, h:mm a",
						"d, h:mm a": "d, h:mm a",
						"E, h:mm a": "ccc, h:mm a",
						"Ed, h:mm a": "d E, h:mm a",
						"Gy, h:mm a": "y G, h:mm a",
						"GyMMM, h:mm a": "MMM y G, h:mm a",
						"GyMMMd, h:mm a": "MMM d, y G, h:mm a",
						"GyMMMEd, h:mm a": "E, MMM d, y G, h:mm a",
						"M, h:mm a": "L, h:mm a",
						"Md, h:mm a": "M/d, h:mm a",
						"MEd, h:mm a": "E, M/d, h:mm a",
						"MMM, h:mm a": "LLL, h:mm a",
						"MMMd, h:mm a": "MMM d, h:mm a",
						"MMMEd, h:mm a": "E, MMM d, h:mm a",
						"MMMMd 'at' h:mm a": "MMMM d 'at' h:mm a",
						"y, h:mm a": "y, h:mm a",
						"yM, h:mm a": "M/y, h:mm a",
						"yMd, h:mm a": "M/d/y, h:mm a",
						"yMEd, h:mm a": "E, M/d/y, h:mm a",
						"yMMM, h:mm a": "MMM y, h:mm a",
						"yMMMd, h:mm a": "MMM d, y, h:mm a",
						"yMMMEd, h:mm a": "E, MMM d, y, h:mm a",
						"yMMMM 'at' h:mm a": "MMMM y 'at' h:mm a",
						"EEEE, MMMM d, y 'at' Bh": "EEEE, MMMM d, y 'at' h B",
						"MMMM d, y 'at' Bh": "MMMM d, y 'at' h B",
						"MMM d, y, Bh": "MMM d, y, h B",
						"M/d/yy, Bh": "M/d/yy, h B",
						"d, Bh": "d, h B",
						"E, Bh": "ccc, h B",
						"Ed, Bh": "d E, h B",
						"Gy, Bh": "y G, h B",
						"GyMMM, Bh": "MMM y G, h B",
						"GyMMMd, Bh": "MMM d, y G, h B",
						"GyMMMEd, Bh": "E, MMM d, y G, h B",
						"M, Bh": "L, h B",
						"Md, Bh": "M/d, h B",
						"MEd, Bh": "E, M/d, h B",
						"MMM, Bh": "LLL, h B",
						"MMMd, Bh": "MMM d, h B",
						"MMMEd, Bh": "E, MMM d, h B",
						"MMMMd 'at' Bh": "MMMM d 'at' h B",
						"y, Bh": "y, h B",
						"yM, Bh": "M/y, h B",
						"yMd, Bh": "M/d/y, h B",
						"yMEd, Bh": "E, M/d/y, h B",
						"yMMM, Bh": "MMM y, h B",
						"yMMMd, Bh": "MMM d, y, h B",
						"yMMMEd, Bh": "E, MMM d, y, h B",
						"yMMMM 'at' Bh": "MMMM y 'at' h B",
						"EEEE, MMMM d, y 'at' Bhm": "EEEE, MMMM d, y 'at' h:mm B",
						"MMMM d, y 'at' Bhm": "MMMM d, y 'at' h:mm B",
						"MMM d, y, Bhm": "MMM d, y, h:mm B",
						"M/d/yy, Bhm": "M/d/yy, h:mm B",
						"d, Bhm": "d, h:mm B",
						"E, Bhm": "ccc, h:mm B",
						"Ed, Bhm": "d E, h:mm B",
						"Gy, Bhm": "y G, h:mm B",
						"GyMMM, Bhm": "MMM y G, h:mm B",
						"GyMMMd, Bhm": "MMM d, y G, h:mm B",
						"GyMMMEd, Bhm": "E, MMM d, y G, h:mm B",
						"M, Bhm": "L, h:mm B",
						"Md, Bhm": "M/d, h:mm B",
						"MEd, Bhm": "E, M/d, h:mm B",
						"MMM, Bhm": "LLL, h:mm B",
						"MMMd, Bhm": "MMM d, h:mm B",
						"MMMEd, Bhm": "E, MMM d, h:mm B",
						"MMMMd 'at' Bhm": "MMMM d 'at' h:mm B",
						"y, Bhm": "y, h:mm B",
						"yM, Bhm": "M/y, h:mm B",
						"yMd, Bhm": "M/d/y, h:mm B",
						"yMEd, Bhm": "E, M/d/y, h:mm B",
						"yMMM, Bhm": "MMM y, h:mm B",
						"yMMMd, Bhm": "MMM d, y, h:mm B",
						"yMMMEd, Bhm": "E, MMM d, y, h:mm B",
						"yMMMM 'at' Bhm": "MMMM y 'at' h:mm B",
						"EEEE, MMMM d, y 'at' Bhms": "EEEE, MMMM d, y 'at' h:mm:ss B",
						"MMMM d, y 'at' Bhms": "MMMM d, y 'at' h:mm:ss B",
						"MMM d, y, Bhms": "MMM d, y, h:mm:ss B",
						"M/d/yy, Bhms": "M/d/yy, h:mm:ss B",
						"d, Bhms": "d, h:mm:ss B",
						"E, Bhms": "ccc, h:mm:ss B",
						"Ed, Bhms": "d E, h:mm:ss B",
						"Gy, Bhms": "y G, h:mm:ss B",
						"GyMMM, Bhms": "MMM y G, h:mm:ss B",
						"GyMMMd, Bhms": "MMM d, y G, h:mm:ss B",
						"GyMMMEd, Bhms": "E, MMM d, y G, h:mm:ss B",
						"M, Bhms": "L, h:mm:ss B",
						"Md, Bhms": "M/d, h:mm:ss B",
						"MEd, Bhms": "E, M/d, h:mm:ss B",
						"MMM, Bhms": "LLL, h:mm:ss B",
						"MMMd, Bhms": "MMM d, h:mm:ss B",
						"MMMEd, Bhms": "E, MMM d, h:mm:ss B",
						"MMMMd 'at' Bhms": "MMMM d 'at' h:mm:ss B",
						"y, Bhms": "y, h:mm:ss B",
						"yM, Bhms": "M/y, h:mm:ss B",
						"yMd, Bhms": "M/d/y, h:mm:ss B",
						"yMEd, Bhms": "E, M/d/y, h:mm:ss B",
						"yMMM, Bhms": "MMM y, h:mm:ss B",
						"yMMMd, Bhms": "MMM d, y, h:mm:ss B",
						"yMMMEd, Bhms": "E, MMM d, y, h:mm:ss B",
						"yMMMM 'at' Bhms": "MMMM y 'at' h:mm:ss B",
						"EEEE, MMMM d, y 'at' h": "EEEE, MMMM d, y 'at' h a",
						"MMMM d, y 'at' h": "MMMM d, y 'at' h a",
						"MMM d, y, h": "MMM d, y, h a",
						"M/d/yy, h": "M/d/yy, h a",
						"d, h": "d, h a",
						"E, h": "ccc, h a",
						"Ed, h": "d E, h a",
						"Gy, h": "y G, h a",
						"GyMMM, h": "MMM y G, h a",
						"GyMMMd, h": "MMM d, y G, h a",
						"GyMMMEd, h": "E, MMM d, y G, h a",
						"M, h": "L, h a",
						"Md, h": "M/d, h a",
						"MEd, h": "E, M/d, h a",
						"MMM, h": "LLL, h a",
						"MMMd, h": "MMM d, h a",
						"MMMEd, h": "E, MMM d, h a",
						"MMMMd 'at' h": "MMMM d 'at' h a",
						"y, h": "y, h a",
						"yM, h": "M/y, h a",
						"yMd, h": "M/d/y, h a",
						"yMEd, h": "E, M/d/y, h a",
						"yMMM, h": "MMM y, h a",
						"yMMMd, h": "MMM d, y, h a",
						"yMMMEd, h": "E, MMM d, y, h a",
						"yMMMM 'at' h": "MMMM y 'at' h a",
						"EEEE, MMMM d, y 'at' H": "EEEE, MMMM d, y 'at' HH",
						"MMMM d, y 'at' H": "MMMM d, y 'at' HH",
						"MMM d, y, H": "MMM d, y, HH",
						"M/d/yy, H": "M/d/yy, HH",
						"d, H": "d, HH",
						"E, H": "ccc, HH",
						"Ed, H": "d E, HH",
						"Gy, H": "y G, HH",
						"GyMMM, H": "MMM y G, HH",
						"GyMMMd, H": "MMM d, y G, HH",
						"GyMMMEd, H": "E, MMM d, y G, HH",
						"M, H": "L, HH",
						"Md, H": "M/d, HH",
						"MEd, H": "E, M/d, HH",
						"MMM, H": "LLL, HH",
						"MMMd, H": "MMM d, HH",
						"MMMEd, H": "E, MMM d, HH",
						"MMMMd 'at' H": "MMMM d 'at' HH",
						"y, H": "y, HH",
						"yM, H": "M/y, HH",
						"yMd, H": "M/d/y, HH",
						"yMEd, H": "E, M/d/y, HH",
						"yMMM, H": "MMM y, HH",
						"yMMMd, H": "MMM d, y, HH",
						"yMMMEd, H": "E, MMM d, y, HH",
						"yMMMM 'at' H": "MMMM y 'at' HH",
						"EEEE, MMMM d, y 'at' hm": "EEEE, MMMM d, y 'at' h:mm a",
						"MMMM d, y 'at' hm": "MMMM d, y 'at' h:mm a",
						"MMM d, y, hm": "MMM d, y, h:mm a",
						"M/d/yy, hm": "M/d/yy, h:mm a",
						"d, hm": "d, h:mm a",
						"E, hm": "ccc, h:mm a",
						"Ed, hm": "d E, h:mm a",
						"Gy, hm": "y G, h:mm a",
						"GyMMM, hm": "MMM y G, h:mm a",
						"GyMMMd, hm": "MMM d, y G, h:mm a",
						"GyMMMEd, hm": "E, MMM d, y G, h:mm a",
						"M, hm": "L, h:mm a",
						"Md, hm": "M/d, h:mm a",
						"MEd, hm": "E, M/d, h:mm a",
						"MMM, hm": "LLL, h:mm a",
						"MMMd, hm": "MMM d, h:mm a",
						"MMMEd, hm": "E, MMM d, h:mm a",
						"MMMMd 'at' hm": "MMMM d 'at' h:mm a",
						"y, hm": "y, h:mm a",
						"yM, hm": "M/y, h:mm a",
						"yMd, hm": "M/d/y, h:mm a",
						"yMEd, hm": "E, M/d/y, h:mm a",
						"yMMM, hm": "MMM y, h:mm a",
						"yMMMd, hm": "MMM d, y, h:mm a",
						"yMMMEd, hm": "E, MMM d, y, h:mm a",
						"yMMMM 'at' hm": "MMMM y 'at' h:mm a",
						"EEEE, MMMM d, y 'at' Hm": "EEEE, MMMM d, y 'at' HH:mm",
						"MMMM d, y 'at' Hm": "MMMM d, y 'at' HH:mm",
						"MMM d, y, Hm": "MMM d, y, HH:mm",
						"M/d/yy, Hm": "M/d/yy, HH:mm",
						"d, Hm": "d, HH:mm",
						"E, Hm": "ccc, HH:mm",
						"Ed, Hm": "d E, HH:mm",
						"Gy, Hm": "y G, HH:mm",
						"GyMMM, Hm": "MMM y G, HH:mm",
						"GyMMMd, Hm": "MMM d, y G, HH:mm",
						"GyMMMEd, Hm": "E, MMM d, y G, HH:mm",
						"M, Hm": "L, HH:mm",
						"Md, Hm": "M/d, HH:mm",
						"MEd, Hm": "E, M/d, HH:mm",
						"MMM, Hm": "LLL, HH:mm",
						"MMMd, Hm": "MMM d, HH:mm",
						"MMMEd, Hm": "E, MMM d, HH:mm",
						"MMMMd 'at' Hm": "MMMM d 'at' HH:mm",
						"y, Hm": "y, HH:mm",
						"yM, Hm": "M/y, HH:mm",
						"yMd, Hm": "M/d/y, HH:mm",
						"yMEd, Hm": "E, M/d/y, HH:mm",
						"yMMM, Hm": "MMM y, HH:mm",
						"yMMMd, Hm": "MMM d, y, HH:mm",
						"yMMMEd, Hm": "E, MMM d, y, HH:mm",
						"yMMMM 'at' Hm": "MMMM y 'at' HH:mm",
						"EEEE, MMMM d, y 'at' hms": "EEEE, MMMM d, y 'at' h:mm:ss a",
						"MMMM d, y 'at' hms": "MMMM d, y 'at' h:mm:ss a",
						"MMM d, y, hms": "MMM d, y, h:mm:ss a",
						"M/d/yy, hms": "M/d/yy, h:mm:ss a",
						"d, hms": "d, h:mm:ss a",
						"E, hms": "ccc, h:mm:ss a",
						"Ed, hms": "d E, h:mm:ss a",
						"Gy, hms": "y G, h:mm:ss a",
						"GyMMM, hms": "MMM y G, h:mm:ss a",
						"GyMMMd, hms": "MMM d, y G, h:mm:ss a",
						"GyMMMEd, hms": "E, MMM d, y G, h:mm:ss a",
						"M, hms": "L, h:mm:ss a",
						"Md, hms": "M/d, h:mm:ss a",
						"MEd, hms": "E, M/d, h:mm:ss a",
						"MMM, hms": "LLL, h:mm:ss a",
						"MMMd, hms": "MMM d, h:mm:ss a",
						"MMMEd, hms": "E, MMM d, h:mm:ss a",
						"MMMMd 'at' hms": "MMMM d 'at' h:mm:ss a",
						"y, hms": "y, h:mm:ss a",
						"yM, hms": "M/y, h:mm:ss a",
						"yMd, hms": "M/d/y, h:mm:ss a",
						"yMEd, hms": "E, M/d/y, h:mm:ss a",
						"yMMM, hms": "MMM y, h:mm:ss a",
						"yMMMd, hms": "MMM d, y, h:mm:ss a",
						"yMMMEd, hms": "E, MMM d, y, h:mm:ss a",
						"yMMMM 'at' hms": "MMMM y 'at' h:mm:ss a",
						"EEEE, MMMM d, y 'at' Hms": "EEEE, MMMM d, y 'at' HH:mm:ss",
						"MMMM d, y 'at' Hms": "MMMM d, y 'at' HH:mm:ss",
						"MMM d, y, Hms": "MMM d, y, HH:mm:ss",
						"M/d/yy, Hms": "M/d/yy, HH:mm:ss",
						"d, Hms": "d, HH:mm:ss",
						"E, Hms": "ccc, HH:mm:ss",
						"Ed, Hms": "d E, HH:mm:ss",
						"Gy, Hms": "y G, HH:mm:ss",
						"GyMMM, Hms": "MMM y G, HH:mm:ss",
						"GyMMMd, Hms": "MMM d, y G, HH:mm:ss",
						"GyMMMEd, Hms": "E, MMM d, y G, HH:mm:ss",
						"M, Hms": "L, HH:mm:ss",
						"Md, Hms": "M/d, HH:mm:ss",
						"MEd, Hms": "E, M/d, HH:mm:ss",
						"MMM, Hms": "LLL, HH:mm:ss",
						"MMMd, Hms": "MMM d, HH:mm:ss",
						"MMMEd, Hms": "E, MMM d, HH:mm:ss",
						"MMMMd 'at' Hms": "MMMM d 'at' HH:mm:ss",
						"y, Hms": "y, HH:mm:ss",
						"yM, Hms": "M/y, HH:mm:ss",
						"yMd, Hms": "M/d/y, HH:mm:ss",
						"yMEd, Hms": "E, M/d/y, HH:mm:ss",
						"yMMM, Hms": "MMM y, HH:mm:ss",
						"yMMMd, Hms": "MMM d, y, HH:mm:ss",
						"yMMMEd, Hms": "E, MMM d, y, HH:mm:ss",
						"yMMMM 'at' Hms": "MMMM y 'at' HH:mm:ss",
						"EEEE, MMMM d, y 'at' hmsv": "EEEE, MMMM d, y 'at' h:mm:ss a v",
						"MMMM d, y 'at' hmsv": "MMMM d, y 'at' h:mm:ss a v",
						"MMM d, y, hmsv": "MMM d, y, h:mm:ss a v",
						"M/d/yy, hmsv": "M/d/yy, h:mm:ss a v",
						"d, hmsv": "d, h:mm:ss a v",
						"E, hmsv": "ccc, h:mm:ss a v",
						"Ed, hmsv": "d E, h:mm:ss a v",
						"Gy, hmsv": "y G, h:mm:ss a v",
						"GyMMM, hmsv": "MMM y G, h:mm:ss a v",
						"GyMMMd, hmsv": "MMM d, y G, h:mm:ss a v",
						"GyMMMEd, hmsv": "E, MMM d, y G, h:mm:ss a v",
						"M, hmsv": "L, h:mm:ss a v",
						"Md, hmsv": "M/d, h:mm:ss a v",
						"MEd, hmsv": "E, M/d, h:mm:ss a v",
						"MMM, hmsv": "LLL, h:mm:ss a v",
						"MMMd, hmsv": "MMM d, h:mm:ss a v",
						"MMMEd, hmsv": "E, MMM d, h:mm:ss a v",
						"MMMMd 'at' hmsv": "MMMM d 'at' h:mm:ss a v",
						"y, hmsv": "y, h:mm:ss a v",
						"yM, hmsv": "M/y, h:mm:ss a v",
						"yMd, hmsv": "M/d/y, h:mm:ss a v",
						"yMEd, hmsv": "E, M/d/y, h:mm:ss a v",
						"yMMM, hmsv": "MMM y, h:mm:ss a v",
						"yMMMd, hmsv": "MMM d, y, h:mm:ss a v",
						"yMMMEd, hmsv": "E, MMM d, y, h:mm:ss a v",
						"yMMMM 'at' hmsv": "MMMM y 'at' h:mm:ss a v",
						"EEEE, MMMM d, y 'at' Hmsv": "EEEE, MMMM d, y 'at' HH:mm:ss v",
						"MMMM d, y 'at' Hmsv": "MMMM d, y 'at' HH:mm:ss v",
						"MMM d, y, Hmsv": "MMM d, y, HH:mm:ss v",
						"M/d/yy, Hmsv": "M/d/yy, HH:mm:ss v",
						"d, Hmsv": "d, HH:mm:ss v",
						"E, Hmsv": "ccc, HH:mm:ss v",
						"Ed, Hmsv": "d E, HH:mm:ss v",
						"Gy, Hmsv": "y G, HH:mm:ss v",
						"GyMMM, Hmsv": "MMM y G, HH:mm:ss v",
						"GyMMMd, Hmsv": "MMM d, y G, HH:mm:ss v",
						"GyMMMEd, Hmsv": "E, MMM d, y G, HH:mm:ss v",
						"M, Hmsv": "L, HH:mm:ss v",
						"Md, Hmsv": "M/d, HH:mm:ss v",
						"MEd, Hmsv": "E, M/d, HH:mm:ss v",
						"MMM, Hmsv": "LLL, HH:mm:ss v",
						"MMMd, Hmsv": "MMM d, HH:mm:ss v",
						"MMMEd, Hmsv": "E, MMM d, HH:mm:ss v",
						"MMMMd 'at' Hmsv": "MMMM d 'at' HH:mm:ss v",
						"y, Hmsv": "y, HH:mm:ss v",
						"yM, Hmsv": "M/y, HH:mm:ss v",
						"yMd, Hmsv": "M/d/y, HH:mm:ss v",
						"yMEd, Hmsv": "E, M/d/y, HH:mm:ss v",
						"yMMM, Hmsv": "MMM y, HH:mm:ss v",
						"yMMMd, Hmsv": "MMM d, y, HH:mm:ss v",
						"yMMMEd, Hmsv": "E, MMM d, y, HH:mm:ss v",
						"yMMMM 'at' Hmsv": "MMMM y 'at' HH:mm:ss v",
						"EEEE, MMMM d, y 'at' hmv": "EEEE, MMMM d, y 'at' h:mm a v",
						"MMMM d, y 'at' hmv": "MMMM d, y 'at' h:mm a v",
						"MMM d, y, hmv": "MMM d, y, h:mm a v",
						"M/d/yy, hmv": "M/d/yy, h:mm a v",
						"d, hmv": "d, h:mm a v",
						"E, hmv": "ccc, h:mm a v",
						"Ed, hmv": "d E, h:mm a v",
						"Gy, hmv": "y G, h:mm a v",
						"GyMMM, hmv": "MMM y G, h:mm a v",
						"GyMMMd, hmv": "MMM d, y G, h:mm a v",
						"GyMMMEd, hmv": "E, MMM d, y G, h:mm a v",
						"M, hmv": "L, h:mm a v",
						"Md, hmv": "M/d, h:mm a v",
						"MEd, hmv": "E, M/d, h:mm a v",
						"MMM, hmv": "LLL, h:mm a v",
						"MMMd, hmv": "MMM d, h:mm a v",
						"MMMEd, hmv": "E, MMM d, h:mm a v",
						"MMMMd 'at' hmv": "MMMM d 'at' h:mm a v",
						"y, hmv": "y, h:mm a v",
						"yM, hmv": "M/y, h:mm a v",
						"yMd, hmv": "M/d/y, h:mm a v",
						"yMEd, hmv": "E, M/d/y, h:mm a v",
						"yMMM, hmv": "MMM y, h:mm a v",
						"yMMMd, hmv": "MMM d, y, h:mm a v",
						"yMMMEd, hmv": "E, MMM d, y, h:mm a v",
						"yMMMM 'at' hmv": "MMMM y 'at' h:mm a v",
						"EEEE, MMMM d, y 'at' Hmv": "EEEE, MMMM d, y 'at' HH:mm v",
						"MMMM d, y 'at' Hmv": "MMMM d, y 'at' HH:mm v",
						"MMM d, y, Hmv": "MMM d, y, HH:mm v",
						"M/d/yy, Hmv": "M/d/yy, HH:mm v",
						"d, Hmv": "d, HH:mm v",
						"E, Hmv": "ccc, HH:mm v",
						"Ed, Hmv": "d E, HH:mm v",
						"Gy, Hmv": "y G, HH:mm v",
						"GyMMM, Hmv": "MMM y G, HH:mm v",
						"GyMMMd, Hmv": "MMM d, y G, HH:mm v",
						"GyMMMEd, Hmv": "E, MMM d, y G, HH:mm v",
						"M, Hmv": "L, HH:mm v",
						"Md, Hmv": "M/d, HH:mm v",
						"MEd, Hmv": "E, M/d, HH:mm v",
						"MMM, Hmv": "LLL, HH:mm v",
						"MMMd, Hmv": "MMM d, HH:mm v",
						"MMMEd, Hmv": "E, MMM d, HH:mm v",
						"MMMMd 'at' Hmv": "MMMM d 'at' HH:mm v",
						"y, Hmv": "y, HH:mm v",
						"yM, Hmv": "M/y, HH:mm v",
						"yMd, Hmv": "M/d/y, HH:mm v",
						"yMEd, Hmv": "E, M/d/y, HH:mm v",
						"yMMM, Hmv": "MMM y, HH:mm v",
						"yMMMd, Hmv": "MMM d, y, HH:mm v",
						"yMMMEd, Hmv": "E, MMM d, y, HH:mm v",
						"yMMMM 'at' Hmv": "MMMM y 'at' HH:mm v",
						"EEEE, MMMM d, y 'at' ms": "EEEE, MMMM d, y 'at' mm:ss",
						"MMMM d, y 'at' ms": "MMMM d, y 'at' mm:ss",
						"MMM d, y, ms": "MMM d, y, mm:ss",
						"M/d/yy, ms": "M/d/yy, mm:ss",
						"d, ms": "d, mm:ss",
						"E, ms": "ccc, mm:ss",
						"Ed, ms": "d E, mm:ss",
						"Gy, ms": "y G, mm:ss",
						"GyMMM, ms": "MMM y G, mm:ss",
						"GyMMMd, ms": "MMM d, y G, mm:ss",
						"GyMMMEd, ms": "E, MMM d, y G, mm:ss",
						"M, ms": "L, mm:ss",
						"Md, ms": "M/d, mm:ss",
						"MEd, ms": "E, M/d, mm:ss",
						"MMM, ms": "LLL, mm:ss",
						"MMMd, ms": "MMM d, mm:ss",
						"MMMEd, ms": "E, MMM d, mm:ss",
						"MMMMd 'at' ms": "MMMM d 'at' mm:ss",
						"y, ms": "y, mm:ss",
						"yM, ms": "M/y, mm:ss",
						"yMd, ms": "M/d/y, mm:ss",
						"yMEd, ms": "E, M/d/y, mm:ss",
						"yMMM, ms": "MMM y, mm:ss",
						"yMMMd, ms": "MMM d, y, mm:ss",
						"yMMMEd, ms": "E, MMM d, y, mm:ss",
						"yMMMM 'at' ms": "MMMM y 'at' mm:ss"
					}
				},
				intervalFormats: {
					intervalFormatFallback: "{0} – {1}",
					Bh: { B: "h B – h B", h: "h – h B" },
					Bhm: { B: "h:mm B – h:mm B", h: "h:mm – h:mm B", m: "h:mm – h:mm B" },
					d: { d: "d – d" },
					Gy: { G: "y G – y G", y: "y – y G" },
					GyM: {
						G: "M/y GGGGG – M/y GGGGG",
						M: "M/y – M/y GGGGG",
						y: "M/y – M/y GGGGG"
					},
					GyMd: {
						d: "M/d/y – M/d/y GGGGG",
						G: "M/d/y GGGGG – M/d/y GGGGG",
						M: "M/d/y – M/d/y GGGGG",
						y: "M/d/y – M/d/y GGGGG"
					},
					GyMEd: {
						d: "E, M/d/y – E, M/d/y GGGGG",
						G: "E, M/d/y GGGGG – E, M/d/y GGGGG",
						M: "E, M/d/y – E, M/d/y GGGGG",
						y: "E, M/d/y – E, M/d/y GGGGG"
					},
					GyMMM: {
						G: "MMM y G – MMM y G",
						M: "MMM – MMM y G",
						y: "MMM y – MMM y G"
					},
					GyMMMd: {
						d: "MMM d – d, y G",
						G: "MMM d, y G – MMM d, y G",
						M: "MMM d – MMM d, y G",
						y: "MMM d, y – MMM d, y G"
					},
					GyMMMEd: {
						d: "E, MMM d – E, MMM d, y G",
						G: "E, MMM d, y G – E, MMM d, y G",
						M: "E, MMM d – E, MMM d, y G",
						y: "E, MMM d, y – E, MMM d, y G"
					},
					h: { a: "h a – h a", h: "h – h a" },
					H: { H: "HH – HH" },
					hm: { a: "h:mm a – h:mm a", h: "h:mm – h:mm a", m: "h:mm – h:mm a" },
					Hm: { H: "HH:mm – HH:mm", m: "HH:mm – HH:mm" },
					hmv: {
						a: "h:mm a – h:mm a v",
						h: "h:mm – h:mm a v",
						m: "h:mm – h:mm a v"
					},
					Hmv: { H: "HH:mm – HH:mm v", m: "HH:mm – HH:mm v" },
					hv: { a: "h a – h a v", h: "h – h a v" },
					Hv: { H: "HH – HH v" },
					M: { M: "M – M" },
					Md: { d: "M/d – M/d", M: "M/d – M/d" },
					MEd: { d: "E, M/d – E, M/d", M: "E, M/d – E, M/d" },
					MMM: { M: "MMM – MMM" },
					MMMd: { d: "MMM d – d", M: "MMM d – MMM d" },
					MMMEd: { d: "E, MMM d – E, MMM d", M: "E, MMM d – E, MMM d" },
					y: { y: "y – y" },
					yM: { M: "M/y – M/y", y: "M/y – M/y" },
					yMd: { d: "M/d/y – M/d/y", M: "M/d/y – M/d/y", y: "M/d/y – M/d/y" },
					yMEd: {
						d: "E, M/d/y – E, M/d/y",
						M: "E, M/d/y – E, M/d/y",
						y: "E, M/d/y – E, M/d/y"
					},
					yMMM: { M: "MMM – MMM y", y: "MMM y – MMM y" },
					yMMMd: {
						d: "MMM d – d, y",
						M: "MMM d – MMM d, y",
						y: "MMM d, y – MMM d, y"
					},
					yMMMEd: {
						d: "E, MMM d – E, MMM d, y",
						M: "E, MMM d – E, MMM d, y",
						y: "E, MMM d, y – E, MMM d, y"
					},
					yMMMM: { M: "MMMM – MMMM y", y: "MMMM y – MMMM y" }
				},
				hourCycle: "h12",
				nu: ["latn"],
				ca: ["gregory"],
				hc: ["h12", "", "h23", ""]
			},
			locale: "en"
		});
	}
});

it("formatToParts should work", function () {
	var parts = new Intl.DateTimeFormat("en", {
		weekday: "long",
		era: "long",
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: true
	}).formatToParts(0);
	proclaim.equal(parts.length, 17);
});

it("should fix dayperiod bug in chrome", function () {
	var parts = new Intl.DateTimeFormat("en", {
		weekday: "long",
		era: "long",
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: true
	}).formatToParts(0);
	var dayPeriod, dayperiod;
	for (var i = 0; i < parts.length; i++) {
		var p = parts[i];
		if (p.type === "dayPeriod") {
			dayPeriod = p;
		} else if (p.type === "dayperiod") {
			dayperiod = p;
		}
	}
	proclaim.ok(dayPeriod);
	proclaim.notOk(dayperiod);
});
