export class Monkey {
  public itemsInspected: number
  constructor(
    public items: number[],
    public lcm: number,
    public operation: (old: number) => number,
    public throwTo: (newItem: number) => number,
    public doRelief: boolean = true
  ) {
    this.items = items
    this.itemsInspected = 0
    this.operation = operation
    this.throwTo = throwTo
    this.doRelief = doRelief
  }

  public processItems(monkies: Map<number, Monkey>) {
    while (this.items.length > 0) {
      this.itemsInspected++
      let worryLevel = this.items.shift() as number
      worryLevel = this.operation(worryLevel)
      if (this.doRelief) {
        worryLevel = Math.floor(worryLevel / 3)
      } else {
        worryLevel = worryLevel % this.lcm
      }
      const newMonkey = this.throwTo(worryLevel)
      monkies.get(newMonkey)?.items.push(worryLevel)
    }
  }
}

export function process(
  monkies: Map<number, Monkey>,
  rounds: number,
  doRelief: boolean
) {
  monkies.forEach((monkey) => (monkey.doRelief = doRelief))
  for (let index = 0; index < rounds; index++) {
    monkies.forEach((monkey) => monkey.processItems(monkies))
  }

  return Array.from(monkies.values())
    .map((monkey) => monkey.itemsInspected)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b)
}

export default {
  partOne: () => {
    const monkies = new Map<number, Monkey>([
      [
        0,
        new Monkey(
          [61],
          9699690,
          (old: number) => old * 11,
          (item: number) => (item % 5 === 0 ? 7 : 4)
        ),
      ],

      [
        1,
        new Monkey(
          [76, 92, 53, 93, 79, 86, 81],
          9699690,
          (old: number) => old + 4,
          (item: number) => (item % 2 === 0 ? 2 : 6)
        ),
      ],

      [
        2,
        new Monkey(
          [91, 99],
          9699690,
          (old: number) => old * 19,
          (item: number) => (item % 13 === 0 ? 5 : 0)
        ),
      ],

      [
        3,
        new Monkey(
          [58, 67, 66],
          9699690,
          (old: number) => old,
          (item: number) => (item % 7 === 0 ? 6 : 1)
        ),
      ],

      [
        4,
        new Monkey(
          [94, 54, 62, 73],
          9699690,
          (old: number) => old + 1,
          (item: number) => (item % 19 === 0 ? 3 : 7)
        ),
      ],

      [
        5,
        new Monkey(
          [59, 95, 51, 58, 58],
          9699690,
          (old: number) => old + 3,
          (item: number) => (item % 11 === 0 ? 0 : 4)
        ),
      ],

      [
        6,
        new Monkey(
          [87, 69, 92, 56, 91, 93, 88, 73],
          9699690,
          (old: number) => old + 8,
          (item: number) => (item % 3 === 0 ? 5 : 2)
        ),
      ],

      [
        7,
        new Monkey(
          [71, 57, 86, 67, 96, 95],
          9699690,
          (old: number) => old + 7,
          (item: number) => (item % 17 === 0 ? 3 : 1)
        ),
      ],
    ])
    return process(monkies, 20, true)
  },
  partTwo: () => {
    const monkies = new Map<number, Monkey>([
      [
        0,
        new Monkey(
          [61],
          9699690,
          (old: number) => old * 11,
          (item: number) => (item % 5 === 0 ? 7 : 4)
        ),
      ],

      [
        1,
        new Monkey(
          [76, 92, 53, 93, 79, 86, 81],
          9699690,
          (old: number) => old + 4,
          (item: number) => (item % 2 === 0 ? 2 : 6)
        ),
      ],

      [
        2,
        new Monkey(
          [91, 99],
          9699690,
          (old: number) => old * 19,
          (item: number) => (item % 13 === 0 ? 5 : 0)
        ),
      ],

      [
        3,
        new Monkey(
          [58, 67, 66],
          9699690,
          (old: number) => old * old,
          (item: number) => (item % 7 === 0 ? 6 : 1)
        ),
      ],

      [
        4,
        new Monkey(
          [94, 54, 62, 73],
          9699690,
          (old: number) => old + 1,
          (item: number) => (item % 19 === 0 ? 3 : 7)
        ),
      ],

      [
        5,
        new Monkey(
          [59, 95, 51, 58, 58],
          9699690,
          (old: number) => old + 3,
          (item: number) => (item % 11 === 0 ? 0 : 4)
        ),
      ],

      [
        6,
        new Monkey(
          [87, 69, 92, 56, 91, 93, 88, 73],
          9699690,
          (old: number) => old + 8,
          (item: number) => (item % 3 === 0 ? 5 : 2)
        ),
      ],

      [
        7,
        new Monkey(
          [71, 57, 86, 67, 96, 95],
          9699690,
          (old: number) => old + 7,
          (item: number) => (item % 17 === 0 ? 3 : 1)
        ),
      ],
    ])
    return process(monkies, 10000, false)
  },
}
