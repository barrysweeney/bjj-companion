import React, { Component } from "react";
import { Button } from "./components/Button";
import styled from "styled-components";
import { FaClock, FaHistory } from "react-icons/fa";
import { BACKEND_URI } from "./App";

const ProgressWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row;
  grid-gap: 10px;

  div {
    border-left: 4px solid #2cbce8;
    padding: 10px;
    border-radius: 5px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProgressHeader = styled.header`
  grid-column: 1 / -1;
  font-family: "Monofett", cursive;
  h2 {
    font-size: 3rem;
  }
`;

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoursTrainedThisMonth: 0.0,
      hoursTrainedThisYear: 0.0,
      hoursTrainedLastMonth: 0.0,
      hoursTrainedLastYear: 0.0,
      saveable: false,
    };
  }

  componentDidMount() {
    this.getHoursTrainedThisMonth();
    this.getHoursTrainedLastMonth();
    this.getHoursTrainedThisYear();
    this.getHoursTrainedLastYear();
  }

  async getHoursTrainedThisMonth() {
    const month = new Date().getMonth();
    const token = localStorage.getItem("auth-token");
    const response = await fetch(`${BACKEND_URI}/progress/month/${month}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (response.status === 200 || response.status === 304) {
      const data = await response.json();
      this.setState({
        hoursTrainedThisMonth: parseFloat(data),
      });
    }
  }

  async getHoursTrainedLastMonth() {
    const month = new Date().getMonth() - 1;
    const token = localStorage.getItem("auth-token");
    const response = await fetch(`${BACKEND_URI}/progress/month/${month}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (response.status === 200 || response.status === 304) {
      const data = await response.json();
      this.setState({
        hoursTrainedLastMonth: data,
      });
    }
  }

  async getHoursTrainedLastYear() {
    const year = new Date().getFullYear() - 1;
    const token = localStorage.getItem("auth-token");
    const response = await fetch(`${BACKEND_URI}/progress/year/${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (response.status === 200 || response.status === 304) {
      const data = await response.json();
      this.setState({
        hoursTrainedLastYear: data,
      });
    }
  }

  async getHoursTrainedThisYear() {
    const year = new Date().getFullYear();
    const token = localStorage.getItem("auth-token");
    const response = await fetch(`${BACKEND_URI}/progress/year/${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (response.status === 200 || response.status === 304) {
      const data = await response.json();
      this.setState({
        hoursTrainedThisYear: data,
      });
    }
  }

  addHalfHourTraining() {
    this.setState({
      hoursTrainedThisMonth: this.state.hoursTrainedThisMonth + 0.5,
      saveable: true,
    });
  }

  minusHalfHourTraining() {
    // stop hours trained from being negative
    if (this.state.hoursTrainedThisMonth - 0.5 < 0) {
      return;
    }
    this.setState({
      hoursTrainedThisMonth: this.state.hoursTrainedThisMonth - 0.5,
      saveable: true,
    });
  }

  async saveHoursTrainedToDatabase() {
    const token = localStorage.getItem("auth-token");
    const body = {};
    body.hoursTrained = this.state.hoursTrainedThisMonth;
    const response = await fetch(`${BACKEND_URI}/progress/new`, {
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
      this.componentDidMount();
    }
  }

  render() {
    return (
      <ProgressWrapper id="progress">
        <ProgressHeader>
          <h2>Progress</h2>
        </ProgressHeader>
        <div>
          <h3>Hours trained this month</h3>
          <span>{this.state.hoursTrainedThisMonth}</span>
          <Button
            onClick={this.addHalfHourTraining.bind(this)}
            style={{ marginLeft: `5px` }}
          >
            + 0.5 <FaClock title="Clock" />
          </Button>
          <Button onClick={this.minusHalfHourTraining.bind(this)}>
            - 0.5 <FaHistory title="Clock with backwards arrow" />
          </Button>
          {this.state.saveable ? (
            <Button onClick={this.saveHoursTrainedToDatabase.bind(this)}>
              Save changes to hours trained
            </Button>
          ) : null}
        </div>
        <div>
          <h3>Hours trained this year</h3>
          <span>{this.state.hoursTrainedThisYear}</span>
        </div>
        <div>
          <h3>Hours trained last month</h3>
          <span>{this.state.hoursTrainedLastMonth}</span>
        </div>
        <div>
          <h3>Hours trained last year</h3>
          <span>{this.state.hoursTrainedLastYear}</span>
        </div>
      </ProgressWrapper>
    );
  }
}

export default Progress;
