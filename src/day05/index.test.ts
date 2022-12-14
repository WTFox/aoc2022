import { moveCrates } from "."

describe("day05", () => {
  const testInput = `\
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`

  test("part 1", () => {
    const stacks = new Map<number, string[]>([
      [1, ["Z", "N"]],
      [2, ["M", "C", "D"]],
      [3, ["P"]],
    ])
    expect(moveCrates(testInput, stacks)).toBe("CMZ")
  })

  test("part 2", () => {
    const stacks = new Map<number, string[]>([
      [1, ["Z", "N"]],
      [2, ["M", "C", "D"]],
      [3, ["P"]],
    ])
    expect(moveCrates(testInput, stacks, false)).toBe("MCD")
  })
})
