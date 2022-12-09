import {
  buildGrid,
  getHighestViewingScore,
  getVisibleTrees,
  viewScore,
} from "."

describe("day08", () => {
  const testInput = `\
  30373
  25512
  65332
  33549
  35390
  `.trim()

  test("part 1", () => {
    expect(getVisibleTrees(testInput).length).toBe(21)
  })

  test("part 2", () => {
    expect(viewScore(1, 2, buildGrid(testInput))).toBe(4)
    expect(viewScore(3, 2, buildGrid(testInput))).toBe(8)
    expect(getHighestViewingScore(testInput)).toBe(8)
  })
})
