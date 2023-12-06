import file from "../file"

const [times, distances] = file("actual").map(v =>
	v
		.split(":")[1]!
		.trim()
		.replaceAll(" ", "")
		.split(" ")
		.filter(Boolean)
		.map(v => +v),
) as [number[], number[]]

let ways = 1
for (let i = 0; i < times.length; i++) {
	const time = times[i]!
	const distance = distances[i]!

	let min = [Infinity, 0] as [number, number]
	let max = [-Infinity, 0] as [number, number]
	for (let j = 0; j <= time; j++) {
		const n = j * (time - j)
		if (n > distance) {
			if (j < min[0]) min = [j, n]
			if (j > max[0]) max = [j, n]
		}
	}

	ways *= max[0] - min[0] + 1
}

console.log(ways)
