import './Board.scss';
import React, { Component } from 'react';
// import Grid from './Grid';
import Tile from './Tile';

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
    this.setState({[id]: parseInt(value, 10)});
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
          <option value = "0">1</option>
          <option value = "1">2</option>
          <option value = "2">3</option>
          <option value = "3">4</option>
          <option value = "4">5</option>
        </select>
        <select name = "robotPosY" id = "robotPosY" value = { this.robotPosY } onBlur = { (e) => this.handlePositionBlur(e.target) }>
          <option value = "0">1</option>
          <option value = "1">2</option>
          <option value = "2">3</option>
          <option value = "3">4</option>
          <option value = "4">5</option>
        </select>
        <select name = "robotDirection" id = "robotDirection" value = { this.robotDirection } onBlur = { (e) => this.handleDirectionBlur(e.target) }>
          <option value = "north">north</option>
          <option value = "south">south</option>
          <option value = "west">west</option>
          <option value = "east">east</option>
        </select>
        <button onClick = { () => this.handlePlaceClick() }>place</button>
        <div>
          {/* <Grid shouldPlace = { shouldPlace } x = { robotPosX } y = { robotPosY } d = { robotDirection } /> */}

          <div className = "flex-grid-fifth"  style = { {border:'1px solid blue'} }>
            { shouldPlace &&
              Array(this.state.boardWidth).fill(1).map((item, index) => {
                console.log(typeof robotPosX, typeof index);
                console.log(robotPosX === index);
                
                if (robotPosX === index){
                  return <Tile key = { index } id = { index } show = { true } x = { robotPosX } y = { robotPosY } direction = { robotDirection }/>;
                } else {
                  return <Tile key = { index } id = { index } show = { false }/>;
                }            
              })
            }
          </div>
        </div>
      </main>
    );
  }
}
export default Board;