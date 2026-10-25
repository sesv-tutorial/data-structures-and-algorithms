// Sam's DP, Leetcode #71 Edit Distance https://leetcode.com/problems/edit-distance/

// step 1: full branch out
function editDistanceStep1 (word1, word2) {

  const dfs = (i, j) => {

    if(i >= word1.length) return
    if(j >= word2.length) return


    if(word1[i] == word2[j]) {
      console.log('M')
      dfs(i+1, j+1) // match
    } else {
      console.log('I')
      dfs(i, j+1) // insert
      console.log('R')
      dfs(i+1, j+1) // replace
      console.log('D')
      dfs(i+1, j) // delete
    }
  }

  dfs(0, 0)
}

// step 2: caclculation
function editDistanceStep2 (word1, word2) {

  const dfs = (i, j) => {

    if(i >= word1.length) return Math.max(0, word2.length - j)
    if(j >= word2.length) return Math.max(0, word1.length - i)

    if(word1[i] == word2[j]) {
      return dfs(i+1, j+1) // match
    } else {
      return 1 + Math.min(
        dfs(i, j+1), // insert
        dfs(i+1, j+1), // replace
        dfs(i+1, j) // delete
      )
    }
  }

  return dfs(0, 0)
}

// step 3: cache
function editDistanceStep3 (word1, word2) {

  const cache = {}

  const dfs = (i, j) => {

    // console.log('cache:', cache)

    if(i >= word1.length) return Math.max(0, word2.length - j)
    if(j >= word2.length) return Math.max(0, word1.length - i)

    const key = i + ',' + j

    if(cache[key] != undefined) { // use cache
      return cache[key]
    } else { // no cache, calculate
      let edits

      if(word1[i] == word2[j]) {
        edits = dfs(i+1, j+1) // match
      } else {
        edits = 1 + Math.min(
          dfs(i, j+1), // insert
          dfs(i+1, j+1), // replace
          dfs(i+1, j) // delete
        )
      }

      cache[key] = edits
      return cache[key]
    }
  }

  return dfs(0, 0)
}

// let str1 = "a"; // 1
// let str2 = "b";
// let str1 = "intention"; // 5
// let str2 = "execution";
// let str1 = "horse"; // 3
// let str2 = "ros";
let str1 = "sa"; // 1
let str2 = "sta";
// let str1 = "sunday"; // 3
// let str2 = "saturday";
// let str1 = "voldemort"; // 7
// let str2 = "dumbledore";
// let str1 = "dinitrophenylhydrazine"; // 6
// let str2 = "acetylphenylhydrazine";
// let str1 = "dinitrophenylhydrazine"; // 7
// let str2 = "benzalphenylhydrazone";

console.log('min edits:', editDistanceStep1(str1, str2))
console.log('min edits:', editDistanceStep2(str1, str2))
console.log('min edits:', editDistanceStep3(str1, str2))


console.time('no cache')
console.log(editDistanceStep2('dinitropheny', 'benzalphenyla')) // 8
console.timeEnd('no cache') // no cache: 2080.933ms

console.time('cached')
console.log(editDistanceStep3('dinitropheny', 'benzalphenyla')) // 8
console.timeEnd('cached') // cached: 1.136ms