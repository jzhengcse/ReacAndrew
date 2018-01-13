import React from 'react'

const income = {}
income.asset = {
  Stock: 31378,
  Cash: 1800,
}
income.liability = {
  CreditCard: 12431,
  Car: 18328,
  loan: 10500,
}
income.total={}
const computeTotal=()=>{
  income.total.asset=Object.values(income.asset).reduce((a,b)=>a+b, 0)
  income.total.liability=Object.values(income.liability).reduce((a,b)=>a+b, 0)

}
const Income = (props) => (
  <div>
    <div>
      <h3>Assets</h3>
      {computeTotal()}

      {
        Object.keys(income.asset).map(name => {
          return <li key={name}>{name}: {income.asset[name]}</li>
        })
      }
      <p>Total Assets: {income.total.asset}</p>

      <h3>Liability</h3>

      {
        Object.keys(income.liability).map(name => {
          return <li key={name}>{name}: {income.liability[name]}</li>
        })
      }
      <p>Total Liability: {income.total.liability}</p>
      <h2>Balance: {income.total.asset-income.total.liability}</h2>
    </div>
  </div>
)
export default Income
