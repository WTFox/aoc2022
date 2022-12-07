import { readFileSync } from "fs"

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

  public static iterateTree(node: Node, callback: (node: Node) => void) {
    callback(node)
    node?.children?.forEach((child) => {
      this.iterateTree(child, callback)
    })
  }

  get isDir() {
    return this.children !== undefined
  }

  get directorySize() {
    if (!this.isDir) {
      return undefined
    }
    let size = 0
    Node.iterateTree(this, (node) => {
      if (node.size) {
        size += node.size
      }
    })
    return size
  }

  public static pathToNode(node: Node) {
    let path = ""
    let current = node
    while (current) {
      path = current.name + path
      if (!current.parent) {
        break
      }
      current = current.parent
    }
    return path
  }
}

export function buildFileSystem(input: string): Node {
  const root = new Node("/", undefined, [])
  let current = root

  const lines = input.split("\n")
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (!line) {
      continue
    }

    if (line.startsWith("$ cd")) {
      const dir = line.trim().split("$ cd ")[1]?.trim()
      if (!dir) {
        throw new Error("Invalid cd command")
      }

      if (dir === "/") {
        current = root
      } else if (dir === "..") {
        current = current.parent || root
      }
      const child = current.children?.find((child) => child.name === dir)
      if (child) {
        current = child
      }
    }

    if (line.startsWith("$ ls")) {
      let nextLine = lines[++i]
      current.children = []

      while (nextLine && !nextLine.startsWith("$") && i < lines.length) {
        const [sizeOrDir, name] = nextLine.trim().split(" ", 2)
        if (!sizeOrDir || !name) {
          throw new Error("Invalid ls command: " + nextLine)
        }
        if (sizeOrDir === "dir" && name) {
          const child = new Node(name, current, [])
          current.children.push(child)
        } else if (Number.parseInt(sizeOrDir) && name) {
          const child = new Node(
            name,
            current,
            undefined,
            Number.parseInt(sizeOrDir)
          )
          current.children.push(child)
        }
        nextLine = lines[++i]
        if (nextLine && nextLine.startsWith("$ cd")) {
          --i
          break
        }
      }
    }
  }
  return root
}

export function getSumOfEachDirectoryWithMaxSize(
  root: Node,
  maxSize: number
): number {
  let sum = 0
  Node.iterateTree(root, (node) => {
    if (node.isDir && node.directorySize) {
      if (node.directorySize < maxSize) {
        sum += node.directorySize
      }
    }
  })
  return sum
}

export function findDirectoryToDelete(input: string): number {
  const totalFSCapacity = 70000000
  const root = buildFileSystem(input)
  const freeSpace = totalFSCapacity - (root.directorySize || 0)
  const updateSize = 30000000
  const neededSpace = updateSize - freeSpace

  console.log({
    ...{
      fsSize: totalFSCapacity.toLocaleString(),
      free: freeSpace.toLocaleString(),
      needed: neededSpace.toLocaleString(),
      update: updateSize.toLocaleString(),
    },
    used: root.directorySize?.toLocaleString(),
  })

  let bestSoFar = Number.MAX_SAFE_INTEGER
  Node.iterateTree(root, (node) => {
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
