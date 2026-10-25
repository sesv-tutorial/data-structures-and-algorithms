// Sam's DP example: Leetcode #1155. Number of Dice Rolls With Target Sum https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/

// branch
function diceRollStep1(n, k, target) {

  const cache = {}

  const dfs = (n, target) => {

    // console.log('target:', target)

    if(target < 0 ) return 0
    if(target == 0 ) return 1
    if(n == 0 ) return 0

    let key = n + ',' + target
    if(cache[key] != undefined) return cache[key]

    let ways = 0

    for(let i = 1; i <= k; i++) {
      ways = ways + dfs(n-1, target - i)
    }

    // console.log('ways:', ways)
    return cache[key] = ways
  }

  return dfs(n, target)
}

console.log(diceRollStep1(1, 6, 3)) // 1
console.log(diceRollStep1(2, 6, 7)) // 6
console.log(diceRollStep1(3, 6, 9)) // 6
console.log(diceRollStep1(30, 30, 500)) // 4