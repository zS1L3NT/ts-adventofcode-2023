import file from "../file"

let sum = 0
const nums = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

const replace = (s: string) => {
	for (let i = 0; i < nums.length; i++) {
		s = s.replaceAll(`${nums[i]}`, `${nums[i]}${i + 1}${nums[i]}`)
	}
	return s
}

for (const n of file("actual").map(replace)) {
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
