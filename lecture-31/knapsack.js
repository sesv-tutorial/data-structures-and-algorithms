// Sam's DP, G4G 0/1 Knapsack https://practice.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1?utm_source=gfg&utm_medium=article&utm_campaign=bottom_sticky_on_article

// step 1: full branch out
function knapsackStep1(capacity, weights, values, n) {

  const dfs = (capacity, weights, values, n) => {

    if(capacity == 0) return

    console.log(capacity)

    for(let i = 0; i < n; i++) {
      if(capacity >= weights[i]) {
        dfs(
          capacity - weights[i],
          [...weights.slice(0,i), ...weights.slice(i+1)],
          [...values.slice(0,i), ...values.slice(i+1)],
          n - 1
        )
      }
    }
  }

  dfs(capacity, weights, values, n)
}

// step 2: calculation
function knapsackStep2(capacity, weights, values, n) {

  const dfs = (capacity, weights, values, n) => {

    if(n == 0) return 0

    const collections = []

    for(let i = 0; i < n; i++) {
      if(capacity >= weights[i]) {
        collections.push(values[i] + dfs(
          capacity - weights[i],
          [...weights.slice(0,i), ...weights.slice(i+1)],
          [...values.slice(0,i), ...values.slice(i+1)],
          n - 1
        ))
      } else {
        collections.push(0)
      }
    }

    return Math.max.apply(null, collections)
  }

  return dfs(capacity, weights, values, n)
}

// step 3: cache
function knapsackStep3(capacity, weights, values, n) {

  const cache = {}

  const dfs = (capacity, weights, values, n) => {

    if(n == 0) return 0

    const key = weights.join(',')

    if(cache[key] != undefined) return cache[key]

    const collections = []

    for(let i = 0; i < n; i++) {
      if(capacity >= weights[i]) {
        collections.push(values[i] + dfs(
          capacity - weights[i],
          [...weights.slice(0,i), ...weights.slice(i+1)],
          [...values.slice(0,i), ...values.slice(i+1)],
          n - 1
        ))
      } else {
        collections.push(0)
      }
    }

    cache[key] = Math.max.apply(null, collections)

    return cache[key]
  }

  return dfs(capacity, weights, values, n)
}

console.log('knapsackStep1:', knapsackStep1(7, [4,5,1], [1,2,3], 3)) // undefined
console.log('knapsackStep2:', knapsackStep2(7, [4,5,1], [1,2,3], 3)) // 5
console.log('knapsackStep3:', knapsackStep3(7, [4,5,1], [1,2,3], 3)) // 5
// console.log('knapsackStep3:', knapsackStep3(7, [4,5,1,2], [1,2,3,4], 4)) // 5
// console.log('knapsackStep3:', knapsackStep3(100, [4,5,1], [1,2,3], 3)) // 6
// console.log('knapsackStep3:', knapsackStep3(8, [2,3,4,5], [1,2,5,6], 4)) // 8
// console.log('knapsackStep3:', knapsackStep3(50, [10,20,30], [60,100,120], 3)) // 220

console.time('no cache')
console.log(knapsackStep2(100, [4,5,1,4,5,1,4,5,1,6], [1,2,3,1,2,3,1,2,3,6], 10)) // 24
console.timeEnd('no cache') // no cache: 2134.207ms

console.time('cached')
console.log(knapsackStep3(100, [4,5,1,4,5,1,4,5,1,6], [1,2,3,1,2,3,1,2,3,6], 10)) // 24
console.timeEnd('cached') // cached: 5.343ms