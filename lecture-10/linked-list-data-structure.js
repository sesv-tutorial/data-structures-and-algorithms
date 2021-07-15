// structure of a node
class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

// build Linked List data structure
class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }

  insert(element) {
    const newNode = new Node(element)
    if(this.head === null) {
      this.head = newNode
    } else {
      let currentNode = this.head
      while(currentNode.next) {
        currentNode = currentNode.next
      }
      currentNode.next = newNode
    }
    this.length++
  }

  delete(element) {
    let currentNode = this.head
    let previousNode

    // if the 1st node is the element to delete,
    // point the head to the 2nd node
    if(currentNode.data === element) {
      this.head = currentNode.next
    
    // else, keep examine each node to find the element to delete
    } else {
      while(currentNode.data !== element) {
        previousNode = currentNode
        currentNode = currentNode.next
      }
      // found, link `next` of previous node to the next node
      // (removing found element from the list)
      previousNode.next = currentNode.next
    }
    this.length--;
  }

  search(element) {
    let currentNode = this.head

    while(currentNode && currentNode.data !== element) {
      currentNode = currentNode.next
    }

    return currentNode
  }
}

// create a linked list
const linkedList = new LinkedList()
console.log(linkedList) // LinkedList { head: null, length: 0 }

// insert
linkedList.insert('a')
console.log(linkedList)
// LinkedList { head: Node { data: 'a', next: null }, length: 1 }

linkedList.insert('b')
console.log(linkedList)
// LinkedList { head: Node { data: 'a', next: Node { data: 'b', next: null } }, length: 2 }

// delete
linkedList.delete('a')
console.log(linkedList)
// LinkedList { head: Node { data: 'b', next: null }, length: 1 }

// search
linkedList.insert('c')
linkedList.insert('d')
linkedList.insert('e')

console.log(linkedList.search('e'))
// Node { data: 'e', next: null }

console.log(linkedList.search('f'))
// null