import React, { Component } from "react";
import "./App.css";
import Progress from "./Progress";
import { Notes } from "./Notes";
import Gameplan from "./Gameplan";
import Layout from "./components/layout";
import Login from "./login";

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
          <div>
            <Progress />
            <Gameplan username={this.state.username} />
            <Notes />
          </div>
        ) : (
          <Login setAuthenticated={this.setAuthenticated.bind(this)} />
        )}
      </Layout>
    );
  }
}

export default App;
