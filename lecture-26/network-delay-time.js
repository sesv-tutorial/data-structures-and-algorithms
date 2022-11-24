// network delay time: https://leetcode.com/problems/network-delay-time/

var networkDelayTime = function(times, n, k) {

  // initialize graph with empty arrays
  const graph = []
  for(let i = 0; i < n; i++) { graph.push([]) }
  console.log('graph:', graph)

  // build adjacency list graph with `times` data
  for(let i = 0; i < times.length; i++) {
    const nodeIdx = times[i][0] - 1
    const neighborIdx = times[i][1] - 1
    const travelTime = times[i][2]
    graph[nodeIdx].push([neighborIdx, travelTime])
  }
  console.log('graph:', graph)
  

  const initNodeIdx = k - 1 // our graph is 0-indexed from given 1-indexed data
  const layerEnd = '|' // layer separator in the queue
  const queue = [initNodeIdx, layerEnd] // initialize the queue
  const seen = new Set([initNodeIdx]) // keep track of seen nodes
  let paths = [[0, initNodeIdx]] // the first num (0) is total travel time
  

  while(queue.length > 0) {
    // console.log('queue: ', queue)

    const curNodeIdx = queue.shift() // dequeue

    // add layer separator `|` whenever a layer finishes
    if(curNodeIdx === layerEnd && queue.length > 0) {
      queue.push(layerEnd)
      continue
    }

    // break out of the loop when there's no data left in the queue
    if(curNodeIdx === layerEnd && queue.length === 0) {
      break
    }

    const curNode = graph[curNodeIdx] // get current node neighbors
    const tempPaths = [] // update paths

    // for every neighbor
    for(let i = 0; i < curNode.length; i++) {
      const [neighborNodeIdx, neighborTravelTime] = curNode[i]

      // if this neighbor hasn't been seen
      if(!seen.has(neighborNodeIdx)) {
        seen.add(neighborNodeIdx) // add to seen list
        queue.push(neighborNodeIdx) // add to the queue

        // update path with this new neighor + travel time to this neighbor
        for(let j = 0; j < paths.length; j++) {
          if (paths[j][paths[j].length - 1] === curNodeIdx) {
            const updatePath = paths[j].concat(neighborNodeIdx)
            updatePath[0] += neighborTravelTime
            tempPaths.push(updatePath)
          } else {
            tempPaths.push(paths[j])
          }
        }
      }
    }
    
    tempPaths.length !== 0 && (paths = tempPaths)
    console.log('paths: ', paths)
  }

  // if we don't see all the nodes -> can't reach to every node -> return -1
  if(seen.size !== n) {
    return -1
  } else {
    let max = 0
    for(let i = 0; i < paths.length; i++) {
      if(paths[i][0] > max) max = paths[i][0]
    }
    return max
  }
}

console.log(networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)) // 2
// console.log(networkDelayTime([[1,2,1],[2,3,2],[1,3,4]],3,1)) // 4