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
    axios.get("http://localhost:8080/user/pr",
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
    axios.patch("http://localhost:8080/user/up", data,
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
    this.setState({isLoaded: true,
            publicProfile: response.data.publicProfile,
              });
           }).catch(error => {this.setState({ isLoaded: true, error});
           });
  }

  render() {
    return (
    <div id="scoreurl">
        <p className="urltext">Your public score profile page: </p> <a href={'/us/scores?gid=' + this.state.userName}> www.neuraljuice.com/us/scores?gid={this.state.userName} </a>
        <p> Your public profile page is now {this.state.publicProfile}</p>
      <form onSubmit={this.handleSubmit1}>
          <label> Change public profile page
          <select value={this.state.connectionType} onChange={this.handleChange1}>
              <option value="Public">Public</option>
              <option value="Network">Network only</option>
              <option value="Private">Private/Hidden</option>
           </select>
           <input type="submit" value="Update" />
           </label>
       </form>
    </div>

    );
  }
}

export default ScoreUrl;