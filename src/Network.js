import React from "react";
import axios from 'axios';
//import NetworkListed from "./NetworkListed";
import ContactsList from "./ContactsList";

class Network extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);

        this.state = {
          error: null,
          isLoaded: false,
          friend: null,
          connectionType: "friend",
          status: "invitation",
          visibilityPermission: "all",
          inviter: null,
          userName: null,
        };
  }

    postNewFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { friend: this.state.friend, connectionType: this.state.connectionType, status: this.state.status,
         visibilityPermission: this.state.visibilityPermission, inviter: u, userName: u };

        axios.post("http://localhost:8080/f", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true,
                  });
        //this.getFriendships();
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

    getFriendships() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/user/" + u,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            allData: response,
          });
               }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
               });
    }

  handleChange(event) {
    this.setState({friend: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postNewFriendship();
  }

   handleSubmit2(event) {
     event.preventDefault();
     this.getFriendships();
   }



  render() {
    let { postNewFriendship, setFriend, getFriendships, allData } = this.state;

    if (allData == null) {
    return (
    <div id="network">
      <p className="urltext">Your Network</p>
      <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.friend} onChange={this.handleChange} />
          <input type="submit" value="Invite" />
      </form>
      <form onSubmit={this.handleSubmit2}>
        <input id="getfriends" type="submit" value="view your contacts" />
      </form>

    </div>
    );
    } // end if

    else {
    return (
    <div id="network">
      <p className="urltext">Your Network</p>
      <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.friend} onChange={this.handleChange} />
          <input type="submit" value="Invite" />
      </form>
      <form onSubmit={this.handleSubmit2}>
        <input id="getfriends" type="submit" value="view your contacts" />
      </form>
      <ContactsList allData={allData} />
    </div>
    );
    }; // end else
    }

}

export default Network;