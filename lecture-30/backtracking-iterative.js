
// Backtracking ITERATIVE implementation

// STEP 1: list all possible options, (nested FOR LOOP is DFS)
const backtrackingIterative = () => {
  for (let i = 0; i < array1.length; i++) {
    const state1 = [ ... ] // state 1 data from from array1
    for (let j = 0; j < array2.length; j++) {
      const state2 = [ ... ] // state 1 data from from array1 + array2
      for (let k = 0; index < array3.length; k++) {
        const state3 = [ ... ] // state 1 data from from array1 + array2 + array3
        ...
      }
    }
  }
}


// STEP 2: create the bounding function
function boundingFunc(state) {
  if(state) {
    ...
    return true // to stop branching
  } else {
    ...
    return false // to continue to branch
  }
}

// STEP 3: put bounding function in each state creation
const backtrackingIterative = () => {

  const result = []

  for (let i = 0; i < array1.length; i++) {
    const state1 = [ ... ] // state 1 data from from array1
    boundingFunc(state1) continue
    for (let j = 0; j < array2.length; j++) {
      const state2 = [ ... ] // state 1 data from from array1 + array2
      boundingFunc(state2) continue
      for (let k = 0; index < array3.length; k++) {
        const state3 = [ ... ] // state 1 data from from array1 + array2 + array3
        boundingFunc(state3) continue
        result.push(state3) // only final states passing one bounding condition is collected
      }
    }
  }
}