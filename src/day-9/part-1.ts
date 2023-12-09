import file from "../file"

let sum = 0

for (const n of file("actual")) {
	const differences: number[][] = [n.split(" ").map(v => +v)]
	while (differences.at(-1)!.some(Boolean)) {
		const last = differences.at(-1)!
		differences.push(last.slice(1).map((v, i) => v - last[i]!))
	}

	sum += differences.map(v => v.at(-1)!).reduce((acc, el) => acc + el, 0)
}

console.log(sum)
