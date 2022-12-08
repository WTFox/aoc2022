import { countTreesVisible } from "."

describe("day08", () => {
  const testInput = `\
  30373
  25512
  65332
  33549
  35390
  `.trim()

  test("part 1", () => {
    expect(countTreesVisible(testInput)).toBe(21)
  })

  // test("part 2", () => {
  //   expect(true).toBe(false)
  // })
})
