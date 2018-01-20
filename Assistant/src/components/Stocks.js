import React from 'react'
import ReactDOM from 'react-dom'
import Stock from './Stock'
import { Pie } from 'react-chartjs-2'

var alpha = require('alphavantage')({key: 'JGVPFO4GLBB9BIUO'})
var mapValues = require('object.map')
export default class Stocks extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // stocks: [
      //   'NVDA',
      //   'BAC',
      //   'HD',
      //   'TGT',
      //   'BABA',
      //   'FB',
      //   'MSFT',
      //   'AMZN',
      //   'GBTC',
      //   'GOOGL',
      //   'BTC',
      //   'LTC'
      // ],
      numbers: {
        GBTC: 1,
        NVDA: 34,
        BAC: 5,
        HD: 1,
        TGT: 9,
        BABA: 27,
        FB: 19,
        MSFT: 32,
        AMZN: 1,
        GOOGL: 1,
        BTC: 0.028,
        LTC: 2.28
      },
      prices: {},
      totals: {
        GBTC: 0,
        NVDA: 0,
        BAC: 0,
        HD: 0,
        TGT: 0,
        BABA: 0,
        FB: 0,
        MSFT: 0,
        AMZN: 0,
        GOOGL: 0,
        BTC: 0,
        LTC: 0
      },
      original: 20256.18,
      totalAsset: undefined,
      cash: 1032.21 + 3820 + 403.5,
      data: {}
    }
  }

  componentDidMount () {
    this.getStock()
    this.getChartData()

  }


  getChartData () {
    let totals=Object.values(this.state.totals)
    let sum=totals.reduce((a,b)=>a+b, 0)
    totals=totals.map((num)=>num/sum*100)
    this.setState({
      data: {
        labels: [
          'GBTC',
          'NVDA',
          'BAC',
          'HD',
          'TGT',
          'BABA',
          'FB',
          'MSFT',
          'AMZN',
          'GOOGL',
          'BTC',
          'LTC'
        ],
        datasets: [
          {
            data: totals,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#3cb44b',
              '#911eb4',
              '#fabebe',
              '#fffac8',
              '#808000',
              '#d2f53c',
              '#008080',
              '#f032e6',
              '#f58231'
            ],

          }]
      }
    })
  }

  getStock = () => {
    const prices = Object.assign({}, this.state.prices);
    const totals = Object.assign({}, this.state.totals);
    let totalAsset = this.state.cash
    for (const [name, num] of Object.entries(this.state.numbers)) {
      let price, num, total
      // cryto
      const cryto = ['BTC', 'LTC']
      if (cryto.includes(name)) {
        alpha.forex.rate(name, 'usd').then(data => {
          prices[name] = (data['Realtime Currency Exchange Rate'])['5. Exchange Rate']
          num = this.state.numbers[name]
          totals[name] = prices[name] * num
          totalAsset += totals[name]
          this.setState((prevState) => {
            return ({
              prices: prices,
              totals: totals,
              totalAsset: totalAsset,
            })
          })
          this.getChartData()

        })
      } else {
        alpha.data.daily(name).then(data => {
          const imeSeries = data['Time Series (Daily)']
          const today = Object.values(imeSeries)[0]
          prices[name] = today['4. close']
          num = this.state.numbers[name]
          totals[name] = prices[name] * num
          totalAsset += totals[name]
          this.setState((prevState) => {
            return ({
              prices: prices,
              totals: totals,
              totalAsset: totalAsset
            })
          })
          this.getChartData()

        })
      }

    }

  }
  // const results=this.state.stocks.map( async name => {
  //   let price, num, total;
  //   await alpha.data.daily(name).then( async data => {
  //     const imeSeries = data['Time Series (Daily)']
  //     const today = Object.values(imeSeries)[0]
  //     price = today['4. close']
  //     this.setState((prevState) => {
  //       return ({
  //         stocksPrice: {...prevState, name: price}
  //       })
  //     });
  //     num=this.state.stocksNum[name]
  //     total=price*num
  //     console.log(name)
  //
  //   });
  // })
  // Promise.all(results)
  //   .then(results => {
  //
  //   })
  //   .catch(e => {
  //     console.error(e);
  //   })
  // }
  render () {
    return (
      <div id='stock'>

        {
          // const results = arr.map(async (obj) => { return obj.key; });
          //
          // Promise.all(results).then((completed) => document.writeln( `\nResult: ${completed}`));
          Object.keys(this.state.numbers).map(name => {
            return <Stock key={name} name={name} num={this.state.numbers[name]}
                          price={this.state.prices[name]}
                          total={this.state.totals[name]}/>
          })
        }
        <p>Original: {this.state.original}</p>
        <p>Total: {this.state.totalAsset}</p>
        <p>Gain: {this.state.totalAsset - this.state.original}</p>
        <Pie data={this.state.data}/>
        {/*{console.log(this.state.data.datasets.data)}*/}

      </div>
    )
  }
}

