// Leetcode #733 Flood fill: https://leetcode.com/problems/flood-fill/description/

// DFS flood fill
 var floodFill = function(image, sr, sc, color) {

  console.log('image:', image)

  const stack = [[sr, sc]] // REMEMBER to use a proper stack data structure IRL
  const seen = new Set()
  
  while(stack.length > 0) {

      // console.log(stack)

      const [curSr, curSc] = stack.pop() // pop the stack
      const curPosStr = '' + curSr + curSc

      // if we never seen this node before, process
      if(!seen.has(curPosStr)) {
          seen.add(curPosStr)

          const floodVal = image[curSr][curSc] // get starting pixel value
          image[curSr][curSc] = color // update starting pixel to `color`

          const neighbors = [ // list of all possible neighbors
              [curSr + 1, curSc],
              [curSr - 1, curSc],
              [curSr, curSc + 1],
              [curSr, curSc - 1],
          ]

          for(let [nSr, nSc] of neighbors) { // for each neighbor
              const nPosStr = '' + nSr + nSc
              if(
                  !seen.has(nPosStr) && // never seen
                  nSr >= 0 && nSr < image.length && // within image width
                  nSc >= 0 && nSc < image[0].length && // within image height
                  image[nSr][nSc] == floodVal // same pixel value with started pixel
              ) {
                  stack.push([nSr, nSc]) // push node on top the stack
              }
          }
      }
  } // otherwise, ignore

  return image
}

const image = [
  [1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1],
  [1, 1, 0, 1, 1],
  [0, 1, 0, 0, 1],
]
const sr = 1
const sc = 1
const color = 2

console.log('flood filled image:', floodFill(image, sr, sc, color))