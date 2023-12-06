import file from "../file"

let sum = 0

for (const n of file("actual")) {
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
