import React from "react";
//import { AuthContext } from "./context/auth";
import { useAuth } from "./context/auth";
import Login from "./pages/Login";
import { Redirect } from "react-router-dom";

function LoginStatus(props) {
    //const [isLoggedIn, setLoggedIn] = useState(false);
    //const referer = "/score";
    let userName = null;
    let name = null;

    if (sessionStorage.getItem('tokens') != null) {
        name = JSON.parse(sessionStorage.getItem('tokens'));}
    else {name = null};
    if (name == null) { userName = null}
    else { userName = name.userName};
    const { setAuthTokens } = useAuth();

  function logOut() {
    const goHome = "/   ";
    //const goLogin = "/";
    setAuthTokens();
    sessionStorage.clear();
    //window.location.replace(goHome);
    return <Redirect to={goHome} />;  //TODO: should go home and not login page
  }

    if (userName == null) {
    return (
    <Login />
    );}

    else {
    return (
    <div>
    <button id="logoutButton" onClick={() => logOut()}>Log out</button>
    <p id="userName"> {userName}  </p>
    </div>
    );}
  }


export default LoginStatus;