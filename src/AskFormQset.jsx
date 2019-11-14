import React from "react";
import axios from 'axios';
import AskFormQuestion from "./AskFormQuestion";

class AskFormQset extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
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
    this.inviteToScoreConfirm = this.inviteToScoreConfirm.bind(this);
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
        };
  }

    componentDidMount() {

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
    this.state = {sequenceNumber: --this.state.sequenceNumber};
    this.setState({sequenceNumber: this.state.sequenceNumber});
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
         this.getQuestionSetVersionNumber(); //
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
        this.setState({showAskFormQuestion: false});
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
        // TODO
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
        let data = { id: this.state.questionSetVersion };
        axios.post("http://localhost:8080/prm//sc/n?qsId=" + this.state.questionSetVersion, data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true,
                  });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

    inviteToScoreColleagues() {
    }
    inviteToScoreOther() {
    }
    inviteToScoreEveryone() {
    }
    inviteToScoreConfirm() {
    }


  render() {
    return (
    <React.Fragment>
      { this.state.showIntro &&
      <div id="QsetInputBoxes">
        <p></p>
        <p> Welcome to Pose. Create your own set of questions and then invite your connections to answer. </p>
        <button onClick={this.startAnewQset}> Create  </button>
        <p></p>
        <p> Manage an existing set. Edit or delete.<br></br> Note that deleting a
         set will also delete the set and answers in all of your connection's ego pages whom you<br></br>
         gave permission to view. Editing will not affect your connection's answers (including points)</p>
        <button onClick={this.manageSets}> Manage  </button>
      </div> }

      { this.state.showInputBoxes &&
      <div id="QsetInputBoxes">
      <form onSubmit={this.handleSubmit1}>
          <div class="askDiv"><span class="askText">Title &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span> <input class="askForm" type="text" size="20" maxlength="20" value={this.state.title} onChange={this.handleChange1} /> </div>
          <div class="askDiv"><span class="askText">Category &nbsp; &nbsp; &nbsp;</span> <input class="askForm" type="text" size="20" maxlength="20" value={this.state.category} onChange={this.handleChange2} /></div>
          <div class="askDiv"><span class="askText">Description &nbsp;</span> <input class="askForm" type="text" size="70" maxlength="70" value={this.state.description} onChange={this.handleChange3} /></div>
          <input className="qbutton" type="submit" value="Add questions" /><span> </span>
      </form>
      </div> }

      { this.state.showQsetDetails &&
      <div id="QsetInputBoxes">
        <p>&nbsp; &nbsp; &nbsp; Title &nbsp; > &nbsp; {this.state.title} </p>
        <p>&nbsp; Category &nbsp; > &nbsp; {this.state.category} </p>
        <p>Description &nbsp; > &nbsp; {this.state.description} </p>
        <button onClick={this.toggleEditInputBoxes}> Change </button> <span> Edit Title, Category, or Description </span>
        <button onClick={this.deleteAll}> Cancel/Delete All </button>
        <button onClick={this.finishedEntry}> Finish </button>
      </div> }

      { this.state.showFinished &&
      <div id="QsetInputBoxes">
        <p>&nbsp; &nbsp; &nbsp; Title &nbsp; > &nbsp; {this.state.title} </p>
        <p>&nbsp; Category &nbsp; > &nbsp; {this.state.category} </p>
        <p>Description &nbsp; > &nbsp; {this.state.description} </p>
        <button onClick={this.deleteAll}> Cancel/Delete All </button>
        <button onClick={this.editAgain}> Edit Again </button>
        <button onClick={this.inviteToScore}> Invite contacts to score </button>
            { this.state.showInviteToScore &&
            <div>
                <button onClick={this.inviteToScoreFriends}> All Friends </button>
                <button onClick={this.inviteToScoreColleagues}> All Colleagues </button>
                <button onClick={this.inviteToScoreOther}> All Other </button>
                <button onClick={this.inviteToScoreEveryone}> All Connections </button>
                <button onClick={this.inviteToScoreIndividual}> Individual Contact </button>
                <button onClick={this.inviteToScoreConfirm}> Confirm Invitations </button>
            </div> }
      </div> }

      { this.state.showAllDeleted &&
      <div id="QsetInputBoxes">
        <p>&nbsp; &nbsp; &nbsp; Title &nbsp; > &nbsp; {this.state.title} </p>
        <p>Deleted. All questions and answers including those in your contact list who answered have been deleted. </p>
      </div> }

      { this.state.showAskFormQuestion &&
      <AskFormQuestion sequenceNumber={this.state.sequenceNumber} questionSetVersion={this.state.questionSetVersion} manageSequenceNumber={this.manageSequenceNumber} previousSequenceNumber={this.previousSequenceNumber} />
      }

    </React.Fragment>
    );
  }
}

export default AskFormQset;