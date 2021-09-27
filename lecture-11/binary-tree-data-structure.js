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
console.log(binaryTree) // BinaryTree { root: null }

// add root node, 5
binaryTree.root = new Node(5)
console.log(JSON.stringify(binaryTree, null, 4))
// {
//   "root": {
//       "data": 5,
//       "left": null,
//       "right": null
//   }
// }

// add level 1 nodes: 3, 9
binaryTree.root.left = new Node(3)
binaryTree.root.right = new Node(9)
console.log(JSON.stringify(binaryTree, null, 4))
// {
//   "root": {
//       "data": 5,
//       "left": {
//           "data": 3,
//           "left": null,
//           "right": null
//       },
//       "right": {
//           "data": 9,
//           "left": null,
//           "right": null
//       }
//   }
// }

// add level 2 nodes: 8, 6, 1
binaryTree.root.left.left = new Node(8)
binaryTree.root.right.left = new Node(6)
binaryTree.root.right.right = new Node(1)
console.log(JSON.stringify(binaryTree, null, 4))
// {
//   "root": {
//       "data": 5,
//       "left": {
//           "data": 3,
//           "left": {
//               "data": 8,
//               "left": null,
//               "right": null
//           },
//           "right": null
//       },
//       "right": {
//           "data": 9,
//           "left": {
//               "data": 6,
//               "left": null,
//               "right": null
//           },
//           "right": {
//               "data": 1,
//               "left": null,
//               "right": null
//           }
//       }
//   }
// }