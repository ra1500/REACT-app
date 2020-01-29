import React from "react";
import axios from 'axios';
import ScoresNetworkContactPages from "./ScoresNetworkContactPages";
import AuditQuestions from "./AuditQuestions";
import ManageMyContacts from "./ManageMyContacts";
import NetworkContactAudit from "./NetworkContactAudit";
import QuestionSetsNetworkProfile from "./QuestionSetsNetworkProfile";
import FriendsContactsList from "./FriendsContactsList";

class NetworkContactPages extends React.Component {
  constructor(props) {
    super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.goToAudit = this.goToAudit.bind(this);
        this.goToContactSettings = this.goToContactSettings.bind(this);
        this.goToGoodStuff = this.goToGoodStuff.bind(this);
        this.goToContactsList = this.goToContactsList.bind(this);
        this.goToNetworkListDetails = this.goToNetworkListDetails.bind(this);
        this.inviteToJoinMyNetwork = this.inviteToJoinMyNetwork.bind(this);
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
          title: null,
          blurb: null,
          education2: null,
          occupation: null,
          relationshipStatus2: null,
          location: null,
          contactInfo: null,
          showFriendsContactsList: false,
          showInvite: false,
          showNetworkListDetails: false,
          showNetworkListNone: true,
          list: null,
          invitedFriend: null,
        };
  }

    componentDidMount() {
        //this.setState({friendId: this.props.friendId});
        this.getSingleFriendship();
        this.getProfilePicture();
        this.getFriendProfileText();
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
        this.setState({showQuestionSetAuditing: false, isAfriend: false, hasPendingInvitations: false, showSettings: true, showAuditQuestions: false, showFriendsContactsList: false});
    }
    goToAudit() {
        this.setState({ showQuestionSetAuditing: true, isAfriend: true, hasPendingInvitations: false, showSettings: false, showContactScores: false, showAuditQuestions: false, showFriendsContactsList: false});
    }
    goToContactsList() {
        this.getFriendships();
        this.setState({showQuestionSetAuditing: false, isAfriend: true, hasPendingInvitations: false, showSettings: false, showContactScores: false, showAuditQuestions: false, showFriendsContactsList: true,});
    }
    goToGoodStuff() {
        this.setState({showQuestionSetAuditing: false, isAfriend: false, showSettings: false, showAuditQuestions: false, showFriendsContactsList: false});
        this.isAFriendOrInvitation();
    }
    auditMe(event) {
        this.setState({showQuestionSetAuditing: false, showAuditQuestions: true, showFriendsContactsList: false});
        this.setState({questionSetVersionEntityId: event.target.value});
    }


   handleChange(event) {
     this.setState({connectionStatus: event.target.value});
   }
  handleSubmit(event) {
    this.patchFriendship();
    event.preventDefault();
  }

    goToNetworkListDetails() {
        this.setState({showInvite: false, showNetworkListDetails: true, showNetworkListNone: false,});
    }
    inviteToJoinMyNetwork(event) {
        this.setState({showInvite: true, showNetworkListDetails: false, showNetworkListNone: false,});
        const data = {friend: event.target.value};
        this.state = {invitedFriend: data.friend};
        this.setState({invitedFriend: this.state.invitedFriend}); // sillyness.
        //this.setState({invitedFriend: e});
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

  getFriendProfileText() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u +':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    axios.get("http://localhost:8080/api/user/ps?fid=" + this.props.friendId,
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
      this.setState({
        isLoaded: true,
        title: response.data.title,
        blurb: response.data.blurb,
        education: response.data.education,
        occupation: response.data.occupation,
        relationshipStatus: response.data.relationshipStatus,
        location: response.data.location,
        contactInfo: response.data.contactInfo,
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

    getFriendships() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/user/t?fid=" + this.props.friendId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
         if (response.status === 200) {
          this.setState({
            isLoaded: true,
            list: response.data.friendsList,
          });
          this.goToNetworkListDetails();
          } // end if
               }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
               });
    }

  render() {
    return (
    <React.Fragment>

        <div class="NetworkSingleContactDiv">
            <p> My Network: Contacts - {this.state.friend} </p>
        </div>

        <div class="topParentDiv">
            <button class="singleNetworkContactButton" onClick={this.goToGoodStuff}> Profile </button>
            <button class="singleNetworkContactButton" onClick={this.goToAudit}> Review Them </button>
            <button class="singleNetworkContactButton" onClick={this.goToContactsList}> Contacts </button>
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
                <div class="scoresListTD">
                <p class="secondP"> Title: {this.state.title}</p><br></br>
                <p class="secondP"> About me: {this.state.blurb}</p><br></br>
                <p class="secondP"> Location: {this.state.location}</p><br></br>
                <p class="secondP"> Contact Info: {this.state.contactInfo}</p><br></br>
                <p class="secondP"> Relationship status: {this.state.relationshipStatus2}</p>
                </div>

                <ScoresNetworkContactPages friendId={this.props.friendId} />
                <QuestionSetsNetworkProfile friendId={this.props.friendId} />
                </div> }

               { this.state.showFriendsContactsList &&
               <div>
                <FriendsContactsList showInvite={this.state.showInvite} inviteToJoinMyNetwork={this.inviteToJoinMyNetwork} showNetworkListDetails={this.state.showNetworkListDetails} goToNetworkListDetails={this.goToNetworkListDetails}showNetworkListNone={this.state.showNetworkListNone} list={this.state.list} invitedFriend={this.state.invitedFriend}/>
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