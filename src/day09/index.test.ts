import {
  arePointsTouching,
  Directions,
  distanceBetweenPoints,
  doTheMoves,
  Knot,
  Point,
} from "."

describe("day09", () => {
  const testInput = `\
  R 4
  U 4
  L 3
  D 1
  R 4
  D 1
  L 5
  R 2
  `.trim()

  test("moving once", () => {
    let m = new Knot("head")
    expect(m.currentPosition).toEqual({ x: 0, y: 0 })

    m.moveDirection(Directions.get("U") as Point)
    expect(m.currentPosition).toEqual({ x: 0, y: 1 })

    m = new Knot("head")
    m.moveDirection(Directions.get("D") as Point)
    expect(m.currentPosition).toEqual({ x: 0, y: -1 })

    m = new Knot("head")
    m.moveDirection(Directions.get("L") as Point)
    expect(m.currentPosition).toEqual({ x: -1, y: 0 })

    m = new Knot("head")
    m.moveDirection(Directions.get("R") as Point)
    expect(m.currentPosition).toEqual({ x: 1, y: 0 })
  })

  test("moving multiple", () => {
    let m = new Knot("head")
    expect(m.currentPosition).toEqual({ x: 0, y: 0 })

    m.moveDirection(Directions.get("R") as Point)
    expect(m.currentPosition).toEqual({ x: 1, y: 0 })

    m.moveDirection(Directions.get("U") as Point)
    expect(m.currentPosition).toEqual({ x: 1, y: 1 })

    m.moveDirection(Directions.get("L") as Point)
    expect(m.currentPosition).toEqual({ x: 0, y: 1 })

    m.moveDirection(Directions.get("D") as Point)
    expect(m.currentPosition).toEqual({ x: 0, y: 0 })
  })

  test("isTouching", () => {
    expect(arePointsTouching({ x: 0, y: 0 }, { x: 0, y: 0 })).toBe(true)
    expect(arePointsTouching({ x: 0, y: 0 }, { x: 0, y: 1 })).toBe(true)
    expect(arePointsTouching({ x: 0, y: 0 }, { x: 1, y: 0 })).toBe(true)
    expect(arePointsTouching({ x: 0, y: 0 }, { x: 0, y: -1 })).toBe(true)
    expect(arePointsTouching({ x: 0, y: 0 }, { x: -1, y: 0 })).toBe(true)
    expect(arePointsTouching({ x: 0, y: 0 }, { x: 1, y: 2 })).toBe(false)
    expect(arePointsTouching({ x: 4, y: 1 }, { x: 3, y: 0 })).toBe(true)
  })

  test("distanceBetweenPoints", () => {
    expect(distanceBetweenPoints({ x: 0, y: 0 }, { x: 0, y: 0 })).toBe(0)
    expect(distanceBetweenPoints({ x: 0, y: 0 }, { x: 0, y: 1 })).toBe(1)
    expect(distanceBetweenPoints({ x: 0, y: 0 }, { x: 1, y: 0 })).toBe(1)
    expect(distanceBetweenPoints({ x: 0, y: 0 }, { x: 0, y: -1 })).toBe(1)
    expect(distanceBetweenPoints({ x: 0, y: 0 }, { x: -1, y: 0 })).toBe(1)
    expect(distanceBetweenPoints({ x: 0, y: 0 }, { x: 1, y: 1 })).toBe(2)
    expect(distanceBetweenPoints({ x: 0, y: 0 }, { x: 1, y: -1 })).toBe(2)
    expect(distanceBetweenPoints({ x: 0, y: 0 }, { x: -1, y: 1 })).toBe(2)
    expect(distanceBetweenPoints({ x: 0, y: 0 }, { x: -1, y: -1 })).toBe(2)
    expect(distanceBetweenPoints({ x: 0, y: 0 }, { x: 0, y: 3 })).toBe(3)
  })

  test("part 1", () => {
    expect(doTheMoves(testInput, 2)).toBe(13)
    expect(doTheMoves(testInput, 10)).toBe(1)
  })

  test("part 2", () => {
    const testInput2 = `\
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`.trim()
    expect(doTheMoves(testInput2, 10)).toBe(36)
  })
})
