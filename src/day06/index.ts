import { readFileSync } from "fs"

export function process(input: string, uniqueness = 4): number {
  for (let i = 0; i < input.length - uniqueness; i++) {
    if (new Set(input.slice(i, i + uniqueness)).size === uniqueness) {
      return i + uniqueness
    }
  }
  return -1
}

export default {
  partOne: () => {
    return process(readFileSync("src/day06/input.txt", "utf8").toString())
  },
  partTwo: () => {
    return process(readFileSync("src/day06/input.txt", "utf8").toString(), 14)
  },
}
