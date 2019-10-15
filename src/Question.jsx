import React from "react";
import UserTotalScore from "./UserTotalScore";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.postAnswer = this.postAnswer.bind(this);
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

    fetch("http://localhost:8080/q/" + this.state.currentQuestion)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            question: result.question,
            answer1: result.answer1,
            answer2: result.answer2,
            answer3: result.answer3,
            answer4: result.answer4,
            answer5: result.answer5,
            answer6: result.answer6,
            answer1Points: result.answer1Points,
            answer2Points: result.answer2Points,
            answer3Points: result.answer3Points,
            answer4Points: result.answer4Points,
            answer5Points: result.answer5Points,
            answer6Points: result.answer6Points,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    } else {
          this.setState({answer1: null, selection: null}); //TO DO: make all state variables null
            };
    }


  postAnswer(selection) {
    // TODO: if selection is null skip, else do POST
    // TODO: handle exceptions
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/a", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify( { questionId: this.state.currentQuestion, userId: 99, answer: this.state.selection, questionSetVersion: 1, answerPoints: this.state.answerPoints }));
    // TODO if successful go to next question
    this.renderNextQuestion();
  }


  render() {
    let { error, isLoaded, question } = this.state;
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
            <p className="qtext"> [you are on question #{this.state.currentQuestion} of {this.props.questionSetSize}] </p>
            <p className="qtext"> {question} </p>
            <button className="qbutton" onClick={() => this.setState({selection: '1', answerPoints: answer1Points})}> {answer1} </button>
            <button className="qbutton" onClick={() => this.setState({selection: '2', answerPoints: answer2Points})}> {answer2} </button>
            <button className="qbutton" onClick={() => this.setState({selection: '3', answerPoints: answer3Points})}> {answer3} </button>
            <button className="qbutton" onClick={() => this.setState({selection: '4', answerPoints: answer4Points})}> {answer4} </button>
            <button className="qbutton" onClick={() => this.setState({selection: '5', answerPoints: answer5Points})}> {answer5} </button>
            <button className="qbutton" onClick={() => this.setState({selection: '6', answerPoints: answer6Points})}> {answer6} </button>
            <p className="qtext">  Answer Number: {selection} Points: {answerPoints}</p>
            <button className="qsbutton" onClick={this.postAnswer}>  Submit </button>
            </div>
            <div id="totalscore">
            <UserTotalScore />
            </div>
        </React.Fragment>
      );
     } else {
       return (
         <React.Fragment>
             <p className="qtext">  SCORING COMPLETED </p>
             <div id="totalscore">
             <UserTotalScore />
             </div>
         </React.Fragment>
       );
            }; //end else statement
    }
  }
}

export default Question;
