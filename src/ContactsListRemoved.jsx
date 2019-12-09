import React from 'react';

class ContactsListRemoved extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list1: props.allData.data.friendsList, //
        };
    }

   renderTableData() {
     let list = this.state.list1.filter(data => data.connectionStatus == 'removed');
     this.state = {list2: list};

      return this.state.list2.map((data, index) => {
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
        <p> Network - Removed List </p>
        <p></p>
        <div class="secondParentDiv">
         <div>
            <table>
               <tbody>
                  <tr><th class="thContact">Contact</th><th>Status</th><th>Type</th><th>Privacy</th></tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
         </div>
         </div>
        </React.Fragment>
        )
    }

}

export default ContactsListRemoved;