import { readFileSync } from "fs"

type choiceA = "A" | "B" | "C"
type choiceB = "X" | "Y" | "Z"

const points = new Map<choiceA | choiceB, number>([
  ["A", 1],
  ["B", 2],
  ["C", 3],
  ["X", 1],
  ["Y", 2],
  ["Z", 3],
])

const wins = new Map<choiceA, choiceB>([
  ["A", "Z"],
  ["B", "X"],
  ["C", "Y"],
])

const losses = new Map<choiceA, choiceB>([
  ["A", "Y"],
  ["B", "Z"],
  ["C", "X"],
])

const draws = new Map<choiceA, choiceB>([
  ["A", "X"],
  ["B", "Y"],
  ["C", "Z"],
])

export function scoreRound(opponent: choiceA, me: choiceB): number {
  // I win
  if (losses.get(opponent) === me) {
    return points.get(me)! + 6
  }

  // they win
  if (wins.get(opponent) === me) {
    return points.get(me)!
  }

  // draw
  return points.get(me)! + 3
}

export function getChoice(opponent: choiceA, instruction: choiceB): choiceB {
  // They win
  if (instruction === "X") {
    return wins.get(opponent)!
  }
  // Draw
  if (instruction === "Y") {
    return draws.get(opponent)!
  }
  // I win
  return losses.get(opponent)!
}

export function calculateTotalScoreWithInstruction(rounds: string[]): number {
  return rounds
    .map((round) => {
      const [opponent, instruction] = round.split(" ") as [choiceA, choiceB]
      return scoreRound(opponent, getChoice(opponent, instruction))
    })
    .reduce((sum, val) => (sum += val), 0)
}

export function calculateTotalScore(rounds: string[]): number {
  return rounds
    .map((round) => {
      const [opponent, me] = round.split(" ") as [choiceA, choiceB]
      return scoreRound(opponent, me)
    })
    .reduce((sum, val) => (sum += val), 0)
}

export default {
  partOne: () => {
    return calculateTotalScore(
      readFileSync("src/day02/input.txt").toString().split("\n")
    )
  },
  partTwo: () => {
    return calculateTotalScoreWithInstruction(
      readFileSync("src/day02/input.txt").toString().split("\n")
    )
  },
}
