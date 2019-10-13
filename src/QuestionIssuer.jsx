import React from "react";
import Question from "./Question";

class QuestionIssuer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          questionSetSize: 2, // TO DO: pull from db with a get to find MAX of gid in QuestionsEntity
        };
    };

   render() {
   const { questionSetSize } = this.state;
    return (
        <React.Fragment>
            <Question questionSetSize={questionSetSize}/>
        </React.Fragment>
    );
   }
}

export default QuestionIssuer;