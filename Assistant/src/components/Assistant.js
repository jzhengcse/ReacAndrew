import React from 'react';
import RandomItem from './RandomItem';
import RandomNum from './RandomNum';
import Stocks from './Stocks';
import GBTCPremium from './GBTCPremium';
import WorkBreak from './WorkBreak';
import Income from './Income'


const max=32;
const items=[
  "Get Out",
  "The  Sick",
  "Dunkirk"
]
export default class IndecisionApp extends React.Component {

  render() {
    return (
      <div>
        <Income />
        <WorkBreak/>
        <Stocks/>
        <GBTCPremium/>
        <RandomNum max={max}/>
        <RandomItem items={items}/>
      </div>
    );
  }
}

