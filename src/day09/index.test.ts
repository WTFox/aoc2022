import { doTheMoves } from "."

describe("day09", () => {
  const testInput = `\
  R 4
  U 4
  L 3
  D 1
  R 4
  D 1
  L 5
  R 2
  `.trim()

  test("part 1", () => {
    expect(doTheMoves(testInput, 2)).toBe(13)
    expect(doTheMoves(testInput, 10)).toBe(1)
  })

  test("part 2", () => {
    const testInput2 = `\
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`.trim()
    expect(doTheMoves(testInput2, 10)).toBe(36)
  })
})
