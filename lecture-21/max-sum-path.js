// Find max sum path from root to leaf

// structure of a node
class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

// Binary Tree
class BinaryTree {
  constructor(data) {
    this.root = data ? new Node(data) : null
  }
}

// create new binary tree
const binaryTree = new BinaryTree()
binaryTree.root = new Node(5) // add root node, 5

// add level 1 nodes: 3, 2
binaryTree.root.left = new Node(3)
binaryTree.root.right = new Node(2)

// add level 2 nodes: 7, 4
binaryTree.root.left.left = new Node(7)
binaryTree.root.right.right = new Node(4)
console.log(JSON.stringify(binaryTree, null, 4))

const sum1 = { max: 0 }

const greedySumPath = (node, sum) => {
  if(!node) return sum

  sum.max = sum.max + node.data

  if(node.left?.data >= node.right?.data || node.left?.data && !node.right?.data) {
    console.log('next node on left:', node.left.data)
    greedySumPath(node.left, sum)
  }
  
  if(node.left?.data < node.right?.data || node.right?.data && !node.left?.data) {
    console.log('next node on right:', node.right.data)
    greedySumPath(node.right, sum)
  }

  return sum
}

// Time complexity: worst case O(n), n is total number of nodes

console.log(greedySumPath(binaryTree.root, sum1))


console.log('========================')


// create new binary tree
const binaryTree2 = new BinaryTree()
binaryTree2.root = new Node(5)
binaryTree2.root.left = new Node(3)
binaryTree2.root.right = new Node(2)
binaryTree2.root.left.left = new Node(1)
binaryTree2.root.right.right = new Node(8)
console.log(JSON.stringify(binaryTree2, null, 4))


const sum2 = { max: 0 }
console.log(greedySumPath(binaryTree2.root, sum2))