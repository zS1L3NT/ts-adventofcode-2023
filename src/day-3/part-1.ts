import file from "../file"

const input = file("actual")

let sum = 0

for (let y = 0; y < input.length; y++) {
	const n = input[y]!

	const nums = [...n.matchAll(/(\d+)/g)].map(n => [n.index!, n.index! + n[0].length] as const)

	for (const [start, end] of nums) {
		const points = [
			[start - 1, y - 1],
			[start - 1, y],
			[start - 1, y + 1],
			...Array(end - start)
				.fill(start)
				.flatMap(
					(x, i) =>
						[
							[x + i, y - 1],
							[x + i, y + 1],
						] as const,
				),
			[end, y - 1],
			[end, y],
			[end, y + 1],
		]

		for (const [x, y] of points) {
			const c = input[y]?.[x]
			if (c && !c.match(/[\d\\.]/)) {
				sum += +n.slice(start, end)
			}
		}
	}
}

console.log(sum)
