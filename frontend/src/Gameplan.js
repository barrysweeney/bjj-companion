import React, { Component } from "react";
import styled from "styled-components";
import { BsArrowDown } from "react-icons/bs";

const PositionWrapper = styled.div`
  ul {
    list-style: none;
    padding-left: 0;
  }

  background: #eee;
  padding: 10px;
  margin: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  text-align: center;
`;

const GameplanGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const ArrowWrapper = styled.div`
  font-size: 70px;
  text-align: center;
  padding: 10px;
  margin: 10px;
`;

const Button = styled.button`
  background: red;
  padding: 10px;
  margin: 10px 0;
  text-transform: uppercase;
  color: white;
  border-radius: 5px;
  font-weight: 600;
  border: 0;
`;

class Position extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: this.props.position,
      move: this.props.move,
      saved: this.props.saved,
    };
  }

  updatePosition(e) {
    this.setState({
      position: e.target.value,
      move: this.state.move,
      saved: this.state.saved,
    });
  }

  updateMove(e) {
    this.setState({
      position: this.state.position,
      move: e.target.value,
      saved: this.state.saved,
    });
  }

  addPosition() {
    this.props.setPositionandMove(this.state.position, this.state.move);
    this.props.addPosition();
  }

  render() {
    return (
      <div>
        <PositionWrapper>
          <input
            placeholder="Position Name"
            onChange={this.updatePosition.bind(this)}
            value={this.state.position || this.props.position}
          />
          <ul>
            <li>
              {
                <input
                  placeholder="Move Name"
                  onChange={this.updateMove.bind(this)}
                  value={this.state.move || this.props.move}
                />
              }
            </li>
          </ul>
        </PositionWrapper>
        {this.state.saved ? null : (
          <Button onClick={this.addPosition.bind(this)}>Add Position</Button>
        )}
      </div>
    );
  }
}

class Gameplan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionCount: 1,
      positions: [],
      moves: [],
    };
  }

  setPositionandMove(position, move) {
    this.setState({
      positions: this.state.positions.push(position),
      moves: this.state.moves.push(move),
      positionCount: this.state.positionCount,
    });
  }

  addPosition() {
    this.setState({
      positionCount: (this.state.positionCount += 1),
    });
  }

  render() {
    return (
      <div>
        <header>
          <h2>Gameplan</h2>
        </header>

        <GameplanGrid>
          {[...Array(this.state.positionCount)].map((i, index) => {
            if (index === this.state.positionCount - 1) {
              return (
                <Position
                  position={this.state.positions[index]}
                  name={this.state.positions[index]}
                  addPosition={this.addPosition.bind(this)}
                  saved={false}
                  setPositionandMove={this.setPositionandMove.bind(this)}
                />
              );
            } else {
              return (
                <div>
                  {" "}
                  <Position
                    position={this.state.positions[index]}
                    name={this.state.positions[index]}
                    saved={true}
                    setPositionandMove={this.setPositionandMove.bind(this)}
                  />
                  <ArrowWrapper>
                    <BsArrowDown />
                  </ArrowWrapper>
                </div>
              );
            }
          })}
        </GameplanGrid>
        <Button onClick={this.saveGameplan}>Save Gameplan</Button>
      </div>
    );
  }
}

export default Gameplan;
