import * as fs from "fs"
import * as path from "path"

export function process(input: string) {
  let queue: number[] = [0]
  const instructions = input.trim().split("\n")
  instructions.forEach((val) => {
    const [op, arg] = val.trim().split(" ")
    if (op === "noop") {
      queue.push(0)
    } else if (op === "addx") {
      queue.push(0, parseInt(arg || "0"))
    }
  })

  const CYCLES = [20, 60, 100, 140, 180, 220]
  let X = 1
  const valuesToSum: number[] = []
  queue.forEach((val, idx) => {
    if (CYCLES.includes(idx)) {
      valuesToSum.push(X * idx)
    }

    X += val
  })
  return valuesToSum.reduce((acc, val) => (acc += val), 0)
}

export default {
  partOne: () => {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    return process(input)
  },
  partTwo: () => {
    return "TODO"
  },
}
