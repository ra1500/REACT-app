import React from "react";
import Question from "./Question";

class QuestionIssuer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          questionSetSize: 10000, // this value doesnt matter. just make it not null.
        };
    };

  componentDidMount() {
    this.getMaxQtyQuestions();
  }

  getMaxQtyQuestions() {
    fetch("http://localhost:8080/max")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            questionSetSize: result.maxQtyQuestions,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
    }

   render() {

   const { questionSetSize } = this.state;
    return (
        <React.Fragment>
            <Question questionSetSize={questionSetSize} />
        </React.Fragment>
    );
   }
}

export default QuestionIssuer;