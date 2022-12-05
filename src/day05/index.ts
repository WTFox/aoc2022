import { readFileSync } from "fs"

type StackOfStacks = Map<number, string[]>

export function processMany(input: string, map: StackOfStacks): string {
  input
    .trim()
    .split("\n")
    .forEach((line) => {
      if (!line.startsWith("move")) {
        return
      }
      const numbers = line.match(/\d+/g)
      if (numbers && numbers.length === 3) {
        // @ts-ignore
        const [qty, from, to] = numbers
        // @ts-ignore
        const thingsToMove = map
          // @ts-ignore
          .get(parseInt(from))
          // @ts-ignore
          .splice(map.get(parseInt(from)).length - qty)
        // @ts-ignore
        map.get(parseInt(to)).push(...thingsToMove)
      }
    })

  return (
    Array.from(map.entries())
      .map((stack) => {
        return stack[1].pop()
      })
      .reduce((acc, val) => acc + (val || ""), "") || ""
  )
}

export function process(input: string, map: StackOfStacks): string {
  input
    .trim()
    .split("\n")
    .forEach((line) => {
      if (!line.startsWith("move")) {
        return
      }
      const numbers = line.match(/\d+/g)
      if (numbers && numbers.length === 3) {
        const [qty, from, to] = numbers
        for (let index = 0; index < parseInt(qty || "0"); index++) {
          // @ts-ignore
          const itemToMove = map.get(parseInt(from)).pop()
          if (itemToMove) {
            // @ts-ignore
            map.get(parseInt(to)).push(itemToMove)
          }
        }
      }
    })

  return (
    Array.from(map.entries())
      .map((stack) => {
        return stack[1].pop()
      })
      .reduce((acc, val) => acc + (val || ""), "") || ""
  )
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
    return process(readFileSync("src/day05/input.txt").toString(), map)
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
    return processMany(readFileSync("src/day05/input.txt").toString(), map)
  },
}
