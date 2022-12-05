import { readFileSync } from "fs"

export function moveCrates(
  input: string,
  stacks: Map<number, string[]>,
  preserveOrder = true
): string {
  const lines = input
    .trim()
    .split("\n")
    .filter((line) => line.startsWith("move"))

  for (const line of lines) {
    const numbers = line.match(/(\d+)/g)
    if (!numbers) {
      throw new Error("Could not find numbers in line: " + line)
    }

    const [qty, from, to] = numbers.map(Number)
    let thingsToMove = stacks.get(from || -1)?.splice(-(qty || 0)) || []
    if (preserveOrder) {
      thingsToMove = thingsToMove.reverse()
    }
    stacks.get(to || -1)?.push(...thingsToMove)
  }

  return Array.from(stacks.values())
    .map((stack) => stack[stack.length - 1])
    .join("")
}

export default {
  partOne: () => {
    const input = readFileSync("src/day05/input.txt").toString()
    const stacks = new Map<number, string[]>([
      [1, ["L", "N", "W", "T", "D"]],
      [2, ["C", "P", "H"]],
      [3, ["W", "P", "H", "N", "D", "G", "M", "J"]],
      [4, ["C", "W", "S", "N", "T", "Q", "L"]],
      [5, ["P", "H", "C", "N"]],
      [6, ["T", "H", "N", "D", "M", "W", "Q", "B"]],
      [7, ["M", "B", "R", "J", "G", "S", "L"]],
      [8, ["Z", "N", "W", "G", "V", "B", "R", "T"]],
      [9, ["W", "G", "D", "N", "P", "L"]],
    ])
    return moveCrates(input, stacks)
  },
  partTwo: () => {
    const input = readFileSync("src/day05/input.txt").toString()
    const stacks = new Map<number, string[]>([
      [1, ["L", "N", "W", "T", "D"]],
      [2, ["C", "P", "H"]],
      [3, ["W", "P", "H", "N", "D", "G", "M", "J"]],
      [4, ["C", "W", "S", "N", "T", "Q", "L"]],
      [5, ["P", "H", "C", "N"]],
      [6, ["T", "H", "N", "D", "M", "W", "Q", "B"]],
      [7, ["M", "B", "R", "J", "G", "S", "L"]],
      [8, ["Z", "N", "W", "G", "V", "B", "R", "T"]],
      [9, ["W", "G", "D", "N", "P", "L"]],
    ])
    return moveCrates(input, stacks, false)
  },
}
