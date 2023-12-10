import file from "../file"

const input = file("actual")

type Point = [number, number]
type Value = "|" | "-" | "L" | "J" | "7" | "F" | "." | "S"
const char = (p: Point) => input[p[1]]![p[0]]! as Value
const add = (a: Point, b: Point) => [a[0] + b[0], a[1] + b[1]] as Point
const equals = (a: Point, b: Point) => a[0] === b[0] && a[1] === b[1]

// prettier-ignore
const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]] as Point[]
const map = {
	"|": [
		[0, -1],
		[0, 1],
	],
	"-": [
		[1, 0],
		[-1, 0],
	],
	L: [
		[0, -1],
		[1, 0],
	],
	J: [
		[0, -1],
		[-1, 0],
	],
	"7": [
		[-1, 0],
		[0, 1],
	],
	F: [
		[1, 0],
		[0, 1],
	],
} as Record<Value, [Point, Point]>

const start = [0, input.findIndex(l => l.includes("S"))] as Point
start[0] = input[start[1]!]!.split("").findIndex(v => v === "S")!

let curr = [-1, -1] as Point
for (const direction of directions) {
	const point = add(start, direction)
	const value = char(point)
	if (!value || value === ".") continue

	if (map[value].find(d => equals(add(d, point), start))) {
		curr = point
		break
	}
}

let prev = start as Point
let perimeter = 1
while (char(curr) !== "S") {
	const value = char(curr)
	const direction = map[value].find(v => !equals(add(v, curr), prev))!

	prev = curr
	curr = add(curr, direction)
	perimeter++
}

console.log(perimeter / 2)
