// Sam's DP, Leetcode #714: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/description/

// step 1: full branch out
function buySellStockStep1 (prices, fee) {

  const dfs = (hasStock, i) => {

    if(i == prices.length) return

    console.log(prices[i])

    dfs(hasStock, i + 1) // do nothing
    
    if(hasStock) {
      dfs(!hasStock, i + 1) // sell
    } else {
      dfs(!hasStock, i + 1) // buy
    }
  }

  return dfs(false, 0)
}

// step 2: calculation
function buySellStockStep2 (prices, fee) {

  const dfs = (hasStock, i) => {

    if(i >= prices.length) return 0

    const doNothing = dfs(hasStock, i + 1) // do nothing

    if(hasStock) { // have stock in hand
      return Math.max(
        doNothing, // do nothing
        prices[i] - fee + dfs(!hasStock, i + 1) // sell
      )
    } else { // does not have stock in hand
      return Math.max(
        doNothing, // do nothing
        dfs(!hasStock, i + 1) - prices[i] // buy
      )
    }
  }

  return dfs(false, 0)
}

// step 3: cache
function buySellStockStep3 (prices, fee) {

  const cache = {}

  const dfs = (hasStock, i) => {

    if(i >= prices.length) return 0

    const key = i + ',' + hasStock
    
    if(cache[key] != undefined) {
      return cache[key]
    } else {

      const doNothing = dfs(hasStock, i + 1) // do nothing
      let buyOrSell
  
      if(hasStock) { // have stock in hand
        buyOrSell = prices[i] - fee + dfs(!hasStock, i + 1) // sell
      } else { // does not have stock in hand
        buyOrSell = dfs(!hasStock, i + 1) - prices[i] // buy
      }
  
      cache[key] = Math.max(doNothing, buyOrSell)

      return cache[key]
    }
  }

  return dfs(false, 0)
}

console.log('buySellStockStep1:', buySellStockStep1([1,2,8], 2))
console.log('buySellStockStep2:', buySellStockStep2([1,2,8], 2))
console.log('buySellStockStep3:', buySellStockStep3([1,2,8], 2))

console.time('no cache')
console.log(buySellStockStep2([1036,2413,2776,825,2640,31,1560,2917,4282,783,3146,2600,1939,694,4284,3881,554,167,372,4620,3037,1175,1075,3845,4981,4495,3406], 655)) // 17533
console.timeEnd('no cache') // no cache: 1962.271ms

console.time('cached')
console.log(buySellStockStep3([1036,2413,2776,825,2640,31,1560,2917,4282,783,3146,2600,1939,694,4284,3881,554,167,372,4620,3037,1175,1075,3845,4981,4495,3406], 655)) // 17533
console.timeEnd('cached') // cached: 0.130ms


