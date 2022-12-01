import { readFileSync } from "fs"

export function countCaloriesPerElf(input: string): number[] {
  let counts = [0]
  input
    .trim()
    .split("\n")
    .forEach((value, _) => {
      if (!value.length) {
        counts.push(0)
        return
      }
      counts[counts.length - 1] += parseInt(value)
    })
  return counts
}

export function getMaxCalorieCount(input: string): number {
  return Math.max(...countCaloriesPerElf(input))
}

export default {
  partOne: () => {
    return getMaxCalorieCount(readFileSync("src/day01/input.txt").toString())
  },
  partTwo: () => {
    return countCaloriesPerElf(readFileSync("src/day01/input.txt").toString())
      .sort((a, b) => a - b)
      .slice(-3)
      .reduce((acc, val) => acc + val, 0)
  },
}
