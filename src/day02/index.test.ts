import {
  calculateTotalScore,
  calculateTotalScoreWithInstruction,
  getChoice,
  scoreRound,
} from "."

describe("day02", () => {
  const testInput = `
A Y
B X
C Z`
    .trim()
    .split("\n")

  test("part 1", () => {
    // win
    expect(scoreRound("A", "Y")).toEqual(8)
    // loss
    expect(scoreRound("B", "X")).toEqual(1)
    //draw
    expect(scoreRound("C", "Z")).toEqual(6)

    // score
    expect(calculateTotalScore(testInput)).toEqual(15)
  })

  test("part 2", () => {
    // draw
    expect(getChoice("A", "Y")).toEqual("X")
    // lose
    expect(getChoice("B", "X")).toEqual("X")
    // win
    expect(getChoice("C", "Z")).toEqual("X")

    // total score
    expect(calculateTotalScoreWithInstruction(testInput)).toEqual(12)
  })
})
