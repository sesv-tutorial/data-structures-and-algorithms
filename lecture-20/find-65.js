// Given `sorted array` of integers, find the index of number `65`
const arr = [1, 2, 4, 7, 9, 15, 21, 23, 34, 42, 48, 59, 60, 65, 70]
const num = 65

const find = (arr, num) => {
  let result = 'does not exist'
  let left = 0
  let right = arr.length - 1

  while(left <= right) {
    let mid = Math.ceil((left + right) / 2)

    console.log('left:', left, ', mid:', mid, ', right:', right)
    console.log(arr[left], arr[mid], arr[right])

    if(arr[mid] === num) { // found, stop and return result
      result = mid
      break
    } else if(arr[mid] < num) { // continue with data points on the right
      left = mid + 1
    } else if(arr[mid] > num) { // continue with data points on the left
      right = mid - 1
    }
  }

  return result
}

// Time complexity: Binary Search drops half data point in each iteration
// -> Time: O(logn)
console.log(`index of '${num}':`, find(arr, num))