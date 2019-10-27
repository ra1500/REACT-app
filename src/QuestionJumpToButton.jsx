// THIS NOT USED ANYWHERE. DELETE.....

import React from "react";

class QuestionJumpToButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.askNextQuestion = this.askNextQuestion.bind(this); // has to be 'binded' in order for child to change state in parent.
    this.state = {
          questionToGoTo: 1,
          questionNumber: 0,
        };
    };

  handleChange(event) {
    this.setState({questionNumber: event.target.value});
  }
  handleSubmit(event) {
    this.setState({questionToGoTo: this.state.questionNumber});
    this.state = {questionToGoTo: this.state.questionNumber}; // gotta have this!
    //console.log(this.state.questionToGoTo + " 2nd");
    this.props.askNextQuestion(); //
    event.preventDefault();
  }



  render() {
    return (
        <React.Fragment>
            <form onSubmit={this.handleSubmit}>
              <input type="number" onChange={this.handleChange} min="1" maxLength="2" step="1" autoComplete="off" />
              <input className="qsbutton" type="submit" value="Jump to Question" />
            </form>
        </React.Fragment>
    ); // end return
  } // end render
} // end class

export default QuestionJumpToButton;