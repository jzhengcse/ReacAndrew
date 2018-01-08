import React from 'react';
import ReactDOM from 'react-dom';
import RandomNum from './components/RandomNum';
import RandomItem from './components/RandomItem';

const items=[
  "Get Out",
  "The Big Sick",
  "Dunkirk"
]

ReactDOM.render(<RandomItem items={items}/>, document.getElementById('app'));
