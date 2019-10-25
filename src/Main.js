import React from "react";
import QuestionIssuer from "./QuestionIssuer";
import TitleBar from "./TitleBar";
import Network from "./Network";

function Main(props) {

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