import React, { Component } from "react";
class ChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }
  handleMessage = event => {
    this.setState({ message: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("msg", this.state.message);
    fetch("http://localhost:4000/newmessages", {
      method: "POST",
      body: data,
      credentials: "include"
    });
  };
  render = () => {
    console.log(this.state.message);
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleMessage} />
        <input type="submit" />
      </form>
    );
  };
}
export default ChatForm;
