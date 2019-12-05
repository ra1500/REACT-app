import React from "react";
import UserTotalScore from "./UserTotalScore";
import axios from 'axios';
import AnswerSelection from "./AnswerSelection";


class SampleQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.postAnswer = this.postAnswer.bind(this);
    this.previous = this.previous.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title: "Animal Trivia",
      description: "Do you know your nature?",
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
      currentQuestion: 1, // 'sequenceNumber'
      jumpQuestion: null, // used for separate get for jumpTo
      questionsEntityId: null, // used to GET an answer.
      allDeletedMessage: null,
      selectedAnswer1: null,
      selectedAnswer1Points: 0,
      selectedAnswer2: null,
      selectedAnswer2Points: 0,
      selectedAnswer3: null,
      selectedAnswer3Points: 0,
    };
  }

  componentDidMount() {
    this.getQuestion();
    this.getUserScore();
  }

  getQuestion() {
    if (this.state.currentQuestion == 1 ) {
          this.setState({
            question: "What is the only flying mammal?",
            answer1: "Pigs",
            answer2: "Flying squirrel",
            answer3: "Bats",
            answer4: "Flying fish",
            answer5: null,
            answer6: null,
            answer1Points: 1,
            answer2Points: 10,
            answer3Points: 35,
            answer4Points: 0,
            answer5Points: null,
            answer6Points: null,
            selection: "(select one)",
            answerPoints: 0,
          });
          this.getUserAnswer(); // get userAnswer if user had already answered previously.
     }
    if (this.state.currentQuestion == 2 ) {
          this.setState({
            question: "Where do penguins live?",
            answer1: "Near the north pole",
            answer2: "On tropical islands during the winter",
            answer3: "In zoos",
            answer4: "Antarctica",
            answer5: null,
            answer6: null,
            answer1Points: 0,
            answer2Points: 0,
            answer3Points: 5,
            answer4Points: 35,
            answer5Points: null,
            answer6Points: null,
            selection: "(select one)",
            answerPoints: 0,
          });
          this.getUserAnswer(); // get userAnswer if user had already answered previously.
     }
    if (this.state.currentQuestion == 3 ) {
          this.setState({
            question: "How long can seals hold their breath?",
            answer1: "6 minutes",
            answer2: "45 minutes",
            answer3: "2 hours",
            answer4: null,
            answer5: null,
            answer6: null,
            answer1Points: 0,
            answer2Points: 1,
            answer3Points: 30,
            answer4Points: 0,
            answer5Points: null,
            answer6Points: null,
            selection: "(select one)",
            answerPoints: 0,
          });
          this.getUserAnswer(); // get userAnswer if user had already answered previously.
     }
    }

  getQuestion2() {
    if (this.state.jumpQuestion != null && this.state.jumpQuestion <= 3 ) {
    if (this.state.currentQuestion == 1 ) {
          this.setState({
            question: "How long can seals hold their breath?",
            answer1: "6 minutes",
            answer2: "45 minutes",
            answer3: "2 hours",
            answer4: null,
            answer5: null,
            answer6: null,
            answer1Points: 0,
            answer2Points: 1,
            answer3Points: 30,
            answer4Points: 0,
            answer5Points: null,
            answer6Points: null,
            selection: "(select one)",
            answerPoints: 0,
          });
          this.getUserAnswer(); // get userAnswer if user had already answered previously.
     }
    if (this.state.currentQuestion == 2 ) {
          this.setState({
            question: "Where do penguins live?",
            answer1: "Near the north pole",
            answer2: "On tropical islands during the winter",
            answer3: "In zoos",
            answer4: "Antarctica",
            answer5: null,
            answer6: null,
            answer1Points: 0,
            answer2Points: 0,
            answer3Points: 5,
            answer4Points: 35,
            answer5Points: null,
            answer6Points: null,
            selection: "(select one)",
            answerPoints: 0,
          });
          this.getUserAnswer(); // get userAnswer if user had already answered previously.
     }
    if (this.state.currentQuestion == 3 ) {
          this.setState({
            question: "How long can seals hold their breath?",
            answer1: "2 hours",
            answer2: "45 minutes",
            answer3: "6 minutes",
            answer4: null,
            answer5: null,
            answer6: null,
            answer1Points: 30,
            answer2Points: 1,
            answer3Points: 0,
            answer4Points: 0,
            answer5Points: null,
            answer6Points: null,
            selection: "(select one)",
            answerPoints: 0,
          });
          this.getUserAnswer(); // get userAnswer if user had already answered previously.
     }
     }
    }

    postAnswer() {
        if (this.state.currentQuestion === 1) {
            this.setState({selectedAnswer1: this.state.selection, selectedAnswer1Points: this.state.answerPoints, allDeletedMessage: "",});
        }
        if (this.state.currentQuestion === 2) {
            this.setState({selectedAnswer2: this.state.selection, selectedAnswer2Points: this.state.answerPoints, allDeletedMessage: "",});
        }
        if (this.state.currentQuestion === 3) {
            this.setState({selectedAnswer3: this.state.selection, selectedAnswer3Points: this.state.answerPoints, allDeletedMessage: "",});
        }
        this.getUserScore();
        this.goToNextQuestion();
    }

  getUserScore() {
          if (this.state.currentQuestion === 1) {
          this.setState({ userScore: +this.state.answerPoints - this.state.selectedAnswer1Points + this.state.userScore ,});
          }
           if (this.state.currentQuestion === 2) {
           this.setState({ userScore: +this.state.answerPoints - this.state.selectedAnswer2Points + this.state.userScore ,});
           }
          if (this.state.currentQuestion === 3) {
          this.setState({ userScore: +this.state.answerPoints - this.state.selectedAnswer3Points + this.state.userScore ,});
          }

   }

    getUserAnswer() {
         if (this.state.currentQuestion === 1) {
         this.setState({selection: this.state.selectedAnswer1,  answerPoints: this.state.selectedAnswer1Points,});
         }
         if (this.state.currentQuestion === 2) {
         this.setState({selection: this.state.selectedAnswer2,  answerPoints: this.state.selectedAnswer2Points,});
         }
         if (this.state.currentQuestion === 3) {
         this.setState({selection: this.state.selectedAnswer3,  answerPoints: this.state.selectedAnswer3Points,});
         }
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
    let lock = this.state.jumpQuestion;
    if (lock != null ) {
    this.setState({currentQuestion: lock, allDeletedMessage: null});
    this.getQuestion2();
    event.preventDefault();
    }
  }

   verifyDelete() {
    this.deleteAllAnswers();
    this.setState({allDeletedMessage: "All your answers have been deleted."});
   }

   deleteAllAnswers() {
    this.setState({currentQuestion: 1, userScore: 0});
    this.getQuestion();
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
        if      (this.state.userScore >= 99 ) { return <p class="resultMessageP">Your result is 'Perfection'</p>}
        else if (this.state.userScore >= 60 ) { return <p class="resultMessageP">Your result is: 'Good Job'</p> }
        else if (this.state.userScore >= 0 ) { return <p class="resultMessageP">Your result is: 'hmm...'</p> }
        else { return <p class="resultMessageP"> Time to watch some more nature documentaries. </p> }
    }

  render() {
    let { error, isLoaded, question, userScore, selection, answerPoints, answer1, answer2, answer3, answer4, answer5,
     answer6, answer1Points, answer2Points, answer3Points, answer4Points, answer5Points, answer6Points} = this.state;

    if (this.state.currentQuestion <= 3) {
      return (
        <React.Fragment >

            <div id="questionsDiv1">
                <div id="questionsDiv2">
                    <div id="questionsDiv3">
                        <p>Score:&nbsp; <UserTotalScore userScore={this.state.userScore}/>/100 </p>
                    </div>
                </div>
            <p class="questionsParagraph"> Title: &nbsp;{this.state.title} </p>
            <p class="questionsDescriptionParagraph"> Description: &nbsp;{this.state.description}</p>
            <p class="questionsParagraph">Question: &nbsp;#{this.state.currentQuestion} of 3</p>
            </div>

            <div id="questionsDivQuestion">
            <p class="qtext"> {question} </p>
            </div>

            <div id="questionsDiv4answerSelection">
            <AnswerSelection answer={answer1} onClick={() => this.setState({selection: this.state.answer1, answerPoints: answer1Points})}> {answer1} </AnswerSelection>
            <AnswerSelection answer={answer2} onClick={() => this.setState({selection: this.state.answer2, answerPoints: answer2Points})}> {answer2} </AnswerSelection>
            <AnswerSelection answer={answer3} onClick={() => this.setState({selection: this.state.answer3, answerPoints: answer3Points})}> {answer3} </AnswerSelection>
            <AnswerSelection answer={answer4} onClick={() => this.setState({selection: this.state.answer4, answerPoints: answer4Points})}> {answer4} </AnswerSelection>
            <AnswerSelection answer={answer5} onClick={() => this.setState({selection: this.state.answer5, answerPoints: answer5Points})}> {answer5} </AnswerSelection>
            <button id="noAnswerButton" onClick={() => this.noAnswer()}>No Answer</button>
            <p class="qtext2"> Your Answer: {selection} </p>
            <p class="qtext2">Points: {this.state.answerPoints}</p>
            </div>

            <div id="questionsNavigationDiv">
                <button id="deleteAnswerSubmits" onClick={() => this.verifyDelete()}>Delete all</button>
                <form id="nextQuestionForm" onSubmit={this.handleSubmit}>
                  <input id="navigateQuestionsButton" type="submit" value="Go to" />
                  <input id="questionsGoToInput" placeholder="#" type="number" type="text" onChange={this.handleChange}
                  max="3" min="1" maxLength="2" step="1" autoComplete="off" />
                </form>
                <button id="navigateQuestionsButton"  onClick={this.previous}>  Back </button>
                <button id="answerSubmitButton" onClick={this.postAnswer}>  Next </button>
                <p id="deletedAnswersMessage">{this.state.allDeletedMessage}</p>
            </div>



        </React.Fragment>
      );
     } else {
       return (
         <React.Fragment>
            <div id="questionsDiv1">
                <div id="questionsDiv2">
                    <div id="questionsDiv3">
                        <p>Score:&nbsp; <UserTotalScore userScore={this.state.userScore}/>/100 </p>
                    </div>
                </div>
            <p class="questionsParagraph"> Title: &nbsp;{this.state.title} </p>
            <p class="questionsDescriptionParagraph"> Description: &nbsp;{this.state.description}</p>
            <p class="questionsParagraph">Finished </p>
            </div>


          <div id="questionsDiv5answerSelection">

            <div>
              {this.scoringCompletedMessage()}
            </div>


            <div>
                <table>
                <tr>
                <th>Level</th><th>&nbsp;From</th><th>&nbsp;&nbsp;</th><th>To</th>
                </tr>
                <tr>
                <td>Perfection</td><td>&nbsp;100</td><td>&nbsp;to&nbsp;</td><td>Max Points</td>
                </tr>
                <tr>
                <td>Good Job</td><td>&nbsp;70</td><td>&nbsp;to&nbsp;</td><td>99</td>
                </tr>
                <tr>
                <td>hmm...</td><td>&nbsp;0</td><td>&nbsp;to&nbsp;</td><td>69</td>
                </tr>
                </table>
            </div>

           </div>

            <div id="questionsNavigationDiv">
                <button id="deleteAnswerSubmits" onClick={() => this.verifyDelete()}>Delete all</button>
                <form id="nextQuestionForm" onSubmit={this.handleSubmit}>
                  <input id="navigateQuestionsButton" type="submit" value="Go to" />
                  <input id="questionsGoToInput" placeholder="#" type="number" type="text" onChange={this.handleChange}
                  max="3" min="1" maxLength="2" step="1" autoComplete="off" />
                </form>
                <button id="navigateQuestionsButton"  onClick={this.previous}>  Back </button>
            </div>
            <p id="deletedAnswersMessage">{this.state.allDeletedMessage}</p>
         </React.Fragment>
       );
            }; //end else statement
    }
}

export default SampleQuestions;