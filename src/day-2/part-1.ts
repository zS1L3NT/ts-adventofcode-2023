import { readFileSync } from "fs"
import { resolve } from "path"

const input = readFileSync(resolve("src/day-2/actual.txt"), "utf-8").split("\n")

let indexes = 0

let i = 0
for (const n of input) {
	let possible = true

	for (const game of n
		.split(":")[1]!
		.split(";")
		.map(g => g.trim())) {
		if (!possible) break

		const colors = { red: 0, green: 0, blue: 0 }
		for (const [num, color] of game.split(",").map(h => h.trim().split(" "))) {
			colors[color as keyof typeof colors] += +num!
		}

		if (colors.red > 12 || colors.green > 13 || colors.blue > 14) {
			possible = false
		}
	}

	i++
	if (possible) {
		indexes += i
	}
}

console.log(indexes)
