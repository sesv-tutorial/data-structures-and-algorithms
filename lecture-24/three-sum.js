// Find 3 nums in an array that adds up to a sum

// Time complexity: O(n^3)
const threeSumForLoops = (nums, sum) => {
  const result = []
  
  for(let i = 0; i < nums.length; i++) { // pick 1st num
    for(let j = i + 1; j < nums.length; j++) { // pick 2nd num
      for(let k = j + 1; k < nums.length; k++) { // pick 3rd num
        if(nums[i] + nums[j] + nums[k] === sum) {
          result.push([nums[i], nums[j], nums[k]])
        }
      }
    }
  }

  return result
}

// Time complexity: O(n^2logn)
const threeSumForLoopsAndBinarySearch = (nums, sum) => {
  nums.sort((a, b) => a - b) // O(nlogn)
  const result = []

  for(let i = 0; i < nums.length; i++) { // pick 1st num
    for(let j = i + 1; j < nums.length; j++) { // pick 2nd num

      let remain = sum - nums[i] - nums[j]
      let left = j + 1
      let right = nums.length - 1

      while(left <= right) { // pick 3rd num, Binary Search
        let mid = Math.floor((left + right) / 2)

        if(nums[mid] === remain) {
          result.push([nums[i], nums[j], nums[mid]])
          break
        } else if(nums[mid] > remain) {
          right--
        } else {
          left++
        }
      }
    }
  }

  return result
}

// Time complexity: O(n^2)
const threeSumTwoPointers = (nums, sum) => {
  const result = []
  nums.sort((a,b) => a-b) // O(nlogn)

  for(let i = 0; i < nums.length; i++) { // pick 1st num

      let left = i + 1
      let right = nums.length - 1

      while(left < right) { // pick 2nd + 3rd, Two Pointers
          let current = nums[i] + nums[left] + nums[right]

          if(current === sum) { // found target sum
              result.push([nums[i], nums[left], nums[right]])
              break
          } else if(current > sum) { // current sum bigger than target,
              right--                         // move right pointer to the left
          } else { // current sum smaller than target,
              left++        // move left pointer to the right
          }
      }
  }
  
  return result
}


console.log('3 For loops:')
console.log(threeSumForLoops([15, 26, 13, 7, 3, 5, 2, 22], 30))
console.log('2 For loops + Binary Search:')
console.log(threeSumForLoopsAndBinarySearch([15, 26, 13, 7, 3, 5, 2, 22], 30))
console.log('1 For loop + Two Pointers:')
console.log(threeSumTwoPointers([15, 26, 13, 7, 3, 5, 2, 22], 30))