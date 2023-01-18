// backtracking iterative implementation - 4 queens

const backtrack4QueensIter = () => {

  const result = []
  
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const state2 = [
        [1, 0, i], // [queenNum, row, col] aka [queen 1, row 0, col i]
        [2, 1, j],
      ]
      if (isBound(state2)) continue

      for (let k = 0; k < 4; k++) {
        const state3 = [
          [1, 0, i],
          [2, 1, j],
          [3, 2, k],
        ]
        if (isBound(state3)) continue
        for (let l = 0; l < 4; l++) {
          const state4 = [
            [1, 0, i],
            [2, 1, j],
            [3, 2, k],
            [4, 3, l],
          ]
          if (isBound(state4)) continue
          result.push(state4)
        }
      }
    }
  }

  return result
}

console.log('Queens successful setups:', backtrack4QueensIter())


/**
 * 
 * @param {*} tempRes [ [ 1, 0, 1 ], [ 2, 1, 2 ] ]
 * @returns true | false
 */
function isBound (tempRes) {

    ////////// STEP 2: KILL the branch with BOUNDING conditions
    // STEP 2.a: prepare the bounding conditions
    const cols = new Set()
    const forbiddenPos = new Set()

    for (let j = 0; j < tempRes.length; j++) {

      let row = tempRes[j][1] + 0 // deep copy
      let col = tempRes[j][2] + 0 // deep copy
      cols.add(col) // list of cols idx of all queens

      // // forbidden next queen diag postions
      for (let k = 0; k <= 4; k++) {
        forbiddenPos.add('' + (row + 1 + k) + (col + 1 + k))
        forbiddenPos.add('' + (row - 1 - k) + (col - 1 - k))
        forbiddenPos.add('' + (row + 1 + k) + (col - 1 - k))
        forbiddenPos.add('' + (row - 1 - k) + (col + 1 + k))
      }
    }

    // get most recent queen added
    const [lqNum, lqRow, lqCol] = tempRes[tempRes.length - 1] || []

    // STEP 2.b: apply bouding condition to kill this branch if
    if (
      forbiddenPos.has('' + lqRow + lqCol) || // queen same diag
      (cols.size !== tempRes.length) // queen same col
    ) {
      console.log('Killing this branch: ', lqNum, lqRow, lqCol)
      return true // stop branching
    }
    return false // continue to branch
    ////////// STEP 2: KILL the branch with BOUNDING conditions done
}

// test bounding function
// console.log(isBound([ [ 1, 0, 1 ], [ 2, 1, 2 ] ]))