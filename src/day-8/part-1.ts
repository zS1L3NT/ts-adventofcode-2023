import file from "../file"

const input = file("actual")

const directions = input.shift()!.split("")
const map: Record<string, [string, string]> = {}

for (const n of input.slice(1)) {
	map[n.slice(0, 3)] = [n.slice(7, 10), n.slice(12, 15)]
}

let steps = 0
let curr = "AAA"
while (curr !== "ZZZ") {
	const direction = directions[steps++ % directions.length]!
	curr = map[curr]![direction === "L" ? 0 : 1]
}

console.log(steps)
