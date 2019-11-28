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
           list: response.data,
           auditInvitesExist: true,
         });
         } // end if
         else { this.setState({auditInvitesExist: false}); }
              }).catch(error => {this.setState({ isLoaded: true, error,});
              });
    }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
                <td> <button className="inviteAuditButton" value={data.questionSetVersionEntity.id} onClick={e => this.props.auditMe(e)}> {data.questionSetVersionEntity.title} </button> </td>
                <td> {data.questionSetVersionEntity.description} &nbsp;&nbsp;  </td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = ["Title", "Description",]
      return header.map((key, index) => {
         return <th key={index}>{key} &nbsp;&nbsp;&nbsp;   </th>
      })
   }



  render() {
    return (
    <React.Fragment>

        { this.state.auditInvitesExist &&
         <div>
            <table>
               <tbody>
               <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
               </tbody>
            </table>
         </div> }


    </React.Fragment>
    );
  }
}

export default NetworkContactAudit;