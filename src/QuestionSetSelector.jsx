import React from "react";
import Questions from "./Questions";

class QuestionSetSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          questionSetSize: 10000, // this value doesnt matter. just make it not null.
          questionToGoTo: 1,
        };
    };

  componentDidMount() {
    this.getMaxQtyQuestions();
  }

  getMaxQtyQuestions() {
    fetch("http://localhost:8080/max")
      .then(res => res.json())
      .then((result) => {
          this.setState({
            isLoaded: true,
            questionSetSize: result.maxQtyQuestions,
          });
        },
        (error) => {
          this.setState({isLoaded: true,error,
          });
        }
      )
    }

   render() {
    return (
        <React.Fragment>
            <Questions questionSetSize={this.state.questionSetSize} questionToGoTo={this.state.questionToGoTo}/>
        </React.Fragment>
    ); // end return
   }
}

export default QuestionSetSelector;