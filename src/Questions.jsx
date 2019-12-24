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
    this.postScoreToProfile = this.postScoreToProfile.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      // questionSetVersion: null,
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
      currentQuestion: this.props.questionToGoTo, // initiated from parent. this is used as 'sequenceNumber' on back-end.
      jumpQuestion: null, // used for separate get for jumpTo
      questionsEntityId: null, // used to GET an answer.
      allDeletedMessage: null,
      showAnswersButton: this.props.showAnswersButton,
      showResultLevels: false,
    };
  }

  componentDidMount() {
    this.getQuestion();
    this.getUserScore();
    if (this.props.result1start > 0) {this.setState({showResultLevels: true});}
  }

  getQuestion() {
    if (this.state.currentQuestion <= this.props.questionSetSize ) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/q/e/" + this.props.questionSetVersion + "/" + this.state.currentQuestion,
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
          if (this.props.result1start > 0) {this.setState({showResultLevels: true});}
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
        axios.get("http://localhost:8080/api/q/e/" + this.props.questionSetVersion + "/" + this.state.jumpQuestion,
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
          if (this.props.result1start > 0) {this.setState({showResultLevels: true});}
            };
    }

    postAnswer() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { answer: this.state.selection,answerPoints: this.state.answerPoints, auditee: u };
        axios.post("http://localhost:8080/api/a/r/" + this.state.questionsEntityId,
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
        axios.get("http://localhost:8080/api/a?sv=" + this.props.questionSetVersion,
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
       axios.get("http://localhost:8080/api/a/l/" + this.state.questionsEntityId,
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
    this.setState({currentQuestion: ++this.state.currentQuestion, allDeletedMessage: null});
    this.getQuestion();
  }

  handleChange(event) {
    this.setState({jumpQuestion: event.target.value});
  }
  handleSubmit(event) {
    let lock = this.state.jumpQuestion; // this is magic #1
    if (lock != null ) {
    this.setState({currentQuestion: lock, allDeletedMessage: null}); // this is magic #2
    this.getQuestion2(); // magic #3: needs a separate method in order to use jumpQuestion immediately instead of waiting to listen for it in setState. if i setState of currentQuestion be equal to the jumpQuestion in the input text box itself, you'd have immediate re-rendering for every typed number in the box.
    event.preventDefault();
    }
  }
////////////////////////////////////////////////////////////////////////////////
   verifyDelete() {
    if (window.confirm('Are you sure you want to delete all\nyour answers to this question set?')) {
    this.deleteAllAnswers();
    this.setState({allDeletedMessage: "All your answers have been deleted."});
    }
   }

   deleteAllAnswers() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u + ':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    const data = {auditee: u};
    axios.post("http://localhost:8080/api/a/del/" + this.props.questionSetVersion,
    data,
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
    this.setState({currentQuestion: 1, userScore: 0});
    this.getQuestion();
    this.setState({isLoaded: true,
      });
           }).catch(error => {this.setState({ isLoaded: true, error});
           });
   }

  previous(){
    if (this.state.currentQuestion > 1) {
    this.setState({currentQuestion: --this.state.currentQuestion, allDeletedMessage: null});
    this.getQuestion();
    }
  }

  // no answer button
  noAnswer() {
    this.setState({selection: "no answer", answerPoints: 0});
  }

    scoringCompletedMessage() {
        if      (this.state.userScore >= this.props.result1start && this.props.result1start > 0) { return <p class="resultMessageP">Your result is: {this.props.result1}</p>}
        else if (this.state.userScore >= this.props.result2start && this.props.result2start > 0) { return <p class="resultMessageP">Your result is: {this.props.result2}</p> }
        else if (this.state.userScore >= this.props.result3start && this.props.result3start > 0) { return <p class="resultMessageP">Your result is: {this.props.result3}</p> }
        else if (                                                   this.props.result4start > 0) { return <p class="resultMessageP">Your result is: {this.props.result4}</p> }
        else { return <p class="resultMessageP"> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Finished! </p> }
    }

    postScoreToProfile() {
        let resultToPost = "";
        if      (this.state.userScore >= this.props.result1start && this.props.result1start > 0) { resultToPost = this.props.result1 }
        else if (this.state.userScore >= this.props.result2start && this.props.result2start > 0) { resultToPost = this.props.result2 }
        else if (this.state.userScore >= this.props.result3start && this.props.result3start > 0) { resultToPost = this.props.result3 }
        else if (                                                   this.props.result4start > 0) { resultToPost = this.props.result4 }
        //else { this.props.addToProfile("") };
        this.props.addToProfile(resultToPost);
    }



  render() {
    let { error, isLoaded, selection, answerPoints, answer1, answer2, answer3, answer4, answer5,
     answer6, answer1Points, answer2Points, answer3Points, answer4Points, answer5Points, answer6Points} = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
    if (this.state.currentQuestion <= this.props.questionSetSize) {
      return (
        <React.Fragment >

            <div id="questionsDiv1">
                <div id="questionsDiv2">
                    <div id="questionsDiv3">
                        {!this.props.showScoring &&
                        <p>Score: (wait for it) </p>}
                        {this.props.showScoring &&
                        <p>Score:&nbsp; <UserTotalScore userScore={this.state.userScore}/>/{this.props.maxPoints} </p> }
                    </div>
                </div>
            <p class="questionsParagraph"> Title: &nbsp;{this.props.title} </p>
            <p class="questionsDescriptionParagraph"> Description: &nbsp;{this.props.description}</p>
            <p class="questionsParagraph">Question: &nbsp;#{this.state.currentQuestion} of {this.props.questionSetSize}</p>
            </div>

            <div id="questionsDivQuestion">
            <p class="qtext"> {this.state.question} </p>
            </div>

            <div id="questionsDiv4answerSelection">
            <AnswerSelection answer={answer1} onClick={() => this.setState({selection: this.state.answer1, answerPoints: answer1Points})}> {answer1} </AnswerSelection>
            <AnswerSelection answer={answer2} onClick={() => this.setState({selection: this.state.answer2, answerPoints: answer2Points})}> {answer2} </AnswerSelection>
            <AnswerSelection answer={answer3} onClick={() => this.setState({selection: this.state.answer3, answerPoints: answer3Points})}> {answer3} </AnswerSelection>
            <AnswerSelection answer={answer4} onClick={() => this.setState({selection: this.state.answer4, answerPoints: answer4Points})}> {answer4} </AnswerSelection>
            <AnswerSelection answer={answer5} onClick={() => this.setState({selection: this.state.answer5, answerPoints: answer5Points})}> {answer5} </AnswerSelection>
            <button id="noAnswerButton" onClick={() => this.noAnswer()}>No Answer</button>
            <p class="qtext2"> Your Answer: {selection} </p>
            {this.props.showScoring && <p class="qtext2">Points: {this.state.answerPoints}</p> }
            </div>

            <div id="questionsNavigationDiv">
                <button id="deleteAnswerSubmits" onClick={() => this.verifyDelete()}>Delete all</button>
                <form id="nextQuestionForm" onSubmit={this.handleSubmit}>
                  <input id="navigateQuestionsButton" type="submit" value="Go to ->" />
                  <input id="questionsGoToInput" placeholder="#" type="number" type="text" onChange={this.handleChange}
                  max={this.props.questionSetSize} min="1" maxLength="2" step="1" autoComplete="off" />
                </form>
                <button id="navigateQuestionsButton"  onClick={this.previous}>  Back </button>
                <button id="answerSubmitButton" onClick={this.postAnswer}>  Next </button>
            </div>
            <p id="deletedAnswersMessage">{this.state.allDeletedMessage}</p>

        </React.Fragment>
      );
     } else {
       return (
         <React.Fragment>
            <div id="questionsDiv1">
                <div id="questionsDiv2">
                    <div id="questionsDiv3">
                        <p>Score:&nbsp; <UserTotalScore userScore={this.state.userScore}/>/{this.props.maxPoints} </p>
                    </div>
                </div>
            <p class="questionsParagraph"> Title: &nbsp;{this.props.title} </p>
            <p class="questionsDescriptionParagraph"> Description: &nbsp;{this.props.description}</p>
            <p class="questionsParagraph">Finished </p>
            </div>


          <div id="questionsDiv5answerSelection">

            <div>
              {this.scoringCompletedMessage()}
            </div>

            { this.state.showResultLevels &&
            <div id="showResultsDiv">
                <table>
                <tr>
                <th>Level</th><th>&nbsp;From</th><th>To</th>
                </tr>
                <tr>
                <td class="nowrapTd">{this.props.result1}</td><td>&nbsp;{this.props.result1start}</td><td>Max Points</td>
                </tr>
                <tr>
                <td class="nowrapTd">{this.props.result2}</td><td>&nbsp;{this.props.result2start}</td><td>{ Math.max(0, this.props.result2end) }</td>
                </tr>
                <tr>
                <td class="nowrapTd">{this.props.result3}</td><td>&nbsp;{this.props.result3start}</td><td>{ Math.max(0, this.props.result3end) }</td>
                </tr>
                <tr>
                <td class="nowrapTd">{this.props.result4}</td><td>&nbsp;{this.props.result4start}</td><td>{ Math.max(0, this.props.result4end) }</td>
                </tr>
                </table>
            </div> }

             { this.props.showAnswersButton &&
             <div id="seeAnswersDiv">
             <button class="showAnswersButton2" onClick={this.props.seeAnswers}> See Answers </button>
             </div> }
             { !this.props.showAnswersButton &&
             <p id="answersNotProvidedP"> (answers not provided for this set)</p> }

             <button class="showAnswersButton" onClick={this.postScoreToProfile}>  Post this score to my profile </button>
             <p id="deletedAnswersMessage">{this.props.scorePostedMessage}</p>
           </div>


            <div id="questionsNavigationDiv">
                <button id="deleteAnswerSubmits" onClick={() => this.verifyDelete()}>Delete all</button>
                <form id="nextQuestionForm" onSubmit={this.handleSubmit}>
                  <input id="navigateQuestionsButton" type="submit" value="Go to ->" />
                  <input id="questionsGoToInput" placeholder="#" type="number" type="text" onChange={this.handleChange}
                  max={this.props.questionSetSize} min="1" maxLength="2" step="1" autoComplete="off" />
                </form>
                <button id="navigateQuestionsButton"  onClick={this.previous}>  Back </button>
            </div>
            <p id="deletedAnswersMessage">{this.state.allDeletedMessage}</p>
         </React.Fragment>
       );
            }; //end else statement
    }
  }
}

export default Questions;
