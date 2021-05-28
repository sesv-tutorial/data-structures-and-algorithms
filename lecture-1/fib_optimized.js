console.time('compute fib optimized time')
const fib = (n) => {
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

console.log(fib(50)) // 12586269025
console.timeEnd('compute fib optimized time') // compute fib optimized time: 4.926ms