import file from "../file"

const input = file("actual")

const directions = input.shift()!.split("")
const map: Record<string, [string, string]> = {}

for (const n of input.slice(1)) {
	map[n.slice(0, 3)] = [n.slice(7, 10), n.slice(12, 15)]
}

const steps = Object.keys(map)
	.filter(v => v[2] === "A")
	.map(node => {
		let steps = 0
		let curr = node
		while (curr[2] !== "Z") {
			const direction = directions[steps++ % directions.length]!
			curr = map[curr]![direction === "L" ? 0 : 1]
		}

		return steps
	})

// LCM Algorithm, don't ask me
const LCM = (numbers: number[]) => {
	const GCD = (a: number, b: number): number => {
		if (b == 0) return a
		return GCD(b, a % b)
	}

	let lcm = numbers[0]!
	for (let i = 1; i < numbers.length; i++) {
		lcm = (numbers[i]! * lcm) / GCD(numbers[i]!, lcm)
	}

	return lcm
}

console.log(LCM(steps))
