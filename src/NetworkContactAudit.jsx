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
        };
  }

    componentDidMount() {
        this.getUserAnswer();
    }

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
         this.setState({
           isLoaded: true,
           title: response.data.questionSetVersionEntity.title,
           description: response.data.questionSetVersionEntity.title,
           questionSetVersionEntityId: response.data.questionSetVersionEntity.id,
           friend: response.data.auditee,
         });
              }).catch(error => {this.setState({ isLoaded: true, error,});
              });
    }

  render() {
    return (
    <React.Fragment>
        <div>
        {this.state.friend} has invited you to audit one of their quizes. Select to audit.
        <button className="qsbutton" value={this.state.questionSetVersionEntityId} onClick={e => this.props.auditMe(e)}> {this.state.title} </button>
        <p> {this.state.description} </p>
        </div>
    </React.Fragment>
    );
  }
}

export default NetworkContactAudit;