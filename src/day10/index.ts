import * as fs from "fs"
import * as path from "path"

class CRT {
  public static width = 40
  private _buffer: string[]

  constructor() {
    this._buffer = []
  }

  public write(val: string) {
    this._buffer.push(val)
  }

  public render(): string {
    return (
      this._buffer
        .slice(0, -1)
        .join("")
        .match(/.{1,40}/g)
        ?.join("\n") || ""
    )
  }
}

export function buildCPUQueue(instructions: string[]): number[] {
  let queue: number[] = [0]
  instructions.forEach((val) => {
    const [op, arg] = val.trim().split(" ")
    if (op === "noop") {
      queue.push(0)
    } else if (op === "addx") {
      queue.push(0, parseInt(arg || "0"))
    }
  })
  return queue
}

export function processCPUQueue(input: string) {
  let X = 1
  let output = 0
  buildCPUQueue(input.trim().split("\n")).forEach((val, idx) => {
    if ([20, 60, 100, 140, 180, 220].includes(idx)) {
      output += X * idx
    }
    X += val
  })
  return output
}

export function writeToCRT(input: string) {
  let X = 1
  let crt = new CRT()
  buildCPUQueue(input.trim().split("\n")).forEach((val, idx) => {
    X += val
    let displayValue = "."
    if ([X - 1, X, X + 1].includes(idx % 40)) {
      displayValue = "#"
    }
    crt.write(displayValue)
  })
  return crt.render()
}

export default {
  partOne: () => {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    return processCPUQueue(input)
  },
  partTwo: () => {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    return writeToCRT(input)
  },
}
