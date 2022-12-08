// @ts-nocheck
import { readFileSync } from "fs"

function buildGrid(input: string): number[][] {
  const arr = []
  for (const line of input.split("\n")) {
    arr.push(line.split("").map(Number))
  }
  return arr
}

export function countTreesVisible(input: string): number {
  // iterate over each row and column, excluding the first and last items
  // for each item, check if it is greater than the items to the left and right
  // if it is, check if it is greater than the items above and below
  // if it is, increment the count
  let count = 0
  const found: number[] = []
  const grid = buildGrid(input)
  for (let rowID = 0; rowID < grid.length; rowID++) {
    for (let colID = 0; colID < grid[rowID].length; colID++) {
      const row = grid[rowID]
      const col = grid.map((row) => row[colID])
      if (
        [...row.slice(0, colID), ...row.slice(colID + 1)].some(
          (item) => item >= row[colID]
        ) ||
        [...col.slice(0, rowID), ...col.slice(rowID + 1)].some(
          (item) => item >= col[rowID]
        )
      ) {
        found.push(grid[rowID][colID])
        ++count
      }
    }
  }
  console.log(found)
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
