import React from "react";
import axios from 'axios';
import queryString from 'query-string';

class PublicUserPages extends React.Component {
  constructor(props) {
    super(props);
    let url = this.props.location.search;
    let params = queryString.parse(url);
    let user = params.id;
    this.state = {
        userName: user,
        userScore: null,
        setVersion: 1,
        };
  }

  componentDidMount() {
    this.getUserScore();
  }

  getUserScore() {
        axios.get("http://localhost:8080/us/scores?id=" + this.state.userName + "&sv=" + this.state.setVersion,)
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
    <div id="scoreurl">
        <a id="NJ" href="/"> NeuralJuice </a>
        <p id="profileUserName"> I am {this.state.userName}</p>
        <p id="profileLifeUserScore">life score: {this.state.userScore} </p>
    </div>

    );
  }
}

export default PublicUserPages;