import React from "react";
import axios from 'axios';

class NetworkContactAudit extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
          error: null,
          isLoaded: false,
          friendId: this.props.friendId,
          friend: null,
          title: null,
          description: null,
          auditInvitesExist: false,
        };
  }

    componentDidMount() {
        this.getUserAnswer();
    }

    // TODO change this to pull a List of sets to audit instead of just one. add a method to the back-end.
    getUserAnswer() {
       const name = JSON.parse(sessionStorage.getItem('tokens'));
       const u = name.userName;
       const p = name.password;
       const token = u +':' + p;
       const hash = btoa(token);
       const Basic = 'Basic ' + hash;
       axios.get("http://localhost:8080/a/au/" + this.state.friendId,
       {headers : { 'Authorization' : Basic }})
       .then((response) => {
         if (response.status === 200) {
         this.setState({
           isLoaded: true,
           title: response.data.questionSetVersionEntity.title,
           description: response.data.questionSetVersionEntity.title,
           questionSetVersionEntityId: response.data.questionSetVersionEntity.id,
           friend: response.data.auditee,
           auditInvitesExist: true,
         });
         } // end if
         else { this.setState({auditInvitesExist: false}); }
              }).catch(error => {this.setState({ isLoaded: true, error,});
              });
    }

  render() {
    return (
    <React.Fragment>

        { this.state.auditInvitesExist &&
        <div id="networkContactAudit">
        <button className="qsbutton" value={this.state.questionSetVersionEntityId} onClick={e => this.props.auditMe(e)}> {this.state.title} </button>
        <p> {this.state.description} </p>
        </div> }


    </React.Fragment>
    );
  }
}

export default NetworkContactAudit;