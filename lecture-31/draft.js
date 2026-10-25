// branch
function mostGoldStep6(map) {

  const dfs = (i,j) => {

    if( // out of map
      i >= map.length ||
      j >= map[0].length
    ) return

    if( // reach destination cell (1,2)
      i == map.length - 1 &&
      j == map[0].length - 1
    ) {
      console.log(map[i][j])
      return
    }

    console.log(map[i][j])

    dfs(i+1, j) // down
    dfs(i, j+1) // right
  }

  dfs(0,0)
}

const map = [
  [1, 5, 3],
  [2, 7, 1]
]

console.log('most gold:', mostGoldStep6(map))