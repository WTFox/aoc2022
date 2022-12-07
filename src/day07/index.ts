import { readFileSync } from "fs"

function recurseChildren(node: Node, callback: (node: Node) => void) {
  callback(node)
  node?.children?.forEach((child) => {
    recurseChildren(child, callback)
  })
}

class Node {
  constructor(
    public name: string,
    public parent: Node | undefined = undefined,
    public children: Node[] | undefined = undefined,
    public size: number | undefined = undefined
  ) {
    this.name = name
    this.parent = parent
    this.children = children
    this.size = size
  }

  public get isDir() {
    return this.children !== undefined
  }

  public get directorySize() {
    let size = 0
    recurseChildren(this, (node) => {
      if (node.size) {
        size += node.size
      }
    })
    return size
  }
}

function handleCD(line: string, root: Node, current: Node) {
  const dir = line.trim().split("$ cd ")[1]?.trim()
  if (!dir) {
    throw new Error("Invalid cd command")
  }

  if (dir === "/") {
    current = root
  } else if (dir === "..") {
    current = current.parent || root
  } else {
    current = current.children?.find((child) => child.name === dir) || root
  }
  return current
}

function handleLS(
  lines: string[],
  index: number,
  current: Node
): { current: Node; index: number } {
  let nextLine = lines[++index]
  current.children = []

  while (nextLine && !nextLine.startsWith("$") && index < lines.length) {
    const [filesizeOrDir, name] = nextLine.trim().split(" ", 2)
    if (!filesizeOrDir || !name) {
      throw new Error("Invalid ls command: " + nextLine)
    }

    if (filesizeOrDir === "dir" && name) {
      current.children.push(new Node(name, current, []))
    } else if (Number(filesizeOrDir) && name) {
      current.children.push(
        new Node(name, current, undefined, Number(filesizeOrDir))
      )
    }

    nextLine = lines[index + 1]
    if (nextLine && nextLine.startsWith("$")) {
      break
    }
    ++index
  }
  return { current, index }
}

export function buildFileSystem(input: string): Node {
  const root = new Node("/", undefined, [])
  let current = root

  const lines = input.split("\n")
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]

    if (line?.startsWith("$ cd")) {
      current = handleCD(line, root, current)
    }

    if (line?.startsWith("$ ls")) {
      const { current: newCurrent, index: newIndex } = handleLS(
        lines,
        index,
        current
      )
      index = newIndex
      current = newCurrent
    }
  }
  return root
}

export function getSumOfEachDirectoryWithMaxSize(
  root: Node,
  maxSize: number
): number {
  let sum = 0
  recurseChildren(root, (node) => {
    if (node.isDir && node.directorySize) {
      if (node.directorySize < maxSize) {
        sum += node.directorySize
      }
    }
  })
  return sum
}

export function findDirectoryToDelete(input: string): number {
  const root = buildFileSystem(input)

  const totalFSCapacity = 70000000
  const updateSize = 30000000
  const freeSpace = totalFSCapacity - (root.directorySize || 0)
  const neededSpace = updateSize - freeSpace

  let bestSoFar = Number.MAX_SAFE_INTEGER
  recurseChildren(root, (node) => {
    if (node.isDir && node.directorySize) {
      if (node.name !== "/") {
        if (node.directorySize >= neededSpace) {
          bestSoFar = Math.min(bestSoFar, node.directorySize)
        }
      }
    }
  })
  return bestSoFar
}

export default {
  partOne: () => {
    const root = buildFileSystem(
      readFileSync("src/day07/input.txt", "utf8").toString()
    )
    return getSumOfEachDirectoryWithMaxSize(root, 100000)
  },
  partTwo: () => {
    return findDirectoryToDelete(
      readFileSync("src/day07/input.txt", "utf8").toString()
    )
  },
}
