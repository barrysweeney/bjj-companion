import React, { Component } from "react";
import { Button } from "./components/Button";
import { BACKEND_URI } from "./App";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signingUp: false,
    };
  }

  async submitHandler(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const body = {};
    body.username = username;
    body.password = password;
    const response = await fetch(`${BACKEND_URI}/log-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.status === 200) {
      const token = await response.text();
      localStorage.setItem("auth-token", token);
      // re-render the App component, setting it's state to authenticated:true
      this.props.setAuthenticated(username);
    }
  }

  startSignUp() {
    this.setState({ signingUp: true });
    this.render();
  }

  async signupHandler(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const body = {};
    body.username = username;
    body.password = password;
    const response = await fetch(`${BACKEND_URI}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.status === 201) {
      this.setState({ signingUp: false });
      this.render();
    }
  }

  render() {
    return (
      <div>
        {this.state.signingUp ? (
          <div>
            <form
              action="#"
              onSubmit={this.signupHandler.bind(this)}
              style={{ fontWeight: 600 }}
            >
              <label htmlFor="username">New Username</label>
              <br />
              <input type="text" name="username" />
              <br />
              <label htmlFor="password">New Password</label>
              <br />
              <input type="password" name="password" />
              <br />
              <Button>Sign Up</Button>
            </form>
          </div>
        ) : (
          <div>
            <form
              action="#"
              onSubmit={this.submitHandler.bind(this)}
              style={{ fontWeight: 600 }}
            >
              <label htmlFor="username">Username</label>
              <br />
              <input type="text" name="username" />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input type="password" name="password" />
              <br />
              <Button>Log in</Button>
            </form>
            <p>Don't have an account?</p>
            <Button onClick={this.startSignUp.bind(this)}>Sign up</Button>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
