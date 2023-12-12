import file from "../file"

let sum = 0

for (const n of file("actual")) {
	const [symbols, config] = n.split(" ") as [string, string]
	const indexes = symbols
		.split("")
		.map((v, i) => (v === "?" ? i : null))
		.filter(v => v !== null)

	let _sum = 0
	for (let i = 0; i < Math.pow(2, indexes.length); i++) {
		const binary = i.toString(2).split("").toReversed()
		const modified = symbols
			.split("")
			.map((v, i) =>
				indexes.includes(i) ? (binary[indexes.indexOf(i)] === "1" ? "#" : ".") : v,
			)
			.join("")

		if (
			modified
				.replaceAll("..", ".")
				.split(".")
				.filter(Boolean)
				.map(v => v.length)
				.join(",") === config
		) {
			_sum++
		}
	}

	sum += _sum
}

console.log(sum)
