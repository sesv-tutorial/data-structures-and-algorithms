// Given an array, check if a number `n` and its double `2n` exist

const checkDouble = (arr) => {
  arr.sort((a,b) => a - b)
  let result = false
  
  // pick the 1st number with For Loop
  for(let i = 0; i < arr.length; i++) {
    
    const double = arr[i] * 2 // ex: 2 -> 2x of 2 = 4, [2, 4]
    const half = arr[i] / 2 // ex: -2 -> 2x of 2 = -4, [-4, -2]

    let left = i + 1
    let right = arr.length - 1

    // pick the 2nd number with Binary Search
    while(left <= right) {
      let mid = Math.ceil((left + right) / 2)

      console.log('left:', left, ', mid:', mid, ', right:', right)
      console.log(arr[left], arr[mid], arr[right])

      if(arr[mid] === double || arr[mid] === half) {
        result = true
        break
      } else if(arr[mid] < double || arr[mid] < half) {
        left = mid + 1
      } else if(arr[mid] > double || arr[mid] > half) {
        right = mid - 1
      }
    }
  }
  
  return result
}

// Time complexity: Binary Search nested in For Loop
// -> Time: O(nlogn)

console.log(checkDouble([10, 2, 5, 3, 7]))