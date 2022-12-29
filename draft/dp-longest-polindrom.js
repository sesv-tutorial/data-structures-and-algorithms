

const dpLongestPolindrome = (str) => {
  
  const states = []

  // first stage
  const strSplit = str.split('')
  const firstState = [] // [ 'u', 0 ]

  for(let i = 0; i < strSplit.length; i++) {
    firstState.push([strSplit[i], '' + i])
    states.push([])
  }

  states[0] = firstState
  
  // 2nd stage and so on
  for(let i = 1; i < states.length; i++) {
    const prevState = states[i - 1]
    const firstState = states[0]

    for(let j = 0; j < prevState.length; j++) { // arr[j] = [ 'u', '0' ]
      const [prevStr, prevIdx] = prevState[j]
      for(let k = 0; k < firstState.length; k++) { // arr[k] = [ 'u', '0' ]
        const [firstStr, firstIdx] = firstState[k]

        // if(prevIdx === firstIdx) continue

        let prevIdxArr = prevIdx.split(',')
        // console.log('prevIdxArr:', prevIdxArr)
        // console.log('firstIdx:', firstIdx)

        // go through a prev state indexes to find a place to insert
        for(let l = 0; l < prevIdxArr.length; l++) {
          if(firstIdx === prevIdxArr[l]) break // if character included in the str, we don't have to consider this str anymore
          // console.log('prevIdxArr[l]:', prevIdxArr[l])

          // console.log('here')
          // console.log('parseInt(prevIdxArr[l-1]):', parseInt(prevIdxArr[l-1]) || -1)
          // console.log('parseInt(firstIdx):', parseInt(firstIdx))
          // console.log('parseInt(prevIdxArr)[l]:', parseInt(prevIdxArr[l]))

          if (
            ((parseInt(prevIdxArr[l-1]) || -1) < parseInt(firstIdx)) && 
            (parseInt(firstIdx) < parseInt(prevIdxArr[l]))
          ) {
            // insert index
            const deepCpPrevIdxArr = JSON.parse(JSON.stringify(prevIdxArr))
            deepCpPrevIdxArr.splice(l, 0, firstIdx)

            // insert character
            const insertedStr = [prevStr.slice(0, l), firstStr, prevStr.slice(l)].join('')

            // console.log('deepCpPrevIdxArr:', deepCpPrevIdxArr)
            // console.log('insertedStr:', insertedStr)

            // prevIdx = deepCpPrevIdxArr
            const newState = [insertedStr, deepCpPrevIdxArr.join(',')]
            console.log('newState:', newState)

            states[i].push(newState)

          }

        }
        // break


      }
      // break
    }
    // break
   if( i === 2 ) break
  }


  console.log('states:', states)
}

// console.log(dpLongestPolindrome('underqualified'))



 // A utility function to get max of two integers 
 function max(x, y)
 {
     return (x > y) ? x : y;
 }
  
 // Returns the length of the longest palindromic subsequence in seq    
 function lps(seq, i, j)
 {
     // Base Case 1: If there is only 1 character
     if (i == j)
     {
         return 1;
     }

     // Base Case 2: If there are only 2 characters and both are same 
         if (seq[i] == seq[j] && i + 1 == j)
         {
             return 2;
         }
    
     // If the first and last characters match 
         if (seq[i] == seq[j])
         {
             return lps(seq, i + 1, j - 1) + 2;
         }
    
     // If the first and last characters do not match 
         return max(lps(seq, i, j - 1), lps(seq, i + 1, j));
 }
  
 /* Driver program to test above function */
//  let seq = "GEEKSFORGEEKS";
 let seq = "underqualified";


// console.log(lps('underqualified'))

//  let n = seq.length;
//  console.log("The length of the LPS is ", lps(seq.split(""), 0, n - 1));
  
 // This code is contributed by avanitrachhadiya2155


 // A utility function to get max of two integers
function max(x,y)
{
    return (x > y)? x : y;
}
 
// Returns the length of the longest
    // palindromic subsequence in seq
function lps(seq)
{
    let n = seq.length;
    let i, j, cl;
    // Create a table to store results of subproblems
    let L = new Array(n);
    for(let x=0;x<n;x++)
    {
        L[x] = new Array(n);
        for(let y = 0; y < n; y++)
            L[x][y] = 0;
    }

    console.log('L:', L)
      
    // Strings of length 1 are palindrome of length 1
    for (i = 0; i < n; i++)
        L[i][i] = 1;

      
        console.log('L:', L)
        
              
        // Build the table. Note that the lower
        // diagonal values of table are
        // useless and not filled in the process.
        // The values are filled in a manner similar
        //  to Matrix Chain Multiplication DP solution (See
        // https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/).
        // cl is length of substring
        for (cl = 2; cl <= n; cl++)
        {
            for (i = 0; i < n -cl + 1; i++)
            {
                j = i + cl - 1;
                if (seq[i] == seq[j] && cl == 2) L[i][j] = 2;
                else if (seq[i] == seq[j]) L[i][j] = L[i + 1][j - 1] + 2;
                else L[i][j] = max(L[i][j - 1], L[i + 1][j]);
                console.log('cl:', cl, 'i:', i, 'j:', j, seq[i], seq[j]);
                    // console.log('L:', L)
            }
        }
        
    console.log('L:', L)
        return L[0][n - 1];
}
 
 /* Driver program to test above functions */
let aaa = "undnuq";
// let n = seq.length;
console.log("The length of the lps is "+ lps(aaa));
 