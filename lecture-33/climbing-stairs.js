// Sam's DP, Leetcode #70: https://leetcode.com/problems/climbing-stairs/description/

// step 1: full branch out
function climbStairsStep1(n) {

  const dfs = (n) => {

    console.log('n:', n)

    if(n == 0) return
    if(n < 0) return

    dfs(n - 1) // 1 step
    dfs(n - 2) // 2 steps
  }

  dfs(n)
}

// step 2: calculation
function climbStairsStep2(n) {

  const dfs = (n) => {

    if(n == 0) return 1
    if(n < 0) return 0

    return dfs(n - 1) + dfs(n - 2)
  }

  return dfs(n)
}

// step 3: cache
function climbStairsStep3(n) {

  const cache = {}
  
  const dfs = (n) => {

    if(n == 0) return 1
    if(n < 0) return 0

    if(cache[n] != undefined) {
      return cache[n]
    } else {
      const ways = dfs(n - 1) + dfs(n - 2)
      cache[n] = ways
      return ways
    }
  }

  return dfs(n)
}


// console.log('climbStairsStep1 3:', climbStairsStep1(3))
// console.log('climbStairsStep2 3:', climbStairsStep2(3)) // 3
// console.log('climbStairsStep3 3:', climbStairsStep3(3)) // 3

// console.time('no cache')
// console.log('climbStairsStep2 40:', climbStairsStep2(40)) // 3
// console.timeEnd('no cache') // no cache: 2251.742ms

// console.time('cached')
// console.log('climbStairsStep3 40:', climbStairsStep3(40)) // 3
// console.timeEnd('cached') // cached: 0.055ms