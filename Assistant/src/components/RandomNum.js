import React from 'react';

const handlePicker=(max)=>{
  const random=Math.floor(Math.random()*max)+1
  console.log(random)
  document.getElementById("num").textContent=random;
}
const RandomNum = (props) => (
  <div>
    <label>Random Number between 1 and {props.max}: </label>
    <button onClick={()=>handlePicker(props.max)}>Picker</button>
    <p>Result: <span id="num"></span></p>

  </div>
);

export default RandomNum;
