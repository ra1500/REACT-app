import React from "react";
import { Redirect } from "react-router-dom";
import Logout from "./Logout";

class LoginStatus extends React.Component {
  constructor(props) {
    super(props);
    //LoginStatus.contextType = Context;
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
          value: null,
          goToLogout: false,
        };
  }

    componentDidMount() {
        //let value = this.context;
        //console.log(this.context + " context");
        console.log(sessionStorage.getItem('tokens'));
        if ( sessionStorage.getItem('tokens') === "undefined" || sessionStorage.getItem('tokens') === null ) {   // TODO check state instead? Context?
            this.setState({userName: "(easy sign up)"});
        }
        else {
         this.setState({ userName: JSON.parse(sessionStorage.getItem('tokens')).userName });
         this.setState({logStatus: "Log out"});
         this.setState({showUserName: true, showSignUpLink: false});
        }
    }


  logOut() {
    if ( sessionStorage.getItem('tokens') === "undefined" || sessionStorage.getItem('tokens') === null ) {
    this.props.showSignIn(); }
    else {
    sessionStorage.clear();
    this.setState({goToLogout: true});
    this.setState({redirect: true});
    this.setState({showUserName: false, showSignUpLink: true});
    this.setState({logStatus: "Sign in"});
    }
  }


  render() {

    return (
    <React.Fragment>
           <div id="loginStatusDiv">
            <button id="logoutButton" onClick={() => this.logOut()}>{this.state.logStatus}</button>
            {this.state.showUserName &&
            <p id="userName"> {this.state.userName}  </p> }
            {this.state.showSignUpLink &&
            <button id="easySignUpButton" onClick={() => this.props.signUpCreate()}>(easy sign up)</button> }
           </div>
    {this.state.redirect &&
    <Redirect to={this.state.goHome} /> }

    {this.state.goToLogout &&
    <Logout /> }

    </React.Fragment>
    );
   }

  }

export default LoginStatus;