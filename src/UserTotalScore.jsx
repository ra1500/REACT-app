import React from "react";
//import QuestionSetSelector from "./QuestionSetSelector";

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
            {this.props.userScore}
        </React.Fragment>
    ); // end return
    } //end if

    else {
    return (
        <React.Fragment>
            0
        </React.Fragment>
    ); // end return
    } // end else
   }
}

export default UserTotalScore;