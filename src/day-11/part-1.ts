import file from "../file"

const input = file("actual").map(v => v.split(""))

type Point = [number, number]

// Expand universe
const columns = Array(input[0]!.length)
	.fill(0)
	.map((_, i) => i)
	.filter(i => input.map(v => v[i]!).every(v => v === "."))

const rows = input.map((_, i) => i).filter(i => input[i]!.every(v => v === "."))

for (let i = 0; i < input.length; i++) {
	for (let j = 0; j < columns.length; j++) {
		const column = columns[j]!
		input[i]!.splice(column + j, 0, ".")
	}
}

for (let i = 0; i < rows.length; i++) {
	const row = rows[i]!
	input.splice(row + i, 0, Array(input[0]!.length).fill("."))
}

// Calculate distances
const points: Point[] = input.flatMap((v, i) =>
	v
		.map((v, i) => (v === "#" ? i : null))
		.filter(v => v !== null)
		.map(j => [j!, i] as Point),
)

// prettier-ignore
const numbers = Array(points.length).fill(0).map((_, i) => i)
const combinations = numbers.flatMap((v, i) => numbers.slice(i + 1).map(w => [v, w] as Point))

let sum = 0

for (const [i, j] of combinations) {
	const x = points[i]!
	const y = points[j]!
	sum += Math.abs(y[0] - x[0]) + Math.abs(y[1] - x[1])
}

console.log(sum)
