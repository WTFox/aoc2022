import day01 from "./day01"
import day02 from "./day02"
import day03 from "./day03"
import day04 from "./day04"
import day05 from "./day05"
import day06 from "./day06"

console.table([
  { day: 1, partOne: day01.partOne(), partTwo: day01.partTwo() },
  { day: 2, partOne: day02.partOne(), partTwo: day02.partTwo() },
  { day: 3, partOne: day03.partOne(), partTwo: day03.partTwo() },
  { day: 4, partOne: day04.partOne(), partTwo: day04.partTwo() },
  { day: 5, partOne: day05.partOne(), partTwo: day05.partTwo() },
  { day: 6, partOne: day06.partOne(), partTwo: day06.partTwo() },
])
