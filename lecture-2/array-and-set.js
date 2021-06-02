const array = [1, 2, 3, 'a', 'b']
const set = new Set ([1, 2, 3, 'a', 'b'])

array.push('hi')
set.add('world')

console.log('array:', array) // array: [ 1, 2, 3, 'a', 'b', 'hi' ]
console.log('set:', set) // set: Set { 1, 2, 3, 'a', 'b', 'world' }