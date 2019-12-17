import React from "react";
import axios from 'axios';

class ScoreUrl extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    this.state = {
    userName: u,
    publicProfile: null,
    selectProfile: null,
    privacyUpdatedMessage: null,
    };
  }

  componentDidMount() {
    this.getPublicProfile();
  }

  getPublicProfile() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u +':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    axios.get("http://localhost:3000/api/user/pr",
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
      this.setState({
        isLoaded: true,
        publicProfile: response.data.publicProfile,
      });
           }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
           });
    }

  handleChange1(event) {
    this.setState({selectProfile: event.target.value});
  }
  handleSubmit1(event) {
    event.preventDefault();
    if (this.state.selectProfile == null) {
        this.state = {selectProfile: "Public"}; // Magic 1 of 3!
    }
    else {
        this.setState({selectProfile: this.state.selectProfile}); // magic 2 of 3.
    }
    //this.setState({publicProfile: this.state.selectProfile});
    this.patchPublicProfile();
  }

  patchPublicProfile() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u + ':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    let data = {publicProfile : this.state.selectProfile, };  // Magic 3 of 3
    axios.patch("http://localhost:3000/api/user/up", data,
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
    this.setState({isLoaded: true,
            publicProfile: response.data.publicProfile,
            privacyUpdatedMessage: " (updated to " + response.data.publicProfile + ")",
              });
           }).catch(error => {this.setState({ isLoaded: true, error});
           });
  }

  render() {
    return (
    <div id="meSettingsDiv">
        <p>Profile View Status for {this.state.userName}<br></br>
         Curent Status: {this.state.publicProfile} </p>

        <form onSubmit={this.handleSubmit1}>
            <div>
              <label><input value="Public" onChange={this.handleChange1} type="radio" name="optradio" /> Public (Internet & Network) </label>
            </div>
            <div>
              <label><input value="Network" onChange={this.handleChange1} type="radio" name="optradio" /> Network </label>
            </div>
            <div>
              <label><input value="Private" onChange={this.handleChange1} type="radio" name="optradio" /> Private </label>
            </div>
            <button type="submit" className="inviteAuditButton"> Update </button>
            <span class="updateParagraph">{this.state.privacyUpdatedMessage}</span>
        </form>

       <a id="publicProfileURLhref" href={'/flavor?id=' + this.state.userName}> www.neuraljuice.com/flavor?id={this.state.userName} </a>
       <p class="paragraphInline"> (Your public profile page URL) </p>
    </div>

    );
  }
}

export default ScoreUrl;