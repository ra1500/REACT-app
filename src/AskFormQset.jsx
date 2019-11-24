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
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.toggleEditInputBoxes = this.toggleEditInputBoxes.bind(this);
    this.finishedEntry = this.finishedEntry.bind(this);
    this.editAgain = this.editAgain.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.manageSequenceNumber = this.manageSequenceNumber.bind(this);
    this.previousSequenceNumber = this.previousSequenceNumber.bind(this);
    this.startAnewQset = this.startAnewQset.bind(this);
    this.manageSets = this.manageSets.bind(this);
    this.inviteToScore = this.inviteToScore.bind(this);
    this.inviteToScoreFriends = this.inviteToScoreFriends.bind(this);
    this.inviteToScoreColleagues = this.inviteToScoreColleagues.bind(this);
    this.inviteToScoreOther = this.inviteToScoreOther.bind(this);
    this.inviteToScoreEveryone = this.inviteToScoreEveryone.bind(this);
    this.inviteToScoreIndividual = this.inviteToScoreIndividual.bind(this);
    this.jumpToSequenceNumber = this.jumpToSequenceNumber.bind(this);
    this.finalMax = this.finalMax.bind(this);
    this.manageAset = this.manageAset.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
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
          invitationCompletedMessage: null,
          showInvitationCompleted: false,
          invitee: null,
          showInvitationCompletedIndividual: false,
          maxQtyQuestions: 0,
          maxPointsTotal: 0,
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

  handleSubmit1(event) {
    event.preventDefault();
    this.postNewQset();
    this.setState({showInputBoxes: false});
    this.setState({showQsetDetails: true});
    this.setState({showAskFormQuestion: true});
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
        let data = { title: this.state.title, category: this.state.category, description: this.state.description, };
        axios.post("http://localhost:8080/qs/p?qsid=" + this.state.questionSetVersion, data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, questionSetVersion: response.data.id,
                  });
         //this.getQuestionSetVersionNumber(); //
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
   }

    startAnewQset() {
        this.setState({showIntro: false});
        this.setState({showInputBoxes: true});
    }

    toggleEditInputBoxes() {
        this.setState({showInputBoxes: true});
        this.setState({showQsetDetails: false});
        this.setState({showAskFormQuestion: true});
    }

    finishedEntry() {
        this.setState({showQsetDetails: false});
        this.setState({showAskFormQuestion: false});
        this.setState({showFinished: true});
    }
    editAgain() {
        this.setState({showFinished: false});
        this.setState({showQsetDetails: true});
        this.setState({showAskFormQuestion: true});
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

    manageSets() {
        this.setState({showIntro: false});
        this.setState({showManage: true});
    }

    inviteToScore() {
        this.setState({showInviteToScore: true});
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
        this.setState({isLoaded: true, showInvitationCompleted: true, showFinished: false, showInviteToScore: false,
            invitationCompletedMessage: "Your friends can now see your new question set on their score page",
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
        this.setState({isLoaded: true, showInvitationCompleted: true, showFinished: false, showInviteToScore: false,
            invitationCompletedMessage: "Your colleagues can now see your new question set on their score page",
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
        this.setState({isLoaded: true, showInvitationCompleted: true, showFinished: false, showInviteToScore: false,
            invitationCompletedMessage: "Your 'Other' group can now see your new question set on their score page",
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
        this.setState({isLoaded: true, showInvitationCompleted: true, showFinished: false, showInviteToScore: false,
            invitationCompletedMessage: "Your connections can now see your new question set on their score page",
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
        this.setState({isLoaded: true, showInvitationCompletedIndividual: true, showFinished: false, showInviteToScore: false,
            invitationCompletedMessage: this.state.invitee + " can now see your new question set on their score page",
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
            this.setState({showFinished: true});
            this.getMaxQtyAndPoints();
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
        this.setState({showFinished: true, showManage: false});
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
          this.renderQuestions(); // ********
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }


  render() {
    return (
    <React.Fragment>

      <div class="settingsButtionDiv">
        <button class="settingsButton" onClick={this.startAnewQset}> Create </button>
        <button class="settingsButton" onClick={this.manageSets}> Manage </button>
      </div>

      { this.state.showIntro &&
      <div class="profilePage">
        <p> Ask Your Network </p>
        <p></p>
        <div class="invitationForm">
        <p>Create your own set of questions and then invite your connections to answer. </p>
        <p> 40 questions maximum. 10 sets per user maximum.</p>
        <p> Also, manage an existing set you already created. Edit or delete it. Note that deleting a
         set will also delete the set and answers in all of your connection's ego pages whom you<br></br>
         gave permission to view. Editing will not affect your connection's answers (including points).</p>
         </div>
      </div> }

      { this.state.showInputBoxes &&
      <div class="profilePage">
        <p> Ask Your Network </p>
        <p></p>
        <div class="invitationForm">
      <form onSubmit={this.handleSubmit1}>
          <div class="askDiv"><span class="askText">Title &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span> <input id="askForm1" type="text" maxlength="20" value={this.state.title} onChange={this.handleChange1} /> </div>
          <div class="askDiv"><span class="askText">Description &nbsp;</span> <input id="askForm2" type="text" maxlength="70" value={this.state.description} onChange={this.handleChange3} /></div>
          <br></br>
          <button className="titleButton" type="submit" > Save </button><span> Next, Add/Edit questions. </span>
      </form>
        </div>
      </div> }

      { this.state.showQsetDetails &&
      <div class="profilePage">
        <p> Pose Your Network </p>
        <p></p>
        <div class="invitationForm">
        <div><p class="firstP">Title: </p><p class="secondP">{this.state.title}</p></div>
        <div><p class="firstP">Description: </p><p class="secondP">{this.state.description}</p></div>
        <div><p class="firstP">Question Count: </p><p class="secondP">{this.state.maxQtyQuestions}</p></div>
        <div><p class="firstP">Max Points: </p><p class="secondP">{this.state.maxPointsTotal}</p></div>
        <button class="inviteAuditButton" onClick={this.toggleEditInputBoxes}> Edit </button>
        <button class="deleteScoreButton" onClick={this.deleteAll}> Cancel/Delete </button>
        <button class="titleButton" onClick={this.finishedEntry}> Finish </button>
        </div>
      </div> }

      { this.state.showFinished &&
      <div class="profilePage">
        <p> Saved Question Set</p>
        <p></p>
        <div class="invitationForm">
        <div><p class="firstP">Title: </p><p class="secondP">{this.state.title}</p></div>
        <div><p class="firstP">Description: </p><p class="secondP">{this.state.description}</p></div>
        <div><p class="firstP">Question Count: </p><p class="secondP">{this.state.maxQtyQuestions}</p></div>
        <div><p class="firstP">Max Points: </p><p class="secondP">{this.state.maxPointsTotal}</p></div>
        <button class="deleteScoreButton" onClick={this.deleteAll}> Cancel/Delete </button>
        <button class="inviteAuditButton" onClick={this.editAgain}> Edit </button>
        <button class="titleButton" onClick={this.inviteToScore}> Invite </button><span> Invite your contacts to score too. </span>
            { this.state.showInviteToScore &&
            <div>
                <button class="titleButton" onClick={this.inviteToScoreFriends}> All Friends </button>
                <button class="titleButton" onClick={this.inviteToScoreColleagues}> All Colleagues </button>
                <button class="titleButton" onClick={this.inviteToScoreOther}> All Other </button>
                <button class="titleButton" onClick={this.inviteToScoreEveryone}> All Connections </button>
                <input class="askForm" type="text" size="70" maxlength="70" value={this.state.invitee} onChange={this.handleChange4} />
                <button class="titleButton" onClick={this.inviteToScoreIndividual}> Individual Contact </button>
            </div> }
      </div>
      </div> }

      { this.state.showAllDeleted &&
      <div class="profilePage">
        <p> Deleted Question Set </p>
        <p></p>
        <div class="invitationForm">
        <div><p class="firstP">Title: </p><p class="secondP">{this.state.title}</p></div>
        <p>All questions and answers, including any of your contact's answers, have been deleted. </p>
        </div>
      </div> }

      { this.state.showAskFormQuestion &&
      <AskFormQuestion sequenceNumber={this.state.sequenceNumber} questionSetVersion={this.state.questionSetVersion} manageSequenceNumber={this.manageSequenceNumber} previousSequenceNumber={this.previousSequenceNumber} jumpToSequenceNumber={this.jumpToSequenceNumber} finalMax={this.finalMax} question={this.state.question}
      answer1={this.state.answer1} answer2={this.state.answer2} answer3={this.state.answer3} answer4={this.state.answer4} answer5={this.state.answer5} answer6={this.state.answer6}
       answer1Points={this.state.answer1Points} answer2Points={this.state.answer2Points} answer3Points={this.state.answer3Points} answer4Points={this.state.answer4Points} answer5Points={this.state.answer5Points} answer6Points={this.state.answer6Points} />
      }

      { this.state.showInvitationCompleted &&
      <div id="QsetInputBoxes">
        <p>&nbsp; &nbsp; &nbsp; Title &nbsp; > &nbsp; {this.state.title} </p>
        <p>{this.state.invitationCompletedMessage}</p>
      </div> }

      { this.state.showInvitationCompletedIndividual &&
      <div id="QsetInputBoxes">
        <p>&nbsp; &nbsp; &nbsp; Title &nbsp; > &nbsp; {this.state.title} </p>
        <p>{this.state.invitationCompletedMessage}</p>
        <p> Add another contact: </p>
        <input class="askForm" type="text" size="70" maxlength="70" value={this.state.invitee} onChange={this.handleChange4} />
        <button onClick={this.inviteToScoreIndividual}> Individual Contact </button>
      </div> }

      { this.state.showManage &&
      <div>
        <AskManage manageAset={this.manageAset} />
      </div> }

    </React.Fragment>
    );
  }
}

export default AskFormQset;