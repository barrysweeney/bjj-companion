import React, { Component } from "react";
import { Button } from "./components/Button";
import styled from "styled-components";

const ProgressWrapper = styled.div`
  display: grid;
`;

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoursTrained: 0.0,
      saveable: false,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem("auth-token");
    const response = await fetch("http://localhost:9000/progress/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (response.status === 200 || response.status === 304) {
      const data = await response.json();
      this.setState({
        hoursTrained: data.hoursTrained,
      });
    }
  }

  addHalfHourTraining() {
    this.setState({
      hoursTrained: this.state.hoursTrained + 0.5,
      saveable: true,
    });
  }

  minusHalfHourTraining() {
    // stop hours trained from being negative
    if (this.state.hoursTrained - 0.5 < 0) {
      return;
    }
    this.setState({
      hoursTrained: this.state.hoursTrained - 0.5,
      saveable: true,
    });
  }

  async saveHoursTrainedToDatabase() {
    const token = localStorage.getItem("auth-token");
    const body = {};
    body.hoursTrained = this.state.hoursTrained;
    const response = await fetch("http://localhost:9000/progress/train", {
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

  render() {
    return (
      <ProgressWrapper>
        <header>
          <h2>Progress</h2>
        </header>
        <h3>Hours Trained</h3>
        <span>{this.state.hoursTrained}</span>
        <Button onClick={this.addHalfHourTraining.bind(this)}>
          + 0.5 hours
        </Button>
        <Button onClick={this.minusHalfHourTraining.bind(this)}>
          - 0.5 hours
        </Button>
        {this.state.saveable ? (
          <Button onClick={this.saveHoursTrainedToDatabase.bind(this)}>
            Save changes to hours trained
          </Button>
        ) : null}
      </ProgressWrapper>
    );
  }
}

export default Progress;
