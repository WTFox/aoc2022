import { countEntireOverlaps, countOverlaps } from "."

describe("day04", () => {
  const testInput = `\
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
2-6,4-8 
6-6,4-6
`
    .trim()
    .split("\n")

  test("part 1", () => {
    expect(countEntireOverlaps(testInput)).toEqual(2)
  })

  test("part 2", () => {
    expect(countOverlaps(testInput)).toEqual(4)
  })
})
