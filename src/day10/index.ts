import * as fs from "fs"
import * as path from "path"

export default {
  partOne: () => {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
    return input.length
  },
  partTwo: () => {
    return "TODO"
  },
}
