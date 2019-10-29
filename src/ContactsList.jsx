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
         const { friend, connectionStatus,} = data //destructuring
         return (
            <tr key={data.friend}>
               <td>{data.friend}</td>
               <td>{data.connectionStatus}</td>
               <td>{data.connectionType}</td>
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