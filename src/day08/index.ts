// @ts-nocheck
import { readFileSync } from "fs"

function buildGrid(input: string): number[][] {
  const arr = []
  for (const line of input.trim().split("\n")) {
    arr.push(line.trim().split("").map(Number))
  }
  return arr
}

export function countTreesVisible(input: string): number {
  const found: number[] = []
  const grid = buildGrid(input)
  let count = 0
  for (let rowID = 0; rowID < grid.length; rowID++) {
    for (let colID = 0; colID < grid.length; colID++) {
      const row = grid[rowID]
      const col = grid.map((row) => row[colID])
      const tree = row[colID]

      const leftOfTree = row.slice(0, colID)
      const rightOfTree = row.slice(colID + 1)
      const topOfTree = col.slice(0, rowID)
      const bottomOfTree = col.slice(rowID + 1)

      const isVisible = (arr: number[], tree: number) => {
        if (arr.length === 0) {
          // we've reached the edge of the grid
          return true
        }
        for (const otherTree of arr) {
          if (otherTree >= tree) {
            return false
          }
        }
        return true
      }

      const visibleLeft = isVisible(leftOfTree, tree)
      const visibleRight = isVisible(rightOfTree, tree)
      const visibleTop = isVisible(topOfTree, tree)
      const visibleBottom = isVisible(bottomOfTree, tree)

      if (visibleLeft || visibleRight || visibleTop || visibleBottom) {
        found.push(tree)
        count++
      }
    }
  }
  // console.log(found)
  return count
}

export default {
  partOne: () => {
    const input = readFileSync("src/day08/input.txt", "utf8").toString()

    return countTreesVisible(input)
  },
  partTwo: () => {
    // const input = readFileSync("src/day04/input.txt", "utf8").toString()
    return "TODO"
  },
}
