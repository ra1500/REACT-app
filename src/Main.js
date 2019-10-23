import React from "react";
import { Button } from "./components/AuthForms";
import { useAuth } from "./context/auth";
import { Redirect } from "react-router-dom";
import QuestionIssuer from "./QuestionIssuer";
import TitleBar from "./TitleBar";
import Network from "./Network";

function Main(props) {
  const { setAuthTokens } = useAuth();

  return (
    <React.Fragment>
    <div>
      <TitleBar />
      <QuestionIssuer />
      <Network />
    </div>
    </React.Fragment>
  );
}

export default Main;