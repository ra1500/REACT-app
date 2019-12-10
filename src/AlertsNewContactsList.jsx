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
        if (response.status === 200 && response.data.friendsList.length > 0) {
          this.setState({
            isLoaded: true,
            list2: response.data.friendsList,
            showNewContacts: true,
          });
          } // end if!
          else { this.setState({showNewContacts: false}); }
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



    render() {
        return (
        <React.Fragment>
         <div id="contactsList">

        { !this.state.showNewContacts &&
         <div>
         <p class="alertsSmallP"> &nbsp;(nothing new here)</p>
         </div> }


            { this.state.showNewContacts &&
            <table>
               <tbody>
                  <tr><th>Contact</th><th>Type</th></tr>
                  {this.renderTableData()}
               </tbody>
            </table> }
         </div>
        </React.Fragment>
        )
    }

}

export default AlertsNewContactsList;