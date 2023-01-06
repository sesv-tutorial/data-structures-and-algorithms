// Longest path, Bellman-Ford

// NO POSITIVE weight cycle in graph is a MUST
const graph = [
  [[1, 4], [3, 5]], // node 0, index 0
  [[4, 7]], // node 1, index 1
  [[1, 3]], // node 2, index 2
  [[2, -10]], // node 3, index 3
  [], // node 4, index 4
]

// graph contains POSITIVE weight cycle
const graphWrong = [
  [[1, 4], [3, 5]], // node 0, index 0
  [[4, 7]], // node 1, index 1
  [[1, 3]], // node 2, index 2
  [[2, -10]], // node 3, index 3
  [[2, 1]], // node 4, index 4
]

const sourceIdx = 0

const longestPathBellmanFord = (graph, sourceIdx) => {

  // STEP 1: transform graph from adjacency list to Vertices + Edges lists
  const vertices = []
  const edges = []

  for (let i = 0; i < graph.length; i++) {

    // list of node indices
    vertices.push(i)
    
    // list of edges [from node, to node, weight]
    for (let j = 0; j < graph[i].length; j++) {
      const [toNode, weight] = graph[i][j]
      edges.push([i, toNode, weight])
    }
  }

  // console.log('vertices:', vertices)
  // console.log('edges:', edges)

  // STEP 2: build initial result map
  const result = {}
  for (let i = 0; i < vertices.length; i++) {
    if(vertices[i] == sourceIdx) {
      result[i] = 0
      continue
    }
    result[i] = -1 * Infinity
  }

  // console.log('result:', result)

  // STEP 3: relax the edges n-1 times
  const relaxTimes = vertices.length - 1 + 4

  for (let i = 0; i < relaxTimes; i++) {
    for (let j = 0; j < edges.length; j++) {
      const [fromNode, toNode, weight] = edges[j]
      const newVal = Math.max(result[fromNode] + weight, result[toNode])

      // console.log(`relax (${fromNode},${toNode}), val old: ${result[toNode]}, new: ${newVal}`)

      result[toNode] = newVal
    }
  }

  return JSON.stringify(result, null, 4)
}


console.log(`Longest path Bellman-Ford from node ${sourceIdx}:`, longestPathBellmanFord(graph, sourceIdx))
console.log(`Longest path graph has POSITIVE cycle ${sourceIdx}:`, longestPathBellmanFord(graphWrong, sourceIdx))