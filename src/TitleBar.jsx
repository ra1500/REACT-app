import React from "react";
import LoginStatus from "./LoginStatus";

class TitleBar extends React.Component {

  //constructor(props) {
  //  super(props);
  //}

  render() {
    return (
    <div>
        <p id="NJ">NeuralJuice</p>
        <div id="LoginStatus"> <LoginStatus /> </div>
    </div>

    );
  }
}

export default TitleBar;