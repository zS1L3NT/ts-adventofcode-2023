import { readFileSync } from "fs"
import { resolve } from "path"

const input = readFileSync(resolve("src/day-5/actual.txt"), "utf-8").split("\n")

const numbers = input
	.shift()!
	.split(": ")[1]!
	.split(" ")
	.map(v => +v)

const map: { base: number; mapped: number; range: number }[][] = []
let index = -1

for (const n of input) {
	if (n === "") continue
	if (n.match(/(\w+)-(\w+)-(\w+) map:/)) {
		map[++index] = []
		continue
	}

	const [mapped, base, range] = n.split(" ") as [string, string, string]
	map[index]!.push({ base: +base, mapped: +mapped, range: +range })
}

let min = Infinity
for (let i = 0; i < numbers.length; i += 2) {
	const base = numbers[i]!
	const range = numbers[i + 1]!

	console.time("RANGE: " + range)

	for (let seed = base; seed < base + range; seed++) {
		let value = seed
		for (const mappings of map) {
			for (const { base, mapped, range } of mappings) {
				if (value >= base && value < base + range) {
					value = mapped + (value - base)
					break
				}
			}
		}

		min = Math.min(value, min)
	}

	console.timeEnd("RANGE: " + range)
}

console.log(min)
