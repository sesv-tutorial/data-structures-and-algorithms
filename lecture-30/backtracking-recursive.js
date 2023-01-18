// Backtracking RECURSIVE implementation

// STEP 1: list all possible options with DFS
const backtrackingRecursive = () => {
  const result = []
  const tempRes = []

  const dfs = (tempRes) => {

    // STEP 2: apply bounding conditions to stop unmeaningful branching
    if(tempRes) {
      return // stop branching
    }
    // otherwise, let the recursive runs



    // STEP 1: dfs to collect all possible outcomes
    if(queenNum > n) {
      result.push([...tempRes]) // MUST push a deep copy
      // console.log('result: ', result)
      return
    }
    
    for (let i = 0; i < n; i++) {
      const qPos = [queenNum, queenNum - 1, i] // [queenNum, row, col]
      tempRes.push(qPos)
      dfs(++queenNum, tempRes)
      tempRes.pop()
      queenNum--
    }
  }

  dfs(...)
  return result
}

