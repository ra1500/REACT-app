import React from 'react';

class ContactsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.allData.data.friendsList, //
            //dataString: JSON.stringify(props.allData),
        };
    }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.friend}>
               <td>{data.friend} &nbsp; &nbsp; &nbsp;</td>
               <td>{data.connectionStatus} &nbsp; &nbsp;</td>
               <td>{data.connectionType} &nbsp; &nbsp;</td>
               <td>{data.visibilityPermission}</td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = ["Contact", "Status", "Type", "Privacy"]
      return header.map((key, index) => {
         return <th key={index}>{key}</th>
      })
   }

    render() {
        return (
        <React.Fragment>
         <div>
            <table>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
        </React.Fragment>
        )
    }

}

export default ContactsList;