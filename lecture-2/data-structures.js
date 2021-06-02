// Example: store numbers, check if a given number is stored
// Data structure used: array, set

const numberToCheck = 1000000
const array = []

for(let i = 0; i <= numberToCheck; i++) {
  array[i] = i
}

const set = new Set(array)
// set: Set { 0, 1, 2, ..., 1000000 }
// array: [ 0, 1, 2, ..., 1000000 ]

console.time('time to check if number is in array')
array.includes(numberToCheck) // time to check if number is in array: 2.186ms, time complexity: O(n)
console.timeEnd('time to check if number is in array')

console.time('time to check if number is in set')
set.has(numberToCheck) // time to check if number is in set: 0.009ms, time complexity: O(1)
console.timeEnd('time to check if number is in set')

// => Array check: 2.186ms
// => Set check: 0.009ms
// => Array check takes 242 times longer than Set check, on 1,000,000 records