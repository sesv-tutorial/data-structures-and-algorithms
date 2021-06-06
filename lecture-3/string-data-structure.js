// initialize
let str = 'Today is a good day to learn Data Structures!'

// print out, see how data looks like
console.log(str) // Today is a good day to learn Data Structures!

// insert
str = str + ' So'
console.log(str) // Today is a good day to learn Data Structures! So
console.log(str.concat(' start learning!')) // Today is a good day to learn Data Structures! So start learning!

// access
console.log(str[29]) // D
console.log(str.substring(29, 44)); // Data Structures

// search
console.log(str.includes('good day')) // true