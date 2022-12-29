// Sales path DFS BOTTOM-UP recursion style

// prepare path data
let nodeCount = 1

// Constructor to create a new Node
function Node(cost) {
  this.cost = cost
  this.children = []
  this.id = nodeCount++
}

// 
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

// depth first search on sales path, BOTTOM-UP recursion style
const dfsSalesPathRecursion = (rootNode) => {
  return cost(rootNode)
  
  function cost(node) {
    if(node.children.length == 0) { // base case, aka exit condition
      console.log('leaf cost:', node.cost)
      return node.cost
    } else {
      let costs = new Array(node.children.length)
      for(let i = 0; i < node.children.length; i++) {
        costs[i] = node.cost + cost(node.children[i])
      }
      console.log('min from costs:', costs)
      return Math.min.apply(null, costs)
    }
  }
}

console.log('cheapest path cost:', dfsSalesPathRecursion(root)) // 7