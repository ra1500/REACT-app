//import React from "react";
import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";

function PrivateRoute({ component: Component, ...rest }) {
  //const [authTokens, setAuthTokens] = useState();
  //setAuthTokens(JSON.parse(sessionStorage.getItem('tokens')));
  // { authTokens } = useAuth();


  const { authTokens } = useAuth();  // only line if normal

  //if (sessionStorage.getItem('tokens') !== undefined || sessionStorage.getItem('tokens') !== null) {
  //const [authTokens, setAuthTokens] = useState();
  //  setAuthTokens = true; }
  //else {const { authTokens } = useAuth(); }
  // set tokens here based on sessionStorage

  // JSON.parse(sessionStorage.getItem('tokens'));

  // const setTokens = (data) => {
    // sessionStorage.setItem("tokens", JSON.stringify(data));
    // setAuthTokens(data);
  //}

  return (
    <Route
      {...rest}
      render={props =>
        authTokens ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { referer: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;