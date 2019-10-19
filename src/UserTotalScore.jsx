import React from "react";
//import QuestionIssuer from "./QuestionIssuer";
import ScoreUrl from "./ScoreUrl";
import axios from 'axios';

class UserTotalScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      userScore: this.props.userScore,
    };
  }

//  componentDidMount() {
//  }

   render() {
   let { userScore } = this.state;
    return (
        <React.Fragment>
            <div id="totalscore">
            <p id="tscore">total score: {this.props.userScore}</p>
            </div>
            <ScoreUrl />
        </React.Fragment>
    );
   }
}

export default UserTotalScore;