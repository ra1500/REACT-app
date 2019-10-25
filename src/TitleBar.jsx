import LoginStatus2 from "./LoginStatus2";
import React from "react";

class TitleBar extends React.Component {

  //constructor(props) {
  //  super(props);
  //}

  render() {
    return (
    <div>
        <a id="NJ" href="/"> NeuralJuice </a>
        <div id="LoginStatus"> <LoginStatus2 /> </div>
    </div>

    );
  }
}

export default TitleBar;