import React from "react";
import axios from 'axios';

class ManageMyContacts extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleSubmit5 = this.handleSubmit5.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          friendId: this.props.friendId,
          connectionType: null,
          connectionStatus: null,
          visibilityPermission: null,
          inviter: null,
          userName: JSON.parse(sessionStorage.getItem('tokens')).userName,
          hasPendingInvitations: false,
          isAfriend: false,
          friendBeingManaged: null,
          showDeletedMessage: false,
          showUpdatedMessage: false,
        };
  }

    componentDidMount() {
        this.getSingleFriendship();
    }

    patchFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: this.state.friendId, connectionStatus: this.state.connectionStatus, inviter: this.state.inviter,
         connectionType: this.state.connectionType, visibilityPermission: this.state.visibilityPermission };
        axios.post("http://localhost:8080/f/a", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true,
                  });
                  this.props.toggleShowNetworkList();
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
        let data = { id: this.state.friendId, connectionStatus: "removed", inviter: this.state.inviter,
         connectionType: this.state.connectionType, visibilityPermission: this.state.visibilityPermission };
        axios.post("http://localhost:8080/f/a", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true,
                  });
                  this.props.toggleShowNetworkList();
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
        axios.get("http://localhost:8080/f/" + this.state.friendId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            inviter: response.data.inviter,
            connectionStatus: response.data.connectionStatus,
            connectionType: response.data.connectionType,
            visibilityPermission: response.data.visibilityPermission,
            friendBeingManaged: response.data.friend,
          });
        this.manageUpdate(); // render friend mgmt tools if friend exists.
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  // update connectionStatus
  handleSubmit2(event) {
    event.preventDefault();
    this.patchFriendship();
    this.setState({isAfriend : false});
    this.setState({hasPendingInvitations : false});
    this.setState({showUpdatedMessage : true});
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

  // remove friend from network
  handleSubmit5(event) {
    event.preventDefault();
    //this.setState({connectionStatus: "removed"}); TODO: how to change state? I don't have a clue....
    this.removeFriendship(); // TODO: again, why a new ajax method, why can't i change state above.
    this.setState({isAfriend : false});
    this.setState({showDeletedMessage : true});
  }

    deletedMessage() {
    return (
        <p> {this.state.friendBeingManaged} has been removed from your network </p>
    )
    }

    updatedMessage() {
    return (
        <p> {this.state.friendBeingManaged} has been updated </p>
    )
    }

  // render invitation acceptance or friend mgmt tools or reverse removed.
  manageUpdate() {
    if (this.state.connectionStatus == "pending" && this.state.inviter != this.state.userName) {
        this.setState({isAfriend: false, hasPendingInvitations: true});
     } // end if
    else {
        this.setState({isAfriend: true, hasPendingInvitations: false});
    }
  }

  render() {
    return (
    <React.Fragment>
    <div id="manageContacts">

      { this.state.hasPendingInvitations &&
      <div>
            <p>{this.state.inviter} has invited you to connect. Please choose to accept, decline or remove.</p>
            <form onSubmit={this.handleSubmit2}>
              <select value={this.state.connectionStatus} onChange={this.handleChange2}>
                  <option selected value="pending">(Select One)</option>
                  <option value="Connected">Accept</option>
                  <option value="Declined">Decline</option>
                  <option value="removed">Remove</option>
               </select>
               <input className="qbutton" type="submit" value="Update status" />
               <p>New connections can see your profile page. If you wish otherwise please manage permissions below.</p>
             </form>
      </div> }

      { this.state.isAfriend &&
      <div id="manageMyContacts">
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
              <form onSubmit={this.handleSubmit2}>
              <select value={this.state.selectPrivacy} onChange={this.handleChange4}>
                  <option select value={this.state.visibilityPermission}> Select One </option>
                  <option value="Yes"> Yes </option>
                  <option value="No"> No </option>
               </select>
               <input className="qbutton" type="submit" value="Update changes" />
             </form>
            <form onSubmit={this.handleSubmit5}>
             <button className="qbutton" type="submit">remove from my network</button>
            </form>
      </div> }

      { this.state.showDeletedMessage &&
         <div> {this.deletedMessage()} </div>}

      { this.state.showUpdatedMessage &&
         <div> {this.updatedMessage()} </div>}

    </div>
    </React.Fragment>
    );
  }
}

export default ManageMyContacts;