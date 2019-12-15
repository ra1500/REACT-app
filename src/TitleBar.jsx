import LoginStatus from "./LoginStatus";
import React from "react";
import { Link } from 'react-router-dom'

class TitleBar extends React.Component {


  render() {
    return (
    <div id="titleBarDiv">

        <Link onClick={this.props.showIntroStuff} id="NJ" to="/"> NeuralJuice </Link>
        <div id="titleLinksDiv">
        <Link id="menuLinksFirst" to="/welcome"> WELCOME </Link>
        <Link className="menuLinks" to="/answer"> ANSWER </Link>
        <Link className="menuLinks" to="/ask"> ASK </Link>
        <Link className="menuLinks" to="/network"> NETWORK </Link>
        <Link className="menuLinks" to="/me"> ME </Link>
        </div>
        <LoginStatus showSignIn={this.props.showSignIn} signUpCreate={this.props.signUpCreate} />

    </div>

    );
  }
}

export default TitleBar;