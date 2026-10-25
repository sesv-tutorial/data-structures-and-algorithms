// Sam's DP example: longest substring (non-consecutive is ok)

function lis(str1, str2) {

  const cache = {}

  const dfs = (i,j) => {

    if(i == str1.length) return 0
    if(j == str2.length) return 0

    // console.log(str1[i], i, str1[j], j)
    const key = i + ',' + j

    if(cache[key] != undefined) return cache[key]

    let lon

    if(str1[i] == str2[j]) { // matched
      lon = 1 + dfs(i+1, j+1)
    } else {
      lon = Math.max(
        dfs(i, j+1),
        dfs(i+1, j)
      )
    }

    cache[key] = lon
    return cache[key]
  }

  return dfs(0, 0)
}

console.log(lis('ac', 'abc')) // 2
console.log(lis('afsdfbioisfc', 'asdklfuwaelrweo;ijaw')) // 6