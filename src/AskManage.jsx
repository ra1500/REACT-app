import React from "react";
import axios from 'axios';

class AskManage extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
          error: null,
          isLoaded: false,
        };
  }

    componentDidMount() {
        const auditeeName = (JSON.parse(sessionStorage.getItem('tokens'))).userName;
        this.setState({auditee: auditeeName}); // TODO this needs to come from props.
        this.getQsets();
    }

  getQsets() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/prm/sc/du",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            list: response.data,
          });
          this.renderTableData();
          this.setState({showList: true});
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index} id="manageQsetRow">
                <td> <button class="inviteAuditButton" value={data.questionSetVersionEntity.id} onClick={e => this.props.manageAset(e)}> {data.questionSetVersionEntity.title} </button> </td>
                <td> {data.questionSetVersionEntity.description} &nbsp;&nbsp;  </td>
            </tr>
         )
      })
   }
   renderTableHeader() {
      let header = ["Title", "Description"]
      return header.map((key, index) => {
         return <th key={index}>{key} &nbsp;&nbsp;&nbsp;   </th>
      })
   }
   render() {
    return (
        <React.Fragment>
      <div class="topParentDiv">
        <p> Ask - Manage</p>
        <p></p>
        <div class="secondParentDiv">

        { this.state.showList &&
         <div>
            <table>
               <tbody>
               <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
               </tbody>
            </table>
         </div> }

        </div>
        </div>
        </React.Fragment>
    ); // end return
   }
}

export default AskManage;