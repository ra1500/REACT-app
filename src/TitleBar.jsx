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
        <a className="menuLinks" href="/welcome"> Welcome </a>
        <a className="menuLinks" href="/score"> Score </a>
        <a className="menuLinks" href="/askanswer"> Pose </a>
        <a className="menuLinks" href="/network"> Network </a>
        <a className="menuLinks" href="/profile"> Ego </a>
        </div>

        <div id="LoginStatus">
        <LoginStatus showSignIn={this.props.showSignIn} signUpCreate={this.props.signUpCreate} />
        </div>

    </div>

    );
  }
}

export default TitleBar;