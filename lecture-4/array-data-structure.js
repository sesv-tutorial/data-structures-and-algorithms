// initialize
const arr = ['a', 'b', 4, 2, 'v']

// print out, see how data looks like
console.log(arr) // [ 'a', 'b', 4, 2, 'v' ]

// insert
arr.push(100)
console.log(arr) // [ 'a', 'b', 4, 2, 'v', 100 ]

arr.splice(1, 0, 'Data Structure');
console.log(arr) // [ 'a', 'Data Structure', 'b', 4, 2, 'v', 100 ]

// delete
arr.splice(4,1)
console.log(arr) // [ 'a', 'Data Structure', 'b', 4, 'v', 100 ]

// access
console.log(arr[1]) // Data Structure

// search
console.log(arr.includes(100)) // true
console.log(arr.includes(200)) // false