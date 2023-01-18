// backtracking n queens recursive implementation

const backtrackNQueens = (n) => {

  const result = []
  const tempRes = []
  // tempRes [ [ 1, 0, 3 ], [ 2, 1, 3 ], [ 3, 2, 3 ], [ 4, 3, 3 ] ]
  // [ 1, 0, 3 ] -> [queenNum, queenRow, queenCol]

  const dfs = (queenNum, tempRes) => {
    ////////// STEP 2: KILL the branch with BOUNDING conditions

    // STEP 2.a: prepare the bounding conditions
    const cols = new Set()
    const forbiddenPos = new Set()

    for (let j = 0; j < tempRes.length; j++) {

      let row = tempRes[j][1] + 0
      let col = tempRes[j][2] + 0

      cols.add(col) // list of cols idx of all queens

      // // forbidden next queen diag postions
      for (let k = 0; k <= n; k++) {
        forbiddenPos.add('' + (row + 1 + k) + (col + 1 + k))
        forbiddenPos.add('' + (row - 1 - k) + (col - 1 - k))
        forbiddenPos.add('' + (row + 1 + k) + (col - 1 - k))
        forbiddenPos.add('' + (row - 1 - k) + (col + 1 + k))
      }
    }

    // get most recent queen added
    const [lqNum, lqRow, lqCol] = tempRes[tempRes.length - 1] || []

    // console.log('latestQ: ', lqNum, lqRow, lqCol)

    // STEP 2.b: apply bouding condition to kill this branch if
    if (
      forbiddenPos.has('' + lqRow + lqCol) || // queen same diag
      (cols.size !== tempRes.length) // queen same col
    ) {
      console.log('Killing this branch: ', lqNum, lqRow, lqCol)
      return // return to stop branching
    }
    ////////// STEP 2: KILL the branch with BOUNDING conditions done

    ////////// STEP 1: FULL branch out
    if(queenNum > n) {
      result.push([...tempRes]) // MUST push a deep copy
      // console.log('tempRes: ', tempRes)
      return
    }
    
    for (let i = 0; i < n; i++) {
      const qPos = [queenNum, queenNum - 1, i] // [queenNum, row, col]
      tempRes.push(qPos)
      dfs(++queenNum, tempRes)
      tempRes.pop()
      queenNum--
    }
    ////////// STEP 1: FULL branch out done
  }

  dfs(1, tempRes)


  return result.length
}

console.log('Queens successful setups:', backtrackNQueens(9))