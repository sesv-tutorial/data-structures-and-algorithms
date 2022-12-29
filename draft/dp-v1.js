
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

  const idealMaxTableNum = Math.floor(rawMatLen * matNum / (tableLegLen * tableLegNum + tableWidth * tableWidthNum + tableHeight * tableHeightNum))

  const sortedTableSpecs = [
    {type: 'tableLegLen', len: tableLegLen, num: tableLegNum },
    {type: 'tableWidth', len: tableWidth, num: tableWidthNum },
    {type: 'tableHeight', len: tableHeight, num: tableHeightNum },
  ].sort((a, b) => b.len - a.len)

  

  console.log('idealMaxTableNum:', idealMaxTableNum)
  console.log('sortedTableSpecs:', sortedTableSpecs)

  sortedTableSpecs.forEach(e => e.scaledRatio = e.num * idealMaxTableNum)

  console.log('sortedTableSpecs:', sortedTableSpecs)

  // const maxRatio = z X[idealMaxTableNum * ]

  // console.log('items:', items)

  const states = [] // all DP states
  const separatedStates = [] // helper to save intermediate states
  const stateOpts = {}
  const weightToItem = {}

  // generate separated states for each length
  for(let specs of Object.values(sortedTableSpecs)) {
    separatedStates.push([])
    for(let i = 1; i <= specs.scaledRatio; i++) {
      separatedStates[separatedStates.length - 1].push(`${i}x${specs.len}`)
    }
  }

  console.log('separatedStates:', separatedStates)

  // 7 only states and state opts
  for(let len0 of separatedStates[0]) {
    states.push(`${len0}`)
    stateOpts[len0] = new Set()

    const [numStr, lenStr] = len0.split('x')
    if(parseInt(numStr) * parseInt(lenStr) <= rawMatLen) {
      let cut = lenStr
      for(let i = 2; i <= parseInt(numStr); i++) {
        cut = cut + ',' + lenStr
      }
      stateOpts[len0].add(`${cut}/${rawMatLen}`)
    }
  }

  for(let i = 0; i < states.length; i++) {

    let left = 0
    let right = i - 1

    while(left <= right) {
      const leftOpts = Array.from(stateOpts[states[left]])
      const rightOpts = Array.from(stateOpts[states[right]])

      for(let leftOpt of leftOpts) {
        for(let rightOpt of rightOpts) {
          const optArr = `${leftOpt}+${rightOpt}`.split('+').sort()
          optArr.length <= matNum && stateOpts[states[i]].add(optArr.join('+'))
        }
      }
      left++
      right--
    }
  }



  // 5 only states and state opts
  const states5only = []
  const stateOpts5only = {}
  for(let len0 of separatedStates[1]) {
    states5only.push(`${len0}`)
    stateOpts5only[len0] = new Set()

    const [numStr, lenStr] = len0.split('x')
    if(parseInt(numStr) * parseInt(lenStr) <= rawMatLen) {
      let cut = lenStr
      for(let i = 2; i <= parseInt(numStr); i++) {
        cut = cut + ',' + lenStr
      }
      stateOpts5only[len0].add(`${cut}/${rawMatLen}`)
    }
  }

  for(let i = 0; i < states5only.length; i++) {

    let left = 0
    let right = i - 1

    while(left <= right) {
      const leftOpts = Array.from(stateOpts5only[states5only[left]])
      const rightOpts = Array.from(stateOpts5only[states5only[right]])

      for(let leftOpt of leftOpts) {
        for(let rightOpt of rightOpts) {
          const optArr = `${leftOpt}+${rightOpt}`.split('+').sort()
          optArr.length <= matNum && stateOpts5only[states5only[i]].add(optArr.join('+'))
        }
      }
      left++
      right--
    }
  }

  // 2 only states and state opts
  const states2only = []
  const stateOpts2only = {}
  for(let len0 of separatedStates[2]) {
    states2only.push(`${len0}`)
    stateOpts2only[len0] = new Set()
    // console.log('len0:', len0)

    const [numStr, lenStr] = len0.split('x')
    if(parseInt(numStr) * parseInt(lenStr) <= rawMatLen) {
      let cut = lenStr
      for(let i = 2; i <= parseInt(numStr); i++) {
        cut = cut + ',' + lenStr
      }
      // console.log('stateOpts2only:', stateOpts2only)
      // console.log('states2only[len0]:', states2only[len0])
      stateOpts2only[len0].add(`${cut}/${rawMatLen}`)
    }
  }

  for(let i = 0; i < states2only.length; i++) {

    let left = 0
    let right = i - 1

    while(left <= right) {
      const leftOpts = Array.from(stateOpts2only[states2only[left]])
      const rightOpts = Array.from(stateOpts2only[states2only[right]])

      for(let leftOpt of leftOpts) {
        for(let rightOpt of rightOpts) {
          const optArr = `${leftOpt}+${rightOpt}`.split('+').sort()
          optArr.length <= matNum && stateOpts2only[states2only[i]].add(optArr.join('+'))
        }
      }
      left++
      right--
    }
  }

  // 7 & 5 only states and state opts
  for(let i = separatedStates[0].length - 1; i > -1; i--) { // 7

    // with 5 FOR loop
    for(let j = 0; j < separatedStates[1].length; j++) { // 5

      // create state elements and state options empty sets
      const stateOf7 = separatedStates[0][i]
      const stateOf5 = separatedStates[1][j]
      const stateStr = `${stateOf7}+${stateOf5}`

      states.push(stateStr)
      stateOpts[stateStr] = new Set()




      // create new state option if 7 and 5 raw bars combined smaller than raw mat
      const leftOpts = Array.from(stateOpts[stateOf7])
      const rightOpts = Array.from(stateOpts5only[stateOf5])

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

      // console.log('leftMostState:', leftMostState)
      // console.log('leftMostOpts:', leftMostOpts)

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
    } // end with 5 FOR loop





    // with 2 FOR loop

    /**
    now current states is this

    states: [
      '1x7',     '2x7',
      '3x7',     '4x7',
      '5x7',     '6x7',
      '6x7+1x5', '6x7+2x5',
      '6x7+3x5', '6x7+4x5',
      '6x7+5x5', '6x7+6x5'
    ]

    we'll loop backward 6 times, 6 is from last 6x5
    and calculate with 2
     */

    const loopNum = parseInt(states[states.length - 1].split('+')[1].split('x')[0])
    const statesLen = states.length


    console.log('stateStr:', states[states.length - 1])
    console.log('loopNum:', loopNum)
    console.log('statesLen:', statesLen)

    // OUTer of 2 FOR loop

    for(let l = 0; l < separatedStates[2].length; l++) { // 2 FOR loop
      for(let k = statesLen - 1; k >= loopNum; k--) {

      const state7and5Str = states[k]


      console.log('state7and5Str:', state7and5Str)

        // create state elements and state options empty sets
        // const stateOf7 = separatedStates[0][i]
        // const stateOf5 = separatedStates[1][j]
        const stateOf2 = separatedStates[2][l]
        const stateStr752 = `${state7and5Str}+${stateOf2}`
  
        states.push(stateStr752)
        stateOpts[stateStr752] = new Set()

        console.log('stateStr752:', stateStr752)


        // create new state option if 7 and 5 raw bars combined smaller than raw mat
        const leftOpts = Array.from(stateOpts[state7and5Str])
        const rightOpts = Array.from(stateOpts2only[stateOf2])

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


        console.log('=========================================================')

      // create new state option if 7 and 5 raw bars combined smaller than raw mat

      // for 6x7+1x5 adding 5 (in same raw mat bar) in 6x7 option, then 6x7+2x5 ...
      const leftMostState = states[states.length - 2]
      const leftMostOpts = stateOpts[leftMostState]

      console.log('leftMostState:', leftMostState)
      console.log('leftMostOpts:', leftMostOpts)

      const leftOptsArr = Array.from(leftMostOpts)


      for(let leftOpt of leftOptsArr) {
        console.log('leftOpt:', leftOpt)
        const leftRawbars = leftOpt.split('+') // [ '7,7/20', '7/20', '7/20',... ]

        for(let m = 0; m < leftRawbars.length; m++) {
          const leftBar = leftRawbars[m] // 7/20
          const leftCuts = leftBar.split('/')[0].split(',')
          const mergedCuts = [...leftCuts, stateOf2.split('x')[1]]

          const sumCuts = mergedCuts.reduce((partialSum, cut) =>  partialSum + parseInt(cut), 0)

          console.log('leftBar:', leftBar)
          console.log('mergedCuts:', mergedCuts)
          console.log('sumCuts:', sumCuts)


          if(sumCuts <= rawMatLen) {
            const mergedCutStr = mergedCuts.sort((a, b) => parseInt(a) - parseInt(b)).join(',').concat(`/${rawMatLen}`)

            const deepCpSplicedLeftBars = JSON.parse(JSON.stringify(leftRawbars))
            deepCpSplicedLeftBars.splice(m,1)

            const mergedLeftRightBars = [mergedCutStr, ...deepCpSplicedLeftBars].sort().join('+')

            stateOpts[stateStr752].add(mergedLeftRightBars)



          console.log('stateStr752:', stateStr752)
          console.log('mergedCutStr:', mergedCutStr)
          console.log('mergedLeftRightBars:', mergedLeftRightBars)
          }
          // break
        }
      }
      // for 6x7+1x5 adding 5 (in same raw mat bar) in 6x7 option, then 6x7+2x5 ...


        // break
      } // End 2 FOR loop



      // break
    } // END OUTer of 2 FOR loop



    break
  } // end with 7 FOR loop


  console.log('stateOpts:', stateOpts)
  console.log('states:', states)
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

// console.log('max value:', maxNumTableDp(makeTableInput))


/**

'6x7+1x5': Set {
  '5,7,7/20   7/20   7/20   7/20   7/20',
  '5,7/20   7,7/20   7/20   7/20   7/20',
  '5/20   7,7/20   7,7/20   7/20   7/20',
  '5,7,7/20   7,7/20   7/20   7/20',
  '5,7/20   7,7/20   7,7/20   7/20',
  '5/20   7,7/20   7,7/20   7,7/20',
  '5,7,7/20   7,7/20   7,7/20'
}

  '6x7+6x5': Set {
    '5,7,7/20+7/20+7/20+7/20+7/20',
    '5,7/20+7,7/20+7/20+7/20+7/20',
    '5,7,7/20+7,7/20+7/20+7/20',
    '5,7/20+7,7/20+7,7/20+7/20',
    '5,5,5,5/20   5,5/20   7,7/20   7,7/20   7,7/20',
    '5,5,5/20   5,5,5/20   7,7/20   7,7/20   7,7/20',
    '5,7,7/20+7,7/20+7,7/20'


  '6x7+2x5': Set {
    '5,5/20   7,7/20   7,7/20   7/20   7/20',

    '5,5/20   7,7/20   7,7/20   7,7/20',
    '5,7,7/20   5/20   7,7/20   7,7/20',

    '5/20   5/20   7,7/20   7,7/20   7,7/20',
    '5,7,7/20   5/20   7,7/20   7/20   7/20',
    '5,7/20   5/20   7,7/20   7,7/20   7/20',


    '5,7,7/20   5,7/20   7/20   7/20   7/20',
    '5,5,7/20   7,7/20   7/20   7/20   7/20',
    '5,7/20   5,7/20   7,7/20   7/20   7/20',

    '5,7,7/20   5,7,7/20   7/20   7/20',
    '5,7,7/20   5,7/20   7,7/20   7/20',
    '5,5,7/20   7,7/20   7,7/20   7/20',
    '5,7/20   5,7/20   7,7/20   7,7/20',

    '5,7,7/20   5,7,7/20   7,7/20'
  }



  '6x7+6x5+12x2': Set {
    '2,2,2,2,2,2,2,2,2,2/20   2,2,7,7/20   5,5,5,5/20   5,7,7/20   5,7,7/20',
    '2,2,2,2,2,2,2,2,2,2/20   2,2,5,5,5/20   5,7,7/20   5,7,7/20   5,7,7/20',
    '2,2,2,2,2,2,2,2,2,2/20+2,5,5,7/20+2,5,5,7/20+5,7,7/20+5,7,7/20',
    '2,2,2,2,2,2,2,2,2/20+2,2,2,7,7/20+5,5,5,5/20+5,7,7/20+5,7,7/20',
    '2,2,2,2,2,5,5/20+2,2,2,7,7/20+2,2,2,7,7/20+2,7,7/20+5,5,5,5/20',
    '2,2,2,2,2,5,5/20+2,2,2,7,7/20+2,2,7,7/20+2,2,7,7/20+5,5,5,5/20',
    '2,2,2,2,5,5/20+2,2,2,7,7/20+2,2,2,7,7/20+2,2,7,7/20+5,5,5,5/20',

    '2,2,2,5,5/20   2,2,2,7,7/20   2,2,2,7,7/20   2,2,2,7,7/20   5,5,5,5/20', here

    '2,2,2,7,7/20+2,2,2,7,7/20+2,2,5,5,5/20+2,2,5,5,5/20+2,2,7,7/20',
    '2,2,2,7,7/20+2,2,2,7,7/20+2,2,2,7,7/20+2,2,5,5,5/20+2,5,5,5/20',
    '2,2,2,2,2,2,2,5/20+2,2,2,7,7/20+2,2,7,7/20+5,5,5,5/20+5,7,7/20',
    '2,2,2,2,2,2,5/20+2,2,2,7,7/20+2,2,2,7,7/20+5,5,5,5/20+5,7,7/20',
    '2,2,2,2,2,5,5/20+2,2,2,7,7/20+2,2,5,5,5/20+2,2,7,7/20+5,7,7/20',
    '2,2,2,2,5,5/20+2,2,2,7,7/20+2,2,2,7,7/20+2,2,5,5,5/20+5,7,7/20',
    '2,2,2,2,2,5,5/20+2,2,2,7,7/20+2,2,2,7,7/20+2,5,5,5/20+5,7,7/20',
    '2,2,2,2,2,2,7/20+2,2,2,2,2,2,7/20+5,5,5,5/20+5,7,7/20+5,7,7/20',
    '2,2,2,2,2,7/20+2,2,2,2,5,7/20+2,2,2,7,7/20+5,5,5,5/20+5,7,7/20',
    '2,2,2,2,2,2,7/20+2,2,2,2,5,7/20+2,2,7,7/20+5,5,5,5/20+5,7,7/20',
    '2,2,2,2,2,2,7/20+2,2,2,5,7/20+2,2,2,7,7/20+5,5,5,5/20+5,7,7/20',
    '2,2,2,2,2,7/20+2,2,2,7,7/20+2,2,2,7,7/20+2,5,5,7/20+5,5,5,5/20',
    '2,2,2,2,2,2,7/20+2,2,2,7,7/20+2,2,7,7/20+2,5,5,7/20+5,5,5,5/20',
    '2,2,2,2,2,2,7/20+2,2,2,7,7/20+2,2,2,7,7/20+5,5,5,5/20+5,5,7/20',
    '2,2,2,2,5,7/20+2,2,2,2,5,7/20+2,2,2,7,7/20+2,7,7/20+5,5,5,5/20',
    '2,2,2,2,5,7/20+2,2,2,2,5,7/20+2,2,7,7/20+2,2,7,7/20+5,5,5,5/20',
    '2,2,2,2,5,7/20+2,2,2,5,7/20+2,2,2,7,7/20+2,2,7,7/20+5,5,5,5/20',
    '2,2,2,2,5,7/20+2,2,2,7,7/20+2,2,2,7,7/20+2,2,5,7/20+5,5,5,5/20',
    '2,2,2,5,7/20+2,2,2,5,7/20+2,2,2,7,7/20+2,2,2,7,7/20+5,5,5,5/20',
    '2,2,2,2,2,2,2,5/20+2,2,2,7,7/20+2,2,5,5,5/20+5,7,7/20+5,7,7/20',
    '2,2,2,2,2,5,5/20+2,2,2,2,2,5,5/20+2,2,7,7/20+5,7,7/20+5,7,7/20',
    '2,2,2,2,2,5,5/20+2,2,2,2,5,5/20+2,2,2,7,7/20+5,7,7/20+5,7,7/20',
    '2,2,2,2,2,2,7/20+2,2,2,2,5,7/20+2,2,5,5,5/20+5,7,7/20+5,7,7/20',
    '2,2,2,2,2,2,7/20+2,2,2,7,7/20+2,2,5,5,5/20+2,5,5,7/20+5,7,7/20',
    
    '2,2,2,2,5,7/20   2,2,2,2,5,7/20   2,2,5,5,5/20   2,2,7,7/20   5,7,7/20',

    '2,2,2,2,5,7/20   2,2,2,5,7/20   2,2,2,7,7/20   2,2,5,5,5/20   5,7,7/20',

  
    '2,2,2,2,5,7/20+2,2,2,2,5,7/20+2,2,2,7,7/20+2,5,5,5/20+5,7,7/20',
    '2,2,2,2,5,7/20+2,2,2,7,7/20+2,2,5,5,5/20+2,2,7,7/20+2,5,5,7/20',
    '2,2,2,5,7/20+2,2,2,7,7/20+2,2,2,7,7/20+2,2,5,5,5/20+2,5,5,7/20',
    '2,2,2,2,5,7/20+2,2,2,7,7/20+2,2,2,7,7/20+2,2,5,5,5/20+5,5,7/20',
    '2,2,2,2,5,7/20+2,2,2,7,7/20+2,2,2,7,7/20+2,5,5,5/20+2,5,5,7/20',
    '2,2,2,2,2,2,2,5/20+2,2,2,2,2,5,5/20+5,7,7/20+5,7,7/20+5,7,7/20',
    '2,2,2,2,2,2,7/20+2,2,2,2,2,5,5/20+2,5,5,7/20+5,7,7/20+5,7,7/20',
    '2,2,2,2,2,5,5/20+2,2,2,2,5,7/20+2,2,2,5,7/20+5,7,7/20+5,7,7/20',
    '2,2,2,2,5,5/20+2,2,2,2,5,7/20+2,2,2,2,5,7/20+5,7,7/20+5,7,7/20',
    '2,2,2,2,2,5,5/20+2,2,2,2,5,7/20+2,2,7,7/20+2,5,5,7/20+5,7,7/20',
    '2,2,2,2,2,5,5/20+2,2,2,5,7/20+2,2,2,7,7/20+2,5,5,7/20+5,7,7/20',
    '2,2,2,2,5,5/20+2,2,2,2,5,7/20+2,2,2,7,7/20+2,5,5,7/20+5,7,7/20',
    '2,2,2,2,2,5,5/20+2,2,2,2,5,7/20+2,2,2,7,7/20+5,5,7/20+5,7,7/20',
    '2,2,2,2,2,5,5/20+2,2,2,7,7/20+2,2,7,7/20+2,5,5,7/20+2,5,5,7/20',
    '2,2,2,2,5,5/20+2,2,2,7,7/20+2,2,2,7,7/20+2,5,5,7/20+2,5,5,7/20',
    '2,2,2,2,2,5,5/20+2,2,2,7,7/20+2,2,2,7,7/20+2,5,5,7/20+5,5,7/20',
    '2,2,2,2,2,2,2,5/20+2,2,2,2,5,7/20+2,5,5,7/20+5,7,7/20+5,7,7/20',
    '2,2,2,2,2,2,2,5/20+2,2,2,7,7/20+2,5,5,7/20+2,5,5,7/20+5,7,7/20',
    '2,2,2,2,2,2,7/20+2,2,2,2,5,7/20+2,5,5,7/20+2,5,5,7/20+5,7,7/20',
    '2,2,2,2,5,7/20+2,2,2,2,5,7/20+2,2,2,5,7/20+2,5,5,7/20+5,7,7/20',
    '2,2,2,2,5,7/20+2,2,2,2,5,7/20+2,2,2,2,5,7/20+5,5,7/20+5,7,7/20',
    '2,2,2,2,2,2,7/20+2,2,2,7,7/20+2,5,5,7/20+2,5,5,7/20+2,5,5,7/20',
    '2,2,2,2,5,7/20+2,2,2,2,5,7/20+2,2,7,7/20+2,5,5,7/20+2,5,5,7/20',
    '2,2,2,2,5,7/20+2,2,2,5,7/20+2,2,2,7,7/20+2,5,5,7/20+2,5,5,7/20',
    '2,2,2,2,5,7/20+2,2,2,2,5,7/20+2,2,2,7,7/20+2,5,5,7/20+5,5,7/20'


 */

const func = () => {
  const states = []
  sortedRatios = ['6:6:12', '4:4:8', '2:2:4']
  // console.log(states)

  for(let i = 1; i <= 6; i++) {
    states.push(`${i}x7`)
  }
  
  for( let ratio of sortedRatios) {

    const [ratioOf7, ratioOf5, ratioOf2] = ratio.split(':')

    let max_i = parseInt(ratioOf7)
    let max_j = parseInt(ratioOf5)
    let max_k = parseInt(ratioOf2)

    console.log('ratio:', ratioOf7, ratioOf5, ratioOf2)

    for(let i = max_i - 1; i >= 0; i--) {
  
      for(let j = 1; j <= max_j; j++) {
        states.push(states[i] + `+${j}x5`)
      }
  
      const stateLen = states.length
  
      for(let k = 1; k <= max_k; k++) {
        states.push(states[stateLen - 1] + `+${k}x2`)
      }
  
      break
    }
  }
  
  console.log('states:', states)
}

func()