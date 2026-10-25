// Learn Sam's DP step 3: 3 Depth First Searches give 3 branchings

function tri(n) {
  console.log('n:', n)
  if(n == 2) return 1
  if(n == 1) return 1
  if(n == 0) return 0
  return tri(n-1) + tri(n-2) + tri(n-3)
}

console.log(tri(5)) // 7

// n: 5 4 3 2 1 0 2 1 3 2 1 0 2