// Sam's DP, Leetcode #322 Coin Change https://leetcode.com/problems/coin-change/description

// step 1: full branch out
function coinChangeStep1(coins, amount) {

  const dfs = (amount) => {

    if(amount < 0) return

    console.log(amount)

    for(let i = 0; i < coins.length; i++) {
      dfs(amount - coins[i])
    }
  }

  dfs(amount)
}

// step 2: calculation
function coinChangeStep2(coins, amount) {

  const dfs = (amount) => {

    if(amount == 0) return 0

    const changes = []

    for(let i = 0; i < coins.length; i++) {
      if(amount >= coins[i]) {
        changes.push(1 + dfs(amount - coins[i]))
      }
    }

    return Math.min.apply(null, changes)
  }

  return dfs(amount)
}

// step 3: cache
function coinChangeStep3(coins, amount) {

  const cache = {}

  const dfs = (amount) => {

    if(amount == 0) return 0

    if(cache[amount] != undefined) return cache[amount]

    const changes = []

    for(let i = 0; i < coins.length; i++) {
      if(amount >= coins[i]) {
        changes.push(1 + dfs(amount - coins[i]))
      }
    }

    cache[amount] = Math.min.apply(null, changes)
    return cache[amount]
  }

  const result = dfs(amount)

  return result != Infinity ? result : -1
}


console.log('coinChangeStep1:', coinChangeStep1([1,2,3], 4))
console.log('coinChangeStep2:', coinChangeStep2([1,2,3], 4)) // 2
console.log('coinChangeStep3:', coinChangeStep3([1,2,3], 4)) // 2

console.time('no cache')
console.log(coinChangeStep2([1,2,3], 28)) // 10
console.timeEnd('no cache') // no cache: 1199.588ms

console.time('cached')
console.log(coinChangeStep3([1,2,3], 28)) // 10
console.timeEnd('cached') // cached: 0.062ms