// Learn Sam's DP step 6: use DFS to recreate state tree solved by hand

// branch
function mostGoldStep6(map) {

  const dfs = (i, j) => {

    if( // reach destination cell (1,2)
      i == map.length - 1 &&
      j == map[0].length - 1
    ) {
      console.log(map[i][j])
      return
    }

    if( // out of map
      i >= map.length ||
      j >= map[0].length
    ) return

    console.log(map[i][j])

    dfs(i + 1, j) // go down
    dfs(i, j + 1) // go right
  }

  return dfs(0, 0)
}

// time complexity: O(2^3)
// time complexity: always exponential -> very bad

// calculate
function mostGoldStep7(map) {

  const dfs = (i, j) => {
    if((i == map.length - 1) && (j == map[0].length - 1)) 
      return map[i][j]
      
    if((i >= map.length) || (j >= map[0].length)) 
      return 0
    
    return map[i][j] + Math.max(dfs(i + 1, j), dfs(i, j + 1))
  }

  return dfs(0, 0)
}

// cache
function mostGoldStep8(map) {

  let cache = {}

  const dfs = (i, j) => {
    if((i == map.length - 1) && (j == map[0].length - 1)) return map[i][j]
    if((i >= map.length) || (j >= map[0].length)) return 0

    const key = i + ',' + j
    if(cache[key] != undefined) return cache[key]

    return cache[key] = map[i][j] + Math.max(dfs(i + 1, j), dfs(i, j + 1))
  }

  return dfs(0, 0)
}

const map = [
  [1, 5, 3],
  [2, 7, 1]
]

console.log('most gold:', mostGoldStep6(map)) //
console.log('most gold:', mostGoldStep7(map)) //
console.log('most gold:', mostGoldStep8(map)) //