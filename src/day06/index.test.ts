import { process } from "."
describe("day04", () => {
  test("part 1", () => {
    expect(process("bvwbjplbgvbhsrlpgdmjqwftvncz")).toBe(5)
    expect(process("nppdvjthqldpwncqszvftbrmjlhg")).toBe(6)
    expect(process("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toBe(10)
    expect(process("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toBe(11)
  })

  test("part 2", () => {
    expect(process("mjqjpqmgbljsphdztnvjfqwrcgsmlb", 14)).toBe(19)
    expect(process("bvwbjplbgvbhsrlpgdmjqwftvncz", 14)).toBe(23)
    expect(process("nppdvjthqldpwncqszvftbrmjlhg", 14)).toBe(23)
    expect(process("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 14)).toBe(29)
    expect(process("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 14)).toBe(26)
  })
})
