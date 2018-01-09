import React from 'react'

var alpha = require('alphavantage')({key: 'JGVPFO4GLBB9BIUO'})
const handleGBTC = () => {
  alpha.data.daily("GBTC").then(data => {
    const imeSeries = data['Time Series (Daily)']
    // console.log(imeSeries);
    const today = Object.values(imeSeries)[0]
    const GBTC = today['4. close']
    document.getElementById("GBTC").textContent=GBTC;
    alpha.forex.rate('btc', 'usd').then(data => {
      const BTC = (data['Realtime Currency Exchange Rate'])['5. Exchange Rate']
      document.getElementById("BTC").textContent=BTC;
      const btcPerGBTC = 0.09227639
      const GBTCBaseValue = btcPerGBTC * BTC
      const Premium=GBTC/GBTCBaseValue-1
      document.getElementById("Premium").textContent=Premium;
    })
  })
}
const GBTCPremium = (props) => (
  <div>
    <p>BTC: <span id="BTC"></span></p>
    <p>GBTC: <span id="GBTC"></span></p>
    <p>Premium: <span id="Premium"></span></p>
    {handleGBTC()}


  </div>
)
// Object.getOwnPropertyNames(data)
export default GBTCPremium
