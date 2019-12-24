import React from "react";
import QuestionSetSelector from "./QuestionSetSelector";
import TitleBar from "./TitleBar";
import { AuthContext } from "./context/auth";

function Answer(props) {

  return (
    <React.Fragment>
    <div>
      <TitleBar />
      <QuestionSetSelector />
    </div>
    </React.Fragment>
  );
}

export default Answer;