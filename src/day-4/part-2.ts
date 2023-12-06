import file from "../file"

const input = file("actual")

const cards: Record<string, number> = Object.fromEntries(
	Array(input.length)
		.fill(0)
		.map((_, i) => [i, 1]),
)

for (let i = 0; i < input.length; i++) {
	const [winners, hand] = input[i]!.split(":")[1]!
		.split("|")
		.map(v =>
			v
				.trim()
				.split(" ")
				.filter(Boolean)
				.map(v => +v),
		) as [number[], number[]]

	let wins = 0
	for (const winner of winners) {
		if (hand.includes(winner)) {
			wins++
		}
	}

	for (let j = 0; j < wins; j++) {
		cards[i + j + 1] += cards[i + ""]!
	}
}

console.log(Object.values(cards).reduce((acc, el) => acc + el, 0))
