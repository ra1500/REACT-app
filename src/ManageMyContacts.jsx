import React from "react";
import axios from 'axios';

class ManageMyContacts extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleChange2 = this.handleChange2.bind(this); // select connectionType
    this.handleChange3 = this.handleChange3.bind(this); // select visibilityPermission

        this.state = {
          error: null,
          isLoaded: false,
          friend: null,
          connectionType: null,
          connectionStatus: null,
          visibilityPermission: "all",
          inviter: null,
          userName: JSON.parse(sessionStorage.getItem('tokens')).userName,
          hasPendingInvitations: false,
        };
  }

    patchFriendshipConnectionStatus() {

    }

    getSingleFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/f/" + this.state.friend,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            inviter: response.data.inviter,
            connectionStatus: response.data.connectionStatus,
          });
        this.invitationUpdate(); // render inviter contacts in pending connectionStatus.
               }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
               });
    }

  handleChange(event) {
    this.setState({friend: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getSingleFriendship();
  }

  handleSubmit2(event) {
    event.preventDefault();
    this.patchFriendshipConnectionStatus();
  }

   // select connectionType
   handleChange2(event) {
     this.setState({connectionType: event.target.value});
   }

   // select invitation connectionStatus update
   handleChange3(event) {
     this.setState({connectionStatus: event.target.value});
   }

  invitationUpdate() {
    if (this.state.connectionStatus == "pending" && this.state.inviter != this.state.userName) {
        this.setState({hasPendingInvitations: true});
     } // end if
     else {
        this.setState({hasPendingInvitations: false});
     }
  }


  render() {
    return (
    <React.Fragment>
      <form onSubmit={this.handleSubmit}>
          <label>
          Manage My Contacts:
          <input type="text" value={this.state.friend} onChange={this.handleChange} />
          <input className="qbutton" type="submit" value="Go to Contact" />
          </label>
      </form>

      { this.state.hasPendingInvitations &&
      <div>
            <p>{this.state.inviter} has invited you to connect. Please choose to accept, decline or remove.</p>
            <form onSubmit={this.handleSubmit2}>
              <select value={this.state.visibilityPermission} onChange={this.handleChange3}>
                  <option value="Connected">Accept</option>
                  <option value="Declined">Decline</option>
                  <option value="Removed">Remove</option>
               </select>
               <input className="qbutton" type="submit" value="Update status" />
               <p>New connections can see your profile page. If you wish otherwise please manage permissions below.</p>
             </form>
      </div> }

    </React.Fragment>
    );
  }
}

export default ManageMyContacts;