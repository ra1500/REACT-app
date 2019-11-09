import React from "react";
import axios from 'axios';

class AuditMyContacts extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          friend: null,
          isAfriend: false,
        };
  }

    componentDidMount() {
        //this.getFriendships();
    }

  handleChange(event) {
    this.setState({friend: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.getSingleFriendship();
    this.setState({friendBeingManaged: this.state.friend});
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
            id: response.data.id,
          });
        this.manageAudit(); // render friend audit tools if friend exists.
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  // render friend management choices if friend exists
  manageAudit() {
    if (this.state.connectionStatus == "pending" && this.state.inviter == this.state.userName) {
        this.setState({isAfriend: true});
     } // end if
    if (this.state.connectionStatus != "pending" && this.state.connectionStatus != null) {
        this.setState({isAfriend: true});
     } // end if
  }

  render() {
    return (
    <React.Fragment>
        <form onSubmit={this.handleSubmit}>
              <label>
              Audit my contacts' scores
              <input type="text" value={this.state.friend} onChange={this.handleChange} />
              <input className="qbutton" type="submit" value="Go to Contact" />
              </label>
        </form>

      { this.state.isAfriend &&
      <div>
        Coming Soon. Review your friends and contacts' answers and scores. Call them out on their lies! See how you would score them and see the average of others who've audited them.
      </div> }
    </React.Fragment>
    );
  }
}

export default AuditMyContacts;