import React, { Component } from "react";
import "./App.css";
import { Progress } from "./Progress";
import { Notes } from "./Notes";
import { Gameplan } from "./Gameplan";
import Layout from "./components/layout";
import Login from "./login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
  }

  setAuthenticated() {
    this.setState({ authenticated: true });
  }

  render() {
    return (
      <Layout>
        {this.state.authenticated ? (
          <div>
            <Progress />
            <Notes />
            <Gameplan />
          </div>
        ) : (
          <Login setAuthenticated={this.setAuthenticated.bind(this)} />
        )}
      </Layout>
    );
  }
}

export default App;
