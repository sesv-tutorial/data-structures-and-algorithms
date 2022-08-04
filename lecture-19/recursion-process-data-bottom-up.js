// Calculate Fibonacci number at position `n`

console.log('==== equivalent FOR LOOP solution ====')

const fibForLoop = (n) => {
  let fn_2 = 0 // f(0)
  let fn_1 = 1 // f(1)
  
  if(n === 0) return fn_2
  if(n === 1) return fn_1

  let fn = 0

  for(let i = 2; i <= n; i++) {
    fn = fn_1 + fn_2 // f(n) = f(n-1) + f(n-2)
    fn_2 = fn_1
    fn_1 = fn
  }
  
  return fn
}

console.log(fibForLoop(10)) // 55
// Time complexity: O(n)

console.log('==== equivalent Recursion solution ====')

const fibRecursion = (n) => {
  if(n === 1) return 1
  if(n === 0) return 0
  return fibRecursion(n-1) + fibRecursion(n-2)
}

console.log(fibRecursion(10)) // 55
// Time complexity: O(2^n)