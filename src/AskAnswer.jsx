import React from "react";
import QuestionSetSelectorPrivate from "./QuestionSetSelectorPrivate";
import TitleBar from "./TitleBar";

function AskAnswer(props) {

  return (
    <React.Fragment>
    <div>
      <TitleBar />
      <QuestionSetSelectorPrivate />
    </div>
    </React.Fragment>
  );
}

export default AskAnswer;