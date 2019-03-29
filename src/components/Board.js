import './Board.scss';
import React, { Component } from 'react';

class Board extends Component{
  constructor(props) {
    super(props);
    this.state= {
      boardHeight: 5,
      boardWidth: 5,
      robotPosX: 0,
      robotPosY: 0,
      robotDirection: 'north',
      shouldPlace: false
    };
  }
  handlePositionBlur({id, value}) {
    this.setState({[id]: value});
  }
  handleDirectionBlur({value}) {
    this.setState({robotDirection: value});
  }
  handlePlaceClick() {
    // here should actually move the robot
    this.setState({shouldPlace: true});
  }
  render() {
    const {robotPosX, robotPosY, robotDirection, shouldPlace } =  this.state;
    return(
      <main>
        <select name = "robotPosX" id = "robotPosX" value = { this.robotPosX } onBlur = { (e) => this.handlePositionBlur(e.target) }>
          <option value = "1">1</option>
          <option value = "2">2</option>
          <option value = "3">3</option>
          <option value = "4">4</option>
          <option value = "5">5</option>
        </select>
        <select name = "robotPosY" id = "robotPosY" value = { this.robotPosY } onBlur = { (e) => this.handlePositionBlur(e.target) }>
          <option value = "1">1</option>
          <option value = "2">2</option>
          <option value = "3">3</option>
          <option value = "4">4</option>
          <option value = "5">5</option>
        </select>
        <select name = "robotDirection" id = "robotDirection" value = { this.robotDirection } onBlur = { (e) => this.handleDirectionBlur(e.target) }>
          <option value = "north">north</option>
          <option value = "south">south</option>
          <option value = "west">west</option>
          <option value = "east">east</option>
        </select>
        <button onClick = { () => this.handlePlaceClick() }>place</button>
        <div>
          {
            shouldPlace &&  `position: (${robotPosX}, ${robotPosY}) facing: (${robotDirection})`
          }
        </div>
      </main>
    );
  }
}
export default Board;