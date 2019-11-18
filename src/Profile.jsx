import React from "react";
import TitleBar from "./TitleBar";
import axios from 'axios';
import ScoreUrl from "./ScoreUrl";
import ScoresList from "./ScoresList";
import QuestionSetsPrivateProfile from "./QuestionSetsPrivateProfile";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.manageAudit = this.manageAudit.bind(this);
    this.inviteToAuditFriends = this.inviteToAuditFriends.bind(this);
    //this.inviteToAuditColleagues = this.inviteToAuditColleagues.bind(this);
    //this.inviteToAuditOther = this.inviteToAuditOther.bind(this);
    //this.inviteToAuditEveryone = this.inviteToAuditEveryone.bind(this);
    this.state = {
        showLists: true,
        showManageAudit: false,
        showInviteToAudit: false,
        title: null,
        description: null,
        score: null,
        questionSetVersionEntityId: null,
        };
    };

    manageAudit(event) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/prm/sc/dg?id=" + event.target.value,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            title: response.data.questionSetVersionEntity.title,
            description: response.data.questionSetVersionEntity.description,
            score: response.data.score,
            questionSetVersionEntityId: response.data.questionSetVersionEntity.id,
          });
        this.setState({showLists: false, showManageAudit: true, showInviteToAudit: true,});
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

    inviteToAuditFriends() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { };
        axios.post("http://localhost:8080/a/fr/" + this.state.questionSetVersionEntityId,
        data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true,
          });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }


   render() {
    return (
        <React.Fragment>
              <TitleBar />

              { this.state.showLists &&
              <div id="QsetInputBoxes">
                <ScoresList manageAudit={this.manageAudit} />
                <QuestionSetsPrivateProfile />
                <ScoreUrl />
              </div> }

              { this.state.showManageAudit &&
              <div id="QsetInputBoxes">
                <p> Audits! Invite your contacts to audit your scores </p>
                <p> {this.state.title} {this.state.description} {this.state.score}</p>
              </div> }

            { this.state.showInviteToAudit &&
            <div>
                <button onClick={this.inviteToAuditFriends}> Friends </button>
                <button onClick={this.inviteToAuditColleagues}> Colleagues </button>
                <button onClick={this.inviteToAuditOther}> Other </button>
                <button onClick={this.inviteToAuditEveryone}> All Connections </button>
                <input class="askForm" type="text" size="20" maxlength="20" value={this.state.invitee} onChange={this.handleChange4} />
                <button onClick={this.inviteToAuditIndividual}> Individual Contact </button>
            </div> }

        </React.Fragment>
    ); // end return
   }
}

export default Profile;