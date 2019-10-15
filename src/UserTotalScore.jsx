import React from "react";
import QuestionIssuer from "./QuestionIssuer";

class UserTotalScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      userId: 99,
      userScore: 0,
    };
  }

  componentDidMount() {
    this.renderUserScore();
  }

  renderUserScore() {
    fetch("http://localhost:8080/us/" + this.state.userId)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            userScore: result.userScore,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
            userScore: 0,
          });
        }
      )
    }

   render() {
   let { userScore } = this.state;
    return (
        <React.Fragment>
            <p className="qtext">user total score: {userScore}</p>
        </React.Fragment>
    );
   }
}

export default UserTotalScore;