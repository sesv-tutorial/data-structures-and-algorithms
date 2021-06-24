// build Stack data structure
class Stack {
  constructor() {
    this.stack = []
  }
  
  // add data to stack, O(1)
  push(val) {
    this.stack.push(val)
    return val
  }

  // remove data from stack, O(1)
  pop() {
    return this.stack.pop()
  }

  // see stack size, O(1)
  size() {
    return this.stack.length
  }

  // see element on top of stack, O(1)
  peek() {
    return this.stack[this.stack.length - 1]
  }

  // see all data in stack, O(1)
  print() {
    console.log(this.stack)
  }
}

// create a stack
const stack = new Stack()
stack.print() // []

// insert
console.log(stack.push(1)) // 1
console.log(stack.push(2)) // 2
console.log(stack.push(3)) // 3
stack.print() // [ 1, 2, 3 ]

// delete 
console.log(stack.pop()) // 3
stack.print() // [ 1, 2 ]

// peak
console.log(stack.peek()) // 2

// size
console.log(stack.size()) // 2
