// function to return factorial (n!) of a given number `n`
const factorial = (n) => {
  console.log('n:', n)
  if(n === 1) return 1
  return n * factorial(n - 1)
}

console.log(factorial(3)) // 6