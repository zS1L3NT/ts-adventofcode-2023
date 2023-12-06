import { readFileSync } from "fs"
import { resolve } from "path"

// eslint-disable-next-line @typescript-eslint/ban-types
export default (name: "actual" | "example" | {}) => {
	return readFileSync(
		resolve(`src/day-${process.argv[1]!.match(/day-(\d+)/)![1]!}/${name}.txt`),
		"utf-8",
	).split("\n")
}
