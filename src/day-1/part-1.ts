import { readFileSync } from "fs"
import { resolve } from "path"

const input = readFileSync(resolve("src/day-1/actual.txt"), "utf-8").split("\n")

let sum = 0

for (const n of input) {
	let digits = ""
	for (let i = 0; i < n.length; i++) {
		if (!isNaN(+n[i]!)) {
			digits += n[i]
			break
		}
	}

	for (let i = n.length - 1; i >= 0; i--) {
		if (!isNaN(+n[i]!)) {
			digits += n[i]
			break
		}
	}

	sum += +digits
}

console.log(sum)
