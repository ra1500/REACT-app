import React from "react";
import axios from 'axios';

class AskFormQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleChange5 = this.handleChange5.bind(this);
    this.handleChange6 = this.handleChange6.bind(this);
    this.handleChange7 = this.handleChange7.bind(this);
    this.handleChange8 = this.handleChange8.bind(this);
    this.handleChange9 = this.handleChange9.bind(this);
    this.handleChange10 = this.handleChange10.bind(this);
    this.handleChange11 = this.handleChange11.bind(this);
    this.handleChange12 = this.handleChange12.bind(this);
    this.handleChange13 = this.handleChange13.bind(this);
    this.handleChange14 = this.handleChange14.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleSubmit3 = this.handleSubmit3.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          questionSetVersion: this.props.questionSetVersion,
          sequenceNumber: this.props.sequenceNumber,
          maxQtyQuestions: 1,
          maxPoints: 0,
          question: this.props.question,
          jumpToQuestionNumber: 1,
          answer1: this.props.answer1,
          answer2: this.props.answer2,
          answer3: this.props.answer3,
          answer4: this.props.answer4,
          answer5: this.props.answer5,
          answer6: this.props.answer6,
          answer1Points: this.props.answer1Points,
          answer2Points: this.props.answer2Points,
          answer3Points: this.props.answer3Points,
          answer4Points: this.props.answer4Points,
          answer5Points: this.props.answer5Points,
          answer6Points: this.props.answer6Points,
          answer1PointsBefore: "", // used to calculate running maxPoints
          answer2PointsBefore: "",
          answer3PointsBefore: "",
          answer4PointsBefore: "",
          answer5PointsBefore: "",
          answer6PointsBefore: "",
        };
  }

   handleChange1(event) {
     this.setState({answer1: event.target.value});
   }
   handleChange2(event) {
     this.setState({answer1Points: event.target.value});
   }
   handleChange3(event) {
     this.setState({answer2: event.target.value});
   }
   handleChange4(event) {
     this.setState({answer2Points: event.target.value});
   }
   handleChange5(event) {
     this.setState({answer3: event.target.value});
   }
   handleChange6(event) {
     this.setState({answer3Points: event.target.value});
   }
   handleChange7(event) {
     this.setState({answer4: event.target.value});
   }
   handleChange8(event) {
     this.setState({answer4Points: event.target.value});
   }
   handleChange9(event) {
     this.setState({answer5: event.target.value});
   }
   handleChange10(event) {
     this.setState({answer5Points: event.target.value});
   }
   handleChange11(event) {
     this.setState({answer6: event.target.value});
   }
   handleChange12(event) {
     this.setState({answer6Points: event.target.value});
   }
   handleChange13(event) {
     this.setState({question: event.target.value});
   }
   handleChange13(event) {
     this.setState({question: event.target.value});
   }
   handleChange14(event) {
     this.setState({jumpToQuestionNumber: event.target.value});
   }

   postNewQuestion() {
        if (this.props.sequenceNumber < 41) {  // max of 40 questions per Qset
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;

        let maximumPoints = Math.max(this.state.answer1Points, this.state.answer2Points, this.state.answer3Points, this.state.answer4Points, this.state.answer5Points, this.state.answer6Points);
        let maximumPointsBefore = Math.max(this.state.answer1PointsBefore, this.state.answer2PointsBefore, this.state.answer3PointsBefore, this.state.answer4PointsBefore, this.state.answer5PointsBefore, this.state.answer6PointsBefore, );

        console.log(maximumPoints + " maximumPoints");
        console.log(maximumPointsBefore + " maximumPointsBefore");
        console.log(this.state.maxPoints + " this.state.maxPoints");

        let data = { maxPoints: maximumPoints, question: this.state.question,
         sequenceNumber: this.props.sequenceNumber, answer1: this.state.answer1, answer1Points: this.state.answer1Points,
         answer2: this.state.answer2, answer2Points: Number(this.state.answer2Points),
         answer3: this.state.answer3, answer3Points: Number(this.state.answer3Points),
         answer4: this.state.answer4, answer4Points: Number(this.state.answer4Points),
         answer5: this.state.answer5, answer5Points: Number(this.state.answer5Points),
         answer6: this.state.answer6, answer6Points: Number(this.state.answer6Points),};

        this.setState({maxPoints: +Number(this.state.maxPoints) +Number(maximumPoints) -Number(maximumPointsBefore) })  ;
        console.log(this.state.maxPoints + " 2nd this.state.maxPoints");

        axios.post("http://localhost:8080/q/p?qsid=" + this.props.questionSetVersion, data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true,
                  });
         this.getCurrentQuestion(); //
         this.props.manageSequenceNumber(); //
         if (this.props.sequenceNumber > this.state.maxQtyQuestions) {
             this.setState({maxQtyQuestions: this.props.sequenceNumber-1});
         } // end if
         this.props.finalMax(this.state.maxQtyQuestions, this.state.maxPoints); //
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
        } // end if
        else {} // TODO message that not more than 40
   }

  handleSubmit1(event) {
    event.preventDefault();
    this.postNewQuestion();
          this.setState({
            question: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            answer5: "",
            answer6: "",
            answer1Points: "",
            answer2Points: "",
            answer3Points: "",
            answer4Points: "",
            answer5Points: "",
            answer6Points: "",
          });
    this.getCurrentQuestion();
    }

  handleSubmit2(event) {
    event.preventDefault();
        if (this.state.jumpToQuestionNumber <= this.state.maxQtyQuestions ) {
            this.props.jumpToSequenceNumber(this.state.jumpToQuestionNumber);
            this.getJumpToQuestion();
        } // end if
    }
  handleSubmit3(event) {
    event.preventDefault();
    this.props.previousSequenceNumber();
    this.getPreviousQuestion();
    }

  getPreviousQuestion() {
    if (this.props.sequenceNumber > 1) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/q/" + this.props.questionSetVersion + "/" + (this.props.sequenceNumber-1),
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
          });
            if (Number.isInteger(response.data.answer1Points)) {this.setState({answer1Points: Number(response.data.answer1Points), answer1PointsBefore: Number(response.data.answer1Points)}) } else {this.setState({ answer1PointsBefore: Number(0), answer1Points: Number(0)})} ;
            if (Number.isInteger(response.data.answer2Points)) {this.setState({answer2Points: Number(response.data.answer2Points), answer2PointsBefore: Number(response.data.answer2Points)}) } else {this.setState({ answer2PointsBefore: Number(0), answer2Points: Number(0)})} ;
            if (Number.isInteger(response.data.answer3Points)) {this.setState({answer3Points: Number(response.data.answer3Points), answer3PointsBefore: Number(response.data.answer3Points)}) } else {this.setState({ answer3PointsBefore: Number(0), answer3Points: Number(0)})} ;
            if (Number.isInteger(response.data.answer4Points)) {this.setState({answer4Points: Number(response.data.answer4Points), answer4PointsBefore: Number(response.data.answer4Points)}) } else {this.setState({ answer4PointsBefore: Number(0), answer4Points: Number(0)})} ;
            if (Number.isInteger(response.data.answer5Points)) {this.setState({answer5Points: Number(response.data.answer5Points), answer5PointsBefore: Number(response.data.answer5Points)}) } else {this.setState({ answer5PointsBefore: Number(0), answer5Points: Number(0)})} ;
            if (Number.isInteger(response.data.answer6Points)) {this.setState({answer6Points: Number(response.data.answer6Points), answer6PointsBefore: Number(response.data.answer6Points)}) } else {this.setState({ answer6PointsBefore: Number(0), answer6Points: Number(0)})} ;
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
     } // end if
    }

  getCurrentQuestion() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/q/" + this.props.questionSetVersion + "/" + (+this.props.sequenceNumber+1),
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
            answer1Points: Number(response.data.answer1Points),
            answer2Points: Number(response.data.answer2Points),
            answer3Points: Number(response.data.answer3Points),
            answer4Points: Number(response.data.answer4Points),
            answer5Points: Number(response.data.answer5Points),
            answer6Points: Number(response.data.answer6Points),
          });
            if (Number.isInteger(response.data.answer1Points)) {this.setState({answer1Points: Number(response.data.answer1Points), answer1PointsBefore: Number(response.data.answer1Points)}) } else {this.setState({ answer1PointsBefore: Number(0), answer1Points: Number(0)})} ;
            if (Number.isInteger(response.data.answer2Points)) {this.setState({answer2Points: Number(response.data.answer2Points), answer2PointsBefore: Number(response.data.answer2Points)}) } else {this.setState({ answer2PointsBefore: Number(0), answer2Points: Number(0)})} ;
            if (Number.isInteger(response.data.answer3Points)) {this.setState({answer3Points: Number(response.data.answer3Points), answer3PointsBefore: Number(response.data.answer3Points)}) } else {this.setState({ answer3PointsBefore: Number(0), answer3Points: Number(0)})} ;
            if (Number.isInteger(response.data.answer4Points)) {this.setState({answer4Points: Number(response.data.answer4Points), answer4PointsBefore: Number(response.data.answer4Points)}) } else {this.setState({ answer4PointsBefore: Number(0), answer4Points: Number(0)})} ;
            if (Number.isInteger(response.data.answer5Points)) {this.setState({answer5Points: Number(response.data.answer5Points), answer5PointsBefore: Number(response.data.answer5Points)}) } else {this.setState({ answer5PointsBefore: Number(0), answer5Points: Number(0)})} ;
            if (Number.isInteger(response.data.answer6Points)) {this.setState({answer6Points: Number(response.data.answer6Points), answer6PointsBefore: Number(response.data.answer6Points)}) } else {this.setState({ answer6PointsBefore: Number(0), answer6Points: Number(0)})} ;
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

  getJumpToQuestion() {
    if (this.state.jumpToQuestionNumber > 0) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/q/" + this.props.questionSetVersion + "/" + (this.state.jumpToQuestionNumber),
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
          });
            if (Number.isInteger(response.data.answer1Points)) {this.setState({answer1Points: Number(response.data.answer1Points), answer1PointsBefore: Number(response.data.answer1Points)}) } else {this.setState({ answer1PointsBefore: Number(0), answer1Points: Number(0)})} ;
            if (Number.isInteger(response.data.answer2Points)) {this.setState({answer2Points: Number(response.data.answer2Points), answer2PointsBefore: Number(response.data.answer2Points)}) } else {this.setState({ answer2PointsBefore: Number(0), answer2Points: Number(0)})} ;
            if (Number.isInteger(response.data.answer3Points)) {this.setState({answer3Points: Number(response.data.answer3Points), answer3PointsBefore: Number(response.data.answer3Points)}) } else {this.setState({ answer3PointsBefore: Number(0), answer3Points: Number(0)})} ;
            if (Number.isInteger(response.data.answer4Points)) {this.setState({answer4Points: Number(response.data.answer4Points), answer4PointsBefore: Number(response.data.answer4Points)}) } else {this.setState({ answer4PointsBefore: Number(0), answer4Points: Number(0)})} ;
            if (Number.isInteger(response.data.answer5Points)) {this.setState({answer5Points: Number(response.data.answer5Points), answer5PointsBefore: Number(response.data.answer5Points)}) } else {this.setState({ answer5PointsBefore: Number(0), answer5Points: Number(0)})} ;
            if (Number.isInteger(response.data.answer6Points)) {this.setState({answer6Points: Number(response.data.answer6Points), answer6PointsBefore: Number(response.data.answer6Points)}) } else {this.setState({ answer6PointsBefore: Number(0), answer6Points: Number(0)})} ;
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
      } // end if
    }

  render() {
    return (
    <React.Fragment>
      <div class="profilePage">
      <p> # {this.props.sequenceNumber}</p>
      <div class="invitationForm">
      <form onSubmit={this.handleSubmit1}>
          <div class="askDiv"><span class="askText">Question &nbsp;</span>
          <input id="newQuestion" maxlength="80" type="text" value={this.state.question} onChange={this.handleChange13} /></div>

          <div class="askDiv"><span class="askText">Answer 1 &nbsp;</span>
          <input class="newAnswer" type="text" maxlength="50" value={this.state.answer1} onChange={this.handleChange1} />
          <span class="askText">Points &nbsp;</span>
          <input type="number" type="text" placeholder= "integer" maxlength="3" class="newAnswerPoints" value={this.state.answer1Points} onChange={this.handleChange2} /></div>

          <div class="askDiv"><span class="askText">Answer 2 &nbsp;</span>
          <input class="newAnswer" type="text" maxlength="50" value={this.state.answer2} onChange={this.handleChange3} />
          <span class="askText">Points &nbsp;</span>
          <input type="number" type="text" maxlength="3" class="newAnswerPoints" value={this.state.answer2Points} onChange={this.handleChange4} /></div>

          <div class="askDiv"><span class="askText">Answer 3 &nbsp;</span>
          <input class="newAnswer" type="text" maxlength="50" value={this.state.answer3} onChange={this.handleChange5} />
          <span class="askText">Points &nbsp;</span>
          <input type="number" type="text" maxlength="3" class="newAnswerPoints" value={this.state.answer3Points} onChange={this.handleChange6} /></div>

          <div class="askDiv"><span class="askText">Answer 4 &nbsp;</span>
          <input class="newAnswer" type="text" maxlength="50" value={this.state.answer4} onChange={this.handleChange7} />
          <span class="askText">Points &nbsp;</span>
          <input type="number" type="text" maxlength="3" class="newAnswerPoints" value={this.state.answer4Points} onChange={this.handleChange8} /></div>

          <div class="askDiv"><span class="askText">Answer 5 &nbsp;</span>
          <input class="newAnswer" type="text" maxlength="50" value={this.state.answer5} onChange={this.handleChange9} />
          <span class="askText">Points &nbsp;</span>
          <input type="number" type="text" maxlength="3" class="newAnswerPoints" value={this.state.answer5Points} onChange={this.handleChange10} /></div>

          <div class="askDiv"><span class="askText">Answer 6 &nbsp;</span>
          <input class="newAnswer" type="text" maxlength="50" value={this.state.answer6} onChange={this.handleChange11} />
          <span class="askText">Points &nbsp;</span>
          <input type="number" type="text" maxlength="3" class="newAnswerPoints" value={this.state.answer6Points} onChange={this.handleChange12} /></div>

          <div id="floatRightSubmitQuestionButton">
          <button className="titleButton" type="submit">Add</button>
          </div>
      </form>

          <form onSubmit={this.handleSubmit2}>
          <button class="inviteAuditButton"> Go To </button>
          <input class="newAnswerPoints" placeholder="#" type="number" type="text" size="2" maxlength="2" value={this.state.invitee} onChange={this.handleChange14} />
          </form>

          <form onSubmit={this.handleSubmit3}>
          <button className="inviteAuditButton" type="submit"> Previous </button>
          </form>

      </div>
      </div>
    </React.Fragment>
    );
  }
}

export default AskFormQuestion;