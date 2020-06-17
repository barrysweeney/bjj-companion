import React, { Component } from "react";
import styled from "styled-components";
import { BsArrowDown } from "react-icons/bs";
import { Position } from "./components/Position";

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

export const Button = styled.button`
  background: red;
  padding: 10px;
  margin: 10px 0;
  text-transform: uppercase;
  color: white;
  border-radius: 5px;
  font-weight: 600;
  border: 0;
`;

class Gameplan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: [],
      moves: [],
      addingNewPosition: true,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem("auth-token");
    const response = await fetch("http://localhost:9000/gameplans/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const data = await response.json();
    console.log(data);
  }

  setPositionandMove(position, move) {
    this.setState({
      positions: this.state.positions.concat([position]),
      moves: this.state.moves.concat([move]),
      addingNewPosition: false,
    });
  }

  async savePositonsAndMovesArraysToDatabase(e) {
    e.persist();
    const token = localStorage.getItem("auth-token");
    const body = {};
    body.positions = JSON.stringify(this.state.positions);
    body.moves = JSON.stringify(this.state.moves);
    const response = await fetch("http://localhost:9000/gameplans/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(body),
    });
    if (response.status === 200) {
      e.target.style.display = "none";
    }
  }

  addPosition() {
    this.setState({
      addingNewPosition: true,
    });
  }

  render() {
    return (
      <div>
        <header>
          <h2>Gameplan</h2>
        </header>

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
          ) : null}
        </GameplanGrid>
        {this.state.addingNewPosition ? null : (
          <Button
            onClick={this.savePositonsAndMovesArraysToDatabase.bind(this)}
          >
            Save Gameplan
          </Button>
        )}
      </div>
    );
  }
}

export default Gameplan;
