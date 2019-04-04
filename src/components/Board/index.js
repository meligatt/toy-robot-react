import './index.scss';
import React, { Component } from 'react';
import Tile from '../Tile';
import Select from '../Select';
import Button from '../Button';
import Alert from '../Alert';
import FieldSet from '../FieldSet';

const BOARD_WIDTH = 5;

const BOARD_HEIGHT = 5;

const BOARD_COORDINATES_OPTIONS = [
  {title:'0', value:0},
  {title:'1', value:1},
  {title:'2', value:2},
  {title:'3', value:3},
  {title:'4', value:5}
];

const BOARD_DIRECTIONS = [
  {title:'right', value:'RIGHT'},
  {title:'left', value:'LEFT'},
];

const ROBOT_ROTATION_OPTIONS = [
  {title:'south', value:'SOUTH'},
  {title:'north', value:'NORTH'},
  {title:'east', value:'EAST'},
  {title:'west', value:'WEST'}
];

class Board extends Component{
  constructor(props) {
    super(props);
    this.state = {
      board: new Array(BOARD_WIDTH).fill(0).map(() => new Array(BOARD_HEIGHT).fill(0)),
      robotPosX: 0,
      robotPosY: 0,
      robotDirection: 'SOUTH',
      shouldPlace: false,
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
      shouldReport: false,
      reportMessage: null
    };
  }
  handlePositionBlur(event) {
    const id = event.target.id;
    const value = parseInt(event.target.value, 10);
    this.setState({
      [id]: value,
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
      robotPosX: this.state.robotPosX,
      robotPosY: this.state.robotPosY,
      robotDirection: this.state.robotDirection,
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
    const direction = this.state.robotDirection;
    switch (direction){
    case 'NORTH':
      this.setState({robotPosY: this.state.robotPosY + 1});
      break;
    case 'EAST':
      this.setState({robotPosX: this.state.robotPosX + 1});
      break;
    case 'SOUTH':
      this.setState({robotPosY: this.state.robotPosY - 1});
      break;
    case 'WEST':
      this.setState({robotPosX: this.state.robotPosX - 1});
      break;
    default:
      throw new Error('Not valid direction');
    }
  }
  handleReportClick() {
    if (!this.state.shouldPlace){
      return;
    }
    const newReportMessage = `report: (x,y):
      ${this.state.robotPosX},
      ${this.state.robotPosY}
      - facing: ${this.state.robotDirection}`;

    this.setState({
      shouldReport: true,
      reportMessage: newReportMessage
    });
  }
  renderColumn(column, index, robotPosY, robotPosX, robotDirection) {
    return (
      <div key = { index } style = { {transform: 'rotate(180deg)'} }>
        {
          column.map((_, index) => {
            if (robotPosY  === index){
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
      <div key = { index }>
        {
          column.map((_, index) => <Tile key = { index } id = { index } show = { false }/>
          )
        }
      </div>
    );
  }
  render() {
    const {robotPosX, robotPosY, robotDirection, shouldPlace, board, shouldReport, reportMessage} =  this.state;
    return(
      <main>
        <FieldSet legend = "Robot placement">
          <Select
            label = "position x"
            name = "robotPosX"
            id = "robotPosX"
            value = { this.robotPosX }
            options = { BOARD_COORDINATES_OPTIONS }
            onBlur = { (e) => this.handlePositionBlur(e) } />
          <Select
            label = "position y"
            name = "robotPosY"
            id = "robotPosY"
            value = { this.robotPosY }
            options = { BOARD_COORDINATES_OPTIONS }
            onBlur = { (e) => this.handlePositionBlur(e) } />
          <Select
            label = "Facing"
            name = "robotDirection"
            id = "robotDirection"
            value = { this.robotDirection }
            options = { ROBOT_ROTATION_OPTIONS }
            onBlur = { (e) => this.handleDirectionBlur(e) } />
          <Button onClick = { () => this.handlePlaceClick() } label = "Place"/>
        </FieldSet>

        <FieldSet legend = "Robot movement">
          <Select
            label = "Turn"
            name = "robotTurn"
            id = "robotTurn"
            value = { this.robotDirection }
            options = { BOARD_DIRECTIONS }
            onBlur = { (e) => this.handleTurnBlur(e) } />
          <Button onClick = { () => this.handleMoveClick() } label = "move forward" />
        </FieldSet>

        <FieldSet legend = "Report">
          <Button onClick = { () => this.handleReportClick() } label = "Generate report" />
        </FieldSet>

        <div className = "flex-grid-fifth">
          { shouldPlace && board.length > 0 &&
              board.map((column, index) => {
                if (robotPosX  === index){
                  return this.renderColumn(column, index, robotPosY, robotPosX, robotDirection);
                } else {
                  return this.renderEmptyColumn(column, index);
                }
              })
          }
        </div>

        { shouldReport && <Alert text = { reportMessage }/> }

      </main>
    );
  }
}
export default Board;
