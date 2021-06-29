// build Queue data structure
class Queue {
  constructor() {
    this.queue = []
  }

  // add data to the queue, O(1)
  enqueue(val) {
    this.queue.push(val)
    return val
  }

  // remove first element in queue
  // Note: O(n) with this implementation (for simplicity),
  // but we can achieve O(1) for this operation,
  // try to implement that as a practice for your programming.
  dequeue() {
    return this.queue.shift()
  }

  // see queue size, O(1)
  size() {
    return this.queue.length
  }

  // see first element in line, O(1)
  peek() {
    return this.queue[0]
  }

  // see all data in the queue, O(1)
  print() {
    console.log(this.queue)
  }
}

// create a queue
const queue = new Queue()
queue.print() // []

// insert
console.log(queue.enqueue(1)) // 1
console.log(queue.enqueue(2)) // 2
console.log(queue.enqueue(3)) // 3
queue.print() // [ 1, 2, 3 ]

// delete 
console.log(queue.dequeue()) // 1
queue.print() // [ 2, 3 ]

// peek
console.log(queue.peek()) // 2

// size
console.log(queue.size()) // 2