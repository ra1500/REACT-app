import React from "react";
import axios from 'axios';
import TitleBar from "./TitleBar";
import ContactsList from "./ContactsList";
import ContactsListRemoved from "./ContactsListRemoved";
import InvitationForm from "./InvitationForm";
import ManageMyContactsRemoved from "./ManageMyContactsRemoved";
import NetworkContactPages from "./NetworkContactPages";
import NetworkContactAudit from "./NetworkContactAudit";

class Network extends React.Component {
  constructor(props) {
    super(props);
    this.goToRemovedContacts = this.goToRemovedContacts.bind(this);
    this.renderSingleContact = this.renderSingleContact.bind(this);
    this.renderSingleContactRemoved = this.renderSingleContactRemoved.bind(this);
    this.auditMe = this.auditMe.bind(this);
    this.sendFriend = this.sendFriend.bind(this);
    this.goToNetwork = this.goToNetwork.bind(this);
    this.goToInvite = this.goToInvite.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          friend: null,
          inviter: null,
          userName: null,
          showNetworkList: false,
          showRemovedList: false,
          showSingleContact: false,
          questionSetVersionEntityId: null, // used in questionSet auditing below.
          showInviteFriends: false,
        };
  }

    componentDidMount() {
        this.getFriendships();
    }

    getFriendships() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/user/",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            allData: response,

          });
            this.setState({showNetworkList: true});
               }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
               });
    }

    getRemovedFriendships() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/user/",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            allData: response,
          });
            this.setState({showRemovedList: true});
               }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
               });
    }

   renderContactsList() {
    return ( <ContactsList allData={this.state.allData} renderSingleContact={this.renderSingleContact}
      sendFriend={this.sendFriend}/> )
   }

   renderContactsListRemoved() {
    return ( <ContactsListRemoved allData={this.state.allData} renderSingleContactRemoved={this.renderSingleContactRemoved}/> )
   }

    renderSingleContact(event) {
        const data = {id: event.target.value};
        this.state = {friendId: data.id};
        this.setState({friendId: this.state.friendId}); // sillyness.
        this.setState({showNetworkList: false});
        this.setState({showRemovedList: false});
        this.setState({showSingleContact: true});
        event.preventDefault();
    }

    renderSingleContactRemoved(event) {
        const data = {id: event.target.value};
        this.setState({friendId: data.id});
        this.setState({showNetworkList: false});
        this.setState({showRemovedList: false});
        this.setState({showSingleContactRemoved: true});
    }

    auditMe(event) {
        this.setState({questionSetVersionEntityId: event.target.value});
    }

    goToNetwork() {
        this.setState({showSingleContact: false, showRemovedList: false, showSingleContactRemoved: false, showInviteFriends: false});
        this.setState({showNetworkList: false}); // set to true after this in getFriendships()
        this.getFriendships();
    }
    goToInvite() {
        this.setState({showInviteFriends: true, showNetworkList: false, showSingleContact: false, showRemovedList: false, showSingleContactRemoved: false});
    }
    goToRemovedContacts() {
        this.setState({showInviteFriends: false, showNetworkList: false, showSingleContact: false, showRemovedList: false, showSingleContactRemoved: false});
        this.getRemovedFriendships();
    }

    sendFriend(event) {
        const data = {friend: event.target.value};
        this.setState({friend: data.friend});
    }

  render() {
    return (
    <React.Fragment>
        <TitleBar />

          <div id="settingsButtionDivNetwork">
            <button class="settingsButton" onClick={this.goToNetwork}> Network </button>
            <button class="settingsButton" onClick={this.goToInvite}> Invite </button>
            <button class="settingsButton" onClick={this.goToRemovedContacts}> Removed List </button>
          </div>

        {this.state.showNetworkList &&
        <div>
        {this.renderContactsList()}
        </div> }

        {this.state.showInviteFriends &&
        <div>
        <InvitationForm />
        </div> }

        {this.state.showRemovedList &&
        <div>
        {this.renderContactsListRemoved()}
        </div> }

        {this.state.showSingleContact &&
        <div>
        <NetworkContactPages friendId={this.state.friendId}/>
        </div> }

        {this.state.showSingleContactRemoved &&
        <div>
         <ManageMyContactsRemoved friendId={this.state.friendId}/>
        </div> }



    </React.Fragment>
    );
    }

}

export default Network;