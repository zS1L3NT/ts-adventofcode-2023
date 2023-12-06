import file from "../file"

let sum = 0

for (const n of file("actual")) {
	const colors = { red: 0, green: 0, blue: 0 }
	for (const game of n
		.split(":")[1]!
		.split(";")
		.map(g => g.trim())) {
		for (const [num, color] of game
			.split(",")
			.map(h => h.trim().split(" ") as [string, keyof typeof colors])) {
			colors[color] = Math.max(colors[color], +num)
		}
	}

	sum += colors.red * colors.green * colors.blue
}

console.log(sum)
