//import React, { useState } from "react";
import { useAuth } from "./context/auth";

function Logout(props) {
   const { setAuthTokens } = useAuth();
   setAuthTokens();

  function logOut() {
    setAuthTokens();
    sessionStorage.clear();
  }
  return (null);

}

export default Logout;