
// Find max element in given array
const arr = [2, 4, 3, 9, 1]

console.log('==== equivalent FOR LOOP solution ====')

const findMaxForLoop = arr => {
  let curMax = arr[0]

  for(let i = 0; i < arr.length; i++) {
    console.log('i:', i, ',', 'arr[i]:', arr[i])
    ;(arr[i] > curMax) && (curMax = arr[i])
  }

  return curMax
}

console.log('Max, FOR LOOP solution:', findMaxForLoop(arr)) // 9
// Time complexity: O(n)


console.log('==== equivalent Recursion solution ====')

// save max to curMaxObj.max
let curMaxObj = { max : arr[0] }

const findMaxRecursion = (arr, i, curMaxObj) => {

  // logging to see current `i` and `arr[i]`
  console.log('i:', i, ',', 'arr[i]:', arr[i])

  // exit condition aka base case
  if (i >= arr.length) return
  
  // process current data point
  if(arr[i] > curMaxObj.max) { curMaxObj.max = arr[i] }
  console.log('curMax:', curMaxObj.max)

  // continue to loop
  findMaxRecursion(arr, i+1, curMaxObj)
}

findMaxRecursion(arr, 0, curMaxObj)

console.log('Max, Recursion solution:', curMaxObj.max) // 9
// Time complexity: O(n)