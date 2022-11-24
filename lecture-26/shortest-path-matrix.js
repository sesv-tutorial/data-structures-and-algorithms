// BFS shortest path on matrix

const shortestPath = (map, start, end) => {
  
  matprint(map)
  console.log('starting position:', start)
  console.log('target position:', end)

  const queue = [start]
  const seen = new Set()
  let paths = [['' + start[0] + start[1]]] // initial start at `00`, [['00']]

  while(queue.length > 0) {

    console.log('queue:', queue)
    // console.log('paths:', paths)

    const [row, col] = queue.shift() // dequeue

    console.log('current node (row, col):', row, col)

    const strRowCol = '' + row + col // `00` etc.

    if(!seen.has(strRowCol)) { // if we've never seen this node before, process

      seen.add(strRowCol) // mark this node as seen
      
      const tempPaths = [] // path + new neighbor node will be temp saved here
      const seenNoNewNeiboPaths = new Set() // keep track of path has no new neighbor

      // list of 4 neighbors' indexes: left, right, up, down
      const neighborIdxes = [[row+1, col], [row-1, col], [row, col+1], [row, col-1]]

      // for each neighbor
      for(let i = 0; i < neighborIdxes.length; i++) {

        const [neighborRow, neighborCol] = neighborIdxes[i]
        const strNeighborRowCol = '' + neighborRow + neighborCol // `01` etc.

        if(
          (neighborRow < 8) && // if neighbor index is not out of
          (neighborRow > -1) && // matrix (0 <= index <= 7)
          (neighborCol < 8) &&
          (neighborCol > -1) &&
          map[neighborRow][neighborCol] !== 1 && // and movable to this neighbor
          !seen.has(strNeighborRowCol) // and we've never seen that neighbor before
        ) {

          queue.push([neighborRow, neighborCol]) // enqueue neighbor node

          // update path with this neighor. AKA paths [[00]] -> paths [[00, 01]]
          for(let j = 0; j < paths.length; j++) {

            if (paths[j][paths[j].length - 1] === strRowCol) { // continue path
              const updatePath = paths[j].concat(strNeighborRowCol)
              tempPaths.push(updatePath)

              // if(strNeighborRowCol === '77') { // first path reaches target
              //   matprint(map, updatePath)
              //   return updatePath // return this path and exit
              // }
            } else { // only save to temp path once, path with no new neighbor
              !seenNoNewNeiboPaths.has(paths[j][paths[j].length - 1]) &&
                tempPaths.push(paths[j])
              seenNoNewNeiboPaths.add(paths[j][paths[j].length - 1])
            }
          }
         
        }
      }

      // update paths with tempPaths
      tempPaths.length !== 0 && (paths = tempPaths)
    }

    console.log('======================= new queue item ====')
  }

  console.log('paths: ', paths)

  for(let i = 0; i < paths.length; i++) {
    matprint(map, paths[i])
    console.log('=====================================')
  }
}

const map = [
  [0, 0, 0, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1],
  [0, 1, 1, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
]

console.log(shortestPath(map, [0,0], [7,7]))




/**
 * Pretty print a matrix helper function
 * https://gist.github.com/lbn/3d6963731261f76330af
 * @param {*} mat 
 */
function matprint(mat, path = []) {
  let shape = [mat.length, mat[0].length];
  function col(mat, i) {
      return mat.map(row => row[i]);
  }
  let colMaxes = [];
  for (let i = 0; i < shape[1]; i++) {
      colMaxes.push(Math.max.apply(null, col(mat, i).map(n => n.toString().length)));
  }

  mat.forEach((row, rowIdx) => {
    console.log.apply(null, row.map((val, j) => {
      if (val === 0) val = '-';
      if(path.length != 0) {
        if(path.includes('' + rowIdx + j)) val = '*'
      }
      if (rowIdx === 0 && j == 0) val = 'S';
      if (rowIdx === 7 && j == 7) val = '⭐';
      return new Array(colMaxes[j]-val.toString().length+1).join(" ") + val.toString() + "  ";
    }));
  });
}