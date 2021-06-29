// build Priority Queue data structure
// naive approach (not the best optimal solution)
class PriorityQueue {
  constructor() {
    this.queue = []
  }

  // add data to the queue, O(n)
  // using `heap` data structure will give O(logn)
  enqueue(element) {
    // queue is empty, add element immediately
    if(this.queue === 0) {
      return this.queue.push(element)
    }

    // queue is not empty,
    // go through all existing element,
    // add element right after existing element which has the same priority
    // 1 is highest priority
    var added = false;
    for(let i = 0; i < this.queue.length; i ++) {
        if(element[1] < this.queue[i][1]) {
            this.queue.splice(i, 0, element);
            added = true;
            break;
        }
    }

    // went through all existing elements but they all have higher priority,
    // add the element to the end of the queue
    if(!added) { 
      this.queue.push(element)
    }

    return element
  }

  // remove first element in queue
  // Note: O(n) with this implementation (for simplicity),
  // If we use `heap` data structure, we'll have O(logn)
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

// create a priority queue
const priorityQueue = new PriorityQueue()
priorityQueue.print() // []

// insert
console.log(priorityQueue.enqueue(['c', 3])) // [ 'c', 3 ]
console.log(priorityQueue.enqueue(['b', 2])) // [ 'b', 2 ]
priorityQueue.print() // [ [ 'b', 2 ], [ 'c', 3 ] ]

console.log(priorityQueue.enqueue(['a', 1])) // [ 'a', 1 ]
priorityQueue.print() // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]

console.log(priorityQueue.enqueue([{'zyz': 123 }, 4])) // [ { zyz: 123 }, 4 ]
priorityQueue.print() // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ], [ { zyz: 123 }, 4 ] ]

console.log(priorityQueue.enqueue(['d', 2])) // [ 'd', 2 ]
priorityQueue.print() // [ [ 'a', 1 ], [ 'b', 2 ], [ 'd', 2 ], [ 'c', 3 ], [ { zyz: 123 }, 4 ] ]

// delete 
console.log(priorityQueue.dequeue()) // [ 'a', 1 ]
priorityQueue.print() // [ [ 'b', 2 ], [ 'd', 2 ], [ 'c', 3 ], [ { zyz: 123 }, 4 ] ]

// peek
console.log(priorityQueue.peek()) // [ 'b', 2 ]

// size
console.log(priorityQueue.size()) // 4