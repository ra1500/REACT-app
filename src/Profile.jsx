import React from "react";
import TitleBar from "./TitleBar";
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          userScore: null,
        };
    };

  componentDidMount() {
    this.getUserScore();
  }

  getUserScore() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/us/",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            userScore: response.data.userScore,
          });
               }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
               });
    }

   render() {
    return (
        <React.Fragment>
            <TitleBar />
            <p>score {this.state.userScore}</p>
            <p>username, password change, email, publicprofilepermission, </p>
        </React.Fragment>
    ); // end return
   }
}

export default Profile;