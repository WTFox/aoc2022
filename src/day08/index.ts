// @ts-nocheck
import { readFileSync } from "fs"

export function buildGrid(input: string): number[][] {
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

function iterGrid(grid: number[][], cb: (row: number, col: number) => void) {
  for (let rowID = 0; rowID < grid.length; rowID++) {
    for (let colID = 0; colID < grid.length; colID++) {
      cb(rowID, colID)
    }
  }
}

export function getVisibleTrees(input: string): number[][] {
  const found: number[][] = []
  const grid = buildGrid(input)

  iterGrid(grid, (rowID: number, colID: number) => {
    const row = grid[rowID]
    if (typeof row === "undefined") return

    const tree = row[colID]
    const col = grid.map((row) => row[colID] || 0)
    if (
      isTreeVisible(row.slice(0, colID), tree) ||
      isTreeVisible(row.slice(colID + 1), tree) ||
      isTreeVisible(col.slice(0, rowID), tree) ||
      isTreeVisible(col.slice(rowID + 1), tree)
    ) {
      found.push([rowID, colID])
    }
  })

  return found
}

function countTree(startingTree: number, direction: number[]): number {
  let score = 0
  for (const tree of direction) {
    ++score
    if (tree && tree >= startingTree) {
      return score
    }
  }
  return score
}

export function viewScore(
  rowId: number,
  colId: number,
  grid: number[][]
): number {
  const row = grid[rowId]
  if (typeof row === "undefined") return 0
  const startingTree = row[colId]
  if (typeof startingTree === "undefined") return 0

  const above = grid
    .filter((_, i) => i < rowId)
    .map((row) => row[colId])
    .reverse()
  const below = grid.filter((_, i) => i > rowId).map((row) => row[colId])
  const left = row.slice(0, colId).reverse()
  const right = row.slice(colId + 1)

  const scores: number[] = []
  for (const direction of [above, below, left, right]) {
    scores.push(countTree(startingTree, direction))
  }
  return scores[0] * scores[1] * scores[2] * scores[3]
}

export function getHighestViewingScore(
  trees: number[][],
  grid: number[][]
): number {
  let bestSoFar = 0
  iterGrid(buildGrid(input), (rowID: number, colID: number) => {
    bestSoFar = Math.max(viewScore(rowID, colID, grid), bestSoFar)
  })
  return bestSoFar
}

export default {
  partOne: () => {
    const input = readFileSync("src/day08/input.txt", "utf8").toString()

    const result = getVisibleTrees(input).length
    if (result !== 1816) {
      throw new Error("Test failed")
    }
    return result
  },
  partTwo: () => {
    const input = readFileSync("src/day04/input.txt", "utf8").toString()
    const trees = getVisibleTrees(input)
    const grid = buildGrid(input)

    return getHighestViewingScore(trees, grid)
  },
}
