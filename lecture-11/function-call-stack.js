const getStockPrice = () => 10
const getPurchasePrice = (volume) => volume * getStockPrice()
const getAvailableCash = () => 300

console.log(getAvailableCash()) // 300
console.log(getPurchasePrice(20)) // 200