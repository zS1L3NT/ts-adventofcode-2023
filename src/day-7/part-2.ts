import file from "../file"

const ctype = (c: string) => {
	return ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"].toReversed().indexOf(c)
}

const htype = (hand: string) => {
	const chars = hand.split("") as [string, string, string, string, string]
	const charset = [...new Set(chars.filter(c => c !== "J"))]
	const jokers = chars.filter(c => c === "J").length

	switch (charset.length) {
		case 0:
		case 1:
			return 7
		case 2:
			for (const char of charset) {
				if (chars.filter(c => c === char).length + jokers === 4) {
					return 6
				}
			}
			return 5
		case 3:
			for (const char of charset) {
				if (chars.filter(c => c === char).length + jokers === 3) {
					return 4
				}
			}
			return 3
		case 4:
			return 2
		case 5:
			return 1
	}

	throw new Error()
}

const sorter = (a: string, b: string) => {
	const htypes = htype(a) - htype(b)
	if (htypes) return htypes

	for (let i = 0; i < 5; i++) {
		const ctypes = ctype(a[i]!) - ctype(b[i]!)
		if (ctypes) return ctypes
	}

	throw new Error()
}

console.log(
	file("actual")
		.map(v => v.split(" ") as [string, string])
		.sort(([a], [b]) => sorter(a, b))
		.map(([, v], i) => +v * (i + 1))
		.reduce((acc, el) => acc + el, 0),
)
