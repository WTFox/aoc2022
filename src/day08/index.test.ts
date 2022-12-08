import { getVisibleTrees } from "."

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

  // test("part 2", () => {
  //   expect(true).toBe(false)
  // })
})
