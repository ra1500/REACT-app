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
          userName: JSON.parse(sessionStorage.getItem('tokens')).userName,
          name: null,
          goHome: "/",
          //authTokens: null,
        };
  }

    componentDidMount() {
    }

  logOut() {
    //console.log()
    this.setState({authTokens: null}); // TODO: ensure this is actually loging out context state
    sessionStorage.clear();
    return <Redirect to={this.state.goHome} />;
  }


  render() {

    if (this.state.userName == null) {
    return (
    <Introduction />
    );
    } // end if

    else {
    return (
    <React.Fragment>
        <div>
            <button id="logoutButton" onClick={() => this.logOut()}>Log out</button>
            <p id="userName"> {this.state.userName}  </p>
        </div>
    </React.Fragment>
    );
    } // end else

   }

  }

export default LoginStatus;