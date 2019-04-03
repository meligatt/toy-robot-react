import './Board.scss';
import React, { Component } from 'react';
import Tile from './Tile';
const BOARD_WIDTH = 5;
const BOARD_HEIGHT = 5;

class Board extends Component{
  constructor(props) {
    super(props);
    this.state = {
      board: new Array(BOARD_WIDTH).fill(0).map(() => new Array(BOARD_HEIGHT).fill(0)),
      robotPosX: 0,
      robotPosY: 0,
      shouldPlace: false,
      robotDirection: 'north',
      robotDirectionMap: {
        NORTH: {
          RIGHT: 'EAST',
          LEFT: 'WEST',
        },
        EAST: {
          RIGHT: 'SOUTH',
          LEFT: 'NORTH',
        },
        SOUTH: {
          RIGHT: 'WEST',
          LEFT: 'EAST',
        },
        WEST: {
          RIGHT: 'NORTH',
          LEFT: 'SOUTH',
        },
      }
    };
  }
  handlePositionBlur({id, value}) {
    this.setState({
      [id]: parseInt(value, 10),
      shouldPlace: false
    });
  }
  handleDirectionBlur({value}) {
    this.setState({
      robotDirection: value,
      shouldPlace: false
    });
  }
  handlePlaceClick() {
    this.setState({shouldPlace: true});
  }  
  renderColumn(column, robotPosY, robotPosX, robotDirection) {
    return (
      <div style = { {border:'1px solid blue'} }>
        {
          column.map((_, index) => {
            if (robotPosY === index){
              return <Tile key = { index } id = { index } show = { true } x = { robotPosX } y = { robotPosY } direction = { robotDirection }/>;
            } else {
              return <Tile key = { index } id = { index } show = { false }/>;
            }
          })
        }
      </div>
    );
  }
  renderEmptyColumn() {
    return (
      <div style = { {border:'1px solid blue'} }>
        <Tile key = { 0 } show = { false }/>
        <Tile key = { 1 } show = { false }/>
        <Tile key = { 2 } show = { false }/>
        <Tile key = { 3 } show = { false }/>
        <Tile key = { 4 } show = { false }/>
      </div>
    );
  }
  render() {
    const {robotPosX, robotPosY, robotDirection, shouldPlace, board} =  this.state;
    return(
      <main>
        <label htmlFor = "robotPosX">position x</label>
        <select name = "robotPosX" id = "robotPosX" value = { this.robotPosX } onBlur = { (e) => this.handlePositionBlur(e.target) }>
          <option value = "0">1</option>
          <option value = "1">2</option>
          <option value = "2">3</option>
          <option value = "3">4</option>
          <option value = "4">5</option>
        </select>
        
        <label htmlFor = "robotPosY">position y</label>
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
          <div  className = "flex-grid-fifth" style = { {border:'1px solid orange'} }>
            { shouldPlace &&
              board.map((column, index) => {
                if (robotPosX === index){
                  return this.renderColumn(column, robotPosY, robotPosX, robotDirection);
                } else {
                  return this.renderEmptyColumn();
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