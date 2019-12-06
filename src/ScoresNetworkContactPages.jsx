import React from 'react';
import axios from 'axios';
import ManageMyContacts from "./ManageMyContacts";

class ScoresNetworkContactPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            showList: false,
            id: null,
            friendId: this.props.friendId,
            showSettings: false,
            renderContactScores: false,
        };
    }

  componentDidMount() {
    this.getContactQsets();
  }

  getContactQsets() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/prm/sc/df?ctc=" + this.props.friendId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            list: response.data,
            friend: response.data[0].userName,
          });
          this.renderTableData();
          this.setState({renderContactScores: true});
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
                <td> {data.questionSetVersionEntity.title} &nbsp; &nbsp;</td>
                <td> {data.questionSetVersionEntity.description} &nbsp;&nbsp;  </td>
                <td> &nbsp;{data.score} </td>
                <td> {data.result} </td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = ["Title", "Description","Score", "Result"]
      return header.map((key, index) => {
         return <th key={index}>{key}  </th>
      })
   }

    render() {
        return (
        <React.Fragment>

         {this.state.renderContactScores &&
         <div class="profilePage">
            <table>
               <tbody>
               <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
               </tbody>
            </table>
         </div> }

        { this.state.showSettings &&
        <ManageMyContacts friendId={this.state.friendId}/> }

        </React.Fragment>
        )
    }

}

export default ScoresNetworkContactPages;