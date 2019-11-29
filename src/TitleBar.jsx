import LoginStatus from "./LoginStatus";
import React from "react";

class TitleBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div id="titleBar">

        <a id="NJ" href="/"> NeuralJuice </a>
        <div id="titleLinks">
        <a className="menuLinks" href="/welcome"> WELCOME </a>
        <a className="menuLinks" href="/score"> ANSWER </a>
        <a className="menuLinks" href="/askanswer"> ASK </a>
        <a className="menuLinks" href="/network"> NETWORK </a>
        <a className="menuLinks" href="/profile"> ME </a>
        </div>

        <div id="LoginStatus">
        <LoginStatus showSignIn={this.props.showSignIn} signUpCreate={this.props.signUpCreate} />
        </div>

    </div>

    );
  }
}

export default TitleBar;