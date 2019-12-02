import React from 'react';
import axios from 'axios';

class AlertsNewContactsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list1: null,
            showNewContacts: false,
            date: new Date().getDate(),
        };
    }

    componentDidMount() {
        this.getFriendships();
    }

    getFriendships() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/user/al",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            list2: response.data.friendsList,
            showNewContacts: true,
          });
          //this.renderTableData();
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

   renderTableData() {
      return this.state.list2.map((data, index) => {
         return (
            <tr key={data.friend}>
               <td> {data.friend} </td>
               <td>{data.connectionType} </td>
            </tr>
         )
      })
   }

    // insert this below 'this.renderTableData()'  <tr>{this.renderTableHeader()}</tr>
   renderTableHeader() {
      let header = ["Contact", "Type",]
      return header.map((key, index) => {
         return <th key={index}>{key}</th>
      })
   }

    render() {
        return (
        <React.Fragment>
         <div id="contactsList">
            { this.state.showNewContacts &&
            <table>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table> }
         </div>
        </React.Fragment>
        )
    }

}

export default AlertsNewContactsList;