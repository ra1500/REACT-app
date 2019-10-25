import React from "react";
import axios from 'axios';
import queryString from 'query-string';

class PublicUserPages extends React.Component {
  constructor(props) {
    super(props);
    let url = this.props.location.search;
    let params = queryString.parse(url);
    let user = params.gid;
    this.state = {userName: user, userScore: null}; //TODO: why couldnt userName use setState in component did mount??? wtf. userScore did, so...
  }

  componentDidMount() {
    this.getUserScore();
  }

  getUserScore() {
        //let { userName } = this.state;
        axios.get("http://localhost:8080/us/scores?gid=" + this.state.userName,)
        .then((response) => {
          this.setState({
            isLoaded: true,
            userScore: response.data.userScore,
          });
               }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
               });
    }

  render() {
    //console.log(this.state.userName);
    let { userName, userScore } = this.state;
    return (
    <div id="scoreurl">
        <a id="NJ" href="/"> NeuralJuice </a>
        <p> {userName} life score: {userScore} </p>
    </div>

    );
  }
}

export default PublicUserPages;