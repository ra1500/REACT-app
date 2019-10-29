import React from "react";
import axios from 'axios';
import TitleBar from "./TitleBar";
import ContactsList from "./ContactsList";
import ManageMyContacts from "./ManageMyContacts";

class Network extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange2 = this.handleChange2.bind(this); // select connectionType
    this.handleChange3 = this.handleChange3.bind(this); // select visibilityPermission

        this.state = {
          error: null,
          isLoaded: false,
          friend: null,
          connectionType: null,
          connectionStatus: "pending",
          visibilityPermission: "all",
          inviter: null,
          userName: null,
        };
  }

    componentDidMount() {
        this.getFriendships();
    }

    postNewFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { friend: this.state.friend, connectionType: this.state.connectionType, connectionStatus: this.state.connectionStatus,
         visibilityPermission: this.state.visibilityPermission, inviter: u };

        axios.post("http://localhost:8080/f", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true,
                  });
         this.getFriendships(); //
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
        axios.get("http://localhost:8080/user/",
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
    window.location.reload(); // forced refresh since list.map doesnt re-render
  }

   // select connectionType
   handleChange2(event) {
     this.setState({connectionType: event.target.value});
   }

   // select visibilityPermission
   handleChange3(event) {
     this.setState({visibilityPermission: event.target.value});
   }

   renderInvitationForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Connect with someone:
          <input type="text" value={this.state.friend} onChange={this.handleChange} />
          <select value={this.state.connectionType} onChange={this.handleChange2}>
              <option value="Friend">Friend</option>
              <option value="Colleague">Colleague</option>
              <option value="Other">Other</option>
           </select>
           </label>
           <label> Allow contact to view my profile
          <select value={this.state.visibilityPermission} onChange={this.handleChange3}>
              <option value="Can view my profile">Yes</option>
              <option value="My profile is hidden">No</option>
           </select>
            </label>
        <input className="qbutton" type="submit" value="Invite" />
      </form>
    )
   }

  render() {
    if (this.state.allData == null) {
    return (
    <React.Fragment>
        <TitleBar />
        {this.renderInvitationForm()}
        <p> no connections </p>
    </React.Fragment>
    );
    } // end if

    else {
    return (
    <React.Fragment>
        <TitleBar />
        <p className="urltext">Your Network</p>
        <ContactsList allData={this.state.allData} />
        {this.renderInvitationForm()}
        <ManageMyContacts />
    </React.Fragment>
    );
    }; // end else
    }

}

export default Network;