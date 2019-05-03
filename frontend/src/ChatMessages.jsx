import React, { Component } from "react";
import { connect } from "react-redux";
let mapStateToprops = st => {
  return { messages: st.msgs };
};
class UnconnectedChatMessages extends Component {
  componentDidMount() {
    let updater = () => {
      fetch("http://localhost:4000/messages")
        .then(response => response.text())
        .then(responseBody => {
          let parsed = JSON.parse(responseBody);
          console.log("parsed", parsed);
          this.props.dispatch({ type: "set-messages", messages: parsed });
        });
    };
    setInterval(updater, 500);
  }
  render = () => {
    let msgToElement = elem => {
      return (
        <li>
          {elem.username}:{elem.message}
        </li>
      );
    };
    return (
      <div>
        <ul>{this.props.messages.map(msgToElement)}</ul>
      </div>
    );
  };
}
let ChatMessages = connect(mapStateToprops)(UnconnectedChatMessages);
export default ChatMessages;
