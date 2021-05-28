const arr = [3, 4, 5] // array length n = 3

/*
  Input: array of numbers
  Process: add 1 to every single element of input array
  Output: array with elements increased by 1
*/
const increase1 = (arr) => { // arr.length = n
  const one = 1                           // Time: 1, Space: 1
  const newArr = []                       // Time: 1, Space: _
  for (let i = 0; i < arr.length; i++) {  // Time: n, Space: 1
    newArr[i] = arr[i] + one              // Time: n, Space: n
  }
  return newArr                           // Time: 1, Space: 0
}                           // Total -------------------------------
                                     // Time: 2n + 3, Space: n + 2
console.log('increase1(arr):', increase1(arr)) // increase1(arr): [ 4, 5, 6 ]


// same correctness, more efficient
const increase2 = (arr) => {
  for (let i = 0; i < arr.length; i++) {  // Time: n, Space: 1
    arr[i] += 1                           // Time: n, Space: 0
  }
  return arr                              // Time: 1, Space: 0
}                           // Total -------------------------------
                                     // Time: 2n + 1, Space: 1
console.log('increase2(arr):', increase2(arr)) // increase2(arr): [ 4, 5, 6 ]