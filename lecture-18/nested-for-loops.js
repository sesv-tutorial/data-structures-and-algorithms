// Find sub array of 3 elements, whose sum equals 15
const arr = [2, 4, 3, 9, 1]

const findSubArray3 = (arr, sum) => {
  const result = []

  for(let i = 0; i < arr.length - 2; i++) {
    for(let j = i+1; j < arr.length - 1; j++) {
      for(let m = j+1; m < arr.length; m++) {
        console.log(`subset: [${[arr[i], arr[j], arr[m]]}]`)
        ;(arr[i] + arr[j] + arr[m] == sum) && result.push([arr[i], arr[j], arr[m]])
      }
    }
  }

  return result
}

console.log(findSubArray3(arr, 15)) // [ [ 2, 4, 9 ] ]