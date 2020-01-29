import React from 'react';
import axios from 'axios';
import InvitationFormContact from "./InvitationFormContact";
import ProfilePicture from "./ProfilePicture";

class FriendsContactsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
            contactName: this.props.contactName,
        };
    }

componentDidMount() {
    //this.getFriendships();
}

   renderTableData() {
      return this.props.list.map((data, index) => {
         return (
            <tr class="friendsTR" key={data.friend}>
               <td> <ProfilePicture friendId={data.id} /> </td>
               <td class="friendsTD2"> <button class="titleButton" value={data.friend} onClick={e => this.props.inviteToJoinMyNetwork(e)}> {data.friend} </button> </td>
               <td class="friendsTD"> <p class="secondP">Title: {data.userEntity.title} </p> </td>
               <td class="friendsTD3"> <p class="secondP">Location: {data.userEntity.location} </p> </td>
            </tr>
         )
      })
   }


    render() {
        return (
        <React.Fragment>

        { this.props.showNetworkListNone &&
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

      { this.props.showInvite &&
          <div>
            <InvitationFormContact invitedFriend={this.props.invitedFriend} />
          </div> }

      </React.Fragment>
        )
    }

}

export default FriendsContactsList;