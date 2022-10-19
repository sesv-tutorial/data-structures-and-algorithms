// count number of substrings that has 3 unique characters

var countGoodSubstrings = (s) => {
  const goodSubStrings = []

  for(let i = 0; i < s.length - 2; i++) {
    const set = new Set([s[i], s[i+1], s[i+2]]) // set of unique chars
    if(set.size === 3) { // if set has 3 unique chars
      goodSubStrings.push(s[i] + s[i+1] + s[i+2]) // substring had 3 distinct chars
    }
  }

  console.log('original string:', s)
  console.log('good substrings:', goodSubStrings)
  console.log('unique good substrings:', new Set(goodSubStrings))
  
  return new Set(goodSubStrings).size
}

console.log('good substrings count:', countGoodSubstrings('xyzzaz')) // 1
console.log('======================')
console.log('good substrings count:', countGoodSubstrings('bdakjijcoeedddadfelldbda')) // 11