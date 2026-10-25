// Learn Sam's DP step 1: 1 Depth First Search gives 1 branching

function factorial(n) {
  console.log('n:', n)
  if(n == 1) return 1
  return n * factorial(n-1)
}
// n: 3, 2, 1, f(3) = 3*2*1 = 6
console.log(factorial(3)) // 6