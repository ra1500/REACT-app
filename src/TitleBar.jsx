import LoginStatus from "./LoginStatus";
import React from "react";

class TitleBar extends React.Component {

  //constructor(props) {
  //  super(props);
  //}

  render() {
    return (
    <div id="titleBar">
        <a id="NJ" href="/"> NeuralJuice </a>
        <a id="menuLinks1" href="/Main"> Scores </a>
        <a className="menuLinks" href="/askanswer"> Ask/Answer </a>
        <a className="menuLinks" href="/network"> Network </a>
        <a className="menuLinks" href="/profile"> Profile </a>
        <div id="LoginStatus"> <LoginStatus /> </div>
    </div>

    );
  }
}

export default TitleBar;