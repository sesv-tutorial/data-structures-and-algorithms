// Learn Sam's DP step 2: 2 Depth First Searches give 2 branchings

function fib(n) {
  console.log('n:', n)
  if(n == 1) return 1
  if(n == 0) return 0
  return fib(n-1) + fib(n-2)
}
console.log(fib(3)) // 2
// n: 3, 2, 1, 0, 1