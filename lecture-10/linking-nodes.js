// structure of a node
class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

// create individual nodes
const nodeA = new Node('a')
const nodeB = new Node('b')
console.log(nodeA) // Node { data: 'a', next: null }
console.log(nodeA) // Node { data: 'a', next: null }

// link two nodes
nodeA.next = nodeB 
console.log(nodeA) // Node { data: 'a', next: Node { data: 'b', next: null } }