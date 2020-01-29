import React from "react";
import TitleBar from "./TitleBar";
import axios from 'axios';
import ScoreUrl from "./ScoreUrl";
import ScoresList from "./ScoresList";
import QuestionSetsPrivateProfile from "./QuestionSetsPrivateProfile";
import ViewAudits from "./ViewAudits";
import ViewAuditsDetails from "./ViewAuditsDetails";
import UpdateUserInfo from "./UpdateUserInfo";
import Picture from "./Picture";
import ProfileText from "./ProfileText";


class Profile extends React.Component {
  constructor(props) {
    super(props);
    //this.manageAudit = this.manageAudit.bind(this);
    this.deleteSection = this.deleteSection.bind(this);
    this.inviteSection = this.inviteSection.bind(this);
    this.inviteToAuditFriends = this.inviteToAuditFriends.bind(this);
    this.inviteToAuditColleagues = this.inviteToAuditColleagues.bind(this);
    this.inviteToAuditOther = this.inviteToAuditOther.bind(this);
    this.inviteToAuditEveryone = this.inviteToAuditEveryone.bind(this);
    this.inviteToAuditIndividual = this.inviteToAuditIndividual.bind(this);
    this.viewAudits = this.viewAudits.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.goToUserSettings = this.goToUserSettings.bind(this);
    this.goToPrivateProfile = this.goToPrivateProfile.bind(this);
    this.renderSingleScore = this.renderSingleScore.bind(this);
    this.getAuditDetails = this.getAuditDetails.bind(this);
    this.deleteProfilePicture = this.deleteProfilePicture.bind(this);
    this.getProfilePicture = this.getProfilePicture.bind(this);
    this.state = {
        isLoaded: null,
        showLists: true,
        showInviteToAudit: false,
        title: null,
        description: null,
        score: null,
        questionSetVersionEntityId: null,
        friend: null, // friend invited to audit. individual add.
        auditorsAddedMessage: null,
        showCompletedAudits: false,
        showCompletedAuditsDetails: false,
        showSettingsButton: true,
        showSettingsSection: false,
        showIndividualScore: false,
        showAuditList: false,
        showAuditListDetails: false,
        showDeleted: false,
        permissionId: null, // used to delete the score permission
        auditorName: null,
        userName: JSON.parse(sessionStorage.getItem('tokens')).userName, // used in header only
        auditCount: null,
        isAudited: null, // used to indicate if the single selected qset has been invited for audit
        isAuditedMessage: null,
        //showPicture: false,
        profilePicture: "./profiledefault.jpg",
        profileTitle: null,
        profileBlurb: null,
        profileEducation: null,
        profileOccupation: null,
        profileRelationshipStatus: null,
        profileLocation: null,
        profileContactInfo: null,
        education2: null,
        relationshipStatus2: null,
        };
    };

  componentDidMount() {
    this.getProfilePicture();
    this.getProfileText();
  }

    inviteToAudit(group) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { };
        axios.post("http://localhost:8080/api/a/fr/" + this.state.questionSetVersionEntityId + "/" + group,
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
        axios.post("http://localhost:8080/api/a/in/" + this.state.questionSetVersionEntityId,
        data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, auditorsAddedMessage: this.state.friend + " " + response.data.invitationMessage,
          });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

    deleteScore() {
      if (window.confirm('Are you sure you want to delete\nthis from your profile? \n(All reviews will also be deleted)')) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        const data = {id: this.state.permissionId};
        axios.post("http://localhost:8080/api/prm/sc/dl", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            list: response.data,
            showDeleted: true,
          });
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
      }
    }

    getAuditCount(value) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/a/ac/" + value,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            auditCount: response.data.auditCount,
            isAudited: response.data.isAudited,
          });
        if (response.data.isAudited === 1) (this.setState({isAuditedMessage:  "Reviewers invited."}));
               }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
               });
    }

  getProfilePicture() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u +':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    axios({
      method: 'get',
      url: "http://localhost:8080/api/files/f?fnm=1",
      responseType: 'blob',
      headers : { 'Authorization' : Basic },
    })
    .then((response) => {
        const file = new Blob([response.data], {type:'image/jpg'});
        const imgUrl = window.URL.createObjectURL(file);
      this.setState({
        isLoaded: true,
        profilePicture: imgUrl,
        //showPicture: true,
      });
           }).catch(error => {this.setState({ isLoaded: true, error, });
           });
    }

  deleteProfilePicture() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u +':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    axios({
      method: 'post',
      url: "http://localhost:8080/api/files/h?fnm=1",
      headers : { 'Authorization' : Basic },
    })
    .then((response) => {
      this.setState({
        isLoaded: true,
      });
      this.getProfilePicture();
           }).catch(error => {this.setState({ isLoaded: true, error, });
           });
    }

  getProfileText() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u +':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    axios.get("http://localhost:8080/api/user/pr",
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
      this.setState({
        isLoaded: true,
        profileTitle: response.data.title,
        profileBlurb: response.data.blurb,
        profileEducation: response.data.education,
        profileOccupation: response.data.occupation,
        profileRelationshipStatus: response.data.relationshipStatus,
        profileLocation: response.data.location,
        profileContactInfo: response.data.contactInfo,
      });
      if (response.data.education === 1) {this.setState({education2: "High School"})};
      if (response.data.education === 2) {this.setState({education2: "College"})};
      if (response.data.education === 3) {this.setState({education2: "Masters"})};
      if (response.data.education === 4) {this.setState({education2: "Phd or MD"})};
      if (response.data.education === 5) {this.setState({education2: "Irrelevant"})};
      if (response.data.relationshipStatus === 1) {this.setState({relationshipStatus2: "Available"})};
      if (response.data.relationshipStatus === 2) {this.setState({relationshipStatus2: "Not Available"})};
      if (response.data.relationshipStatus === 3) {this.setState({relationshipStatus2: "Irrelevant"})};
           }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
           });
    }

    handleChange(event) {
        this.setState({friend: event.target.value});
    }
    inviteToAuditFriends() {
        if (window.confirm('Please confirm review invitation to\n your friends.')) {
        this.inviteToAudit("f");
        this.setState({auditorsAddedMessage:  "Your friends have been invited to review your answers"});
        }
    }
    inviteToAuditColleagues() {
        if (window.confirm('Please confirm review invitation to\n your colleagues.')) {
        this.inviteToAudit("c");
        this.setState({auditorsAddedMessage:  "Your colleagues have been invited to review your answers"});
        }
    }
    inviteToAuditOther() {
        if (window.confirm('Please confirm review invitation to\n your Other group.')) {
        this.inviteToAudit("o");
        this.setState({auditorsAddedMessage:  "Your 'Other' group has been invited to review your answers"});
        }
    }
    inviteToAuditEveryone() {
        if (window.confirm('Please confirm review invitation to\n your network.')) {
        this.inviteToAudit("e");
        this.setState({auditorsAddedMessage:  "Your network has been invited to review your answers"});
        }
    }
    inviteToAuditIndividual() {
        if (window.confirm('Please confirm review invitation to\n individual contact.')) {
        this.inviteToAuditIndividualFriend();
        }
    }

    viewAudits() {
        this.setState({showLists: false, showCompletedAudits: true, showInviteToAudit: false, showAuditListDetails2: true, showCompletedAuditsDetails: false, });
    }
    goToUserSettings() {
        this.setState({showSettingsSection: true, showLists: false, showCompletedAudits: false, showInviteToAudit: false, showIndividualScore: false, showCompletedAuditsDetails: false,});
    }
    goToPrivateProfile() {
        this.getProfileText();
        this.setState({showSettingsSection: false, showLists: true, showCompletedAudits: false, showInviteToAudit: false, showIndividualScore: false, showCompletedAuditsDetails: false, showDeleted: false,});
    }
    renderSingleScore(id ,questionSetVersionEntityId, title, description, score, e) {
        this.setState({permissionId: id ,questionSetVersionEntityId: questionSetVersionEntityId, title: title, description: description, score: score});
        this.setState({showSettingsSection: false, showLists: false, showCompletedAudits: false, showInviteToAudit: false, showIndividualScore: true,});
        this.getAuditCount(questionSetVersionEntityId);
    }
    inviteSection() {
         if (this.state.auditCount > 3) { this.setState({showSettingsSection: false, showLists: false, showCompletedAudits: false, showInviteToAudit: false, showCompletedAuditsDetails: false,}); }
         else { this.setState({showSettingsSection: false, showLists: false, showCompletedAudits: false, showInviteToAudit: true, showCompletedAuditsDetails: false,}); }
    }
    deleteSection() {
        this.deleteScore();
        this.setState({showSettingsSection: false, showLists: false, showCompletedAudits: false, showInviteToAudit: false, showCompletedAuditsDetails: false,});
    }
    getAuditDetails(event) {
        this.setState({auditorName: event.target.value,});
        this.setState({showCompletedAuditsDetails: true, showSettingsSection: false, showLists: false, showCompletedAudits: false, showInviteToAudit: false, });
    }

   render() {
    return (
        <React.Fragment>
              <TitleBar />

              { this.state.showSettingsButton &&
              <div class="settings2ButtonsDiv">
                <button class="settingsButton" onClick={this.goToPrivateProfile}> Profile </button>
                <button class="settingsButton" onClick={this.goToUserSettings}> Edit & Settings </button>
              </div> }

              { this.state.showSettingsSection &&
              <div class="topParentDiv">
                <p> My Profile: Edit & Settings </p>
                <Picture profilePicture={this.state.profilePicture} getProfilePicture={this.getProfilePicture} deleteProfilePicture={this.deleteProfilePicture} />
                <ProfileText />
                <ScoreUrl />
                <UpdateUserInfo />
              </div> }

              { this.state.showLists &&
              <div>
              <div class="NetworkSingleContactDiv">
              <p> My Profile</p>
              </div>
              <div class="topParentDiv">

                <div>

                <img id="profilePic" src={this.state.profilePicture}></img>

                <div class="scoresListTD">
                <p class="secondP"> Title: {this.state.profileTitle} </p><br></br>
                <p class="secondP"> About Me: {this.state.profileBlurb} </p><br></br>
                <p class="secondP"> Location: {this.state.profileLocation} </p><br></br>
                <p class="secondP"> Contact Details: {this.state.profileContactInfo} </p><br></br>
                <p class="secondP"> Relationship Status: {this.state.relationshipStatus2} </p>
                </div>
                </div>

                <ScoresList renderSingleScore={this.renderSingleScore} />
                <QuestionSetsPrivateProfile />
              </div>
              </div> }

              { this.state.showIndividualScore &&
              <div>
              <div class="NetworkSingleContactDiv">
              <p> My Profile: Profile - {this.state.userName} - {this.state.title}</p>
              </div>

              { !this.state.showDeleted &&
              <div class="topParentDiv">
                <button class="singleNetworkContactButton" onClick={this.deleteSection}> Delete </button>
                <button class="singleNetworkContactButton" onClick={this.inviteSection}> Invite Reviewers </button>
                <button class="singleNetworkContactButton" onClick={this.viewAudits}> Reviews </button>
              </div> }

               { this.state.showDeleted &&
               <div class="topParentDiv">
                <p id="deletedScorePostP"> Score Deleted </p>
               </div> }

              <div class="topParentDiv">
              <div class="secondParentDiv">
                <p class="questionsParagraph"> Title: &nbsp;{this.state.title} </p>
                <p class="questionsDescriptionParagraph"> Description: &nbsp;{this.state.description}</p>
                <p class="questionsParagraph">Score: &nbsp;{this.state.score}</p> <br></br>
                <p id="deletedScorePostP"> {this.state.isAuditedMessage} </p>
                <p class="alertsSmallP"> ({this.state.auditCount} of 4 review sets per account used. You can free up space by deleting one of your posted scores that has review invitations.)</p>
              </div>
              </div>
              </div> }

              { this.state.showInviteToAudit &&
              <div>
              <div class="topParentDiv">
              <div class="secondParentDiv">
                    <p> Invite Reviewers </p><br></br>
                    <div>
                      <button class="inviteAuditButton" onClick={this.inviteToAuditFriends}> Friends </button>
                      <button class="inviteAuditButton" onClick={this.inviteToAuditColleagues}> Colleagues </button>
                      <button class="inviteAuditButton" onClick={this.inviteToAuditOther}> Other </button>
                      <button class="inviteAuditButton" onClick={this.inviteToAuditEveryone}> All Contacts </button>
                      <p></p>
                      <div>
                        <input class="askForm" placeholder="username of contact" type="text" maxlength="100" value={this.state.invitee} onChange={this.handleChange} />
                        <button class="inviteAuditButton" onClick={this.inviteToAuditIndividual}> Individual </button>
                      </div>
                    <p id="deletedScorePostP"> {this.state.auditorsAddedMessage} </p>
                    </div>
              </div>
              </div>
              </div> }

            { this.state.showCompletedAudits &&
            <div>
            <div class="topParentDiv">
              <div class="secondParentDiv">
                <p>Reviews </p>
                <ViewAudits questionSetVersionEntityId={this.state.questionSetVersionEntityId} getAuditDetails={this.getAuditDetails} />
            </div>
            </div>
            </div> }

            { this.state.showCompletedAuditsDetails &&
            <div>
            <div class="topParentDiv">
              <div class="secondParentDiv">
                <p>Review Details by {this.state.auditorName} </p>
                <ViewAuditsDetails questionSetVersionEntityId={this.state.questionSetVersionEntityId}  auditorName={this.state.auditorName} />
            </div>
            </div>
            </div> }



        </React.Fragment>
    ); // end return
   }
}

export default Profile;