import file from "../file"

const input = file("actual")

const matrix = [
	[-1, -1],
	[0, -1],
	[1, -1],
	[-1, 0],
	[0, 0],
	[1, 0],
	[-1, 1],
	[0, 1],
	[1, 1],
] as [number, number][]

let sum = 0

for (let y = 0; y < input.length; y++) {
	const n = input[y]!

	for (let x = 0; x < n.length; x++) {
		if (input[y]?.[x] !== "*") continue

		const points = matrix
			.map(p => [p[0] + x, p[1] + y] as const)
			.filter(p => input[p[1]]?.[p[0]]?.match(/\d/))
		if (points.length < 2) continue

		const numbers: { start: number; end: number; number: string }[] = []
		for (const [x, y] of points) {
			let start = x
			let end = x

			while (input[y]![start]?.match(/\d/)) {
				start--
			}

			while (input[y]![end]?.match(/\d/)) {
				end++
			}

			numbers.push({ start, end, number: input[y]!.slice(start + 1, end) })
		}

		// @ts-ignore
		const unique = [...new Set(numbers.map(JSON.stringify))].map(JSON.parse) as typeof numbers
		if (unique.length !== 2) continue

		sum += +unique[0]!.number * +unique[1]!.number
	}
}

console.log(sum)
