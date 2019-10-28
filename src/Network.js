import React from "react";
import axios from 'axios';
import TitleBar from "./TitleBar";
import ContactsList from "./ContactsList";

class Network extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleSubmit2 = this.handleSubmit2.bind(this); // not used currently

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
        let data = { friend: this.state.friend, connectionType: this.state.connectionType, status: this.state.status,
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
    window.location.reload(); // foreced refresh since list.map doesnt re-render
  }

   // not used currently
   //handleSubmit2(event) {
   //  event.preventDefault();
   //  this.getFriendships();
   //}


  render() {
    if (this.state.allData == null) {
    return (
    <React.Fragment>
    <TitleBar />
    <div id="network">
      <p className="urltext">Your Network</p>
      <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.friend} onChange={this.handleChange} />
          <input type="submit" value="Invite" />
      </form>
    <p> no connections </p>
    </div>
    </React.Fragment>
    );
    } // end if

    else {
    return (
    <React.Fragment>
    <TitleBar />
    <p className="urltext">Your Network</p>
    <ContactsList allData={this.state.allData} />
    <div id="network">
      <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.friend} onChange={this.handleChange} />
          <input type="submit" value="Invite" />
      </form>
    </div>
    </React.Fragment>
    );
    }; // end else
    }

}

export default Network;