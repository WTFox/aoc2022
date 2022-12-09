import { Directions, doTheMoves, Mover } from "."

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
    let m = new Mover()
    expect(m.currentPosition).toEqual({ x: 0, y: 0 })

    m.move(Directions.Up, 4)
    expect(m.currentPosition).toEqual({ x: 0, y: 4 })

    m = new Mover()
    m.move(Directions.Down, 4)
    expect(m.currentPosition).toEqual({ x: 0, y: -4 })

    m = new Mover()
    m.move(Directions.Left, 4)
    expect(m.currentPosition).toEqual({ x: -4, y: 0 })

    m = new Mover()
    m.move(Directions.Right, 4)
    expect(m.currentPosition).toEqual({ x: 4, y: 0 })
  })

  test("moving multiple", () => {
    const m = new Mover()
    expect(m.currentPosition).toEqual({ x: 0, y: 0 })

    m.move(Directions.Right, 4)
    expect(m.currentPosition).toEqual({ x: 4, y: 0 })

    m.move(Directions.Up, 4)
    expect(m.currentPosition).toEqual({ x: 4, y: 4 })

    m.move(Directions.Left, 3)
    expect(m.currentPosition).toEqual({ x: 1, y: 4 })

    m.move(Directions.Down, 3)
    expect(m.currentPosition).toEqual({ x: 1, y: 1 })
  })

  test("part 1", () => {
    expect(doTheMoves(testInput)).toBe(21)
  })
})
