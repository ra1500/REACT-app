import React from "react";
import QuestionSetSelector from "./QuestionSetSelector";
import TitleBar from "./TitleBar";
import Network from "./Network";

function Main(props) {

  return (
    <React.Fragment>
    <div>
      <TitleBar />
      <QuestionSetSelector />
      <Network />
    </div>
    </React.Fragment>
  );
}

export default Main;