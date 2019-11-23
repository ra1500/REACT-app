import React from "react";
import axios from 'axios';

class ManageMyContactsRemoved extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit5 = this.handleSubmit5.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          friendId: this.props.friendId,
          connectionStatus: null,
          inviter: null,
          connectionType: null,
          visibilityPermission: null,
          hasPendingInvitations: false,
          friendBeingManaged: null,
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
        let data = { id: this.state.friendId, connectionStatus: "Connected", inviter: this.state.inviter, connectionType: "Friend", visibilityPermission: "Yes"};
        axios.post("http://localhost:8080/f/a", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true,
                  });
                  this.setState({ showUpdatedMessage: true});
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
            friendBeingManaged: response.data.friend,
          });
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }



  // add back to network list with 'Connected' status.
  handleSubmit5(event) {
    event.preventDefault();
    this.patchFriendship();
  }

    updatedMessage() {
    return (
        <p> {this.state.friendBeingManaged} has been changed to 'Connected'. If this was a pending invitation
        from your contact, they will also now be Connected</p>
    )
    }

  render() {
    return (
    <React.Fragment>
    <div class="profilePage">
    <p> Reinstate Contact </p>
    <div id="manageContacts">
            <form onSubmit={this.handleSubmit5}>
            <p> This will return contact to your network with a 'Connected' status.</p>
             <button className="qbutton" type="submit">Add to contacts list</button>
            </form>

      { this.state.showUpdatedMessage &&
         <div> {this.updatedMessage()} </div>}
      </div>
    </div>
    </React.Fragment>
    );
  }
}

export default ManageMyContactsRemoved;