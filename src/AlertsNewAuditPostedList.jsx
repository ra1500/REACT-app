import React from "react";
import axios from 'axios';

class AlertsNewAuditPostedList extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
          error: null,
          isLoaded: false,
          title: null,
          auditsPostedExist: false,
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
       axios.get("http://localhost:3000/api/prm/sc/dh",
       {headers : { 'Authorization' : Basic }})
       .then((response) => {
         if (response.status === 200) {
         this.setState({
           isLoaded: true,
           list: response.data,
           auditsPostedExist: true,
         });
         } // end if
         else { this.setState({auditsPostedExist: false}); }
              }).catch(error => {this.setState({ isLoaded: true, error,});
              });
    }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
                <td> {data.questionSetVersionEntity.title} </td>
                <td> {data.userName}</td>

            </tr>
         )
      })
   }


  render() {
    return (
    <React.Fragment>

        { !this.state.auditsPostedExist &&
         <div>
         <p class="alertsSmallP"> &nbsp;(nothing new here)</p>
         </div> }

        { this.state.auditsPostedExist &&
         <div>
            <table>
               <tbody>
               <tr><th>Title</th><th>Auditor</th></tr>
                {this.renderTableData()}
               </tbody>
            </table>
         </div> }


    </React.Fragment>
    );
  }
}

export default AlertsNewAuditPostedList;