import { readFileSync } from "fs"

function range(start: string, stop: string): number[] {
  return Array.from(Array(parseInt(stop) - parseInt(start) + 1).keys()).map(
    (x) => x + parseInt(start)
  )
}

export function parseInput(val: string): {
  firstRange: Set<number>
  secondRange: Set<number>
} {
  const [first, second] = val.split(",")
  const firstRange = new Set(
    range(first!.split("-")[0]!, first!.split("-")[1]!)
  )
  const secondRange = new Set(
    range(second!.split("-")[0]!, second!.split("-")[1]!)
  )
  return { firstRange, secondRange }
}

export function countEntireOverlaps(input: string[]): number {
  return input
    .map((val) => {
      if (!val) {
        return 0
      }
      const { firstRange, secondRange } = parseInput(val)
      const intersects = new Set(
        [...new Set(firstRange)].filter((x) => new Set(secondRange).has(x))
      )
      return [firstRange.size, secondRange.size].includes(intersects.size)
        ? 1
        : 0
    })
    .reduce((acc, val) => (acc += val), 0)
}

export function countPartialOverlaps(input: string[]): number {
  return input
    .map((val) => {
      if (!val) {
        return 0
      }
      const { firstRange, secondRange } = parseInput(val)
      const intersects = new Set(
        [...new Set(firstRange)].filter((x) => new Set(secondRange).has(x))
      )
      return intersects.size > 0 ? 1 : 0
    })
    .reduce((acc, val) => (acc += val), 0)
}

export default {
  partOne: () => {
    return countEntireOverlaps(
      readFileSync("src/day04/input.txt", "utf8").toString().split("\n")
    )
  },
  partTwo: () => {
    return countPartialOverlaps(
      readFileSync("src/day04/input.txt", "utf8").toString().split("\n")
    )
  },
}
