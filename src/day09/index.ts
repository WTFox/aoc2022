type Point = {
  x: number
  y: number
}

export const Directions = {
  Up: { x: 0, y: 1 },
  Right: { x: 1, y: 0 },
  Down: { x: 0, y: -1 },
  Left: { x: -1, y: 0 },
}

export class Mover {
  public history: Point[]

  constructor() {
    this.history = [{ x: 0, y: 0 }]
  }

  get currentPosition(): Point {
    if (this.history.length === 0) {
      throw new Error("Oh no")
    }
    return (
      this.history[this.history.length - 1] || { x: 999999999, y: 999999999 }
    )
  }

  public move(d: Point, amount: number) {
    for (let index = 0; index < amount; index++) {
      const newLocation: Point = {
        x: this.currentPosition.x + d.x,
        y: this.currentPosition.y + d.y,
      }
      this.history.push(newLocation)
    }
  }

  public isTouching(other: Mover) {
    return [
      this.currentPosition,
      Directions.Up,
      Directions.Right,
      Directions.Down,
      Directions.Left,
    ]
      .map((point) => {
        if (
          point.x === other.currentPosition.x &&
          point.y === other.currentPosition.y
        ) {
          return 1
        }
        return 0
      })
      .some((x) => x === 1)
  }
}

export function doTheMoves(input: string): number {
  const H = new Mover()

  input
    .trim()
    .split("\n")
    .forEach((line) => {
      const [direction, amount] = line.trim().split(" ")
      switch (direction?.trim().toUpperCase()) {
        case "U":
          H.move(Directions.Up, parseInt(amount || "0", 10))
          break
        case "R":
          H.move(Directions.Right, parseInt(amount || "0", 10))
          break
        case "D":
          H.move(Directions.Down, parseInt(amount || "0", 10))
          break
        case "L":
          H.move(Directions.Left, parseInt(amount || "0", 10))
          break
      }
    })

  console.log(H.history)
  /* return new Set(T.history).size */
  return 1
}

export default {
  partOne: () => {
    return
  },
  partTwo: () => {
    return
  },
}
