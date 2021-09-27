// function to return a Fibonacci number at a position `n`
// Fibonacci sequence: F = 0, 1, 1, 2, 3, 5, 8, 13, ...
const fib = (n) => {
  console.log('n:', n)
  if(n === 0) return 0
  if(n === 1) return 1
  return fib(n - 1) + fib(n - 2)
}

console.log(fib(4)) // 3