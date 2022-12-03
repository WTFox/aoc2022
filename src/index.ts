import day01 from "./day01"
import day02 from "./day02"
import day03 from "./day03"

console.table([
  { day: 1, partOne: day01.partOne(), partTwo: day01.partTwo() },
  { day: 2, partOne: day02.partOne(), partTwo: day02.partTwo() },
  { day: 3, partOne: day03.partOne(), partTwo: day03.partTwo() },
])
