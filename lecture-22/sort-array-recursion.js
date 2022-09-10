// Sort array of numbers small -> big

// plug in your logic to these blocks to use divide and conquer
// Time: O(nlogn), Space: O(n)
const mergeSort = (arr) => {
  // exit condition (base case)
  if (arr.length === 1) return arr

  // divide:
  let leftArr = mergeSort(arr.slice(0, arr.length / 2)) // <- bottom up
  let rightArr = mergeSort(arr.slice(arr.length / 2)) // <- bottom up

  // solve: in this case, there's no solve step.
  // because single element array is already a sorted array.

  // combine:
  const mergedArr = combine(leftArr, rightArr) // <- bottom up

  console.log('leftArr:', leftArr)
  console.log('rightArr:', rightArr)
  console.log('mergedArr:', mergedArr)
  console.log('============================')

  return mergedArr
}

// Combine sorted left & right arrays
// Time: O(x + y), Space: O(x + y)
const combine = (leftArr, rightArr) => {
  const mergedArr = []

  // starting indexes
  let leftArrIdx = 0
  let rightArrIdx = 0

  // combine two array in asc order until one is empty
  while (leftArrIdx < leftArr.length && rightArrIdx < rightArr.length) {
    if (leftArr[leftArrIdx] <= rightArr[rightArrIdx]) {
      mergedArr.push(leftArr[leftArrIdx])
      leftArrIdx++
    } else {
      mergedArr.push(rightArr[rightArrIdx])
      rightArrIdx++
    }
  }

  // push all numbers left in leftArr to mergedArr
  while (leftArrIdx < leftArr.length) {
    mergedArr.push(leftArr[leftArrIdx])
    leftArrIdx++   
  }

  // push all numbers left in rightArr to mergedArr
  while (rightArrIdx < rightArr.length) {
    mergedArr.push(rightArr[rightArrIdx])
    rightArrIdx++  
  }

  return mergedArr
}

const unsortedNumbers = [15, 26, 13, 7, 3, 5, 2, 22]
const sortedNumbersAscOrder = mergeSort(unsortedNumbers)

console.log(`Unsorted array: [${unsortedNumbers}]`)
console.log(`Sorted array: [${sortedNumbersAscOrder}]`)