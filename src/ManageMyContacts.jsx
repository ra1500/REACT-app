import React from "react";
import axios from 'axios';

class ManageMyContacts extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          friendId: this.props.friendId,
          connectionType: this.props.connectionType,
          connectionStatus: null,
          visibilityPermission: this.props.visibilityPermission,
          inviter: null,
          hasPendingInvitations: false,
          isAfriend: true,
          friendBeingManaged: null,
          showDeletedMessage: false,
          showUpdatedMessage: false,
          showUpdateButton: true,
          showRemoveButton: true,
          deletedMessage: "(contact has been removed)",
          updatedMessage: "(contact has been updated)",
          currentType: this.props.connectionType,
          currentVisibility: this.props.visibilityPermission,
        };
  }

    componentDidMount() {
        this.manageUpdate();
    }

    patchFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: this.props.friendId, connectionStatus: this.props.connectionStatus, inviter: this.props.inviter,
         connectionType: this.state.connectionType, visibilityPermission: this.state.visibilityPermission };
        axios.post("http://localhost:8080/f/a", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, showUpdatedMessage: true, showUpdateButton: false, showRemoveButton: false,
                  });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

    removeFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: this.props.friendId, connectionStatus: "removed", inviter: this.props.inviter,
         connectionType: this.state.connectionType, visibilityPermission: "No" };
        axios.post("http://localhost:8080/f/a", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, showRemoveButton : false, showUpdateButton : false, showDeletedMessage : true,
                  });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

  // update connectionStatus
  handleSubmit1(event) {
    event.preventDefault();
    this.patchFriendship();
  }

  handleChange3(event) {
    this.setState({connectionType: event.target.value});
  }
  handleChange4(event) {
    this.setState({visibilityPermission: event.target.value});
  }
  // remove friend from network
  handleSubmit2(event) {
    event.preventDefault();
    if (window.confirm('Are you sure you want to remove\nthis contact?')) {
    this.removeFriendship();
    }
  }

  manageUpdate() {
    if (this.props.connectionStatus == "pending") {
        this.setState({isAfriend: false, hasPendingInvitations: true});
     }
    else {
        this.setState({isAfriend: true, hasPendingInvitations: false});
    }
  }

  render() {
    return (
    <React.Fragment>
    <div >

      { this.state.hasPendingInvitations &&
      <div>
            <p>Contact Settings  </p>
            <p></p>
            <div>
                <p> You can remove your pending contact here. You can unhide a removed contact in 'Network -> Removed List'.</p>
                { this.state.showDeletedMessage &&
                <p id="deletedAnswersMessage"> {this.state.deletedMessage} </p> }
                { this.state.showRemoveButton &&
                <button type="submit" onClick={this.handleSubmit2} className="deleteScoreButton"> Remove </button> }

            </div>
      </div> }

      { this.state.isAfriend &&
      <div>
            <p>Contact Settings  </p>
            <p></p>
            <div class="invitationForm">
            <p class="alertsSmallP"> Currently set to: {this.state.currentType} & {this.state.currentVisibility}</p>
            <form id="inviteRadio1">
                <div>
                  <label><input value="Friend" onChange={this.handleChange3} type="radio" name="optradio" /> Friend </label>
                </div>
                <div>
                  <label><input value="Colleague" onChange={this.handleChange3} type="radio" name="optradio" /> Colleague </label>
                </div>
                <div>
                  <label><input value="Other" onChange={this.handleChange3} type="radio" name="optradio" /> Other </label>
                </div>
            </form>
            <form id="inviteRadio2">
                <div>
                  <label><input value="Yes" onChange={this.handleChange4} type="radio" name="optradio" /> Yes (contact can view my posts) </label>
                </div>
                <div>
                  <label><input value="No" onChange={this.handleChange4} type="radio" name="optradio" /> No (contact cannot view my posts) </label>
                </div>
            </form>
            <p></p>
                { this.state.showDeletedMessage &&
                <p id="deletedAnswersMessage"> {this.state.deletedMessage} </p> }
                { this.state.showRemoveButton &&
                <button type="submit" onClick={this.handleSubmit2} className="deleteScoreButton"> Remove </button> }

                { this.state.showUpdatedMessage &&
                <p id="deletedAnswersMessage"> {this.state.updatedMessage} </p> }
                { this.state.showUpdateButton &&
                <button type="submit" onClick={this.handleSubmit1} className="inviteAuditButton"> Update </button> }
            </div>
      </div> }

    </div>
    </React.Fragment>
    );
  }
}

export default ManageMyContacts;