import LoginStatus from "./LoginStatus";
import React from "react";

class TitleBar extends React.Component {


  render() {
    return (
    <div id="titleBarDiv">

        <a id="NJ" href="/"> NeuralJuice </a>
        <div id="titleLinksDiv">
        <a id="menuLinksFirst" href="/welcome"> WELCOME </a>
        <a className="menuLinks" href="/answer"> ANSWER </a>
        <a className="menuLinks" href="/ask"> ASK </a>
        <a className="menuLinks" href="/network"> NETWORK </a>
        <a className="menuLinks" href="/me"> ME </a>
        </div>
        <LoginStatus showSignIn={this.props.showSignIn} signUpCreate={this.props.signUpCreate} />

    </div>

    );
  }
}

export default TitleBar;