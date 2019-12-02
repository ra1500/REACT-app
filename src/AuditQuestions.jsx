import React from "react";
import axios from 'axios';
import AnswerSelection from "./AnswerSelection";
import UserTotalScore from "./UserTotalScore";

class AuditQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.postAnswer = this.postAnswer.bind(this);
    this.previous = this.previous.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          questionSetVersionEntityId: this.props.questionSetVersionEntityId,
          title: null,
          category: null,
          description: null,
          version: null,
          friendId: this.props.friendId,
          friend: null,
          questionSetSize: null,
          maxPoints: null,
          currentQuestion: 1,
          selection: null,
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
          questionsEntityId: null,
          allDeletedMessage: null,
          jumpQuestion: null,
          userScore: 0,
          comments: null,
          auditPostedMessage: null,
        };
  }

    componentDidMount() {
        this.getMaxQtyAndPoints();
        this.getQuestionSetVersionEntity();
        this.getUserScore();
    }

  getMaxQtyAndPoints() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/qs/q?sn=" + this.state.questionSetVersionEntityId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            questionSetSize: response.data.maxQtyQuestions,
            maxPoints: response.data.maxPoints,
          });
          this.getQuestion(); //
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  getQuestion() {
    if (this.state.currentQuestion <= this.state.questionSetSize ) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/q/e/" + this.state.questionSetVersionEntityId + "/" + this.state.currentQuestion,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            question: response.data.question,
            questionsEntityId: response.data.id,
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
          this.getUserAnswer(); // get userAnswer
               }).catch(error => {this.setState({ isLoaded: true, error});
               });

    } else {
            };
    }

  getQuestion2() {
    if (this.state.jumpQuestion != null && this.state.jumpQuestion <= this.state.questionSetSize ) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/q/e/" + this.state.questionSetVersionEntityId + "/" + this.state.jumpQuestion,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            question: response.data.question,
            questionsEntityId: response.data.id,
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
          //
            };
    }

  getUserScore() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/a/z?sv=" + this.state.questionSetVersionEntityId + "&fId=" + this.props.friendId,
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
       axios.get("http://localhost:8080/a/b/" + this.state.questionsEntityId + "/" + this.props.friendId,
       {headers : { 'Authorization' : Basic }})
       .then((response) => {
         if (response.data.answer) {
         this.setState({
           isLoaded: true,
           selection: response.data.answer,
           answerPoints: response.data.answerPoints,
           friend: response.data.auditee,
           comments: response.data.comments,
         });
         } // end if
              }).catch(error => {this.setState({ isLoaded: true, error,});
              });
    }

    // TODO is this redundant? just get from useranswersentity via parent.
  getQuestionSetVersionEntity() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/qs/g?qsid=" + this.props.questionSetVersionEntityId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            category: response.data.category,
            description: response.data.description,
            title: response.data.title,
            version: response.data.version,
          });
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

    postAnswer() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { answer: this.state.selection,answerPoints: this.state.answerPoints, auditee: this.state.friend, comments: this.state.comments };
        axios.post("http://localhost:8080/a/r/" + this.state.questionsEntityId,
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

  sendAuditToAuditee() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { auditee: this.state.friend, score: this.state.userScore, };
        axios.post("http://localhost:8080/prm/sc/q?qsId=" + this.state.questionSetVersionEntityId,
        data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, auditPostedMessage: "Your audit has been posted to " + this.state.friend + "s account"
          });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

   deleteAllAnswers() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u + ':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    const data = {auditee: this.props.friend};
    axios.post("http://localhost:8080/a/del/" + this.state.questionSetVersionEntityId,
    data,
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
    this.props.goToAudit();
    this.setState({isLoaded: true,
      });
           }).catch(error => {this.setState({ isLoaded: true, error});
           });
   }

  goToNextQuestion(){
    this.setState({currentQuestion: ++this.state.currentQuestion});
    this.getQuestion();
  }
  handleChange(event) {
    this.setState({jumpQuestion: event.target.value});
  }
  handleChange2(event) {
    this.setState({comments: event.target.value});
  }
  handleSubmit(event) {
    let lock = this.state.jumpQuestion; // this is magic #1
    if (lock != null ) {
    this.setState({currentQuestion: lock}); // this is magic #2
    this.getQuestion2(); //
    event.preventDefault();
    }
  }
   verifyDelete() {
    if (window.confirm('Are you sure you want to delete all\nyour answers and delete the audit?')) {
    this.deleteAllAnswers();
    }
   }
  previous() {
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
    if (this.state.currentQuestion <= this.state.questionSetSize) {
      return (
        <React.Fragment >
            <div id="question">
            <p> {this.state.title}. {this.state.description}</p>
            <p id="qText1"> #{this.state.currentQuestion} of {this.state.questionSetSize}</p><p id="qText2"> {this.state.maxPoints} points maximum</p>
            <p className="qtext"> {this.state.question} </p>
            <AnswerSelection answer={this.state.answer1} onClick={() => this.setState({selection: this.state.answer1, answerPoints: this.state.answer1Points})}> {this.state.answer1} </AnswerSelection>
            <AnswerSelection answer={this.state.answer2} onClick={() => this.setState({selection: this.state.answer2, answerPoints: this.state.answer2Points})}> {this.state.answer2} </AnswerSelection>
            <AnswerSelection answer={this.state.answer3} onClick={() => this.setState({selection: this.state.answer3, answerPoints: this.state.answer3Points})}> {this.state.answer3} </AnswerSelection>
            <AnswerSelection answer={this.state.answer4} onClick={() => this.setState({selection: this.state.answer4, answerPoints: this.state.answer4Points})}> {this.state.answer4} </AnswerSelection>
            <AnswerSelection answer={this.state.answer5} onClick={() => this.setState({selection: this.state.answer5, answerPoints: this.state.answer5Points})}> {this.state.answer5} </AnswerSelection>
            <AnswerSelection answer={this.state.answer6} onClick={() => this.setState({selection: this.state.answer6, answerPoints: this.state.answer6Points})}> {this.state.answer6} </AnswerSelection>
            <button id="noAnswerButton" onClick={() => this.noAnswer()}>No Answer</button>
            <p id="qtext2"> Answer: {this.state.selection} </p>
            <p className="qtext"> Points: {this.state.answerPoints} </p>
              <input value={this.state.comments} placeholder="comments" type="text" onChange={this.handleChange2} maxlength="100" autoComplete="off" />
            <button className="qsbutton" onClick={() => this.verifyDelete()}>Delete all my answers</button>
            <form id="nextQuestionForm" onSubmit={this.handleSubmit}>
              <input className="qsbutton" type="submit" value="Go to question #" />
              <input id="inputQuestionNumberBox" type="number" onChange={this.handleChange} max={this.state.questionSetSize} min="1" maxLength="2" step="1" autoComplete="off" />
            </form>
            <button className="qsbutton" onClick={this.previous}>  Previous </button>
            <button className="qsbutton" onClick={this.postAnswer}>  Submit </button>
            </div>
            <UserTotalScore userScore={this.state.userScore}/>
        </React.Fragment>
      );
     } else {
       return (
         <React.Fragment>
             <p> {this.state.title} {this.state.description}</p>
             <p className="qtext">  AUDIT COMPLETED </p>
             <button id="addToProfileButton" onClick={() => this.sendAuditToAuditee()}>  Submit audited results to your contact </button>
            <button className="qsbutton" onClick={() => this.verifyDelete()}>Delete all my answers</button>
            <form id="nextQuestionForm" onSubmit={this.handleSubmit}>
              <input className="qsbutton" type="submit" value="Go to question #" />
              <input id="inputQuestionNumberBox" type="number" onChange={this.handleChange} max={this.state.questionSetSize} min="1" maxLength="2" step="1" autoComplete="off" />
            </form>
            <button className="qsbutton" onClick={this.previous}>  Previous </button>
            <p id="deletedAnswersMessage">{this.state.auditPostedMessage}</p>
             <UserTotalScore userScore={this.state.userScore}/>
         </React.Fragment>
       );
            }; //end else statement
  }
}

export default AuditQuestions;