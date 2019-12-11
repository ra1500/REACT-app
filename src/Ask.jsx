import React from "react";
//import QuestionSetSelectorPrivate from "./QuestionSetSelectorPrivate";
import TitleBar from "./TitleBar";
import AskFormQset from "./AskFormQset";

class Ask extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
          error: null,
          isLoaded: false,
        };
  }

    componentDidMount() {
    }

  render() {
    return (
        <React.Fragment>
        <div>
          <TitleBar />
          <AskFormQset />
        </div>
        </React.Fragment>
    );
  }
}

export default Ask;