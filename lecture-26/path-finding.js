const nodeNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

// adjacency list
// undirected <-> bi-directional
// unweighted
// from index -> array elements
const graph = [
  [4, 6],   // Node A, 0
  [],       // Node B, 1
  [3],      // Node C, 2
  [],       // Node D, 3
  [1, 5],   // Node E, 4
  [2],      // Node F, 5
  [7],      // Node G, 6
  [],       // Node H, 7
]

// an array that hold all visited nodes in order of increasing visited time
const visited = []                                            // Time: 1, Space: V

// Time: O(V + E), Space: O(V)
const bfsForLoop = (graph, node) => {
  if (node === null)                                          // Time: 1, Space: 0
    return                                                    // Time: 1, Space: 0

  // a set that hold all visited nodes
  const visitedSet = new Set()                                // Time: 1, Space: V

  // queue to store nodes waiting to visit next
  const queue = [node]                                        // Time: 1, Space: V

  // keep traversing until no nodes left to traverse
  while (queue.length > 0) {                                  // Time: V, Space: 0
    const curNode = queue.shift()                             // Time: 1, Space: 0
                                                              // in javascript `shift()` is O(n)
                                                              // however normally we can use
                                                              // circular queue to obtain O(1)

    // visit unvisited node
    if (!visitedSet.has(curNode)) {                           // Time: 1, Space: 0
      // visit current node
      visited.push(nodeNames[curNode])                        // Time: 1, Space: 0

      // mark current node as visited
      visitedSet.add(curNode)                                 // Time: 1, Space: 0

      // iterate through all node's neighbors
      for (let i = 0; i < graph[curNode].length; i++) {       // Time: E, Space: 1
        const neighborNode = graph[curNode][i]                // Time: 1, Space: 1

        // visit neighbor node if it has not been visited
        if (!visitedSet.has(neighborNode))                    // Time: 1, Space: 0
          queue.push(neighborNode)                            // Time: V, Space: 0
      }
    }
  }
}

bfsForLoop(graph, 0)

console.log(visited.join(' '))