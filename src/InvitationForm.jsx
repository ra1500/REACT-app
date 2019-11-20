import React from "react";
import axios from 'axios';

class InvitationForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange2 = this.handleChange2.bind(this); // select connectionType
    this.handleChange3 = this.handleChange3.bind(this); // select visibilityPermission
        this.state = {
          error: null,
          isLoaded: false,
          connectionType: "Friend",
          connectionStatus: "pending",
          visibilityPermission: "Yes",
        };
  }

    componentDidMount() {
    }

  handleChange(event) {
    this.setState({friend: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (window.confirm('Please confirm invitation')) {
    this.postNewFriendship();
    }
  }

   // select connectionType
   handleChange2(event) {
     this.setState({connectionType: event.target.value});
   }

   // select visibilityPermission
   handleChange3(event) {
     this.setState({visibilityPermission: event.target.value});
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
         this.props.toggleShowNetworkList();
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

   renderInvitationForm() {
    return (
      <div id="invitationForm">
      <form onSubmit={this.handleSubmit}>
          <label> Connect with someone:
          <input id="invitationBox" type="text" value={this.state.friend} onChange={this.handleChange} />
          <select value={this.state.connectionType} onChange={this.handleChange2}>
              <option value="Friend">Friend</option>
              <option value="Colleague">Colleague</option>
              <option value="Other">Other</option>
           </select>
           </label>
           <label> Allow contact to view my profile
          <select value={this.state.visibilityPermission} onChange={this.handleChange3}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
           </select>
            </label>
        <input className="qbutton" type="submit" value="Invite" />
      </form>
      </div>
    )
   }

  render() {
    return (
    <React.Fragment>
        {this.renderInvitationForm()}
    </React.Fragment>
    );
  }
}

export default InvitationForm;