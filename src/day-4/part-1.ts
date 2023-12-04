import { readFileSync } from "fs"
import { resolve } from "path"

const input = readFileSync(resolve("src/day-4/actual.txt"), "utf-8").split("\n")

let sum = 0

for (const n of input) {
	const [winners, hand] = n
		.split(":")[1]!
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

	if (wins) {
		sum += Math.pow(2, wins - 1)
	}
}

console.log(sum)
