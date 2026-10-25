// Learn Sam's DP step 4: generalize DFS branching & cutting

function dfs(n) {
  console.log('n:', n)
  if(n == 2) return
  if(n == 1) return
  if(n == 0) return

  isEven(n-1) && dfs(n-1)
  isEven(n-2) && dfs(n-2)
  isEven(n-3) && dfs(n-3)
}
console.log(dfs(5))

// n: 5 4 2 2

/**
 * @param {*} num 
 * @returns true if number is even,
 * return false otherwise
 */
function isEven(num) {
  return num % 2 == 0
}

console.log(isEven(2)) // true