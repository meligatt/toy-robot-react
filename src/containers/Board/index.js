import './index.scss';
import React, { Component } from 'react';
import Tile from '../../components/Tile';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import FieldSet from '../../components/FieldSet';

const BOARD_WIDTH = 5;
const BOARD_HEIGHT = 5;

const MAX_Y_COORDINATE = BOARD_HEIGHT - 1;
const MIN_Y_COORDINATE = 0;

const MAX_X_COORDINATE = BOARD_WIDTH - 1;
const MIN_X_COORDINATE = 0;

const BOARD_COORDINATES_OPTIONS = [
  {title:'0', value:0},
  {title:'1', value:1},
  {title:'2', value:2},
  {title:'3', value:3},
  {title:'4', value:4}
];

const ROBOT_ROTATION_OPTIONS = [
  {title:'south', value:'SOUTH'},
  {title:'north', value:'NORTH'},
  {title:'east', value:'EAST'},
  {title:'west', value:'WEST'}
];

const ROBOT_DIRECTION_MAP = {
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
};

const BOARD_MATRIX = new Array(BOARD_WIDTH).fill(0).map(() => new Array(BOARD_HEIGHT).fill(0));

class Board extends Component{
  constructor(props) {
    super(props);
    this.state = {
      robotPosX: 0,
      robotPosY: 0,
      robotDirection: 'SOUTH',
      shouldPlace: false,
      shouldReport: false,
      reportMessage: null,
      obstacle: [3,2]
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
      shouldPlace: true,
      shouldReport: false,
    });
  }
  handleTurnClick(event) {
    const turnValue = event.target.value;
    const currentRobotDirection = this.state.robotDirection;
    const newRobotDirection = ROBOT_DIRECTION_MAP[currentRobotDirection][turnValue];
    this.setState({
      robotDirection: newRobotDirection,
      shouldReport: false,
    });
  }
  handleMoveClick() {
    const direction = this.state.robotDirection;
    switch (direction){
    case 'NORTH':
      this.setState({
        robotPosY: (this.state.robotPosY < MAX_Y_COORDINATE) ? this.state.robotPosY + 1 : this.state.robotPosY,
        shouldReport: false
      });
      break;
    case 'EAST':
      this.setState({
        robotPosX: (this.state.robotPosX < MAX_X_COORDINATE) ? this.state.robotPosX + 1 : this.state.robotPosX,
        shouldReport: false
      });
      break;
    case 'SOUTH':
      this.setState({
        robotPosY: (this.state.robotPosY > MIN_Y_COORDINATE) ? this.state.robotPosY - 1 : this.state.robotPosY,
        shouldReport: false
      });
      break;
    case 'WEST':
      this.setState({
        robotPosX: (this.state.robotPosX > MIN_X_COORDINATE) ? this.state.robotPosX - 1 : this.state.robotPosX,
        shouldReport: false
      });
      break;
    default:
      throw new Error('Not valid direction');
    }
  }
  handleReportClick() {
    if (!this.state.shouldPlace){
      return;
    }
    const newReportMessage = `
    Robot is currently in position x: ${this.state.robotPosX},
     position y: ${this.state.robotPosY}, facing: ${this.state.robotDirection}`;

    this.setState({
      shouldReport: true,
      reportMessage: newReportMessage
    });
  }
  renderColumn(column, index, robotPosY, robotPosX, robotDirection, hasObstacle) {
    return (
      <div key = { index } style = { {transform: 'rotate(180deg)'} } role = "row">
        {
          column.map((_, index) => {
            if (robotPosY  === index){
              return <Tile key = { index } show = { true } direction = { robotDirection } />;
            }
            if (this.state.obstacle[1] === index){
              return <Tile key = { index } show = { false } hasObstacle = { hasObstacle }/>;
            }

            return <Tile key = { index } show = { false } hasObstacle = { false }/>;
          })
        }
      </div>
    );
  }
  renderEmptyColumn(column, index, hasObstacle) {
    return (
      <div key = { index } style = { {transform: 'rotate(180deg)'} } role = "row">
        {
          column.map((_, index) => {
            if (this.state.obstacle[1] === index){
              return <Tile key = { index } show = { false } hasObstacle = { hasObstacle }/>;
            }

            return <Tile key = { index } show = { false } hasObstacle = { false }/>;
          })
        }
      </div>
    );
  }
  renderEmptyGrid() {
    return BOARD_MATRIX.map((column, index) => this.renderEmptyColumn(column, index));
  }
  render() {
    const {robotPosX, robotPosY, robotDirection, shouldPlace, shouldReport, reportMessage, obstacle} =  this.state;

    return(
      <main className = "board-main">
        <div className = "flex-grid board-main__searchbar" role = "search">
          <FieldSet legend = "Place">
            <Select
              label = "position x"
              name = "robotPosX"
              value = { this.robotPosX }
              options = { BOARD_COORDINATES_OPTIONS }
              onBlur = { (e) => this.handlePositionBlur(e) } />
            <Select
              label = "position y"
              name = "robotPosY"
              value = { this.robotPosY }
              options = { BOARD_COORDINATES_OPTIONS }
              onBlur = { (e) => this.handlePositionBlur(e) } />
            <Select
              label = "Facing"
              name = "robotDirection"
              value = { this.robotDirection }
              options = { ROBOT_ROTATION_OPTIONS }
              onBlur = { (e) => this.handleDirectionBlur(e) } />
            <Button onClick = { () => this.handlePlaceClick() } label = "Place"/>
          </FieldSet>

          <FieldSet legend = "Rotate">
            <Button value = "RIGHT" onClick = { (e) => this.handleTurnClick(e) } label = "Right"/>
            <Button value = "LEFT" onClick = { (e) => this.handleTurnClick(e) } label = "Left"/>
          </FieldSet>

          <FieldSet legend = "Move">
            <Button onClick = { () => this.handleMoveClick() } label = "move forward" />

          </FieldSet>

          <FieldSet legend = "Report">
            <Button onClick = { () => this.handleReportClick() } label = "Generate report" />
          </FieldSet>
        </div>
        <h2 id = "grid-title" className = "board-main__subtitle">Robot grid</h2>
        <div className = "flex-grid-fifth" role = "grid" aria-labelledby = "grid-title">
          { !shouldPlace && BOARD_MATRIX.length > 0 && this.renderEmptyGrid() }

          { shouldPlace && BOARD_MATRIX.length > 0 &&
              BOARD_MATRIX.map((column, index) => {
                const hasObstacle = (obstacle[0] === index ? true : false );
                if (robotPosX  === index){
                  return this.renderColumn(column, index, robotPosY, robotPosX, robotDirection, hasObstacle);
                } else {
                  return this.renderEmptyColumn(column, index, hasObstacle);
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
