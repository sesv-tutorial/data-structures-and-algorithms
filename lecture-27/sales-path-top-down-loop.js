// Sales path DFS Loop style

// prepare path data
let nodeCount = 1

// Constructor to create a new Node
function Node(cost) {
  this.cost = cost
  this.children = []
  this.id = nodeCount++
}

// sale paths relationship
var root = new Node(0)
root.children.push(new Node(5))
root.children.push(new Node(3))
root.children.push(new Node(6))
root.children[0].children.push(new Node(4))
root.children[1].children.push(new Node(2))
root.children[1].children.push(new Node(0))
root.children[2].children.push(new Node(1))
root.children[2].children.push(new Node(5))
root.children[1].children[0].children.push(new Node(1))
root.children[1].children[1].children.push(new Node(10))
root.children[1].children[0].children[0].children.push(new Node(1))
// console.log(JSON.stringify(root, null, 4))

// done preparing path data

// depth first search on sales path, using WHILE LOOP
const dfsSalesPath = (node) => {
  const seen = new Set()
  const stack = [node] // REMEMBER to use a proper stack data structure IRL
  const path = [] // current path
  const paths = [] // all possible paths

  while(stack.length > 0) {

    printStack(stack)

    const curNode = stack.pop() // pop the stack

    // if we see a separator
    if(curNode === '|') {
      path.pop() // remove parent node from path
      continue // and continue to next node
    } else { // if not
      path.push(curNode.cost) // save current node into path
    }

    // if we've never seen this node before, process,
    // otherwise, ignore the node
    if(!seen.has(curNode.id)) {

      seen.add(curNode.id) // add this node to seen list
      let seenAllChildNodes = true
      let pushedSeparator = false

      curNode.children.forEach(node => {
        if(!seen.has(node.id)) {
          if(pushedSeparator === false) {
            stack.push('|')
            pushedSeparator = true
          }
          stack.push(node) // push neighbor on top
          seenAllChildNodes = false
        }
      })
        

      // pop the current path when we're at a leaf node
      // or all adjacent nodes have been visited
      if (
        curNode.children.length === 0 || // at leaf node
        seenAllChildNodes // or have seen all adjacent nodes
      ) {
        paths.push([
          path.join(','),
          path.reduce((partialSum, cut) => partialSum + parseInt(cut), 0)
        ])
        path.pop()
      }

      // console.log("path:", path)
    }
  }

  return paths
}

console.log('all possible paths & costs:', dfsSalesPath(root))


// print node `cost` instead of the whole node object
function printStack (stack) {
  const print = []
  for(let el of stack) {
    if(el === '|') {
      print.push(el)
    } else {
      print.push(el.cost)
    }
  }
  console.log('stack:', print)
}