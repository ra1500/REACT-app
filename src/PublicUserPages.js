import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import ProfilePicturePublic from './ProfilePicturePublic';

class PublicUserPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "(not found)",
            list: null,
            showList: false,
            id: null,
            profileTitle: null,
            profileBlurb: null,
            profileEducation: null,
            profileOccupation: null,
            profileRelationshipStatus: null,
            profileLocation: null,
            profileContactInfo: null,
            education2: null,
            relationshipStatus2: null,
            url: this.props.location.search
        };
    }

  componentDidMount() {
    this.getQsets();
    this.getProfileText();
  }

  getProfileText() {
      let url = this.props.location.search;
      let params = queryString.parse(url);
      let user = params.id;
    axios.get("http://localhost:8080/api/user/pp?id=" + user)
    .then((response) => {
      this.setState({
        isLoaded: true,
        profileTitle: response.data.title,
        profileBlurb: response.data.blurb,
        profileEducation: response.data.education,
        profileOccupation: response.data.occupation,
        profileRelationshipStatus: response.data.relationshipStatus,
        profileLocation: response.data.location,
        profileContactInfo: response.data.contactInfo,
      });
      if (response.data.education === 1) {this.setState({education2: "High School"})};
      if (response.data.education === 2) {this.setState({education2: "College"})};
      if (response.data.education === 3) {this.setState({education2: "Masters"})};
      if (response.data.education === 4) {this.setState({education2: "Phd or MD"})};
      if (response.data.education === 5) {this.setState({education2: "Irrelevant"})};
      if (response.data.relationshipStatus === 1) {this.setState({relationshipStatus2: "Available"})};
      if (response.data.relationshipStatus === 2) {this.setState({relationshipStatus2: "Not Available"})};
      if (response.data.relationshipStatus === 3) {this.setState({relationshipStatus2: "Irrelevant"})};
           }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
           });
    }

  getQsets() {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        let user = params.id;
        this.setState({userName: user});
        axios.get("http://localhost:8080/api/prm/sc/dc?id=" + user)
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
                <td> {data.questionSetVersionEntity.title} &nbsp; &nbsp;</td>
                <td> {data.questionSetVersionEntity.description} &nbsp;&nbsp;  </td>
               <td> &nbsp;{data.score} </td>
               <td> &nbsp;{data.result} </td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = ["Title", "Description","Score", "Result"]
      return header.map((key, index) => {
         return <th key={index}>{key} </th>
      })
   }

    render() {
        return (
        <React.Fragment>
            <div id="titleBarDiv">
            <div id="titleLinksDiv2">
            <a id="NJ2" href="/"> NeuralJuice </a>
            </div>
            </ div>
            <div class="settings2ButtonsDiv">
            </div>
            <div class="NetworkSingleContactDiv">
            <p> {this.state.userName}</p>
            </div>
            <div class="topParentDiv">
            <div>

            <ProfilePicturePublic url={this.state.url} />
            <p class="secondP"> {this.state.profileTitle} </p><br></br>
            <p class="secondP"> Location: {this.state.profileLocation} </p><br></br><br></br><br></br>
            </div>
            </div>


        { !this.state.showList &&
         <div class="topParentDiv">
         <p> Posted Stats </p>
         <div class="secondParentDiv">
         <p class="alertsSmallP"> &nbsp;(nothing to see here)</p>
         </div>
         </div> }

        { this.state.showList &&
         <div class="topParentDiv">
         <div class="secondParentDiv">
            <p> {this.state.profileTitle} </p>
            <table>
               <tbody>
               <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
               </tbody>
            </table>
         </div>
         </div> }


        </React.Fragment>
        )
    }

}

export default PublicUserPages;