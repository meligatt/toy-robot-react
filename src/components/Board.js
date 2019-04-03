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
const directionOptions = [
  {title:'right', value:'RIGHT'},
  {title:'left', value:'LEFT' },
];

const robotFacingOptions = [
  { title:'north', value:'NORTH' },
  { title:'south', value:'SOUTH' },
  { title:'east', value:'EAST' },
  { title:'west', value:'WEST' }
];

class Board extends Component{
  constructor(props) {
    super(props);
    this.state = {
      board: new Array(BOARD_WIDTH).fill(0).map(() => new Array(BOARD_HEIGHT).fill(0)),
      robotPosX: 0,
      robotPosY: 0,
      shouldPlace: false,
      robotDirection: 'NORTH',
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
      }, 
      shouldReport: false
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
    this.setState({
      shouldPlace: true
    });
  }
  handleTurnBlur(event) {
    const turnValue = event.target.value;
    const currentRobotDirection = this.state.robotDirection;
    const newRobotDirection = this.state.robotDirectionMap[currentRobotDirection][turnValue];
    this.setState({robotDirection: newRobotDirection });
  }
  handleMoveClick() {
    console.log('------------------------------------');
    console.log('handleMoveClick');
    console.log('------------------------------------');
  }
  handleReportClick() {
    this.setState({ shouldReport: true });
  }
  renderColumn(column, index, robotPosY, robotPosX, robotDirection) {
    return (
      <div key = { index } style = { {border:'1px solid blue'} }>
        {
          column.map((_, index) => {
            if (robotPosY === index){
              return <Tile key = { index } show = { true } direction = { robotDirection } />;
            } else {
              return <Tile key = { index } show = { false } />;
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
    const {robotPosX, robotPosY, robotDirection, shouldPlace, board, shouldReport} =  this.state;
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
            label = "Facing"
            name = "robotDirection"
            id = "robotDirection"
            value = { this.robotDirection }
            options = { robotFacingOptions }
            onBlur = { (e) => this.handleDirectionBlur(e) }/>
          <Button onClick = { () => this.handlePlaceClick() } label = "Place" />
        </div>
        
        <div style = { {border: '1px solid green', padding: '8px'} }>
          <Select
            label = "Turn"
            name = "robotTurn"
            id = "robotTurn"
            value = { this.robotDirection }
            options = { directionOptions }
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
        <div>
          {
            shouldReport && `report: (x,y): ${this.state.robotPosX + 1}, ${this.state.robotPosY + 1} - facing: ${this.state.robotDirection}`
          }
        </div>
      </main>
    );
  }
}
export default Board;
