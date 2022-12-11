import { Monkey, process } from "."

// lcm of 23, 19, 13, 17 is 5985
const monkies = new Map<number, Monkey>([
  [
    0,
    new Monkey(
      [79, 98],
      5985,
      (old: number) => old * 19,
      (item: number) => (item % 23 === 0 ? 2 : 3)
    ),
  ],
  [
    1,
    new Monkey(
      [54, 65, 75, 74],
      5985,
      (old: number) => old + 6,
      (item: number) => (item % 19 === 0 ? 2 : 0)
    ),
  ],
  [
    2,
    new Monkey(
      [79, 60, 97],
      5985,
      (old: number) => old * old,
      (item: number) => (item % 13 === 0 ? 1 : 3)
    ),
  ],
  [
    3,
    new Monkey(
      [74],
      5985,
      (old: number) => old + 3,
      (item: number) => (item % 17 === 0 ? 0 : 1)
    ),
  ],
])

describe("day11", () => {
  test("part 1", () => {
    expect(process(monkies, 20, true)).toBe(10605)
  })
  test("part 2", () => {
    expect(process(monkies, 10000, false)).toBe(2713310158)
  })
})
