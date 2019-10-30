import React from "react";
import axios from 'axios';

class ManageMyContacts extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    //this.handleSubmit3 = this.handleSubmit3.bind(this); // not needed. single button used instead.
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleSubmit4 = this.handleSubmit4.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleSubmit5 = this.handleSubmit5.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          friend: null,
          connectionType: null,
          connectionStatus: null,
          visibilityPermission: null,
          inviter: null,
          userName: JSON.parse(sessionStorage.getItem('tokens')).userName,
          hasPendingInvitations: false,
          gid: null, // used for PATCH
          isAfriend: false,
          friendBeingManaged: null,
        };
  }

    patchFriendshipStatus() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { gid: this.state.gid, friend: this.state.friend, connectionStatus: this.state.connectionStatus, inviter: this.state.inviter,
         connectionType: this.state.connectionType, visibilityPermission: this.state.visibilityPermission };
        axios.patch("http://localhost:8080/f", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true,
                  });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

    patchFriendshipConnectionTypeOrVisibility() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { gid: this.state.gid, connectionStatus: this.state.connectionStatus,
         connectionType: this.state.connectionType, visibilityPermission: this.state.visibilityPermission };
        axios.patch("http://localhost:8080/f/adj", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        window.location.reload(); // forced refresh since list.map doesnt re-render
        this.setState({isLoaded: true,
                  });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
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
            connectionType: response.data.connectionType,
            visibilityPermission: response.data.visibilityPermission,
            gid: response.data.gid,
          });
        this.invitationUpdate(); // render inviter contacts in pending connectionStatus.
        this.manageUpdate(); // render friend mgmt tools if friend exists.
               }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
               });
    }

    deleteFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { gid: this.state.gid, };
        axios.delete("http://localhost:8080/f/d", data,
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
  handleSubmit(event) {
    event.preventDefault();
    this.getSingleFriendship();
    this.setState({friendBeingManaged: this.state.friend});
  }

  // update connectionStatus
  handleSubmit2(event) {
    event.preventDefault();
    this.patchFriendshipStatus();
  }
   // select invitation connectionStatus update
   handleChange2(event) {
     this.setState({connectionStatus: event.target.value});
   }

  // update connectionType
  handleChange3(event) {
    this.setState({connectionType: event.target.value});
  }

  // update visibilityPermission/Privacy
  handleChange4(event) {
    this.setState({visibilityPermission: event.target.value});
  }
  handleSubmit4(event) {
    event.preventDefault();
    this.patchFriendshipConnectionTypeOrVisibility();
  }

  // delete friend from network
  handleSubmit5(event) {
    //event.preventDefault();
    this.deleteFriendship();
  }


  // render invitations if they exist
  invitationUpdate() {
    if (this.state.connectionStatus == "pending" && this.state.inviter != this.state.userName) {
        this.setState({hasPendingInvitations: true});
     } // end if
     else {
        this.setState({hasPendingInvitations: false});
     }
  }

  // render friend management choices if friend exists
  manageUpdate() {
    if (this.state.connectionStatus == "pending" && this.state.inviter == this.state.userName) {
        this.setState({isAfriend: true});
     } // end if
    if (this.state.connectionStatus != "pending") {
        this.setState({isAfriend: true});
     } // end if
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
              <select value={this.state.connectionStatus} onChange={this.handleChange2}>
                  <option selected value="pending">(Select One)</option>
                  <option value="Connected">Accept</option>
                  <option value="Declined">Decline</option>
                  <option value="Removed">Delete</option>
               </select>
               <input className="qbutton" type="submit" value="Update status" />
               <p>New connections can see your profile page. If you wish otherwise please manage permissions below.</p>
             </form>
      </div> }

      { this.state.isAfriend &&
      <div>
            <p>Change connection settings for {this.state.friendBeingManaged}  below: </p>
            <form>
              <select value={this.state.selectConnectionType} onChange={this.handleChange3}>
                  <option select value={this.state.selectConnectionType}> Select One </option>
                  <option value="Friend"> Friend </option>
                  <option value="Colleague"> Colleague </option>
                  <option value="Other"> Other </option>
               </select>
               </form>

              <p> Privacy. Select 'No' for profile to be hidden from connection. </p>
              <form onSubmit={this.handleSubmit4}>
              <select value={this.state.selectPrivacy} onChange={this.handleChange4}>
                  <option select value={this.state.visibilityPermission}> Select One </option>
                  <option value="Yes"> Yes </option>
                  <option value="No"> No </option>
               </select>
               <input className="qbutton" type="submit" value="Update changes" />
             </form>

             <input className="qbutton" onClick={() => this.handleSubmit5()} value="Delete from my network" />
      </div> }

    </React.Fragment>
    );
  }
}

export default ManageMyContacts;