// Breadth First Search implementation in purest form
// print layers by layers

// relationship between nodes
const graph5 = [
  [1, 2], // SFO, index 0
  [0, 2, 3], // ORD, index 1
  [0, 1, 3, 4], // DEN, index 2
  [1, 2, 4], // JFK, index 3
  [2, 3], // IAH, index 4
]

// nodes' information
const idxToAirport = {
  '0': { name: 'SFO' },
  '1': { name: 'ORD' },
  '2': { name: 'DEN' },
  '3': { name: 'JFK' },
  '4': { name: 'IAH' }
}

const breadthFirstSearchPure = (initNodeIdx) => {
  const result = []
  const seen = new Set()
  const queue = [initNodeIdx] // REMEMBER to use a proper queue data structure IRL

  console.log('Starting airport: ', idxToAirport[initNodeIdx].name)

  while(queue.length > 0) {

    const curNodeIdx = queue.shift() // dequeue

    // if we've never seen this node before, process,
    // otherwise, ignore the node
    if(!seen.has(curNodeIdx)) {

      seen.add(curNodeIdx) // add this node to seen list

      const curNodeNeighbors = graph5[curNodeIdx] // get the neighbors
      curNodeNeighbors.forEach(nodeIdx =>
        !seen.has(nodeIdx) && queue.push(nodeIdx)) // enqueue neighbors
  
      result.push(idxToAirport[curNodeIdx].name) // save current node to result

      console.log('result: ', result)
    }
  }
}

breadthFirstSearchPure(2) // result: [ 'SFO', 'ORD', 'DEN', 'JFK', 'IAH' ]