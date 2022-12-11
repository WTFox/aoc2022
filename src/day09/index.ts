import * as fs from "fs"
import * as path from "path"

export type Position = {
  x: number
  y: number
}

type AllowedDirection = "U" | "R" | "D" | "L"
export const Directions: Map<AllowedDirection, Position> = new Map([
  ["U", { x: 0, y: 1 }],
  ["R", { x: 1, y: 0 }],
  ["D", { x: 0, y: -1 }],
  ["L", { x: -1, y: 0 }],
])

export class Knot {
  public history: string[]

  constructor(public parent?: Knot) {
    this.parent = parent
    this.history = ["0,0"]
  }

  get pos(): Position {
    if (this.history.length === 0) {
      throw new Error("Oh no")
    }
    const latest = this.history[this.history.length - 1] as string
    const [x, y] = latest.split(",").map(Number)
    return { x, y } as Position
  }

  public step(direction: "U" | "R" | "D" | "L") {
    const d = Directions.get(direction) as Position
    const newLocation: Position = {
      x: this.pos.x + d.x,
      y: this.pos.y + d.y,
    }
    this.history.push(`${newLocation.x},${newLocation.y}`)
  }

  public follow() {
    const [x, y] = [this.parent?.pos.x, this.parent?.pos.y] as [number, number]
    const dist_x = x - this.pos.x
    const dist_y = y - this.pos.y
    const newLocation = this.pos

    if (Math.abs(dist_x) === 2 && dist_y === 0) {
      const xv = dist_x > 0 ? 1 : -1
      newLocation.x += xv
    } else if (Math.abs(dist_y) === 2 && dist_x === 0) {
      const yv = dist_y > 0 ? 1 : -1
      newLocation.y += yv
    } else if (
      (Math.abs(dist_y) === 2 && [1, 2].includes(Math.abs(dist_x))) ||
      (Math.abs(dist_x) === 2 && [1, 2].includes(Math.abs(dist_y)))
    ) {
      const xv = dist_x > 0 ? 1 : -1
      newLocation.x += xv
      const yv = dist_y > 0 ? 1 : -1
      newLocation.y += yv
    }
    this.history.push(`${newLocation.x},${newLocation.y}`)
  }
}

export function doTheMoves(input: string, numKnots: number): number {
  const head = new Knot()
  const knots: Knot[] = []

  let lastKnot = head
  for (let i = 0; i < numKnots - 1; i++) {
    const knot = new Knot(lastKnot)
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
      for (let index = 0; index < amt; index++) {
        head.step(direction.trim().toUpperCase() as AllowedDirection)
        for (const knot of knots) {
          knot.follow()
        }
      }
    })
  return new Set([...lastKnot.history]).size
}

export function plotPointsOnAsciiGrid(points: Position[]): string {
  const minX = Math.min(...points.map((p) => p.x))
  const maxX = Math.max(...points.map((p) => p.x)) + 1
  const minY = Math.min(...points.map((p) => p.y))
  const maxY = Math.max(...points.map((p) => p.y))

  const grid: string[][] = []
  for (let y = minY; y <= maxY; y++) {
    grid.push([])
    for (let x = minX; x <= maxX; x++) {
      // @ts-ignore
      grid[y - minY].push(".")
    }
  }

  for (const point of points) {
    // @ts-ignore
    grid[point.y - minY][point.x - minX] = "#"
  }

  return grid
    .reverse()
    .map((row) => row.join(""))
    .join("\n")
}

export default {
  partOne: () => {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    return doTheMoves(input, 2)
  },
  partTwo: () => {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    return doTheMoves(input, 10)
  },
}
