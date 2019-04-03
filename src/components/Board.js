import './Board.scss';
import React, { Component } from 'react';
import Tile from './Tile';
import Select from './select';
import Button from './button';

const BOARD_WIDTH = 5;
const BOARD_HEIGHT = 5;
const boardPositionOptions = [
  {title:'1', value:0},
  {title:'2', value:1},
  {title:'3', value:2},
  {title:'4', value:3},
  {title:'5', value:4}
];
const boardDirectionOptions = [
  {title:'north', value:'north'},
  {title:'south', value:'south' },
  {title:'west', value:'west'},
  {title:'east', value:'east'}
];

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
  handlePositionBlur(event) {
    const id = event.target.id;
    const value = event.target.value;
    this.setState({
      [id]: parseInt(value, 10),
      shouldPlace: false
    });
  }
  handleDirectionBlur(event) {
    const value = event.target.value;
    this.setState({
      robotDirection: value,
      shouldPlace: false
    });
  }
  handlePlaceClick() {
    this.setState({shouldPlace: true});
  }
  handleTurnBlur() {
    console.log('------------------------------------');
    console.log('handleTurnBlur');
    console.log('------------------------------------');
  }
  handleMoveClick() {
    console.log('------------------------------------');
    console.log('handleMoveClick');
    console.log('------------------------------------');
  }
  handleReportClick() {
    console.log('------------------------------------');
    console.log('handleReportClick');
    console.log('------------------------------------');
  }
  renderColumn(column, index, robotPosY, robotPosX, robotDirection) {
    return (
      <div key = { index }style = { {border:'1px solid blue'} }>
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
  renderEmptyColumn(column, index) {
    return (
      <div key = { index } style = { {border:'1px solid blue'} }>
        {
          column.map((_, index) => <Tile key = { index } id = { index } show = { false }/>
          )
        }
      </div>
    );
  }
  render() {
    const {robotPosX, robotPosY, robotDirection, shouldPlace, board} =  this.state;
    return(
      <main>
        <div style = { {border: '1px solid pink', padding: '8px'} }>
          <Select 
            label = "position x"
            name = "robotPosX"
            id = "robotPosX"
            value = { this.robotPosX }
            options = { boardPositionOptions }
            onBlur = { (e) => this.handlePositionBlur(e) }/>
          <Select 
            label = "position y"
            name = "robotPosY"
            id = "robotPosY"
            value = { this.robotPosY }
            options = { boardPositionOptions }
            onBlur = { (e) => this.handlePositionBlur(e) }/>
          <Select 
            label = "direction"
            name = "robotDirection"
            id = "robotDirection"
            value = { this.robotDirection }
            options = { boardDirectionOptions }
            onBlur = { (e) => this.handleDirectionBlur(e) }/>
          <Button onClick = { () => this.handlePlaceClick() } label = "Place" />
        </div>
        
        <div style = { {border: '1px solid green', padding: '8px'} }>
          <Select
            label = "Turn"
            name = "robotTurn"
            id = "robotTurn"
            value = { this.robotDirection }
            options = { boardDirectionOptions }
            onBlur = { (e) => this.handleTurnBlur(e) }/>
          <Button onClick = { () => this.handleMoveClick() } label = "move forward" />
        </div>
        <div style = { {border: '1px solid green', padding: '8px'} }>
          <Button onClick = { () => this.handleReportClick() } label = "Report" />
        </div>
        
        <div className = "flex-grid-fifth">
          { shouldPlace &&
              board.map((column, index) => {
                if (robotPosX === index){
                  return this.renderColumn(column, index, robotPosY, robotPosX, robotDirection);
                } else {
                  return this.renderEmptyColumn(column, index);
                }
              })
          }
        </div>
      </main>
    );
  }
}
export default Board;