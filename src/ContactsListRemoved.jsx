import React from 'react';

class ContactsListRemoved extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
        };
    }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.friend}>
               <td> <button class="inviteAuditButton" value={data.id} onClick={e => this.props.renderSingleContactRemoved(e)}> {data.friend} </button> </td>
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
        <p> My Network: Removed List </p>
        <p></p>
        <div class="secondParentDiv">

        { !this.props.showRemovedListDetails &&
         <div>
         <p class="alertsSmallP"> &nbsp;(none)</p>
         </div> }

        { this.props.showRemovedListDetails &&
         <div>
            <table>
               <tbody>
                  <tr><th class="thContact">Contact</th><th>Status</th><th>Type</th><th>View Permission</th></tr>
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

export default ContactsListRemoved;