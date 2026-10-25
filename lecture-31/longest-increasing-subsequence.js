// Sam's DP, Leetcode #300: https://leetcode.com/problems/longest-increasing-subsequence/

// Full combinations of all data points
function fullCombination(nums) {

  const temp = []

  const dfs = (i) => {

    if(i == nums.length) return
  
    for(i; i < nums.length; i++) {
      temp.push(nums[i])
      console.log('temp:', temp)
      dfs(i+1)
      temp.pop()
    }
  }

  return dfs(0)
}

// step 1: full branch out
// (all data point possible combinations)
function lisStep1(nums) {

  const temp = []

  const dfs = (i) => {

    if(i == nums.length) return

    for(i; i < nums.length; i++) {
      temp.push(nums[i])

      // console.log(nums[i])
      console.log('temp:', temp)

      dfs(i+1)
      temp.pop()
    }
  }

  return dfs(0)
}

// step 2: calculation
function lisStep2(nums) {

  const temp = []

  const dfs = (i) => {

    if(i == nums.length) return 0

    // stop branching
    if(temp.length >= 2) {
      if(temp[temp.length - 1] <= temp[temp.length - 2]) {
        return 0
      }
    }

    const options = []
  
    for(i; i < nums.length; i++) {
      temp.push(nums[i])
      // console.log('temp:', temp)

      const add = temp[temp.length - 1] <= temp[temp.length - 2] ? 0 : 1

      options.push(add + dfs(i+1))

      temp.pop()
    }

    return Math.max.apply(null, options)
  }

  return dfs(0)
}

// step 3: cache
function lisStep3(nums) {

  const temp = []
  const cache = {}

  const dfs = (i) => {

    // console.log('cache:', cache)

    if(i == nums.length) return 0

    // stop branching
    if(temp.length >= 2) {
      if(temp[temp.length - 1] <= temp[temp.length - 2]) {
        return 0
      }
    }

    const key = i + ''
    if(cache[key] != undefined) return cache[key]

    const options = []
  
    for(i; i < nums.length; i++) {
      temp.push(nums[i])

      const add = temp[temp.length - 1] <= temp[temp.length - 2] ? 0 : 1
      options.push(add + dfs(i+1))

      temp.pop()
    }

    cache[key] = Math.max.apply(null, options)

    return cache[key]
  }

  return dfs(0)
}

console.log('lisStep1:', lisStep1([1, 0, 2, 3])) // undefined
console.log('lisStep2:', lisStep2([1, 0, 2, 3])) // 3
console.log('lisStep3:', lisStep3([1, 0, 2, 3])) // 3

console.time('no cache')
console.log(lisStep2([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25])) // 25
console.timeEnd('no cache') // no cache: 1586.456ms

console.time('cached')
console.log(lisStep3([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25])) // 25
console.timeEnd('cached') // cached: 0.151ms