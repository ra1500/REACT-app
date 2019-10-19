import React from "react"
//import { AuthContext } from "./context/auth";
import { useAuth } from "./context/auth";
import Login from "./pages/Login";
import { Link, Redirect } from "react-router-dom";

function LoginStatus(props) {
    let userName = null;
    let name = null;

    if (sessionStorage.getItem('tokens') != null) {
        name = JSON.parse(sessionStorage.getItem('tokens'));}
    else {name = null};
    if (name == null) { userName = null}
    else { userName = name.userName};
    const { setAuthTokens } = useAuth();

  function logIn() {
  }

  function logOut() {
    const goHome = "/";
    setAuthTokens();
    sessionStorage.clear();
    return <Redirect to={goHome} />;  //TODO: should go home and not login page
  }

    if (userName == null) {
    return (
    <div><Link to="/login">Login</Link> </div>
    );}

    else {
    return (
    <div><p id="userName"> {userName}  </p> <button id="logoutButton" onClick={() => logOut()}>Log out</button>  </div>
    );}
  }



export default LoginStatus;