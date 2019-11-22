import React from "react";
import { AuthContext } from "./context/auth";
import { useAuth } from "./context/auth";
import Introduction from "./Introduction";
import { Redirect } from "react-router-dom";

class LoginStatus extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
          error: null,
          isLoaded: false,
          userName: "",
          name: null,
          goHome: "/",
          redirect: false,
          logStatus: "Sign in",
          showSignUpLink: true,
          showUserName: false,
        };
  }

    componentDidMount() {
        if ( window.sessionStorage.length === 0 ) {   // TODO check state instead? Context?
            this.setState({userName: "(easy sign up)"});
        }
        else {
         this.setState({ userName: JSON.parse(sessionStorage.getItem('tokens')).userName });
         this.setState({logStatus: "Log out"});
         this.setState({showUserName: true, showSignUpLink: false});
        }
    }

  logOut() {
    if ( window.sessionStorage.length === 0 ) {
    this.props.showSignIn(); }
    else {
    this.setState({authTokens: null}); // TODO: ensure this is actually logging out context state
    sessionStorage.clear();
    this.setState({redirect: true});
    this.setState({showUserName: false, showSignUpLink: true});
    this.setState({logStatus: "Sign in"});
    }
  }


  render() {

    return (
    <React.Fragment>
        <div>
            <button id="logoutButton" onClick={() => this.logOut()}>{this.state.logStatus}</button>
            {this.state.showUserName &&
            <p id="userName"> {this.state.userName}  </p> }
            {this.state.showSignUpLink &&
            <button id="easySignUpButton" onClick={() => this.props.signUpCreate()}>(easy sign up)</button> }
        </div>

    {this.state.redirect &&
    <Redirect to={this.state.goHome} /> }

    </React.Fragment>
    );
   }

  }

export default LoginStatus;