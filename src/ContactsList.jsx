import React from 'react';
import ProfilePicture from "./ProfilePicture";

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
            <tr class="friendsTR"key={data.friend}>
               <td> <ProfilePicture friendId={data.id} /> </td>
               <td class="friendsTD2"> <button class="titleButton" value={data.id} onClick={e => this.props.renderSingleContact(e)}> {data.friend} </button> </td>
               <td class="friendsTD"> <p class="secondP"> Status: {data.connectionStatus} </p></td>
               <td class="friendsTD3"> <p class="secondP"> Type: {data.connectionType} </p></td>
            </tr>
         )
      })
   }

// <tr><th class=""></th><th class="thContact">Contact</th><th class="">Status</th><th>Type</th><th>View Permission</th></tr>

    render() {
        return (
        <React.Fragment>
         <div class="topParentDiv">
         <p> My Network: Contacts </p>
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