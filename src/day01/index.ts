import { readFileSync } from "fs"

export function countCaloriesPerElf(input: string): number[] {
  const calorieCounts = [0]
  input
    .trim()
    .split("\n")
    .forEach((value) => {
      if (!value.length) {
        calorieCounts.push(0)
        return
      }
      calorieCounts[calorieCounts.length - 1] += parseInt(value)
    })
  return calorieCounts
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
      .reduce((totalCalories, calories) => totalCalories + calories, 0)
  },
}
