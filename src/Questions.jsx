import React from "react";
import UserTotalScore from "./UserTotalScore";
import axios from 'axios';
import AnswerSelection from "./AnswerSelection";


class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.postAnswer = this.postAnswer.bind(this);
    this.previous = this.previous.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      questionSetVersion: 1,
      question: null,
      selection: null,
      answerPoints: null,
      answer1: null,
      answer2: null,
      answer3: null,
      answer4: null,
      answer5: null,
      answer6: null,
      answer1Points: null,
      answer2Points: null,
      answer3Points: null,
      answer4Points: null,
      answer5Points: null,
      answer6Points: null,
      userScore: 0,
      currentQuestion: this.props.questionToGoTo, // initiated from parent
      jumpQuestion: null, // used for separate get for jumpTo
      allDeletedMessage: null,
    };
  }

  componentDidMount() {
    this.getQuestion();
    this.getUserScore();
  }

  getQuestion() {
    if (this.state.currentQuestion <= this.props.questionSetSize ) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/q/" + this.state.currentQuestion,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            question: response.data.question,
            answer1: response.data.answer1,
            answer2: response.data.answer2,
            answer3: response.data.answer3,
            answer4: response.data.answer4,
            answer5: response.data.answer5,
            answer6: response.data.answer6,
            answer1Points: response.data.answer1Points,
            answer2Points: response.data.answer2Points,
            answer3Points: response.data.answer3Points,
            answer4Points: response.data.answer4Points,
            answer5Points: response.data.answer5Points,
            answer6Points: response.data.answer6Points,
            selection: "(select one)",
            answerPoints: 0,
          });
          this.getUserAnswer(); // get userAnswer if user had already answered previously.
               }).catch(error => {this.setState({ isLoaded: true, error});
               });

    } else {
          this.setState({answer1: null, selection: null}); //TODO: make all state variables null
            };
    }

  getQuestion2() {
    if (this.state.jumpQuestion != null && this.state.jumpQuestion <= this.props.questionSetSize ) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/q/" + this.state.jumpQuestion,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            question: response.data.question,
            answer1: response.data.answer1,
            answer2: response.data.answer2,
            answer3: response.data.answer3,
            answer4: response.data.answer4,
            answer5: response.data.answer5,
            answer6: response.data.answer6,
            answer1Points: response.data.answer1Points,
            answer2Points: response.data.answer2Points,
            answer3Points: response.data.answer3Points,
            answer4Points: response.data.answer4Points,
            answer5Points: response.data.answer5Points,
            answer6Points: response.data.answer6Points,
            selection: "(select one)",
            answerPoints: 0,
          });
          this.getUserAnswer(); // get userAnswer if user had already answered previously.
               }).catch(error => {this.setState({ isLoaded: true, error});
               });

    } else {
          //this.setState({answer1: null, selection: null}); //TODO: make all state variables null
            };
    }

    postAnswer() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { questionId: this.state.currentQuestion, answer: this.state.selection, questionSetVersion: this.state.questionSetVersion, answerPoints: this.state.answerPoints };
        axios.post("http://localhost:8080/a",
        data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.getUserScore(); // update downstream state after successful AJAX call!
        this.goToNextQuestion(); // serve up the next question
        this.setState({isLoaded: true, allDeletedMessage: "",
          });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

  getUserScore() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/us/",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            userScore: response.data.userScore,
          });
               }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
               });
    }

    getUserAnswer() {
       const name = JSON.parse(sessionStorage.getItem('tokens'));
       const u = name.userName;
       const p = name.password;
       const token = u +':' + p;
       const hash = btoa(token);
       const Basic = 'Basic ' + hash;
       axios.get("http://localhost:8080/a/" + this.state.currentQuestion + "/" + this.state.questionSetVersion,
       {headers : { 'Authorization' : Basic }})
       .then((response) => {
         if (response.data.answer) {
         this.setState({
           isLoaded: true,
           selection: response.data.answer,
           answerPoints: response.data.answerPoints,
         });
         } // end if
              }).catch(error => {this.setState({ isLoaded: true, error,});
              });
    }
//////////////////////////////////////////////////////////////////////////////
  goToNextQuestion(){
    this.setState({currentQuestion: ++this.state.currentQuestion});
    this.getQuestion();
  }

  handleChange(event) {
    this.setState({jumpQuestion: event.target.value});
  }
  handleSubmit(event) {
    let lock = this.state.jumpQuestion; // this is magic #1
    if (lock != null ) {
    this.setState({currentQuestion: lock}); // this is magic #2
    this.getQuestion2(); // magic #3: needs a separate method in order to use jumpQuestion immediately instead of waiting to listen for it in setState. if i setState of currentQuestion be equal to the jumpQuestion in the input text box itself, you'd have immediate re-rendering for every typed number in the box.
    event.preventDefault();
    }
  }
////////////////////////////////////////////////////////////////////////////////
   verifyDelete() {
    if (window.confirm('Are you sure you want to delete all\nyour answers to this question set?')) {
    this.deleteAllAnswers();
    this.setState({allDeletedMessage: "answers deleted"});
    }

   }
   deleteAllAnswers() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u + ':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    const data = {questionSetVersion: this.state.questionSetVersion};
    axios.post("http://localhost:8080/a/del",
    data,
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
    this.getUserScore();
    this.setState({currentQuestion: 1}); // qc this
    this.getQuestion();     // qc this
    this.setState({isLoaded: true,
      });
           }).catch(error => {this.setState({ isLoaded: true, error});
           });
   } // end of deleteAllAnswers

  previous(){
    if (this.state.currentQuestion > 1) {
    this.setState({currentQuestion: --this.state.currentQuestion});
    this.getQuestion();
    }
  }

  // no answer button
  noAnswer() {
    this.setState({selection: "no answer", answerPoints: 0});
  }

  render() {
    let { error, isLoaded, question, userScore, selection, answerPoints, answer1, answer2, answer3, answer4, answer5,
     answer6, answer1Points, answer2Points, answer3Points, answer4Points, answer5Points, answer6Points, allDeletedMessage} = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
    if (this.state.currentQuestion <= this.props.questionSetSize) {
      return (
        <React.Fragment >
            <div id="question">
            <p id="qText1"> #{this.state.currentQuestion} of {this.props.questionSetSize}</p><p id="qText2">1,000 points maximum</p>
            <p className="qtext"> {question} </p>
            <AnswerSelection answer={answer1} onClick={() => this.setState({selection: this.state.answer1, answerPoints: answer1Points})}> {answer1} </AnswerSelection>
            <AnswerSelection answer={answer2} onClick={() => this.setState({selection: this.state.answer2, answerPoints: answer2Points})}> {answer2} </AnswerSelection>
            <AnswerSelection answer={answer3} onClick={() => this.setState({selection: this.state.answer3, answerPoints: answer3Points})}> {answer3} </AnswerSelection>
            <AnswerSelection answer={answer4} onClick={() => this.setState({selection: this.state.answer4, answerPoints: answer4Points})}> {answer4} </AnswerSelection>
            <AnswerSelection answer={answer5} onClick={() => this.setState({selection: this.state.answer5, answerPoints: answer5Points})}> {answer5} </AnswerSelection>
            <AnswerSelection answer={answer6} onClick={() => this.setState({selection: this.state.answer6, answerPoints: answer6Points})}> {answer6} </AnswerSelection>
            <button id="noAnswerButton" onClick={() => this.noAnswer()}>No Answer</button>
            <p id="qtext2"> Answer: {selection} </p>
            <p className="qtext"> Points: {answerPoints} </p>
            <button className="qsbutton" onClick={() => this.verifyDelete()}>Delete all my answers</button>
            <form id="nextQuestionForm" onSubmit={this.handleSubmit}>
              <input className="qsbutton" type="submit" value="Go to question #" />
              <input id="inputQuestionNumberBox" type="number" onChange={this.handleChange} max={this.props.questionSetSize} min="1" maxlength="2" step="1" autoComplete="off" />
            </form>
            <button className="qsbutton" onClick={this.previous}>  Previous </button>
            <button className="qsbutton" onClick={this.postAnswer}>  Submit </button>
            <p id="deletedAnswersMessage">{this.state.allDeletedMessage}</p>
            </div>
            <UserTotalScore userScore={userScore}/>
        </React.Fragment>
      );
     } else {
       return (
         <React.Fragment>
             <p className="qtext">  SCORING COMPLETED </p>
            <button className="qsbutton" onClick={() => this.verifyDelete()}>Delete all my answers</button>
            <form id="nextQuestionForm" onSubmit={this.handleSubmit}>
              <input className="qsbutton" type="submit" value="Go to question #" />
              <input id="inputQuestionNumberBox" type="number" onChange={this.handleChange} max={this.props.questionSetSize} min="1" maxlength="2" step="1" autoComplete="off" />
            </form>
            <button className="qsbutton" onClick={this.previous}>  Previous </button>
            <button className="qsbutton" onClick={this.postAnswer}>  Submit </button>
            <p id="deletedAnswersMessage">{this.state.allDeletedMessage}</p>
             <UserTotalScore userScore={userScore}/>
         </React.Fragment>
       );
            }; //end else statement
    }
  }
}

export default Questions;
