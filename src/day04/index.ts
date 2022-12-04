import { readFileSync } from "fs"

function range(start: string, end: string): number[] {
  var ans = []
  for (let i = parseInt(start); i <= parseInt(end); i++) {
    ans.push(i)
  }
  return ans
}

export function countEntireOverlaps(input: string[]): number {
  let count = 0
  input.forEach((val) => {
    if (!val) {
      return
    }
    const [first, second] = val.split(",")
    const firstRange = range(first!.split("-")[0]!, first!.split("-")[1]!)
    const secondRange = range(second!.split("-")[0]!, second!.split("-")[1]!)

    if (first === second) {
      ++count
      return
    }

    const largerArray =
      firstRange.length > secondRange.length ? firstRange : secondRange
    const smallerArray =
      firstRange.length > secondRange.length ? secondRange : firstRange

    count +=
      largerArray.filter((val) => {
        return [...smallerArray].includes(val)
      }).length === smallerArray.length
        ? 1
        : 0
  })
  return count
}

export function countOverlaps(input: string[]): number {
  let count = 0
  input.forEach((val) => {
    if (!val) {
      return
    }
    const [first, second] = val.split(",")
    const firstRange = range(first!.split("-")[0]!, first!.split("-")[1]!)
    const secondRange = range(second!.split("-")[0]!, second!.split("-")[1]!)

    if (first === second) {
      ++count
      return
    }

    const largerArray =
      firstRange.length > secondRange.length ? firstRange : secondRange
    const smallerArray =
      firstRange.length > secondRange.length ? secondRange : firstRange

    count +=
      largerArray.filter((val) => {
        return [...smallerArray].includes(val)
      }).length > 0
        ? 1
        : 0
  })
  return count
}

export default {
  partOne: () => {
    return countEntireOverlaps(
      readFileSync("src/day04/input.txt", "utf8").toString().split("\n")
    )
  },
  partTwo: () => {
    return countOverlaps(
      readFileSync("src/day04/input.txt", "utf8").toString().split("\n")
    )
  },
}
