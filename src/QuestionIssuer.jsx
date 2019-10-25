import React from "react";
import Question from "./Question";

class QuestionIssuer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.askNextQuestion = this.askNextQuestion.bind(this); // has to be 'binded' in order for child to change state in parent.
    this.state = {
          questionSetSize: 10000, // this value doesnt matter. just make it not null.
          questionToGoTo: 1,
          questionNumber: 1,
          next: 1,
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
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
    }

  handleChange(event) {
    this.setState({questionNumber: event.target.value});
  }
  handleSubmit(event) {
    this.setState({questionToGoTo: this.state.questionNumber}); //
    this.state = {questionToGoTo: this.state.questionNumber};
    //console.log(this.state.questionToGoTo + " jump to");
    event.preventDefault();
  }

   askNextQuestion() {
        this.setState({questionToGoTo: this.state.questionToGoTo});
        this.state = {questionToGoTo: this.state.questionToGoTo+1};
        //this.setState({next: this.state.next});
        this.state = {next: this.state.next};
        console.log(this.state.next + " 1st next parent");
        console.log(this.state.questionToGoTo + " 1st goto parent");
   }

   render() {
   //console.log(this.state.questionToGoTo + " parent if questionToGoTo");
   //console.log(this.state.next + " parent if next");
   if (true){
    return (
        <React.Fragment>
            <form onSubmit={this.handleSubmit}>
              <input type="number" onChange={this.handleChange} max={this.state.questionSetSize} min="1" maxLength="2" step="1" autoComplete="off" />
              <input className="qsbutton" type="submit" value="Jump to Question" />
            </form>
            <Question questionSetSize={this.state.questionSetSize} questionToGoTo={this.state.questionToGoTo} askNextQuestion={this.askNextQuestion}/>
        </React.Fragment>
    ); // end return
    } // end if

    else {
        return (
        <React.Fragment>
            <p> ffffffffff </p>
            <form onSubmit={this.handleSubmit}>
              <input type="number" onChange={this.handleChange} max={this.state.questionSetSize} min="1" maxLength="2" step="1" autoComplete="off" />
              <input className="qsbutton" type="submit" value="Jump to Question" />
            </form>
            <Question questionSetSize={this.state.questionSetSize} questionToGoTo={this.state.questionToGoTo} askNextQuestion={this.askNextQuestion}/>
        </React.Fragment>
        ); // end return
        // make them equal here!!!!!
    } // end else

   }
}

export default QuestionIssuer;