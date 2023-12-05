import { readFileSync } from "fs"
import { resolve } from "path"

const input = readFileSync(resolve("src/day-5/actual.txt"), "utf-8").split("\n")

const seeds = input
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

const values: number[] = []
for (const seed of seeds) {
	let value = seed
	for (const mappings of map) {
		for (const { base, mapped, range } of mappings) {
			if (value >= base && value < base + range) {
				value = mapped + (value - base)
				break
			}
		}
	}

	values.push(value)
}

console.log(Math.min(...values))
