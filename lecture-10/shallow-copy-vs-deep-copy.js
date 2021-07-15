let original = { a: 123 }
const shallowCopy = original
const deepCopy = JSON.parse(JSON.stringify(original))

console.log('original:', original) // original: { a: 123 }
console.log('shallowCopy:', shallowCopy) // shallowCopy: { a: 123 }
console.log('deepCopy:', deepCopy) // deepCopy: { a: 123 }

// modify original
original.a = 456
console.log('original:', original) // original: { a: 456 }
console.log('shallowCopy:', shallowCopy) // shallowCopy: { a: 456 }
console.log('deepCopy:', deepCopy) // deepCopy: { a: 123 }

// modify shallow copy
shallowCopy.a = 999
console.log('original:', original) // original: { a: 999 }
console.log('shallowCopy:', shallowCopy) // shallowCopy: { a: 999 }
console.log('deepCopy:', deepCopy) // deepCopy: { a: 123 }

// re-assign original
original = { b: 789 }
console.log('original:', original) // original: { b: 789 }
console.log('shallowCopy:', shallowCopy) // shallowCopy: { a: 999 }
console.log('deepCopy:', deepCopy) // deepCopy: { a: 123 }
