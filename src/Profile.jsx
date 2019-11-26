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
        this.setState({showLists: false, showInviteToAudit: true,});
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
        if (window.confirm('Please confirm audit invitation to\n your friends.')) {
        this.inviteToAudit("f");
        this.setState({auditorsAddedMessage:  "Your friends have been invited to audit your answers"});
        }
    }
    inviteToAuditColleagues() {
        if (window.confirm('Please confirm audit invitation to\n your colleagues.')) {
        this.inviteToAudit("c");
        this.setState({auditorsAddedMessage:  "Your colleagues have been invited to audit your answers"});
        }
    }
    inviteToAuditOther() {
        if (window.confirm('Please confirm audit invitation to\n your Other group.')) {
        this.inviteToAudit("o");
        this.setState({auditorsAddedMessage:  "Your 'Other' group has been invited to audit your answers"});
        }
    }
    inviteToAuditEveryone() {
        if (window.confirm('Please confirm audit invitation to\n your network.')) {
        this.inviteToAudit("e");
        this.setState({auditorsAddedMessage:  "Your network has been invited to audit your answers"});
        }
    }
    inviteToAuditIndividual() {
        if (window.confirm('Please confirm audit invitation to\n single connection.')) {
        this.inviteToAuditIndividualFriend();
        this.setState({auditorsAddedMessage: this.state.friend + " has been invited to audit your answers"});
        }
    }
    viewAudits(event) {
        this.setState({questionSetVersionEntityId: event.target.value});
        this.setState({showLists: false, showCompletedAudits: true });
    }
    goToUserSettings() {
        this.setState({showSettingsSection: true, showLists: false, showCompletedAudits: false, showInviteToAudit: false,});
    }
    goToPrivateProfile() {
        this.setState({showSettingsSection: false, showLists: true, showCompletedAudits: false, showInviteToAudit: false,});
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

              { this.state.showInviteToAudit &&
              <div class="profilePage">
                <p> Invite Auditors </p>
                <p></p>

              <div class="invitationForm">
                    <div>
                    <p class="questionsParagraph"> Title: &nbsp;{this.state.title} </p>
                    <p class="questionsDescriptionParagraph"> Description: &nbsp;{this.state.description}</p>
                    <p class="questionsParagraph">Score: &nbsp;{this.state.score}</p>
                    </div>

                    <div>
                    <br></br>
                    <button class="inviteAuditButton" onClick={this.inviteToAuditFriends}> Friends </button>
                    <button class="inviteAuditButton" onClick={this.inviteToAuditColleagues}> Colleagues </button>
                    <button class="inviteAuditButton" onClick={this.inviteToAuditOther}> Other </button>
                    <button class="inviteAuditButton" onClick={this.inviteToAuditEveryone}> Network </button>
                    <div>
                    <input class="askForm" placeholder="username of contact" type="text" size="20" maxlength="20" value={this.state.invitee} onChange={this.handleChange} />
                    <button class="inviteAuditButton" onClick={this.inviteToAuditIndividual}> Individual </button>
                    </div>
                    <p> {this.state.auditorsAddedMessage} </p>
                    </div>
              </div>
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