import { countCaloriesPerElf, getMaxCalorieCount } from "."

describe("day01", () => {
  const input = `\
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
    `.trim()

  test("countCaloriesPerElf", () => {
    expect(countCaloriesPerElf(input)).toEqual([
      6000, 4000, 11000, 24000, 10000,
    ])
  })

  test("getMaxCalorieCount", () => {
    expect(getMaxCalorieCount(input)).toEqual(24000)
  })
})
