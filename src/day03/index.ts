import { readFileSync } from "fs"

export function intersection(first: string, second: string): Set<string> {
  return new Set([...new Set(first)].filter((x) => new Set(second).has(x)))
}

export function getBadgePriority(x: string): number {
  let charCode: number = x.charCodeAt(0) - 38
  if (x === x.toLowerCase()) {
    return (charCode -= 58)
  }
  return charCode
}

export function process(input: string): number {
  let sum = 0
  input.split("\n").map((val) => {
    const first = val.slice(0, val.length / 2)
    const second = val.slice(val.length / 2)
    intersection(first, second).forEach((x) => {
      sum += getBadgePriority(x)
    })
  })
  return sum
}

export function processThree(input: string): number {
  const types = []
  const values = input.split("\n")
  for (let index = 0; index < values.length - 2; index += 3) {
    types.push(
      Array.from(new Set([...values[index]!])).filter((x) =>
        intersection(values[index + 1]!, values[index + 2]!).has(x)
      )[0]!
    )
  }
  return types.reduce((acc, val) => {
    return (acc += getBadgePriority(val))
  }, 0)
}

export default {
  partOne: () => {
    return process(readFileSync("src/day03/input.txt", "utf8").toString())
  },
  partTwo: () => {
    return processThree(readFileSync("src/day03/input.txt", "utf8").toString())
  },
}
