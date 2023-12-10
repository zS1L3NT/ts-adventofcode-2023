import file from "../file"

const input = file("actual")

type Point = [number, number]
type Value = "|" | "-" | "L" | "J" | "7" | "F" | "." | "S"
const char = (p: Point) => input[p[1]]?.[p[0]] as Value
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

const coordinates: Point[] = [start]

let prev = start as Point
let perimeter = 1
while (char(curr) !== "S") {
	const value = char(curr)
	const direction = map[value].find(v => !equals(add(v, curr), prev))!

	if (["L", "J", "7", "F"].includes(value)) {
		coordinates.push(curr)
	}

	prev = curr
	curr = add(curr, direction)
	perimeter++
}

// Shoelace Theorem
const count = coordinates.length
let area = 0
for (let i = 0; i < coordinates.length; i++) {
	area += coordinates[i]![0] * coordinates[(i + 1) % count]![1]
}

for (let i = 0; i < coordinates.length; i++) {
	area -= coordinates[(i + 1) % count]![0] * coordinates[i]![1]
}

area /= 2
area = Math.abs(area)

// Pick's Theorem
// Finding i:
// A = area found by Shoelace Theorem
// b = perimeter
console.log(area - perimeter / 2 + 1)
