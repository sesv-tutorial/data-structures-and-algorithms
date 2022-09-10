// Sort array of numbers small -> big

const sortArrayForLoop = (arr) => {
  // save final result to sortedArr
  const sortedArr = [arr[0]]

  console.log('sortedArr:', sortedArr)

  // FOR loop to go through all elements
  for(let i = 1; i < arr.length; i++) {
    console.log('arr[i]:', arr[i])
    
    let left = 0
    let right = sortedArr.length - 1
    let idxToInsert = null

    // Binary Search `sortedArr` to find the position to insert
    while(left <= right) {
      let mid = Math.ceil((left + right) / 2)

      console.log('left:', left, ', mid:', mid, ', right:', right)

      // when mid = left and mid = right, our new element position must be
      // either at or after mid. Compare elements to decide the idx #
      if (mid === left && mid === right) {
        if(arr[i] >= sortedArr[mid]) {
          idxToInsert = mid + 1
        } else {
          idxToInsert = mid
        }
        break
      } else if(sortedArr[mid] < arr[i]) { // continue with data points on the right
        left = mid + 1
      } else if(sortedArr[mid] > arr[i]) { // continue with data points on the left
        right = mid - 1
      } else { // edge cases (1), left = 1, mid = 2, right = 3
        idxToInsert = mid + 1
        break
      }
    }

    // edge cases (2), left = 0, mid = 1, right = 1
    if (idxToInsert === null) {
      idxToInsert = right + 1
    }

    // insert element to sorted array
    sortedArr.splice(idxToInsert, 0, arr[i])

    console.log('idxToInsert:', idxToInsert)
    console.log('sortedArr after insert:', sortedArr)
    console.log('=====================')
  }

  return sortedArr
}
// Time: Binary Search nested in FOR Loop: O(nlogn), Space: O(n)

sortArrayForLoop([15, 26, 13, 7, 3, 5, 2, 22])
// sortArrayForLoop([-7,-5,-1,7,-4,-1,0,0,4,9]) // edge case (1), (2), loop runs forever
// sortArrayForLoop([-4,0,7,4,9,-5,-1,0,-7,-1]) // edge case (2), left, mid, right don't converge when (left = 0, mid = 1, right = 1)