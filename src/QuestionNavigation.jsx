import React from "react";
import QuestionIssuer from "./QuestionIssuer";


class QuestionNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
        questionToGoTo: null,
        gogo: 1,
        gogo2: null,
        };
    }

  handleChange(event) {
    this.setState({questionToGoTo: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({gogo: this.state.questionToGoTo});
    console.log(this.state.gogo + " A");
  }

  render() {
    console.log(this.state.gogo + " B");
    if (this.state.gogo == 1) {
    return (
    <React.Fragment>
    <div>{this.state.gogo}</div>
    <div>
      <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.questionToGoTo} onChange={this.handleChange} max="99" min="1" maxLength="2" step="1" autoComplete="off" />
          <input className="qsbutton" type="submit" value="Jump to Question" />
      </form>
    </div>
    <QuestionIssuer questionToGoTo={this.state.gogo}/>
    </React.Fragment>
    );
    } // end of if

    else {
    this.state = {gogo2: this.state.gogo};
    console.log(this.state.gogo2 + " holy shit,  gogo2");

    return (
    <React.Fragment>
    <div>{this.state.gogo2}</div>
    <div>
      <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.questionToGoTo} onChange={this.handleChange} max="99" min="1" maxLength="2" step="1" autoComplete="off" />
          <input className="qsbutton" type="submit" value="Jump to Question" />
      </form>
    </div>
    <QuestionIssuer questionToGoTo={this.state.gogo2}/>
    </React.Fragment>
    );
    } // end else
  } // end render
}

export default QuestionNavigation;