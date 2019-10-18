import React from "react";
//import QuestionIssuer from "./QuestionIssuer";
import ScoreUrl from "./ScoreUrl";

class UserTotalScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      userId: 99,
      userScore: this.props.userScore,
    };
  }

  componentDidMount() {
    this.getUserScore();
  }

  getUserScore() {
    fetch("http://localhost:8080/us/" + this.state.userId)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            userScore: result.userScore,
          });
        },
        // Note: it's important to handle errors here instead of a catch() block so that we don't swallow exceptions from actual bugs in components.
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
            <div id="totalscore">
            <p id="tscore">total score: {userScore}</p>
            </div>
            <ScoreUrl />
        </React.Fragment>
    );
   }
}

export default UserTotalScore;