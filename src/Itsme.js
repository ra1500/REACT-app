import React from "react";
import { Button } from "./components/AuthForms";
import { useAuth } from "./context/auth";
import { Redirect } from "react-router-dom";
import QuestionIssuer from "./QuestionIssuer";
import TitleBar from "./TitleBar";

function Itsme(props) {
  const { setAuthTokens } = useAuth();

  return (
    <React.Fragment>
    <div>
      <TitleBar />
      <QuestionIssuer />
    </div>
    </React.Fragment>
  );
}

export default Itsme;