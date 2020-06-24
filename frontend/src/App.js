import React, { Component } from "react";
import "./App.css";
import Progress from "./Progress";
import { Notes } from "./Notes";
import Gameplan from "./Gameplan";
import Layout from "./components/layout";
import Login from "./login";
import styled from "styled-components";
import "./index.css";

export const BACKEND_URI = process.env.BACKEND_URI || "http://localhost:9000";

const ContentWrapper = styled.div`
  display: grid;
  grid-gap: 50px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      username: null,
    };
  }

  setAuthenticated(username) {
    this.setState({ authenticated: true, username: username });
  }

  render() {
    return (
      <Layout>
        {this.state.authenticated ? (
          <ContentWrapper>
            <span style={{ fontWeight: 600, fontSize: `2rem` }}>
              {this.state.username}
            </span>

            <Progress />
            <Gameplan />
            <Notes />
          </ContentWrapper>
        ) : (
          <Login setAuthenticated={this.setAuthenticated.bind(this)} />
        )}
      </Layout>
    );
  }
}

export default App;
