// Sam's DP, Leetcode #198: https://leetcode.com/problems/house-robber/description/

// step 1: full branch out
function robStep1 (nums) {

  const dfs = (i) => {

    if(i >= nums.length) return

    console.log('nums[i]]:', nums[i], i)

    dfs(i + 2) // house after adjacent
    dfs(i + 1) // adjacent house
  }

  dfs(0)
}

// step 2: calculation
function robStep2 (nums) {

  const dfs = (i) => {

    if(i >= nums.length) return 0

    return Math.max(
      nums[i] + dfs(i + 2), // house after adjacent
      dfs(i + 1) // adjacent house
    )
  }

  return dfs(0)
}

// step 3: cache
function robStep3 (nums) {

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

console.log('robStep1 [1,3,4]:', robStep1([1,3,4]))
console.log('robStep2 [1,3,4]:', robStep2([1,3,4])) // 5
console.log('robStep3 [1,3,4]:', robStep3([1,3,4])) // 5

console.time('no cache')
console.log(robStep2([183,219,57,193,94,233,202,154,65,240,97,234,100,249,186,66,90,238,168,128,177,235,50,81,185,165,217,207,88,80,112,78,135,62,228,247,211])) // 3365
console.timeEnd('no cache') // no cache: 663.464ms

console.time('cached')
console.log(robStep3([183,219,57,193,94,233,202,154,65,240,97,234,100,249,186,66,90,238,168,128,177,235,50,81,185,165,217,207,88,80,112,78,135,62,228,247,211])) // 3365
console.timeEnd('cached') // cached: 0.064ms