import React from "react";
import axios from 'axios';
import TitleBar from "./TitleBar";
import ContactsList from "./ContactsList";
import InvitationForm from "./InvitationForm";
import ManageMyContacts from "./ManageMyContacts";
import AuditMyContacts from "./AuditMyContacts";

class Network extends React.Component {
  constructor(props) {
    super(props);
    this.toggleShowNetworkList = this.toggleShowNetworkList.bind(this); // called from child, therefore must be bound to activate within this component and not just within child component.
    this.renderSingleContact = this.renderSingleContact.bind(this);

        this.state = {
          error: null,
          isLoaded: false,
          friend: null,
          inviter: null,
          userName: null,
          showNetworkList: false,
          showSingleContact: false,
          friendId: null, // sent to child 'ManageMyContacts'
        };
  }

    componentDidMount() {
        this.getFriendships();
    }

    toggleShowNetworkList() {
        console.log("toggle");
        this.setState({showNetworkList: false});
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

   renderContactsList() {
    return ( <ContactsList allData={this.state.allData} renderSingleContact={this.renderSingleContact}
     toggleShowNetworkList={this.toggleShowNetworkList}/> )
   }

    renderSingleContact(event) {
        const data = {id: event.target.value};
        this.setState({friendId: data.id});
        this.setState({showNetworkList: false});
        this.setState({showSingleContact: true});
    }


  render() {
    return (
    <React.Fragment>
        <TitleBar />
        <p className="urltext">Your Network</p>

        { this.state.showNetworkList &&
        <div> {this.renderContactsList()}
        </div> }

        { this.state.showSingleContact &&
        <div> <ManageMyContacts friendId={this.state.friendId}/>
        </div> }


    </React.Fragment>
    );
    }

}

export default Network;