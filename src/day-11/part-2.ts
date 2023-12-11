import file from "../file"

const input = file("actual").map(v => v.split(""))

type Point = [number, number]

// Expand universe
const columns = Array(input[0]!.length)
	.fill(0)
	.map((_, i) => i)
	.filter(i => input.map(v => v[i]!).every(v => v === "."))

const rows = input.map((_, i) => i).filter(i => input[i]!.every(v => v === "."))

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
	const a = points[i]!
	const b = points[j]!

	const minX = Math.min(a[0], b[0])
	const maxX = Math.max(a[0], b[0])
	const minY = Math.min(a[1], b[1])
	const maxY = Math.max(a[1], b[1])

	const colspaces = columns.filter(c => c > minX && c < maxX).length
	const rowspaces = rows.filter(r => r > minY && r < maxY).length

	sum += colspaces * 999999 + maxX - minX
	sum += rowspaces * 999999 + maxY - minY
}

console.log(sum)
