import React, { Component } from "react";
import styled from "styled-components";
import { BsArrowDown } from "react-icons/bs";
import { Position } from "./components/Position";
import { unescape } from "html-escaper";
import { Button } from "./components/Button";
import { BACKEND_URI } from "./App";

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

const GameplanHeader = styled.header`
  font-family: "Press Start 2P", cursive;
`;

class Gameplan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: [],
      moves: [],
      addingNewPosition: true,
      saveable: false,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem("auth-token");
    const response = await fetch(`${BACKEND_URI}/gameplans/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (response.status === 200 || response.status === 304) {
      const data = await response.json();
      if (data.length > 0) {
        const positions = unescape(data[data.length - 1].positions)
          .split('","')
          .map((item) => item.replaceAll(/"|\[|\]/g, ""))
          .map((item) => item.replace("&#x2F;", "/"));

        const moves = unescape(data[data.length - 1].moves)
          .split('","')
          .map((item) => item.replaceAll(/"|\[|\]/g, ""))
          .map((item) => item.replace("&#x2F;", "/"));

        this.setState({
          positions: positions,
          moves: moves,
          addingNewPosition: false,
        });
      }
    }
  }

  setPositionandMove(position, move) {
    this.setState({
      positions: this.state.positions.concat([position]),
      moves: this.state.moves.concat([move]),
      addingNewPosition: false,
      saveable: true,
    });
  }

  async savePositonsAndMovesArraysToDatabase() {
    const token = localStorage.getItem("auth-token");
    const body = {};
    body.positions = JSON.stringify(this.state.positions);
    body.moves = JSON.stringify(this.state.moves);
    const response = await fetch(`${BACKEND_URI}/gameplans/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(body),
    });
    if (response.status === 200) {
      this.setState({
        saveable: false,
      });
    }
  }

  addPosition() {
    this.setState({
      addingNewPosition: true,
      saveable: false,
    });
  }

  removePosition(index) {
    if (this.state.positions.length === 1) {
      this.setState({
        positions: [
          ...this.state.positions.slice(0, index),
          ...this.state.positions.slice(index + 1),
        ],
        moves: [
          ...this.state.moves.slice(0, index),
          ...this.state.moves.slice(index + 1),
        ],
        addingNewPosition: true,
        saveable: true,
      });
    } else {
      this.setState({
        positions: [
          ...this.state.positions.slice(0, index),
          ...this.state.positions.slice(index + 1),
        ],
        moves: [
          ...this.state.moves.slice(0, index),
          ...this.state.moves.slice(index + 1),
        ],
        saveable: true,
      });
    }
  }

  render() {
    return (
      <div id="gameplan">
        <GameplanHeader>
          <h2>Gameplan</h2>
        </GameplanHeader>

        <GameplanGrid>
          {[...Array(this.state.moves.length)].map((i, index) => {
            return (
              <div>
                {index !== 0 ? (
                  <ArrowWrapper>
                    <BsArrowDown />
                  </ArrowWrapper>
                ) : null}
                <Position
                  position={this.state.positions[index]}
                  move={this.state.moves[index]}
                  saved={true}
                  addPosition={this.addPosition.bind(this)}
                  displayAddPositionButton={
                    index === this.state.moves.length - 1 &&
                    !this.state.addingNewPosition
                  }
                  setPositionandMove={this.setPositionandMove.bind(this)}
                  removePosition={() => this.removePosition(index)}
                />
              </div>
            );
          })}
          {this.state.addingNewPosition ? (
            <div>
              {this.state.moves.length !== 0 ? (
                <ArrowWrapper>
                  <BsArrowDown />
                </ArrowWrapper>
              ) : null}
              <Position
                addPosition={this.addPosition.bind(this)}
                saved={false}
                setPositionandMove={this.setPositionandMove.bind(this)}
              />
            </div>
          ) : this.state.saveable ? (
            <Button
              onClick={this.savePositonsAndMovesArraysToDatabase.bind(this)}
            >
              Save Gameplan
            </Button>
          ) : null}
        </GameplanGrid>
      </div>
    );
  }
}

export default Gameplan;
