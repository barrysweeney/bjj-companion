import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "./Button";

export const PositionWrapper = styled.div`
  background: #eee;
  padding: 10px;
  margin: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  text-align: center;
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-content: center;
`;

export class Position extends Component {
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

  savePosition() {
    this.props.setPositionandMove(this.state.position, this.state.move);
  }

  addPosition() {
    this.props.addPosition();
  }

  render() {
    return (
      <div>
        {this.state.saved ? (
          <div>
            <PositionWrapper>
              <span>{this.props.position}</span>
              <span>{this.props.move}</span>
            </PositionWrapper>
            {this.props.displayAddPositionButton ? (
              <div>
                <Button onClick={this.addPosition.bind(this)}>
                  Add position
                </Button>
              </div>
            ) : null}
            <Button onClick={this.props.removePosition}>Delete position</Button>
          </div>
        ) : (
          <div>
            <PositionWrapper>
              <input
                placeholder="Position Name"
                onChange={this.updatePosition.bind(this)}
                value={this.state.position}
              />
              <input
                placeholder="Move Name"
                onChange={this.updateMove.bind(this)}
                value={this.state.move}
              />
            </PositionWrapper>
            <Button onClick={this.savePosition.bind(this)}>
              Save Position
            </Button>
          </div>
        )}
      </div>
    );
  }
}
