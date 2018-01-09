import React from 'react';

const handlePicker=(items)=>{
  const randomItem = items[Math.floor(Math.random()*items.length)];
  document.getElementById("item").textContent=randomItem;
}
const RandomItem = (props) => (
  <div>
    <label>Pick random media </label>
    <button onClick={()=>handlePicker(props.items)}>Picker</button>
    <p>Result: <span id="item"></span></p>

  </div>
);

export default RandomItem;
