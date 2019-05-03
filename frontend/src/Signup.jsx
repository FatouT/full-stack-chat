import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  handleUsername = event => {
    this.setState({ username: event.target.value });
  };
  handlePassword = event => {
    this.setState({ password: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    fetch("http://localhost:4000/signup", { method: "POST", body: data });
  };
  render = () => {
    return (
      <div>
        <h3> Signup!</h3>
        <form onSubmit={this.handleSubmit}>
          Username
          <input type="text" onChange={this.handleUsername} />
          Password
          <input type="text" onChange={this.handlePassword} />
          <input type="submit" />
        </form>
      </div>
    );
  };
}
let Signup = connect()(UnconnectedSignup);
export default Signup;
