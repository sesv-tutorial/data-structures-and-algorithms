// tips to debug a DP program

function coinChangeStep2(coins, amount) {

  const dfs = (amount) => {

    console.log('1111111111111')

    if(amount == 0) {
      console.log('2222222222222')
      return 0
    }

    console.log('33333333333333')

    const changes = []

    for(let i = 0; i < coins.length; i++) {
      if(amount >= coins[i]) {

        console.log(`calling: dfs(${amount - coins[i]})`)

        changes.push(1 + dfs(amount - coins[i]))
      }
    }

    console.log('444444444444444')

    return Math.min.apply(null, changes)
  }

  return dfs(amount)
}

console.log('coinChangeStep2:', coinChangeStep2([1,2,3], 4)) // 2