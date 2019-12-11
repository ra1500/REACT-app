import React from "react";
import axios from 'axios';

class QuestionSetsNetworkProfile extends React.Component {
  constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
        };
  }

    componentDidMount() {
        this.getQsets();
    }

    handleSubmit() {
    }

  getQsets() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/prm/sc/dy?fid=" + this.props.friendId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoaded: true,
            list: response.data,
            showList: true,
          });
         } // end if
         else { this.setState({showList: false}); }
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
                <td>  {data.questionSetVersionEntity.title} &nbsp; &nbsp;</td>
                <td> {data.questionSetVersionEntity.description} &nbsp;&nbsp;  </td>
            </tr>
         )
      })
   }


   render() {
    return (
        <React.Fragment>

        { !this.state.showList &&
         <div id="meSettingsDiv">
         <p> My Created Sets </p>
         <p class="alertsSmallP"> &nbsp;(none created)</p>
         </div> }

        { this.state.showList &&
         <div class="secondParentDiv">
         <p> Created Sets </p>
         <p class="alertsSmallP">(to answer these go to 'Answer -> Network Sets')</p>
            <table>
               <tbody>
               <tr><th>Title</th><th>Description</th></tr>
                {this.renderTableData()}
               </tbody>
            </table>
         </div> }

        </React.Fragment>
    ); // end return
   }
}

export default QuestionSetsNetworkProfile;