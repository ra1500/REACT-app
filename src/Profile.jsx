import React from "react";
import TitleBar from "./TitleBar";
import axios from 'axios';
import ScoreUrl from "./ScoreUrl";
import ScoresList from "./ScoresList";
import QuestionSetsPrivateProfile from "./QuestionSetsPrivateProfile";
import ViewAudits from "./ViewAudits";
import UpdateUserInfo from "./UpdateUserInfo";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.manageAudit = this.manageAudit.bind(this);
    this.inviteToAuditFriends = this.inviteToAuditFriends.bind(this);
    this.inviteToAuditColleagues = this.inviteToAuditColleagues.bind(this);
    this.inviteToAuditOther = this.inviteToAuditOther.bind(this);
    this.inviteToAuditEveryone = this.inviteToAuditEveryone.bind(this);
    this.inviteToAuditIndividual = this.inviteToAuditIndividual.bind(this);
    this.viewAudits = this.viewAudits.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.goToUserSettings = this.goToUserSettings.bind(this);
    this.goToPrivateProfile = this.goToPrivateProfile.bind(this);
    this.state = {
        showLists: true,
        showManageAudit: false,
        showInviteToAudit: false,
        title: null,
        description: null,
        score: null,
        questionSetVersionEntityId: null,
        friend: null, // friend invited to audit. individual add.
        auditorsAddedMessage: null,
        showCompletedAudits: false,
        showSettingsButton: true,
        showSettingsSection: false,
        userName: JSON.parse(sessionStorage.getItem('tokens')).userName, // used in header only
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

    inviteToAudit(group) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { };
        axios.post("http://localhost:8080/a/fr/" + this.state.questionSetVersionEntityId + "/" + group,
        data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true,
          });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

    inviteToAuditIndividualFriend() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { userName: this.state.friend };
        axios.post("http://localhost:8080/a/in/" + this.state.questionSetVersionEntityId,
        data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true,
          });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

    handleChange(event) {
        this.setState({friend: event.target.value});
    }
    inviteToAuditFriends() {
        this.inviteToAudit("f");
        this.setState({auditorsAddedMessage:  "All your friends have been added as auditors"});
    }
    inviteToAuditColleagues() {
        this.inviteToAudit("c");
        this.setState({auditorsAddedMessage:  "All your Colleagues have been added as auditors"});
    }
    inviteToAuditOther() {
        this.inviteToAudit("o");
        this.setState({auditorsAddedMessage:  "All your 'other' contacts have been added as auditors"});
    }
    inviteToAuditEveryone() {
        this.inviteToAudit("e");
        this.setState({auditorsAddedMessage:  "All your contacts have been added as auditors"});
    }
    inviteToAuditIndividual() {
        this.inviteToAuditIndividualFriend();
        this.setState({auditorsAddedMessage: this.state.friend + " has been added as an auditor"});
    }
    viewAudits(event) {
        this.setState({questionSetVersionEntityId: event.target.value});
        this.setState({showLists: false, showCompletedAudits: true });
    }
    goToUserSettings() {
        this.setState({showSettingsSection: true, showLists: false,});
    }
    goToPrivateProfile() {
        this.setState({showSettingsSection: false, showLists: true,});
    }

   render() {
    return (
        <React.Fragment>
              <TitleBar />

              { this.state.showSettingsButton &&
              <div class="settingsButtionDiv">
                <button class="settingsButton" onClick={this.goToPrivateProfile}> My Good Stuff </button>
                <button class="settingsButton" onClick={this.goToUserSettings}> Settings </button>
              </div> }

              { this.state.showSettingsSection &&
              <div class="profilePage">
                <p> Settings </p>
                <ScoreUrl />
                <UpdateUserInfo />
              </div> }

              { this.state.showLists &&
              <div>
              <div id="NetworkSingleContactDiv">
              <span id="singleNetworkContactButtonP"> {this.state.userName}'s good stuff</span>
              </div>
              <div class="profilePage">
                <ScoresList manageAudit={this.manageAudit} viewAudits={this.viewAudits}/>
                <QuestionSetsPrivateProfile />
              </div>
              </div> }

              { this.state.showManageAudit &&
              <div class="profilePage">
                <p> Audits! Invite your contacts to audit your scores </p>
                <p> {this.state.title} {this.state.description} {this.state.score}</p>
              </div> }

            { this.state.showInviteToAudit &&
            <div class="profilePage">
                <button onClick={this.inviteToAuditFriends}> Friends </button>
                <button onClick={this.inviteToAuditColleagues}> Colleagues </button>
                <button onClick={this.inviteToAuditOther}> Other </button>
                <button onClick={this.inviteToAuditEveryone}> All Connections </button>
                <input class="askForm" type="text" size="20" maxlength="20" value={this.state.invitee} onChange={this.handleChange} />
                <button onClick={this.inviteToAuditIndividual}> Individual Contact </button>
                <p> {this.state.auditorsAddedMessage} </p>
            </div> }

            { this.state.showCompletedAudits &&
            <div class="profilePage">
                <ViewAudits questionSetVersionEntityId={this.state.questionSetVersionEntityId} />
            </div> }

        </React.Fragment>
    ); // end return
   }
}

export default Profile;