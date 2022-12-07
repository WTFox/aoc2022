import {
  buildFileSystem,
  findDirectoryToDelete,
  getSumOfEachDirectoryWithMaxSize,
} from "."

describe("day07", () => {
  const testInput = `\
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`.trim()

  test("part 1", () => {
    const root = buildFileSystem(testInput)

    expect(getSumOfEachDirectoryWithMaxSize(root, 100000)).toEqual(95437)
  })

  test("part 2", () => {
    expect(findDirectoryToDelete(testInput)).toEqual(24933642)
  })
})
