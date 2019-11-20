import React from "react";
import axios from 'axios';
import TitleBar from "./TitleBar";
import ContactsList from "./ContactsList";
import ContactsListRemoved from "./ContactsListRemoved";
import InvitationForm from "./InvitationForm";
import ManageMyContacts from "./ManageMyContacts";
import ManageMyContactsRemoved from "./ManageMyContactsRemoved";
import NetworkContactPages from "./NetworkContactPages";
import NetworkContactAudit from "./NetworkContactAudit";
import AuditQuestions from "./AuditQuestions";

class Network extends React.Component {
  constructor(props) {
    super(props);
    this.toggleShowNetworkList = this.toggleShowNetworkList.bind(this); // called from child, therefore must be bound to activate within this component and not just within child component.
    this.toggleShowRemovedList = this.toggleShowRemovedList.bind(this);
    this.renderSingleContact = this.renderSingleContact.bind(this);
    this.renderSingleContactRemoved = this.renderSingleContactRemoved.bind(this);
    this.auditMe = this.auditMe.bind(this);
    this.sendDownFriend = this.sendDownFriend.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          friend: null,
          inviter: null,
          userName: null,
          showNetworkList: false,
          showRemovedList: false,
          showSingleContact: false,
          friendId: null, // sent to child 'ManageMyContacts'
          showQuestionSetAuditing: false,
          questionSetVersionEntityId: null, // used in questionSet auditing below.
        };
  }

    componentDidMount() {
        this.getFriendships();
    }

    toggleShowNetworkList() {
        this.setState({showNetworkList: false});
        this.setState({showRemovedList: false});
        this.getFriendships();
    }

    toggleShowRemovedList() {
        this.setState({showNetworkList: false});
        this.getRemovedFriendships();
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
     toggleShowNetworkList={this.toggleShowNetworkList} toggleShowRemovedList={this.toggleShowRemovedList}/> )
   }

   renderContactsListRemoved() {
    return ( <ContactsListRemoved allData={this.state.allData} renderSingleContactRemoved={this.renderSingleContactRemoved}
     toggleShowNetworkList={this.toggleShowNetworkList}/> )
   }

    renderSingleContact(event) {
        const data = {id: event.target.value};
        this.setState({friendId: data.id});
        this.setState({showNetworkList: false});
        this.setState({showRemovedList: false});
        this.setState({showSingleContact: true});
    }

    renderSingleContactRemoved(event) {
        const data = {id: event.target.value};
        this.setState({friendId: data.id});
        this.setState({showNetworkList: false});
        this.setState({showRemovedList: false});
        this.setState({showSingleContactRemoved: true});
    }

    auditMe(event) {
        this.setState({showSingleContact: false});
        this.setState({showQuestionSetAuditing: true});
        this.setState({questionSetVersionEntityId: event.target.value});
    }

    sendDownFriend(event) {
        this.setState({friend: event.target.value});
    }

  render() {
    return (
    <React.Fragment>
        <TitleBar />

        { this.state.showNetworkList &&
        <div> {this.renderContactsList()}
        </div> }

        { this.state.showRemovedList &&
        <div> {this.renderContactsListRemoved()}
        </div> }

        { this.state.showSingleContact &&
        <div> <ManageMyContacts friendId={this.state.friendId}/>
        <NetworkContactAudit friendId={this.state.friendId} auditMe={this.auditMe}/>
        <NetworkContactPages friendId={this.state.friendId}/>
        </div> }

        { this.state.showSingleContactRemoved &&
        <div> <ManageMyContactsRemoved friendId={this.state.friendId}/>
        </div> }

        { this.state.showQuestionSetAuditing &&
        <div>
            <p> Audit your contacts answers. You can choose and submit different answers and also add comments.<br></br>
              Your contact can then review how you scored them and read your coments.<br></br>
              (Note that once you have submited your own answer, you will not be able to again see your contacts original answer)</p>
            <AuditQuestions questionSetVersionEntityId={this.state.questionSetVersionEntityId} friendId={this.state.friendId}/>
        </div> }

    </React.Fragment>
    );
    }

}

export default Network;