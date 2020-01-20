import React from "react";
import axios from 'axios';
import ScoresNetworkContactPages from "./ScoresNetworkContactPages";
import AuditQuestions from "./AuditQuestions";
import ManageMyContacts from "./ManageMyContacts";
import NetworkContactAudit from "./NetworkContactAudit";
import QuestionSetsNetworkProfile from "./QuestionSetsNetworkProfile";

class NetworkContactPages extends React.Component {
  constructor(props) {
    super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.goToAudit = this.goToAudit.bind(this);
        this.goToContactSettings = this.goToContactSettings.bind(this);
        this.goToGoodStuff = this.goToGoodStuff.bind(this);
        this.auditMe = this.auditMe.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          profilePicture: "./profiledefault.jpg",
          friendId: this.props.friendId,
          friend: null,
          connectionType: null,
          connectionStatus: null,
          visibilityPermission: null,
          inviter: null,
          isAfriend: false,
          hasPendingInvitations: false,
          showQuestionSetAuditing: false,
          showAuditQuestions: false,
          showContactScores: false,
          invitationStatusMessage: null,
          showUpdateButton: false,
          isInvitee: false,
          isInviter: false,
          userName: null, // used in determining who is the 'inviter'
        };
  }

    componentDidMount() {
        this.getSingleFriendship();
        this.getProfilePicture();
    }

    getSingleFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/f/" + this.props.friendId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            inviter: response.data.inviter,
            connectionStatus: response.data.connectionStatus,
            connectionType: response.data.connectionType,
            visibilityPermission: response.data.visibilityPermission,
            friend: response.data.friend,
            friendId: response.data.id,
            userName: u,
          });
        this.isAFriendOrInvitation();
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  isAFriendOrInvitation() {
    if (this.state.connectionStatus == "pending" && this.state.inviter != this.state.userName) {
        this.setState({isAfriend: false, hasPendingInvitations: true, isInvitee: true, isInviter: false, showUpdateButton: true,});
     }
    else if (this.state.connectionStatus == "pending" && this.state.inviter == this.state.userName) {
        this.setState({isAfriend: false, hasPendingInvitations: true, isInvitee: false, isInviter: true ,showUpdateButton: false,});
     }
    else {
        this.setState({isAfriend: true, hasPendingInvitations: false, showContactScores: true,});
    }
  }

    goToContactSettings() {
        this.setState({showQuestionSetAuditing: false, isAfriend: false, hasPendingInvitations: false, showSettings: true, showAuditQuestions: false,});
    }
    goToAudit() {
        this.setState({ showQuestionSetAuditing: true, isAfriend: true, hasPendingInvitations: false, showSettings: false, showContactScores: false, showAuditQuestions: false,});
    }
    goToGoodStuff() {
        this.setState({showQuestionSetAuditing: false, isAfriend: false, showSettings: false, showAuditQuestions: false,});
        this.isAFriendOrInvitation();
    }
    auditMe(event) {
        this.setState({showQuestionSetAuditing: false, showAuditQuestions: true,});
        this.setState({questionSetVersionEntityId: event.target.value});
    }


   handleChange(event) {
     this.setState({connectionStatus: event.target.value});
   }
  handleSubmit(event) {
    this.patchFriendship();
    event.preventDefault();
  }

    // accept/decline friendship
    patchFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: this.state.friendId, connectionStatus: this.state.connectionStatus, inviter: this.state.inviter,
         connectionType: this.state.connectionType, visibilityPermission: this.state.visibilityPermission };
        axios.post("http://localhost:8080/api/f/a", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, showUpdateButton: false,
                  });
         if (response.data.connectionStatus == "Connected") { this.setState({invitationStatusMessage: "You are now connected to " + this.state.friend}) }
         if (response.data.connectionStatus == "Removed") { this.setState({invitationStatusMessage: "You have removed " + this.state.friend}) }
               }).catch(error => {this.setState({ isLoaded: true, error});
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
      url: "http://localhost:8080/api/files/i?fid=" + this.props.friendId,
      responseType: 'blob',
      headers : { 'Authorization' : Basic },
    })
    .then((response) => {
        const file = new Blob([response.data], {type:'image/jpg'});
        const imgUrl = window.URL.createObjectURL(file);
      this.setState({
        isLoaded: true,
        profilePicture: imgUrl,
      });
           }).catch(error => {this.setState({ isLoaded: true, error, });
           });
    }



  render() {
    return (
    <React.Fragment>

        <div class="NetworkSingleContactDiv">
            <p> Network - Contacts - {this.state.friend} </p>
        </div>

        <div class="topParentDiv">
            <button class="singleNetworkContactButton" onClick={this.goToGoodStuff}> Profile </button>
            <button class="singleNetworkContactButton" onClick={this.goToAudit}> Review Them </button>
            <button class="singleNetworkContactButton" onClick={this.goToContactSettings}> Settings </button>
        </div>

           { this.state.showSettings &&
           <div class="topParentDiv">
           <div class="secondParentDiv">
            <ManageMyContacts connectionStatus={this.state.connectionStatus} visibilityPermission={this.state.visibilityPermission} inviter={this.state.inviter}
                connectionType={this.state.connectionType} friendId={this.state.friendId} friend={this.state.friend} userName={this.state.userName}/>
            </div>
           </div> }

          { this.state.isAfriend &&
          <div class="topParentDiv">

                { this.state.showContactScores &&
                <div>
                <img id="profilePic" src={this.state.profilePicture}></img>
                <ScoresNetworkContactPages friendId={this.props.friendId} />
                <QuestionSetsNetworkProfile friendId={this.props.friendId} />
                </div> }

                {this.state.showQuestionSetAuditing &&
                <div class="secondParentDiv">
                  <p> Review Them </p>
                  <p> Review your contact's answers. You can choose and submit different answers and also add comments.
                  Your contact can then see how you scored them and read your comments.
                  (Note that once you have submitted your own answer to a question it will be saved and you will not be able to see
                  your contact's original answer again.)</p>
                  <p> The following were selected by {this.state.friend} for you to review:</p>
                  <NetworkContactAudit auditMe={this.auditMe} friendId={this.state.friendId}/>
                </div> }

                {this.state.showAuditQuestions &&
                <div id="AuditQuestionsComponent">
                <AuditQuestions questionSetVersionEntityId={this.state.questionSetVersionEntityId} friend={this.state.friend} friendId={this.state.friendId} goToAudit={this.goToAudit}/>
                </div> }

          </div> }


          { this.state.hasPendingInvitations &&
            <div class="topParentDiv">

              { this.state.isInvitee &&
                    <div class="secondParentDiv">
                    <p>{this.state.inviter} has invited you to connect.</p>

                    <form id="inviteRadio1">
                        <div>
                          <label><input value="Connected" onChange={this.handleChange} type="radio" name="optradio" /> Accept </label>
                        </div>
                        <div>
                          <label><input value="removed" onChange={this.handleChange} type="radio" name="optradio" /> Remove </label>
                        </div>
                    </form>
                    <p></p>

                    { this.state.showUpdateButton &&
                    <button type="submit" onClick={this.handleSubmit} className="inviteAuditButton"> Update </button> }
                    <span id="deletedAnswersMessage"> {this.state.invitationStatusMessage} </span>
                    <p>  </p>
                     </div> }

              { this.state.isInviter &&
                    <div class="secondParentDiv">
                       <p> Your invitation to connect with {this.state.friend} is pending. </p>
                    </div> }

           </div> }
    </React.Fragment>
    );
  }
}

export default NetworkContactPages;