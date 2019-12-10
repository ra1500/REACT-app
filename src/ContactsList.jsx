import React from 'react';

class ContactsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list, //
        };
    }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.friend}>
               <td> <button class="titleButton" value={data.id} onClick={e => this.props.renderSingleContact(e)}> {data.friend} </button> </td>
               <td>{data.connectionStatus} &nbsp; &nbsp;</td>
               <td>{data.connectionType} &nbsp; &nbsp;</td>
               <td>{data.visibilityPermission}</td>
            </tr>
         )
      })
   }


    render() {
        return (
        <React.Fragment>
         <div class="topParentDiv">
         <p> Network - Contacts </p>
        <p></p>
        <div class="secondParentDiv">

        { !this.props.showNetworkListDetails &&
         <div>
         <p class="alertsSmallP"> &nbsp;(none)</p>
         </div> }

        { this.props.showNetworkListDetails &&
         <div>
            <table>
               <tbody>
                  <tr><th class="thContact">Contact</th><th>Status</th><th>Type</th><th>Privacy</th></tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div> }
         </div>
         </div>
        </React.Fragment>
        )
    }

}

export default ContactsList;