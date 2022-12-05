import { readFileSync } from "fs"

type StackOfStacks = Map<number, string[]>

export function topOfEachStack(stacks: StackOfStacks): string {
  return Array.from(stacks.values())
    .map((stack) => stack[stack.length - 1])
    .join("")
}

export function crateMover9000(
  input: string,
  map: StackOfStacks,
  inOrder = true
): string {
  input
    .trim()
    .split("\n")
    .forEach((line) => {
      if (!line.startsWith("move")) {
        return
      }
      const numbers = line.match(/\d+/g)
      if (!numbers) {
        return
      }
      const [qty, from, to] = numbers.map(Number)
      let thingsToMove = map.get(from || -1)?.splice(-(qty || 0)) || []
      if (inOrder) {
        thingsToMove = thingsToMove.reverse()
      }
      map.get(to || -1)?.push(...thingsToMove)
    })
  return topOfEachStack(map)
}

export default {
  partOne: () => {
    const map = new Map<number, string[]>([
      [1, "LNWTD".split("")],
      [2, "CPH".split("")],
      [3, "WPHNDGMJ".split("")],
      [4, "CWSNTQL".split("")],
      [5, "PHCN".split("")],
      [6, "THNDMWQB".split("")],
      [7, "MBRJGSL".split("")],
      [8, "ZNWGVBRT".split("")],
      [9, "WGDNPL".split("")],
    ])
    return crateMover9000(readFileSync("src/day05/input.txt").toString(), map)
  },
  partTwo: () => {
    const map = new Map<number, string[]>([
      [1, "LNWTD".split("")],
      [2, "CPH".split("")],
      [3, "WPHNDGMJ".split("")],
      [4, "CWSNTQL".split("")],
      [5, "PHCN".split("")],
      [6, "THNDMWQB".split("")],
      [7, "MBRJGSL".split("")],
      [8, "ZNWGVBRT".split("")],
      [9, "WGDNPL".split("")],
    ])
    return crateMover9000(
      readFileSync("src/day05/input.txt").toString(),
      map,
      true
    )
  },
}
