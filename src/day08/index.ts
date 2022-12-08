import { readFileSync } from "fs"

function buildGrid(input: string): number[][] {
  const arr = []
  for (const line of input.trim().split("\n")) {
    arr.push(line.trim().split("").map(Number))
  }
  return arr
}

function isTreeVisible(arr: number[], tree: number | undefined): boolean {
  if (typeof tree === "undefined") return false
  if (arr.length === 0) {
    return true
  }
  for (const otherTree of arr) {
    if (otherTree >= tree) {
      return false
    }
  }
  return true
}

export function getVisibleTrees(input: string): number[][] {
  const found: number[][] = []
  const grid = buildGrid(input)

  for (let rowID = 0; rowID < grid.length; rowID++) {
    const row = grid[rowID]
    if (typeof row === "undefined") continue
    for (let colID = 0; colID < grid.length; colID++) {
      const tree = grid[rowID]?.[colID]
      const col = grid.map((row) => row[colID] || 0)
      if (
        isTreeVisible(row.slice(0, colID), tree) ||
        isTreeVisible(row.slice(colID + 1), tree) ||
        isTreeVisible(col.slice(0, rowID), tree) ||
        isTreeVisible(col.slice(rowID + 1), tree)
      ) {
        found.push([rowID, colID])
      }
    }
  }
  return found
}

export default {
  partOne: () => {
    const input = readFileSync("src/day08/input.txt", "utf8").toString()

    const result = getVisibleTrees(input).length
    // if (result !== 1816) {
    //   throw new Error("Test failed")
    // }
    return result
  },
  partTwo: () => {
    // const input = readFileSync("src/day04/input.txt", "utf8").toString()
    return "TODO"
  },
}
