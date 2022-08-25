// return the minimum number of coins to sum up to a given sum

const greedy = (coins, sum) => {
  coins.sort((a, b) => b - a) // O(nlogn)

  console.log('coins:', coins)
  console.log('sum:', sum)
  
  const result = {}
  let sumRemain = sum

  for(let i = 0; i < coins.length; i++) { // O(n)
    const numCoin = Math.floor(sumRemain/coins[i])
    if(numCoin > 0) {
      result[coins[i] + ' coin(s)'] = numCoin
      sumRemain = sumRemain - numCoin * coins[i]
    }
  }

  result.sumRemain = sumRemain

  return result
}

console.log(JSON.stringify(greedy([1, 2, 5], 21), null, 4));
console.log('========================')
console.log(JSON.stringify(greedy([2, 5], 21), null, 4));

// Time complexity: O(nlogn), with n is number of coin types