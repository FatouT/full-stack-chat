import { connect } from "react-redux";
import React, { Component } from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import ChatForm from "./ChatForm.jsx";
import ChatMessages from "./ChatMessages.jsx";
let mapStateToProps = st => {
  return { lgin: st.loggedIn };
};
class UnconnectedApp extends Component {
  render = () => {
    if (this.props.lgin) {
      return (
        <div>
          <ChatForm />
          <ChatMessages />
        </div>
      );
    }
    return (
      <div>
        <Signup />
        <Login />
      </div>
    );
  };
}
let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
