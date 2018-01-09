import React from 'react'

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
}
export default class WorkBreak extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startTime: undefined,
      breakTime: undefined,
      workedTime: undefined,
      breakEndTime: undefined,
      isWork: false,
      workBreakRatio: 0.25
    }
  }

  updateTime=()=>{
    let state=Object.assign({}, this.state);
    if (this.state.isWork) {
      state.workedTime=new Date()-this.state.startTime
    }
    this.setState((prevState) => {
      return state
    })
  }
  componentDidMount(){
    setInterval(()=>{this.updateTime(), 1000});

  }
  handleStartWork=()=>{
    this.setState(() => {
      return ({
        startTime: new Date(),
        workedTime: 0,
        isWork: true,
      })
    })
  }

  handleBreak=()=>{
    const breakTime=this.state.workedTime*this.state.workBreakRatio
    console.log(breakTime)
    this.setState(() => {
      return ({
        breakTime: new Date(),
        breakEndTime: new Date(Date.now() + breakTime),
        isWork: false,
      })
    })
  }

  render () {
    return (
      <div>
        <button disabled={this.state.isWork} onClick={this.handleStartWork}>Start Work</button>
        {this.state.workedTime && <span>Worked: {(this.state.workedTime/1000).toString().toHHMMSS()}</span>}
        <br/><br/>

        <button disabled={!this.state.isWork} onClick={this.handleBreak}>Break</button>
        {!this.state.isWork && this.state.breakEndTime && <span>Break Ends at: {this.state.breakEndTime.toLocaleTimeString()}</span>}
      </div>
    )
  }
}
