// Find container with most water

// Time Complexity: O(n)
const maxArea = (height) => {

  let left = 0
  let right = height.length - 1
  let curMax = 0

  while (left < right) { // Two Pointers

    let newArea = (right - left) * Math.min(height[left], height[right])
    curMax = Math.max(curMax, newArea)

    console.log(
      'height left:', height[left],
      'right:', height[right],
      'dist:', right - left,
      'area:', newArea
    )

    // move the pointer where height is smaller
    if (height[left] > height[right]) { // move right pointer to the left
      right--
    } else { // move left pointer to the right
      left++
    }
  }

  return curMax
}

console.log('max area:', maxArea([1,8,6,2,5,4,8,3,7])) // max area: 49
