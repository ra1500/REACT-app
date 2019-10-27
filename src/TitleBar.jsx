import LoginStatus from "./LoginStatus";
import React from "react";

class TitleBar extends React.Component {

  //constructor(props) {
  //  super(props);
  //}

  render() {
    return (
    <div>
        <a id="NJ" href="/"> NeuralJuice </a>
        <div id="LoginStatus"> <LoginStatus /> </div>
    </div>

    );
  }
}

export default TitleBar;