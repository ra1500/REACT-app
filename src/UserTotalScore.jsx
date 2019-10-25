import React from "react";
//import QuestionIssuer from "./QuestionIssuer";
import ScoreUrl from "./ScoreUrl";
//import axios from 'axios';

class UserTotalScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      userScore: 0,
    };
  }

//  componentDidMount() {
//  }

   render() {
   if (this.props.userScore != null) {

    return (
        <React.Fragment>
            <div id="totalscore">
            <p id="tscore">score: {this.props.userScore}</p>
            </div>
            <ScoreUrl />
        </React.Fragment>
    ); // end return
    } //end if

    else {
    return (
        <React.Fragment>
            <div id="totalscore">
            <p id="tscore">score: 0</p>
            </div>
            <ScoreUrl />
        </React.Fragment>
    ); // end return
    } // end else
   }
}

export default UserTotalScore;