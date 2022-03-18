
// can present visual graph into code
// can construct visual graph from code

// ADJACENCY LIST, dense
// directed
// unweighted
// from index -> array elements
const graph1 = [
  [1, 2], // SFO, index 0
  [0, 3], // ORD, index 1
  [1], // DEN, index 2
  [2, 4], // JFK, index 3
  [2], // IAH, index 4
]

// ADJACENCY MATRIX, sparse
// directed
// unweighted
// from row -> column
// documentation is IMPORTANT!
const graph2 = [
// SFO, ORD, DEN, JFK, IAH
  [0,   1,   1,   0,   0], // SFO, 0
  [1,   0,   0,   1,   0], // ORD, 1
  [0,   1,   0,   0,   0], // DEN, 2
  [0,   0,   1,   0,   1], // JFK, 3
  [0,   0,   1,   0,   0], // IAH, 4
]

// ADJACENCY LIST, dense
// directed
// weighted
// from index -> array elements
// [1, 2] -> [index 1, weight 2]
const graph3 = [
  [[1, 2], [2, 10]], // SFO, index 0
  [[0, 4], [3, 5]], // ORD, index 1
  [[1, 6]], // DEN, index 2
  [[2, 4], [4, 3]], // JFK, index 3
  [[2, 8]], // IAH, index 4
]


// ADJACENCY MATRIX, sparse
// directed
// weighted
// from row -> column
// documentation is IMPORTANT!
const graph4 = [
// SFO, ORD, DEN, JFK, IAH
  [0,   2,   10,  0,   0], // SFO, 0
  [4,   0,   0,   5,   0], // ORD, 1
  [0,   6,   0,   0,   0], // DEN, 2
  [0,   0,   4,   0,   3], // JFK, 3
  [0,   0,   8,   0,   0], // IAH, 4
]



// IMAGINE if your co-worker thinks column -> row? what will happen?



// ADJACENCY LIST, dense
// undirected, means always bi-directional
// unweighted
// from index -> array elements
const graph5 = [
  [1, 2], // SFO, index 0
  [0, 2, 3], // ORD, index 1
  [0, 1, 3, 4], // DEN, index 2
  [1, 2, 4], // JFK, index 3
  [2, 3], // IAH, index 4
]

// ADJACENCY MATRIX, sparse
// undirected, means always bi-directional
// unweighted
// from row -> column
// documentation is IMPORTANT!
const graph6 = [
// SFO, ORD, DEN, JFK, IAH
  [0,   1,   1,   0,   0], // SFO, 0
  [1,   0,   1,   1,   0], // ORD, 1
  [1,   1,   0,   1,   1], // DEN, 2
  [0,   1,   1,   0,   1], // JFK, 3
  [0,   0,   1,   1,   0], // IAH, 4
]

// ADJACENCY LIST, dense
// undirected, means always bi-directional
// weighted
// from index -> array elements
// [1, 2] -> [index 1, weight 2]
const graph7 = [
  [[1, 2], [2, 10]], // SFO, index 0
  [[0, 2], [2, 6], [3, 5]], // ORD, index 1
  [[0, 10], [1, 6], [3, 4], [4, 8]], // DEN, index 2
  [[1, 5], [2, 4], [4, 3]], // JFK, index 3
  [[2, 8], [3, 3]], // IAH, index 4
]


// ADJACENCY MATRIX, sparse
// symetric matrix
// undirected, means always bi-directional
// weighted
// from row -> column
// documentation is IMPORTANT!
const graph8 = [
// SFO, ORD, DEN, JFK, IAH
  [0,   2,   10,  0,   0], // SFO, 0
  [2,   0,   6,   5,   0], // ORD, 1
  [10,  6,   0,   4,   8], // DEN, 2
  [0,   5,   4,   0,   3], // JFK, 3
  [0,   0,   8,   3,   0], // IAH, 4
]