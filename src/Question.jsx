import React from "react";
import UserTotalScore from "./UserTotalScore";
import axios from 'axios';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.postAnswer = this.postAnswer.bind(this);
    this.getUserScore = this.getUserScore.bind(this);
    //this.renderNextQuestion = this.renderNextQuestion.bind(this);

    this.state = {
      error: null,
      isLoaded: false,
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
      currentQuestion: 0, //gid in QuestionsEntity for JPA get/fetch
      //userScore: null,
      userId: 99,
    };
  }

  componentDidMount() {
    this.renderNextQuestion();
  }

  renderNextQuestion() {
    this.state = {currentQuestion: this.state.currentQuestion+1};
    this.setState({currentQuestion: this.state.currentQuestion});
    this.setState({selection: this.state.selection, answerPoints: this.state.answerPoints});

    if (this.state.currentQuestion <= this.props.questionSetSize) {
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
          });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });

    } else {
          this.setState({answer1: null, selection: null}); //TODO: make all state variables null
            };
    }


  postAnswer() {
    // TODO: if selection is null skip, else do POST
    // TODO: handle exceptions
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/a", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify( { questionId: this.state.currentQuestion, userId: 99, answer: this.state.selection, questionSetVersion: 1, answerPoints: this.state.answerPoints }));
    // TODO if successful go to next question and refresh/get UserScore
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        //this.renderNextQuestion();
        //this.getUserScore();
        console.log('I was triggered');
        } };
    this.renderNextQuestion();
    //this.getUserScore();
  }

// not currently used. needs to be executed after succesful postAnswer(). need to change '99' to this.state.userId also
  getUserScore() {
        fetch("http://localhost:8080/us/99" )
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            userScore: result.userScore,
          });
        },
        // Note: it's important to handle errors here instead of a catch() block so that we don't swallow exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
            userScore: 0,
          });
        }
      )
    }

  render() {
    let { error, isLoaded, question, userScore } = this.state;
    let { selection, answerPoints, answer1, answer2, answer3, answer4, answer5, answer6, answer1Points, answer2Points, answer3Points,
        answer4Points, answer5Points, answer6Points,} = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

    if (this.state.currentQuestion <= this.props.questionSetSize) {

      return (
        <React.Fragment >
            <div id="question">
            <p className="qtext"> [you are on question #{this.state.currentQuestion} of {this.props.questionSetSize}]  Max. points possible: 1,000</p>
            <p className="qtext"> {question} </p>
            <button className="qbutton" onClick={() => this.setState({selection: this.state.answer1, answerPoints: answer1Points})}> {answer1} </button>
            <button className="qbutton" onClick={() => this.setState({selection: this.state.answer2, answerPoints: answer2Points})}> {answer2} </button>
            <button className="qbutton" onClick={() => this.setState({selection: this.state.answer3, answerPoints: answer3Points})}> {answer3} </button>
            <button className="qbutton" onClick={() => this.setState({selection: this.state.answer4, answerPoints: answer4Points})}> {answer4} </button>
            <button className="qbutton" onClick={() => this.setState({selection: this.state.answer5, answerPoints: answer5Points})}> {answer5} </button>
            <button className="qbutton" onClick={() => this.setState({selection: this.state.answer6, answerPoints: answer6Points})}> {answer6} </button>
            <p id="qtext2"> Answer: {selection} </p>
            <p className="qtext"> Points: {answerPoints} </p>
            <button className="qsbutton" onClick={this.postAnswer}>  Submit </button>
            </div>
            <UserTotalScore userScore={userScore}/>
        </React.Fragment>
      );
     } else {
       return (
         <React.Fragment>
             <p className="qtext">  SCORING COMPLETED </p>
             <UserTotalScore userScore={userScore}/>
         </React.Fragment>
       );
            }; //end else statement
    }
  }
}

export default Question;
