import * as fs from "fs"
import * as path from "path"

export type Point = {
  x: number
  y: number
}

export const Directions: Map<"U" | "R" | "D" | "L", Point> = new Map([
  ["U", { x: 0, y: 1 }],
  ["R", { x: 1, y: 0 }],
  ["D", { x: 0, y: -1 }],
  ["L", { x: -1, y: 0 }],
])

export class Mover {
  public history: string[]

  constructor() {
    this.history = ["0,0"]
  }

  get currentPosition(): Point {
    if (this.history.length === 0) {
      throw new Error("Oh no")
    }
    const latest = this.history[this.history.length - 1] as string
    const [x, y] = latest.split(",").map(Number)
    return { x, y } as Point
  }

  public moveDirection(d: Point) {
    const newLocation: Point = {
      x: this.currentPosition.x + d.x,
      y: this.currentPosition.y + d.y,
    }
    this.history.push(`${newLocation.x},${newLocation.y}`)
  }

  public setLocation(d: Point) {
    const newLocation: Point = {
      x: d.x,
      y: d.y,
    }
    this.history.push(`${newLocation.x},${newLocation.y}`)
  }

  public static isTouching(a: Point, b: Point) {
    if (a.x === b.x && a.y === b.y) {
      return true
    }

    // check if b is in a's surrounding 9 squares
    const x = a.x
    const y = a.y
    const x1 = b.x
    const y1 = b.y
    if (x1 >= x - 1 && x1 <= x + 1 && y1 >= y - 1 && y1 <= y + 1) {
      return true
    }
    return false
  }
}

export function distanceBetweenPoints(a: Point, b: Point) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

function returnOppositeMove(d: Point) {
  if (d.x === 0) {
    if (d.y === 1) {
      return Directions.get("D") as Point
    }
    return Directions.get("U") as Point
  }
  if (d.x === 1) {
    return Directions.get("L") as Point
  }
  return Directions.get("R") as Point
}

export function doTheMoves(input: string): number {
  const H = new Mover()
  const T = new Mover()

  input
    .trim()
    .split("\n")
    .forEach((line) => {
      let [direction, amount] = line.trim().split(" ")
      if (!direction || !amount) {
        throw new Error("Oh no")
      }
      const amt = parseInt(amount.trim())
      const dir = Directions.get(
        direction.trim().toUpperCase() as "U" | "R" | "D" | "L"
      ) as Point

      if (!dir) {
        throw new Error("No dir parsed")
      }

      console.log("Line: ", line)
      for (let index = 0; index < amt; index++) {
        console.log("Moving from: ")
        console.log({ H: H.currentPosition })

        H.moveDirection(dir)

        console.log("To: ")
        console.log({ H: H.currentPosition })
        console.log(" ")

        if (!Mover.isTouching(T.currentPosition, H.currentPosition)) {
          console.log("Not touching")
          const distance = distanceBetweenPoints(
            H.currentPosition,
            T.currentPosition
          )
          if (distance > 2) {
            const newLocation = {
              x: H.currentPosition.x + returnOppositeMove(dir).x,
              y: H.currentPosition.y + returnOppositeMove(dir).y,
            }
            T.setLocation(newLocation)
          } else {
            T.moveDirection(dir)
          }
        }
        console.log("T: ", T.currentPosition)
        console.log(" ")
      }
      console.log(" --- \n")
    })
  console.log({ tHist: new Set(T.history) })
  return new Set(T.history).size
}

export default {
  partOne: () => {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    return doTheMoves(input)
  },
  partTwo: () => {
    return
  },
}
