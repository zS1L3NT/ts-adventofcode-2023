import file from "../file"

let sum = 0

for (const n of file("actual")) {
	const differences: number[][] = [n.split(" ").map(v => +v)]
	while (differences.at(-1)!.some(Boolean)) {
		const last = differences.at(-1)!
		differences.push(last.slice(1).map((v, i) => v - last[i]!))
	}

	let last = 0
	for (let i = 0; i < differences.length; i++) {
		last = differences.at(-i - 1)![0]! - last
	}

	sum += last
}

console.log(sum)
