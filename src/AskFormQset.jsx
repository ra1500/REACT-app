import React from "react";
import axios from 'axios';
import AskFormQuestion from "./AskFormQuestion";
import AskManage from "./AskManage";

class AskFormQset extends React.Component {
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
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.toggleEditInputBoxes = this.toggleEditInputBoxes.bind(this);
    this.finishedEntry = this.finishedEntry.bind(this);
    this.editAgain = this.editAgain.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.manageSequenceNumber = this.manageSequenceNumber.bind(this);
    this.previousSequenceNumber = this.previousSequenceNumber.bind(this);
    this.startAnewQset = this.startAnewQset.bind(this);
    this.manageSets = this.manageSets.bind(this);
    this.inviteToScoreSelector = this.inviteToScoreSelector.bind(this);
    this.inviteToScore = this.inviteToScore.bind(this);
    this.inviteToScoreSubmit = this.inviteToScoreSubmit.bind(this);
    this.jumpToSequenceNumber = this.jumpToSequenceNumber.bind(this);
    this.finalMax = this.finalMax.bind(this);
    this.manageAset = this.manageAset.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          showTooManyQsetsMessage: false,
          title: null,
          category: null,
          description: null,
          creativeSource: null,
          questionSetVersion: 0,
          sequenceNumber: "1",
          showInputBoxes: false,
          showQsetDetails: false,
          showAskFormQuestion: false,
          showFinished: false,
          showAllDeleted: false,
          showIntro: true,
          showInviteToScore: false,
          invitee: null,
          maxQtyQuestions: 0,
          maxPointsTotal: 0,
          maximumPointsBefore: null, // sent to AskFormQuestion to calculate maxPoints during 'manage'
          showManage: false,
          question: null, // used during 'AskManage'
          answer1: null, // used during 'AskManage'
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
          inviteSelectionMessage: null,
          invitationMessage: null,
          ivitationSelection: null,
          scoringStyle: 1, // default value. radio1
          displayAnswers: 1, // default value. radio2
          showCheckMathMessage: false,
          result1: "",
          result2: "",
          result3: "",
          result4: "",
          result1start: 0,
          result2start: 0,
          result3start: 0,
        };
  }

   handleChange1(event) {
     this.setState({title: event.target.value});
   }
   handleChange2(event) {
     this.setState({category: event.target.value});
   }
    handleChange3(event) {
      this.setState({description: event.target.value});
    }
    handleChange4(event) {
      this.setState({invitee: event.target.value});
    }
    handleChange5(event) {
      this.setState({scoringStyle: event.target.value});
    }
    handleChange13(event) {
      this.setState({displayAnswers: event.target.value});
    }

    handleChange6(event) {
      this.setState({result1: event.target.value});
    }
    handleChange7(event) {
      this.setState({result2: event.target.value});
    }
    handleChange8(event) {
      this.setState({result3: event.target.value});
    }
    handleChange9(event) {
      this.setState({result4: event.target.value});
    }
    handleChange10(event) {
      this.setState({result1start: event.target.value});
    }
    handleChange11(event) {
      this.setState({result2start: event.target.value});
    }
    handleChange12(event) {
      this.setState({result3start: event.target.value});
    }


  handleSubmit1(event) {
    event.preventDefault();
    this.setState({showCheckMathMessage: false, sequenceNumber: 1}); // need to reset sequenceNumber to '1' when toggling edit
    if (this.state.result1start >= this.state.result2start && this.state.result2start >= this.state.result3start ) {
    this.postNewQset();
    this.setState({showInputBoxes: false, showQsetDetails: true, showAskFormQuestion: true, showCheckMathMessage: false,});
    }
    else {
        this.setState({showCheckMathMessage: true,});
    }
  }

  manageSequenceNumber() {
    this.state = {sequenceNumber: ++this.state.sequenceNumber};
    this.setState({sequenceNumber: this.state.sequenceNumber});
  }
  previousSequenceNumber() {
    if (this.state.sequenceNumber > 1) {
    this.state = {sequenceNumber: --this.state.sequenceNumber};
    this.setState({sequenceNumber: this.state.sequenceNumber});
    }
  }
  jumpToSequenceNumber(value) {
    if ( value > 0) {
    this.state = {sequenceNumber: value};
    this.setState({sequenceNumber: this.state.sequenceNumber});
    }
  }

   postNewQset() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { title: this.state.title, category: this.state.category, description: this.state.description,
         scoringStyle: this.state.scoringStyle, displayAnswers: this.state.displayAnswers,result1: this.state.result1, result2: this.state.result2, result3: this.state.result3, result4: this.state.result4,
          result1start: this.state.result1start, result2start: this.state.result2start, result3start: this.state.result3start,};
        axios.post("http://localhost:8080/qs/p?qsid=" + this.state.questionSetVersion, data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 200) {
        this.setState({isLoaded: true, questionSetVersion: response.data.id,
                  });
         } // end if
         else {
                this.setState({showIntro: false, showInputBoxes: false, showQsetDetails: false, showFinished: false,
                showAllDeleted: false, showAskFormQuestion: false, showManage: false,  showTooManyQsetsMessage: true, });
         };
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
   }

    startAnewQset() {
        this.setState({ maxQtyQuestions: 0, maxPointsTotal: 0, maximumPointsBefore: 0, questionSetVersion: 0, question: null, sequenceNumber: 1, answer1: null, answer2: null,
         answer3: null, answer4: null, answer5: null, answer6: null, answer1Points: null, answer2Points: null,
          answer3Points: null, answer4Points: null, answer5Points: null, answer6Points: null, title: "", description: "", result1: "",
          result2: "", result3: "", result4: "", result1start: "", result2start: "", result3start: "",
          scoringStyle: 1, displayAnswers: 1,});

          this.setState({ showIntro: false, showInputBoxes: true, showQsetDetails: false, showFinished: false,
                          showAllDeleted: false, showAskFormQuestion: false, showManage: false, showTooManyQsetsMessage: false,});
    }
    manageSets() {
        this.setState({showIntro: false, showInputBoxes: false, showQsetDetails: false, showFinished: false,
         showAllDeleted: false, showAskFormQuestion: false, showManage: true,  showTooManyQsetsMessage: false, });
    }


    toggleEditInputBoxes() {
        this.setState({showInputBoxes: true, showQsetDetails: false, showAskFormQuestion: true, showAskFormQuestion: false,  showTooManyQsetsMessage: false,});
    }

    finishedEntry() {
        this.setState({showQsetDetails: false, showAskFormQuestion: false, showFinished: true,  showTooManyQsetsMessage: false,});
    }
    editAgain() {
        this.setState({showFinished: false, showQsetDetails: true, showAskFormQuestion: true, showTooManyQsetsMessage: false,});
    }
    deleteAll() {
        if (window.confirm('Are you sure you want to delete this \n question set entirely?')) {
        this.deleteAllQuestions();
        this.setState({showQsetDetails: false});
        this.setState({showFinished: false});
        this.setState({showAskFormQuestion: false});
        this.setState({showInviteToScore: false});
        this.setState({showAllDeleted: true});
        }
    }
    inviteToScore() {
        this.setState({showInviteToScore: true,});
    }

    deleteAllQuestions() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: this.state.questionSetVersion };
        axios.post("http://localhost:8080/qs/da", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true,
                  });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

    inviteToScoreFriends() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = {typeNumber: 5};
        axios.post("http://localhost:8080/prm/sc/n?qsId=" + this.state.questionSetVersion, data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, inviteSelectionMessage: "Your friends" + " " + response.data.invitationMessage,
                  });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

    inviteToScoreColleagues() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = {typeNumber: 6};
        axios.post("http://localhost:8080/prm/sc/n?qsId=" + this.state.questionSetVersion, data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, inviteSelectionMessage: "Your colleagues" + " " + response.data.invitationMessage,
                  });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }
    inviteToScoreOther() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = {typeNumber: 7};
        axios.post("http://localhost:8080/prm/sc/n?qsId=" + this.state.questionSetVersion, data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, inviteSelectionMessage: "Your Other group" + " " + response.data.invitationMessage,
                  });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }
    inviteToScoreEveryone() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = {typeNumber: 4};
        axios.post("http://localhost:8080/prm/sc/n?qsId=" + this.state.questionSetVersion, data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, inviteSelectionMessage: "Your network" + " " + response.data.invitationMessage,
                  });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

    inviteToScoreIndividual() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = {typeNumber: 8, userName: this.state.invitee};
        axios.post("http://localhost:8080/prm/sc/o?qsId=" + this.state.questionSetVersion, data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, inviteSelectionMessage: this.state.invitee + " " + response.data.invitationMessage,
            invitee: "",
                  });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

    finalMax(value1, value2) {
        this.setState({maxQtyQuestions: value1, maxPointsTotal: value2});
    }

    // called from child AskManage
    manageAset(event) {
        const data = {qsetId: event.target.value}; //
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/q/f/" + data.qsetId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            question: response.data.question,
            questionSetVersion: response.data.questionSetVersionEntity.id,
            title: response.data.questionSetVersionEntity.title,
            category: response.data.questionSetVersionEntity.category,
            description: response.data.questionSetVersionEntity.description,
            //scoringStyle: response.data.questionSetVersion.scoringStyle, // not allowed. has a listener
            //displayAnswers: response.data.questionSetVersion.displayAnswers, // not allowed. has a listener
            maximumPointsBefore: response.data.maxPoints, // send to child AskFormQuestion so that maxPoints calculation correct.
            sequenceNumber: response.data.sequenceNumber,
            result1: response.data.questionSetVersionEntity.result1,
            result2: response.data.questionSetVersionEntity.result2,
            result3: response.data.questionSetVersionEntity.result3,
            result4: response.data.questionSetVersionEntity.result4,
            result1start: response.data.questionSetVersionEntity.result1start,
            result2start: response.data.questionSetVersionEntity.result2start,
            result3start: response.data.questionSetVersionEntity.result3start,
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
            this.getMaxQtyAndPoints();
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
        this.setState({showFinished: true, showInviteToScore: false, showManage: false});
    }

    // called from this.manageAset() for use during 'AskManage'
    getMaxQtyAndPoints() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/qs/q?sn=" + this.state.questionSetVersion,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            maxQtyQuestions: response.data.maxQtyQuestions,
            maxPointsTotal: response.data.maxPoints,
          });
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

    inviteToScoreSelector(event) {
        this.state = {invitationSelection: event.target.value};
        this.setState({invitationSelection: this.state.invitationSelection});
        if ( this.state.invitationSelection == "Friends") { this.setState({inviteSelectionMessage: "Invite all your friends? ",}) }
        else if ( this.state.invitationSelection == "Colleagues") { this.setState({inviteSelectionMessage: "Invite all your colleagues? ",}) }
        else if ( this.state.invitationSelection == "Other") { this.setState({inviteSelectionMessage: "Invite all 'Other'? ",}) }
        else if ( this.state.invitationSelection == "Everyone") { this.setState({inviteSelectionMessage: "Invite all your contacts? ",}) }
        else if ( this.state.invitationSelection != "" || "Friends" || "Colleagues" || "Other" || "Everyone") { this.setState({inviteSelectionMessage: "Invite " + event.target.value + "? "}) };
     }
    inviteToScoreSubmit() {
        if ( this.state.invitationSelection == "Friends") { this.inviteToScoreFriends() }
        else if ( this.state.invitationSelection == "Colleagues") { this.inviteToScoreColleagues() }
        else if ( this.state.invitationSelection == "Other") { this.inviteToScoreOther() }
        else if ( this.state.invitationSelection == "Everyone") { this.inviteToScoreEveryone() }
        else if ( this.state.invitationSelection != "") { this.inviteToScoreIndividual() }
    }


  render() {
    return (
    <React.Fragment>

      <div class="settings2ButtonsDiv">
        <button class="settingsButton" onClick={this.startAnewQset}> Create </button>
        <button class="settingsButton" onClick={this.manageSets}> Manage </button>
      </div>

      { this.state.showIntro &&
      <div class="topParentDiv">
        <p> Ask - Create </p>
        <p></p>
        <div class="secondParentDiv">
        <p>Create your own set of questions or manage an existing set you already created. Invite your contacts to answer. </p>
        <p> Note that deleting a set will also delete all the answers from all of your contacts. Deleting a question will delete all the answers for that question from all your contacts.</p>
         </div>
      </div> }

      { this.state.showInputBoxes &&
      <div class="topParentDiv">
        <p> Ask - Create </p>
        <p></p>
        <div class="secondParentDiv">
      <form onSubmit={this.handleSubmit1}>
          <div class="askDiv"><span class="askText">Title &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span> <input id="askForm1" type="text" maxlength="20" value={this.state.title} onChange={this.handleChange1} /> </div>
          <div class="askDiv"><span class="askText">Description &nbsp;</span> <input id="askForm2" type="text" maxlength="60" value={this.state.description} onChange={this.handleChange3} /></div>
          <br></br>
          <p class="questionsParagraph"> Scoring Style:</p>
          <form id="inviteRadio2">
                  <div>
                    <label><input value="1" onChange={this.handleChange5} type="radio" name="optradio" /> Score at Completion (default) </label>
                  </div>
                  <div>
                    <label><input value="2" onChange={this.handleChange5} type="radio" name="optradio" /> Continuous Scoring </label>
                  </div>
          </form>
          <br></br> <br></br>
          <p class="questionsParagraph"> View Answers:</p>
          <form id="inviteRadio2">
                  <div>
                    <label><input value="1" onChange={this.handleChange13} type="radio" name="optradio" /> Allow display of correct answers/highest score answer for each question at completion. (default) </label>
                  </div>
                  <div>
                    <label><input value="2" onChange={this.handleChange13} type="radio" name="optradio" /> Do not allow display of answers at completion </label>
                  </div>
          </form>

          <br></br> <br></br> <br></br>
          <div><p class="questionsParagraph">Optional: Scoring Levels (you can have 0, 1, 2, 3 or 4 levels)</p></div>
          <div>
          <input class="scoringLevelsInput1" value={this.state.result1} placeholder="Best/Top level description" type="text" onChange={this.handleChange6} maxLength="40" autoComplete="off" />
          <input class="scoringLevelsInput2" value={this.state.result1start} placeholder="1st level score start" type="number" type="text" onChange={this.handleChange10} max="1000" maxLength="4" step="1" autoComplete="off" />
          <p class="questionsDescriptionParagraph"> &nbsp; to Maximum Points </p>
          </div>
          <div>
          <input class="scoringLevelsInput1" value={this.state.result2} placeholder="2nd level description" type="text" onChange={this.handleChange7} maxLength="40" autoComplete="off" />
          <input class="scoringLevelsInput2" value={this.state.result2start} placeholder="2nd level start" type="number" type="text" onChange={this.handleChange11} max="999" maxLength="3" step="1" autoComplete="off" />
          <p class="questionsDescriptionParagraph"> &nbsp; to {+this.state.result1start-1} points </p>
          </div>
          <div>
          <input class="scoringLevelsInput1" value={this.state.result3} placeholder="3rd level description" type="text" onChange={this.handleChange8} maxLength="40" autoComplete="off" />
          <input class="scoringLevelsInput2" value={this.state.result3start} placeholder="3rd level start" type="number" type="text" onChange={this.handleChange12} max="999" maxLength="3" step="1" autoComplete="off" />
          <p class="questionsDescriptionParagraph"> &nbsp; to {+this.state.result2start-1} points </p>
          </div>
          <div>
          <input class="scoringLevelsInput1" value={this.state.result4} placeholder="4th level description" type="text" onChange={this.handleChange9} maxLength="40" autoComplete="off" />
          <p id="askFromZeroScoreParagraph"> 0 &nbsp;</p>
          <p class="questionsDescriptionParagraph"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; to {+this.state.result3start-1} points </p>
          </div>
          <button className="greenButton" type="submit" > Save </button><span> Next, Add/Edit questions. </span>
      </form>
        { this.state.showCheckMathMessage &&
        <p> Please check your input levels math. </p> }
        </div>
      </div> }

      { this.state.showQsetDetails &&
      <div class="topParentDiv">
        <p> Ask - Create </p>
        <p></p>
        <div class="secondParentDiv">
        <div><p class="firstP">Title: </p><p class="secondP">{this.state.title}</p></div>
        <div><p class="firstP">Description: </p><p class="secondP">{this.state.description}</p></div>
        <div><p class="firstP">Question Count: </p><p class="secondP">{this.state.maxQtyQuestions}</p></div>
        <div><p class="firstP">Max Points: </p><p class="secondP">{this.state.maxPointsTotal}</p></div>
        <button class="deleteScoreButton" onClick={this.deleteAll}> Cancel/Delete </button>
        <button class="inviteAuditButton" onClick={this.toggleEditInputBoxes}> Edit Headers </button>
        <button class="greenButton" onClick={this.finishedEntry}> Finish </button>
        </div>
      </div> }

      { this.state.showTooManyQsetsMessage &&
      <div class="topParentDiv">
        <p> Ask - Create </p>
        <p></p>
      <div class="secondParentDiv">
      <p> Sorry. You have already reached the 10 sets limit. You can delete one to free up space. </p>
      </div>
      </div> }

      { this.state.showFinished &&
      <div>
      <div class="topParentDiv">
        <p> Ask - Create/Manage - Saved Question Set</p>
        <p></p>
        <div class="secondParentDiv">
        <div><p class="firstP">Title: </p><p class="secondP">{this.state.title}</p></div>
        <div><p class="firstP">Description: </p><p class="secondP">{this.state.description}</p></div>
        <div><p class="firstP">Question Count: </p><p class="secondP">{this.state.maxQtyQuestions}</p></div>
        <div><p class="firstP">Max Points: </p><p class="secondP">{this.state.maxPointsTotal}</p></div>
        <button class="deleteScoreButton" onClick={this.deleteAll}> Cancel/Delete </button>
        <button class="inviteAuditButton" onClick={this.editAgain}> Edit This Set </button>
        <button class="greenButton" onClick={this.inviteToScore}> Invite </button><span> Invite your contacts to score too. </span>
        </div>
        </div>
            { this.state.showInviteToScore &&
            <div class="topParentDiv">
            <p> Invite to Score</p>
            <div class="secondParentDiv">
                <button class="inviteAuditButton" value="Friends" onClick={e => this.inviteToScoreSelector(e)} > All Friends </button>
                <button class="inviteAuditButton" value="Colleagues" onClick={e => this.inviteToScoreSelector(e)} > All Colleagues </button>
                <button class="inviteAuditButton" value="Other" onClick={e => this.inviteToScoreSelector(e)} > All Other </button>
                <button class="inviteAuditButton" value="Everyone"  onClick={e => this.inviteToScoreSelector(e)} > All Contacts </button>
                <div id="submitQsetInviteDiv">
                <input id="askForm1" placeholder=" (contact username)" autocomplete="off" type="text" maxlength="40" value={this.state.invitee} onChange={this.handleChange4} />
                <button class="inviteAuditButton" value={this.state.invitee} onClick={e => this.inviteToScoreSelector(e)} > Individual </button>
                </div>
                <div id="submitQsetInviteDiv">
                    <p id="submitQsetButtonSelectionP"> {this.state.inviteSelectionMessage} </p>
                    <button class="greenButton" onClick={this.inviteToScoreSubmit}> Submit</button>
                </div>
            </div>
            </div> }

      </div> }

      { this.state.showAllDeleted &&
      <div class="topParentDiv">
        <p> Ask - Deleted Question Set </p>
        <p></p>
        <div class="secondParentDiv">
        <div><p class="firstP">Title: </p><p class="secondP">{this.state.title}</p></div>
        <p>All questions and answers, including any of your contact's answers, have been deleted. </p>
        </div>
      </div> }

      { this.state.showAskFormQuestion &&
      <AskFormQuestion sequenceNumber={this.state.sequenceNumber} questionSetVersion={this.state.questionSetVersion} manageSequenceNumber={this.manageSequenceNumber} previousSequenceNumber={this.previousSequenceNumber} jumpToSequenceNumber={this.jumpToSequenceNumber} finalMax={this.finalMax} question={this.state.question}
      answer1={this.state.answer1} answer2={this.state.answer2} answer3={this.state.answer3} answer4={this.state.answer4} answer5={this.state.answer5} answer6={this.state.answer6}
       answer1Points={this.state.answer1Points} answer2Points={this.state.answer2Points} answer3Points={this.state.answer3Points} answer4Points={this.state.answer4Points} answer5Points={this.state.answer5Points} answer6Points={this.state.answer6Points}
        maxPointsTotal={this.state.maxPointsTotal} maximumPointsBefore={this.state.maximumPointsBefore} maxQtyQuestions={this.state.maxQtyQuestions}
        previousSequenceNumber={this.previousSequenceNumber}/>
      }

      { this.state.showManage &&
      <div>
        <AskManage manageAset={this.manageAset} />
      </div> }

    </React.Fragment>
    );
  }
}

export default AskFormQset;