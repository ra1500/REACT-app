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

        <a id="menuLinks1" href="/start"> Welcome </a>
        <a className="menuLinks" href="/score"> Score </a>
        <a className="menuLinks" href="/askanswer"> Pose </a>
        <a className="menuLinks" href="/network"> Network </a>
        <a className="menuLinks" href="/profile"> Ego </a>

        <div id="LoginStatus"> <LoginStatus /> </div>

    </div>

    );
  }
}

export default TitleBar;