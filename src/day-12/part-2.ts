import file from "../file"

const cache: Record<string, number> = {}

const compute = (symbols: string, config: number[], chunk: number): number => {
	const key = `${symbols} ${config.join(",")} ${chunk}`
	if (key in cache) return cache[key]

	if (!symbols) {
		if (!config.length || config[0] === chunk) return 1
		return 0
	}

	if (
		symbols.split("").filter(s => s !== ".").length + chunk <
		config.reduce((acc, el) => acc + el, 0)
	) {
		return 0
	}

	let sum = 0

	if ("?.".includes(symbols[0])) {
		if (!chunk) {
			// pretend nothing happened since `.` does literally nothing for us
			sum += compute(symbols.slice(1), config, 0)
		} else if (chunk === config[0]) {
			// move to next config value, resetting chunk size
			sum += compute(symbols.slice(1), config.slice(1), 0)
		} else {
			// this needs to be a `#` if chunk < config[0]
		}
	}

	if ("?#".includes(symbols[0])) {
		if (config.length && chunk < config[0]) {
			sum += compute(symbols.slice(1), config, chunk + 1)
		} else {
			// this needs to be a `.` if not chunk > config[0]
		}
	}

	cache[key] = sum
	return sum
}

let sum = 0
for (const n of file("actual")) {
	const [symbols, config] = n.split(" ")
	sum += compute(
		Array(5).fill(symbols).join("?"),
		Array(5)
			.fill(config)
			.join(",")
			.split(",")
			.map(v => +v),
		0,
	)
}

console.log(sum)
