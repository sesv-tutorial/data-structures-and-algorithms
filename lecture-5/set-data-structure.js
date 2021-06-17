// initialize
const setA = new Set([1, 2, 'a', 'b'])
const setB = new Set([2, 3, 'b', 'c'])

// print out, see how data looks like
console.log(setA) // Set { 1, 2, 'a', 'b' }
console.log(setB) // Set { 2, 3, 'b', 'c' }

// function takes in 2 sets and return their union set
function union(setA, setB) {
  let _union = new Set(setA)
  for (let elem of setB) {
      _union.add(elem)
  }
  return _union
}

// function takes in 2 sets and return their intersection set
function intersection(setA, setB) {
  let _intersection = new Set()
  for (let elem of setB) {
      if (setA.has(elem)) {
          _intersection.add(elem)
      }
  }
  return _intersection
}

// union
console.log(union(setA, setB)) // Set { 1, 2, 'a', 'b', 3, 'c' }

// intersection
console.log(intersection(setA, setB)) // Set { 2, 'b' }

// insert
setA.add(4)
console.log(setA) // Set { 1, 2, 'a', 'b', 4 }

// delete
setA.delete(1)
console.log(setA) // Set { 2, 'a', 'b', 4 }

// search
console.log(setA.has('a')) // true
console.log(setA.has('c')) // false