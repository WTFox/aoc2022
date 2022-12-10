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

export class Knot {
  public history: string[]

  constructor(public name: string, public parent?: Knot) {
    this.name = name
    this.parent = parent
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

  public isTouchingParent() {
    if (!this.parent) {
      throw new Error("Where's my daddy?")
    }
    const a = this.currentPosition
    const b = this.parent.currentPosition as Point
    return arePointsTouching(a, b)
  }
}

export function arePointsTouching(a: Point, b: Point) {
  if (a.x === b.x && a.y === b.y) {
    return true
  }
  const x = a.x
  const y = a.y
  const x1 = b.x
  const y1 = b.y
  if (x1 >= x - 1 && x1 <= x + 1 && y1 >= y - 1 && y1 <= y + 1) {
    return true
  }
  return false
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

export function doTheMoves(input: string, numKnots = 1): number {
  const head = new Knot("HEAD")
  const knots: Knot[] = []

  let lastKnot = head
  for (let i = 0; i < numKnots; i++) {
    const knot = new Knot(String(i), lastKnot)
    knots.push(knot)
    lastKnot = knot
  }

  input
    .trim()
    .split("\n")
    .forEach((line) => {
      const [direction, amount] = line.trim().split(" ")
      if (!direction || !amount) {
        throw new Error("Oh no")
      }

      const amt = parseInt(amount.trim())
      const dir = Directions.get(
        direction.trim().toUpperCase() as "U" | "R" | "D" | "L"
      ) as Point

      // move the head by the specified amount
      for (let index = 0; index < amt; index++) {
        head.moveDirection(dir)

        // move the other knots, in order
        for (const knot of knots) {
          if (knot.isTouchingParent()) {
            continue
          }

          if (!knot.parent) {
            throw new Error("WHY")
          }

          const distance = distanceBetweenPoints(
            knot.parent.currentPosition,
            knot.currentPosition
          )
          if (distance > 2) {
            // too far away, adjust
            knot.setLocation({
              x: knot.parent.currentPosition.x + returnOppositeMove(dir).x,
              y: knot.parent.currentPosition.y + returnOppositeMove(dir).y,
            })
          } else {
            // move regularly
            const lastLocationFromParent = knot.parent.history.slice(
              -1
            )[0] as string
            const [x, y] = lastLocationFromParent.split(",").map(Number)
            knot.setLocation({ x, y } as Point)
          }
        }
      }
    })
  return new Set([...(knots.slice(-1)[0] as Knot).history]).size
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
