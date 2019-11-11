import React from "react";
import TitleBar from "./TitleBar";
import axios from 'axios';
import ScoreUrl from "./ScoreUrl";
import ScoresList from "./ScoresList";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          userScore: null,
          setVersion: 1,
          title: null,
          version: null,
        };
    };

  componentDidMount() {
  }

   render() {
    return (
        <React.Fragment>
            <TitleBar />
            <ScoreUrl />
            <ScoresList />
        </React.Fragment>
    ); // end return
   }
}

export default Profile;