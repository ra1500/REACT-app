import React from 'react';
import InvitationForm from "./InvitationForm";

class ContactsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list1: props.allData.data.friendsList, //
        };
    }

   renderTableData() {
     let list = this.state.list1.filter(data => data.connectionStatus != 'removed');
     this.state = {list2: list};

      return this.state.list2.map((data, index) => {
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

    // insert this below 'this.renderTableData()'  <tr>{this.renderTableHeader()}</tr>
   renderTableHeader() {
      let header = ["Contact", "Status", "Type", "Privacy"]
      return header.map((key, index) => {
         return <th key={index}>{key}</th>
      })
   }

    render() {
        return (
        <React.Fragment>
         <div id="contactsList">
         <p> Network Contacts </p>
            <table>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
        </React.Fragment>
        )
    }

}

export default ContactsList;