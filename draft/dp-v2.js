
const maxNumTableDp = (makeTableInput) => {

  const {
    rawMatLen,
    matNum,
    tableLegLen,
    tableLegNum,
    tableWidth,
    tableWidthNum,
    tableHeight,
    tableHeightNum,
  } = makeTableInput

  const oneTableLen = tableLegLen * tableLegNum + tableWidth * tableWidthNum + tableHeight * tableHeightNum
  const idealMaxTableNum = Math.floor(rawMatLen * matNum / (oneTableLen))

  const sortedTableSpecs = [
    {type: 'tableLegLen', len: tableLegLen, num: tableLegNum },
    {type: 'tableWidth', len: tableWidth, num: tableWidthNum },
    {type: 'tableHeight', len: tableHeight, num: tableHeightNum },
  ].sort((a, b) => b.len - a.len)

  const print = []
  for(let i = 1; i <= idealMaxTableNum; i++) {
    const finalStateStr = `${sortedTableSpecs[0].num * i}x${sortedTableSpecs[0].len}+${sortedTableSpecs[1].num * i}x${sortedTableSpecs[1].len}+${sortedTableSpecs[2].num * i}x${sortedTableSpecs[2].len}`
    print.push(finalStateStr)
  }
  


  console.log('print:', print)
  console.log('idealMaxTableNum:', idealMaxTableNum)
  console.log('sortedTableSpecs:', sortedTableSpecs)

  sortedTableSpecs.forEach(e => e.scaledRatio = e.num * idealMaxTableNum)

  // console.log('sortedTableSpecs:', sortedTableSpecs)

  

  // const maxRatio = z X[idealMaxTableNum * ]

  // console.log('items:', items)
  // const stateOpts = {}
  // const weightToItem = {}


  // calculate minimum ratio
  const minimumRatio = [] // [ 2, 2, 4 ] for 7 : 5 : 2
  for(let spec of sortedTableSpecs) {
    minimumRatio.push(spec.num)
  }
  console.log('minimumRatio:', minimumRatio)


  // calculate even ratios
  const sortedRatios = [] // ['6:6:12', '4:4:8', '2:2:4'] 3 tables, 2 tables, 1...

  for(let i = idealMaxTableNum; i >= 1; i--) {
    const temp = []
    minimumRatio.forEach(e => temp.push(i * e))
    sortedRatios.push(temp.join(':'))
  }

  console.log('sortedRatios:', sortedRatios)



  // generate separated states for each individual length ///////////////////////////
  const sortedIndiStates = []

  for(let specs of Object.values(sortedTableSpecs)) {
    sortedIndiStates.push([])
    for(let i = 1; i <= specs.scaledRatio; i++) {
      sortedIndiStates[sortedIndiStates.length - 1].push(`${i}x${specs.len}`)
    }
  }
  console.log('sortedIndiStates:', sortedIndiStates)
  // END generate separated states for each individual length ///////////////////////





  // create separated state opts ////////////////////////////////////////////////////
  // const statesOf7 = []
  // const stateOptsOf7 = []
  const indiStateOpts = []

  // seeding simple state opts: '1x7': Set { '7/20' }, '2x7': Set { '7,7/20' }
  for(let i = 0; i < sortedIndiStates.length; i++) { // arr[i]: [ '1x7', '2x7', '3x7
    const eachLenStates = sortedIndiStates[i] // [ '1x7', '2x7', '3x7, ...
    indiStateOpts.push({})
    for(let countXstate of eachLenStates) { // countXstate: '1x7'
      indiStateOpts[i][countXstate] = new Set()
      const [numStr, lenStr] = countXstate.split('x') // [1, 7]
      if(parseInt(numStr) * parseInt(lenStr) <= rawMatLen) {
        let cut = lenStr
        for(let i = 2; i <= parseInt(numStr); i++) {
          cut = cut + ',' + lenStr
        }
        indiStateOpts[i][countXstate].add(`${cut}/${rawMatLen}`) // '7/20'
      }
    }
  }

  console.log('indiStateOpts:', indiStateOpts)

  // adding multi-cut state opts: '2x7': Set { '7,7/20', '7/20+7/20' },
  for(let i = 0; i < sortedIndiStates.length; i++) { // arr[i]: [ '1x7', '2x7', '3x7
    const eachLenStates = sortedIndiStates[i] // [ '1x7', '2x7', '3x7, ...
    const eachKLenStateOpts = indiStateOpts[i] // '1x7': Set { '7/20' }

    for(let j = 0; j < eachLenStates.length; j++) {

      let left = 0
      let right = j - 1

      while(left <= right) {
        const leftOpts = Array.from(eachKLenStateOpts[eachLenStates[left]])
        const rightOpts = Array.from(eachKLenStateOpts[eachLenStates[right]])

        for(let leftOpt of leftOpts) {
          for(let rightOpt of rightOpts) {
            const optArr = `${leftOpt}+${rightOpt}`.split('+').sort()
            optArr.length <= matNum && eachKLenStateOpts[eachLenStates[j]].add(optArr.join('+'))
          }
        }
        left++
        right--
      }
    }
  }

  console.log('indiStateOpts:', indiStateOpts)
  // END create separated state opts ////////////////////////////////////////////////





  // calculate all DP states and state options //////////////////////////////////////
  const states = [] // all DP states
  const stateOpts = {} // all DP states

  // inital 
  for(let i = 0; i < sortedIndiStates[0].length; i++) {
    const stateStr = sortedIndiStates[0][i]
    states.push(stateStr)
    stateOpts[stateStr] = indiStateOpts[0][stateStr]
  }
  
  // 
  for( let ratio of sortedRatios) {

    const [ratioOf7, ratioOf5, ratioOf2] = ratio.split(':')

    let max_i = parseInt(ratioOf7) // 6 4 2
    let max_j = parseInt(ratioOf5) // 6 4 2
    let max_k = parseInt(ratioOf2) // 12 8 4

    console.log('max_i:', max_i)

    console.log('ratio:', ratioOf7, ratioOf5, ratioOf2)

    for(let i = max_i - 1; i >= 0; i--) { // arr[i]: '6x7'
      for(let j = 1; j <= max_j; j++) {

        const stateOf7 = states[i]
        const stateOf5 = `${j}x${sortedTableSpecs[1].len}`
        const stateStr = stateOf7 + '+' + stateOf5

        states.push(stateStr)
        stateOpts[stateStr] = new Set()

        // create new state option if 7 and 5 raw bars combined smaller than raw mat
        const leftOpts = Array.from(stateOpts[stateOf7])
        const rightOpts = Array.from(indiStateOpts[1][stateOf5])
  
        // console.log('leftOpts:', leftOpts)
        // console.log('rightOpts:', rightOpts)

        for(let leftOpt of leftOpts) {
  
          for(let rightOpt of rightOpts) {
  
            // console.log('leftOpt:', leftOpt)
            // console.log('rightOpt:', rightOpt)
  
            const leftCuts = leftOpt.split('+')
            const rigthCuts = rightOpt.split('+')
  
            // console.log('leftCuts:', leftCuts.length)
            // console.log('rigthCuts:', rigthCuts)
  
            // separate 7 and 5 (not in a same raw material bar)
            if(leftCuts.length + rigthCuts.length <= matNum) {
              const stateOptStr = [ ...leftCuts, ...rigthCuts].sort().join('+')
              // console.log('stateOptStr:', stateOptStr)
              stateOpts[stateStr].add(stateOptStr)
            }
          }
        }
        // create new state option if 7 and 5 raw bars combined smaller than raw mat


      // for 6x7+1x5 adding 5 (in same raw mat bar) in 6x7 option, then 6x7+2x5 ...
      const leftMostState = states[states.length - 2]
      const leftMostOpts = stateOpts[leftMostState]

      // console.log('states.length - 2:', states.length - 2)
      // console.log('leftMostState:', leftMostState)
      // console.log('leftMostOpts:', leftMostOpts)
      // console.log('states:', states)
      // console.log('stateOpts:', stateOpts)

      const leftOptsArr = Array.from(leftMostOpts)


      for(let leftOpt of leftOptsArr) {
        // console.log('leftOpt:', leftOpt)
        const leftRawbars = leftOpt.split('+') // [ '7,7/20', '7/20', '7/20',... ]

        for(let m = 0; m < leftRawbars.length; m++) {
          const leftBar = leftRawbars[m] // 7/20
          const leftCuts = leftBar.split('/')[0].split(',')
          const mergedCuts = [...leftCuts, stateOf5.split('x')[1]]

          const sumCuts = mergedCuts.reduce((partialSum, cut) =>  partialSum + parseInt(cut), 0)

          // console.log('mergedCuts:', mergedCuts)
          // console.log('sumCuts:', sumCuts)


          if(sumCuts <= rawMatLen) {
            const mergedCutStr = mergedCuts.sort((a, b) => parseInt(a) - parseInt(b)).join(',').concat(`/${rawMatLen}`)

            const deepCpSplicedLeftBars = JSON.parse(JSON.stringify(leftRawbars))
            deepCpSplicedLeftBars.splice(m,1)

            const mergedLeftRightBars = [mergedCutStr, ...deepCpSplicedLeftBars].sort().join('+')

            stateOpts[stateStr].add(mergedLeftRightBars)



          // console.log('mergedCutStr:', mergedCutStr)
          // console.log('mergedLeftRightBars:', mergedLeftRightBars)
          }
        }
      }
      // for 6x7+1x5 adding 5 (in same raw mat bar) in 6x7 option, then 6x7+2x5 ...




        // break
      }
  
      const stateLen = states.length
  
      for(let k = 1; k <= max_k; k++) { // process 2 FOR loop

        const state7and5Str = states[stateLen - 1]
        const stateOf2 = `${k}x${sortedTableSpecs[2].len}`
        const stateStr752 = `${state7and5Str}+${stateOf2}`
  
        states.push(stateStr752)
        stateOpts[stateStr752] = new Set()

        // console.log('state7and5Str:', state7and5Str)
        // console.log('stateStr752:', stateStr752)



        // create new state option if 7 and 5 raw bars combined smaller than raw mat
        const leftOpts = Array.from(stateOpts[state7and5Str])
        const rightOpts = Array.from(indiStateOpts[2][stateOf2])

        // console.log('leftOpts:', leftOpts)
        // console.log('rightOpts:', rightOpts)



        // merge separated raw material bars
        for(let leftOpt of leftOpts) {
          for(let rightOpt of rightOpts) {
            // console.log('leftOpt:', leftOpt)
            // console.log('rightOpt:', rightOpt)

            const leftCuts = leftOpt.split('+')
            const rigthCuts = rightOpt.split('+')

            // console.log('leftCuts:', leftCuts.length)
            // console.log('rigthCuts:', rigthCuts)

            // separate 7 and 5 (not in a same raw material bar)
            if(leftCuts.length + rigthCuts.length <= matNum) {
              const stateOptStr = [ ...leftCuts, ...rigthCuts].sort().join('+')
              // console.log('stateOptStr:', stateOptStr)
              stateOpts[stateStr752].add(stateOptStr)
            }
          }
        } // END merge separated raw material bars




        // console.log('===========================================')

        // create new state option if 7 and 5 raw bars combined smaller than raw mat

        // for 6x7+1x5 adding 5 (in same raw mat bar) in 6x7 option, then 6x7+2x5 ...
        const leftMostState = states[states.length - 2]
        const leftMostOpts = stateOpts[leftMostState]

        // console.log('leftMostState:', leftMostState)
        // console.log('leftMostOpts:', leftMostOpts)

        const leftOptsArr = Array.from(leftMostOpts)



        for(let leftOpt of leftOptsArr) {
          // console.log('leftOpt:', leftOpt)
          const leftRawbars = leftOpt.split('+') // [ '7,7/20', '7/20', '7/20',... ]

          for(let m = 0; m < leftRawbars.length; m++) {
            const leftBar = leftRawbars[m] // 7/20
            const leftCuts = leftBar.split('/')[0].split(',')
            const mergedCuts = [...leftCuts, stateOf2.split('x')[1]]

            const sumCuts = mergedCuts.reduce((partialSum, cut) =>  partialSum + parseInt(cut), 0)

            // console.log('leftBar:', leftBar)
            // console.log('mergedCuts:', mergedCuts)
            // console.log('sumCuts:', sumCuts)


            if(sumCuts <= rawMatLen) {
              const mergedCutStr = mergedCuts.sort((a, b) => parseInt(a) - parseInt(b)).join(',').concat(`/${rawMatLen}`)

              const deepCpSplicedLeftBars = JSON.parse(JSON.stringify(leftRawbars))
              deepCpSplicedLeftBars.splice(m,1)

              const mergedLeftRightBars = [mergedCutStr, ...deepCpSplicedLeftBars].sort().join('+')

              stateOpts[stateStr752].add(mergedLeftRightBars)



            // console.log('stateStr752:', stateStr752)
            // console.log('mergedCutStr:', mergedCutStr)
            // console.log('mergedLeftRightBars:', mergedLeftRightBars)
            }
            // break
          }
        }
        // for 6x7+1x5 adding 5 (in same raw mat bar) in 6x7 option, then 6x7+2x5 ...




      } // END process 2 FOR loop

  
      break
    }
  }

  

  // console.log('stateOpts:', stateOpts)
  console.log('states:', states)

  console.log(`raw material length ${matNum}x${rawMatLen}:`, rawMatLen * matNum)

  for(let i = 1; i <= idealMaxTableNum; i++) {
    // console.log('stateOpts:', stateOpts[print[i-1]])
    const tableNum = Array.from(stateOpts[print[i-1]] || []).length
    console.log(`ways to cut '${i}' table(s) ${print[i-1]}:`, tableNum)
    console.log('remain:', rawMatLen * matNum - oneTableLen * (tableNum == 0 ? 0 : i))
  }
  // END calculate all DP states and state options //////////////////////////////////



  return stateOpts
}


const makeTableInput = {
  rawMatLen: 20, // 20m 
  matNum: 5, // raw material count
  tableLegLen: 2, // table leg length in meter
  tableLegNum: 4, // table leg count
  tableWidth: 5, // table width in meter
  tableWidthNum: 2, // table width count
  tableHeight: 7, // table height in meter
  tableHeightNum: 2, // table height count
}

maxNumTableDp(makeTableInput)

/*
4x15+4x5+8x2:
  '2,2,2,2,2,2,2,2/20   5,15/20   5,15/20   5,15/20   5,15/20',
  '2,2,15/20   2,2,15/20   2,2,15/20   2,2,15/20   5,5,5,5/20',
  '2,2,15/20   2,2,15/20   2,2,15/20   2,2,5,5,5/20   5,15/20',
  '2,2,15/20   2,2,15/20   2,2,2,2,5,5/20   5,15/20   5,15/20',
  '2,15/20   2,2,15/20   2,2,2,2,2,5,5/20   5,15/20   5,15/20',
  '2,2,15/20   2,2,2,2,2,2,5/20   5,15/20   5,15/20   5,15/20',
  '2,15/20   2,2,2,2,2,2,2,5/20   5,15/20   5,15/20   5,15/20'
*/

