


function buySellStock(prices, fee) {

  const cache = {}

  const dfs = (hasStock, i) => {

    if(i == prices.length) return 0

    console.log(prices[i])

    const key = i + ',' + hasStock
    
    if(cache[key] != undefined) {
      return cache[key]
    } else {

      const doNothing = dfs(hasStock, i + 1) // do nothing
      let buyOrSell
  
      if(hasStock) { // have stock in hand
        buyOrSell = prices[i] - fee + dfs(!hasStock, i + 1) // sell
      } else { // does not have stock in hand
        buyOrSell = dfs(!hasStock, i + 1) - prices[i] // buy
      }
  
      cache[key] = Math.max(doNothing, buyOrSell)

      return cache[key]
    }
  }

  return dfs(false, 0)
}

// console.log('buySellStock:', buySellStock([1,2,8], 2))


// a valid table must be constructed from enough total length && total width && total height
// Time: O(1), Space: O(1)
const countBuiltTables = (
  potentialMaxLengthNeeded,
  potentialMaxWidthNeeded,
  potentialMaxHeightNeeded,
  lengthLeft,
  widthLeft,
  heightLeft,
  tableProps,
) => {
  const countTableHavingEnoughLength = Math.floor(
    potentialMaxLengthNeeded / tableProps.TOTAL_LENGTH_COUNT -
      (potentialMaxLengthNeeded - (potentialMaxLengthNeeded - lengthLeft)) /
        tableProps.TOTAL_LENGTH_COUNT,
  )
  const countTableHavingEnoughWidth = Math.floor(
    potentialMaxWidthNeeded / tableProps.TOTAL_WIDTH_COUNT -
      (potentialMaxWidthNeeded - (potentialMaxWidthNeeded - widthLeft)) /
        tableProps.TOTAL_WIDTH_COUNT,
  )
  const countTableHavingEnoughHeight = Math.floor(
    potentialMaxHeightNeeded / tableProps.TOTAL_HEIGHT_COUNT -
      (potentialMaxHeightNeeded - (potentialMaxHeightNeeded - heightLeft)) /
        tableProps.TOTAL_HEIGHT_COUNT,
  )

  return Math.min(
    countTableHavingEnoughLength,
    countTableHavingEnoughWidth,
    countTableHavingEnoughHeight,
  )
}

// Time: O(n), Space: O(n)
//       n = max(lengthLeft * lengthSize, widthLeft * widthSize, heightLeft * heightSize)
const dinnerTable = (rawMaterialLength, rawMaterialCount, tableProps) => {
  // potential max table can be created from rawMaterialCount x rawMaterialLength raw material
  const potentialMaxTable = Math.floor(
    (rawMaterialLength * rawMaterialCount) /
      (tableProps.TOTAL_HEIGHT_COUNT * tableProps.HEIGHT_SIZE +
        tableProps.TOTAL_WIDTH_COUNT * tableProps.WIDTH_SIZE +
        tableProps.TOTAL_LENGTH_COUNT * tableProps.LENGTH_SIZE),
  )

  // length, width, height needed of potential max total table
  const potentialMaxLengthNeeded =
    potentialMaxTable * tableProps.TOTAL_LENGTH_COUNT
  const potentialMaxWidthNeeded =
    potentialMaxTable * tableProps.TOTAL_WIDTH_COUNT
  const potentialMaxHeightNeeded =
    potentialMaxTable * tableProps.TOTAL_HEIGHT_COUNT

  const cache = {}

  const dfs = (
    lengthLeft,
    widthLeft,
    heightLeft,
    remainRawMaterial,
    remainRawMaterialCount,
  ) => {
    const key = [
      lengthLeft,
      widthLeft,
      heightLeft,
      remainRawMaterial,
      remainRawMaterialCount,
    ].join(';')
    if (cache[key] !== undefined) {
      return cache[key]
    }

    // -- log current state --
    // console.log({
    //   lengthLeft,
    //   widthLeft,
    //   heightLeft,
    //   remainRawMaterial,
    //   remainRawMaterialCount,
    // })

    // BASE CASE: stop when cut all needed or not enough raw material to cut
    if (
      (lengthLeft === 0 ||
        remainRawMaterial + remainRawMaterialCount * rawMaterialLength <
          tableProps.LENGTH_SIZE) &&
      (widthLeft === 0 ||
        remainRawMaterial + remainRawMaterialCount * rawMaterialLength <
          tableProps.WIDTH_SIZE) &&
      (heightLeft === 0 ||
        remainRawMaterial + remainRawMaterialCount * rawMaterialLength <
          tableProps.HEIGHT_SIZE)
    ) {
      const numOfBuiltTables = countBuiltTables(
        potentialMaxLengthNeeded,
        potentialMaxWidthNeeded,
        potentialMaxHeightNeeded,
        lengthLeft,
        widthLeft,
        heightLeft,
        tableProps,
      )

      return {
        lengthLeft,
        widthLeft,
        heightLeft,
        remainRawMaterial,
        numOfBuiltTables,
        stopCutting:
          remainRawMaterial + remainRawMaterialCount * rawMaterialLength <
            tableProps.LENGTH_SIZE &&
          remainRawMaterial + remainRawMaterialCount * rawMaterialLength <
            tableProps.WIDTH_SIZE &&
          remainRawMaterial + remainRawMaterialCount * rawMaterialLength <
            tableProps.HEIGHT_SIZE, // indicate that base case is reached
      }
    }

    let curLengthLeft
    let curWidthLeft
    let curHeightLeft
    let minRemainRawMaterial = Infinity
    let maxNumOfBuiltTable = 0
    let curStopCutting = false

    // Choice 1: cut in the next material if any
    if (remainRawMaterialCount > 0) {
      const {
        lengthLeft: nextLengthLeft,
        widthLeft: nextWidthLeft,
        heightLeft: nextHeightLeft,
        remainRawMaterial: nextRemainRawMaterial,
        numOfBuiltTables: nextNumOfBuiltTables,
        stopCutting: nextStopCutting,
      } = dfs(
        lengthLeft,
        widthLeft,
        heightLeft,
        rawMaterialLength, // reset to rawMaterialLength when cut next material(s)
        remainRawMaterialCount - 1,
      )

      // check:
      // - remain raw material when cut next material < min
      //   (remain raw material = current raw material and total raw material when cutting next material(s))
      // - number of built tables > max
      // - reach base case: stop cutting = true
      if (
        remainRawMaterial + nextRemainRawMaterial < minRemainRawMaterial &&
        nextNumOfBuiltTables > maxNumOfBuiltTable &&
        nextStopCutting
      ) {
        curLengthLeft = nextLengthLeft
        curWidthLeft = nextWidthLeft
        curHeightLeft = nextHeightLeft
        minRemainRawMaterial = remainRawMaterial + nextRemainRawMaterial
        maxNumOfBuiltTable = nextNumOfBuiltTables
        curStopCutting = nextStopCutting
      }
    }

    // Choice 2: continue cutting current material
    // Choice 2.1: cut length in current raw material if still need to and still have enough material
    if (lengthLeft > 0 && remainRawMaterial >= tableProps.LENGTH_SIZE) {
      const {
        lengthLeft: cutLengthLengthLeft,
        widthLeft: cutLengthWidthLeft,
        heightLeft: cutLengthHeightLeft,
        remainRawMaterial: cutLengthRemainRawMaterial,
        numOfBuiltTables: cutLengthNumOfBuiltTables,
        stopCutting: cutLengthStopCutting,
      } = dfs(
        lengthLeft - 1,
        widthLeft,
        heightLeft,
        remainRawMaterial - tableProps.LENGTH_SIZE,
        remainRawMaterialCount,
      )

      // check:
      // - remain raw material cut length < min
      // - number of built tables > max
      // - reach base case: stop cutting = true
      if (
        cutLengthRemainRawMaterial < minRemainRawMaterial &&
        cutLengthNumOfBuiltTables > maxNumOfBuiltTable &&
        cutLengthStopCutting
      ) {
        curLengthLeft = cutLengthLengthLeft
        curWidthLeft = cutLengthWidthLeft
        curHeightLeft = cutLengthHeightLeft
        minRemainRawMaterial = cutLengthRemainRawMaterial
        maxNumOfBuiltTable = cutLengthNumOfBuiltTables
        curStopCutting = cutLengthStopCutting
      }
    }

    // Choice 2.2: cut width in current raw material if still need to and still have enough material
    if (widthLeft > 0 && remainRawMaterial >= tableProps.WIDTH_SIZE) {
      const {
        lengthLeft: cutWidthLengthLeft,
        widthLeft: cutWidthWidthLeft,
        heightLeft: cutWidthHeightLeft,
        remainRawMaterial: cutWidthRemainRawMaterial,
        numOfBuiltTables: cutWidthNumOfBuiltTables,
        stopCutting: cutWidthStopCutting,
      } = dfs(
        lengthLeft,
        widthLeft - 1,
        heightLeft,
        remainRawMaterial - tableProps.WIDTH_SIZE,
        remainRawMaterialCount,
      )

      // check:
      // - remain raw material cut width < min
      // - number of built tables > max
      // - reach base case: stop cutting = true
      if (
        cutWidthRemainRawMaterial < minRemainRawMaterial &&
        cutWidthNumOfBuiltTables > maxNumOfBuiltTable &&
        cutWidthStopCutting
      ) {
        curLengthLeft = cutWidthLengthLeft
        curWidthLeft = cutWidthWidthLeft
        curHeightLeft = cutWidthHeightLeft
        minRemainRawMaterial = cutWidthRemainRawMaterial
        maxNumOfBuiltTable = cutWidthNumOfBuiltTables
        curStopCutting = cutWidthStopCutting
      }
    }

    // Choice 2.3: cut height in current raw material if still need to and still have enough material
    if (heightLeft > 0 && remainRawMaterial >= tableProps.HEIGHT_SIZE) {
      const {
        lengthLeft: cutHeightLengthLeft,
        widthLeft: cutHeightWidthLeft,
        heightLeft: cutHeightHeightLeft,
        remainRawMaterial: cutHeightRemainRawMaterial,
        numOfBuiltTables: cutHeightNumOfBuiltTables,
        stopCutting: cutHeightStopCutting,
      } = dfs(
        lengthLeft,
        widthLeft,
        heightLeft - 1,
        remainRawMaterial - tableProps.HEIGHT_SIZE,
        remainRawMaterialCount,
      )

      // check:
      // - remain raw material cut height < min
      // - number of built tables > max
      // - reach base case: stop cutting = true
      if (
        cutHeightRemainRawMaterial < minRemainRawMaterial &&
        cutHeightNumOfBuiltTables > maxNumOfBuiltTable &&
        cutHeightStopCutting
      ) {
        curLengthLeft = cutHeightLengthLeft
        curWidthLeft = cutHeightWidthLeft
        curHeightLeft = cutHeightHeightLeft
        minRemainRawMaterial = cutHeightRemainRawMaterial
        maxNumOfBuiltTable = cutHeightNumOfBuiltTables
        curStopCutting = cutHeightStopCutting
      }
    }

    return (cache[key] = {
      lengthLeft: curLengthLeft,
      widthLeft: curWidthLeft,
      heightLeft: curHeightLeft,
      remainRawMaterial: minRemainRawMaterial,
      numOfBuiltTables: maxNumOfBuiltTable,
      stopCutting: curStopCutting,
    })
  }

  return dfs(
    potentialMaxLengthNeeded,
    potentialMaxWidthNeeded,
    potentialMaxHeightNeeded,
    rawMaterialLength,
    rawMaterialCount - 1, // start cutting from first material then remaining rawMaterialCount - 1
  )
}

// Test case 1: cut 1 x 7, 1 x 5, 1 x 2 from 2 x 10 raw material
// Expected output:
//  - Max table(s): 1
//  - Leftover piece(s): 1
//  - Leftover piece length: 6
const tableProps = {
  LENGTH_SIZE: 7,
  WIDTH_SIZE: 5,
  HEIGHT_SIZE: 2,
  TOTAL_LENGTH_COUNT: 2,
  TOTAL_WIDTH_COUNT: 2,
  TOTAL_HEIGHT_COUNT: 4,
}
const totalRawMaterial = 20
const rawMaterialLength = 20

const { remainRawMaterial, numOfBuiltTables } = dinnerTable(
  rawMaterialLength,
  totalRawMaterial,
  tableProps,
)
console.log(`Max table(s): ${numOfBuiltTables}`)
console.log(
  `Leftover piece(s): ${Math.ceil(remainRawMaterial / rawMaterialLength)}`,
)
console.log(`Leftover piece length: ${remainRawMaterial % rawMaterialLength}`)

// Test case 2: cut 1 x 7, 1 x 5, 1 x 2 from 2 x 10 raw material
// Expected output:
//  - Max table(s): 3
//  - Leftover piece(s): 1
//  - Leftover piece length: 4
// const tableProps = {
//   LENGTH_SIZE: 7,
//   WIDTH_SIZE: 5,
//   HEIGHT_SIZE: 2,
//   TOTAL_LENGTH_COUNT: 2,
//   TOTAL_WIDTH_COUNT: 2,
//   TOTAL_HEIGHT_COUNT: 4,
// }
// const totalRawMaterial = 5
// const rawMaterialLength = 20

// const { remainRawMaterial, numOfBuiltTables } = dinnerTable(
//   rawMaterialLength,
//   totalRawMaterial,
//   tableProps,
// )
// console.log(`Max table(s): ${numOfBuiltTables}`)
// console.log(
//   `Leftover piece(s): ${Math.ceil(remainRawMaterial / rawMaterialLength)}`,
// )
// console.log(`Leftover piece length: ${remainRawMaterial % rawMaterialLength}`)
