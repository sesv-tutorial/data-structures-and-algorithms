

function rob (nums) {

  const cache = {}

  const dfs = (i) => {

    if(i >= nums.length) return 0

    if(cache[i] != undefined) {
      return cache[i]
    } else {
      const profit = Math.max(
        nums[i] + dfs(i + 2), // house after adjacent
        dfs(i + 1) // adjacent house
      )
      cache[i] = profit
      return profit
    }
  }

  return dfs(0)
}

console.log('rob [1,3,4]:', rob([1,3,4]))
