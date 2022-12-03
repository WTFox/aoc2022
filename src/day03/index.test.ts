import { process, processThree } from "."

describe("day03", () => {
  const testInput = `\
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`.trim()

  test("part 1", () => {
    expect(process(testInput)).toEqual(157)
  })

  test("part 2", () => {
    expect(processThree(testInput)).toEqual(70)
  })
})
