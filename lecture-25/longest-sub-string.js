// count the number of chars of the longest substring of unique characters

var lengthOfLongestSubstring = function(s) {
  console.log('original:', s)

  let longestSubStrLen = 0 // hold max length substring
  let str = '' // current unique char substring
  let seen = new Set() // unique chars of current substring
  
  for(let i = 0; i < s.length; i++) {
    if(!seen.has(s[i])) { // new char is NOT in current substring
      str = str + s[i] // add new char to substring
      seen.add(s[i]) // now seen it
      longestSubStrLen = Math.max(longestSubStrLen, str.length) // recal max len
    } else { // new char is IN current substring
      str = str.substring(str.indexOf(s[i]) + 1) + s[i] // update unique substring
      seen = new Set(str.split('')) // update unique chars in substring
    }

    console.log('str:', str)
  }
  
  return longestSubStrLen
}

console.log('longest substr:', lengthOfLongestSubstring('abcabcbb')) // 3
console.log('================')
console.log('longest substr:', lengthOfLongestSubstring('aab')) // 2