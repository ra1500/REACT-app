import React from "react";
import axios from 'axios';
import TitleBar from "./TitleBar";

class Start extends React.Component {
  constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
        };
  }

    componentDidMount() {
    }

  render() {
    return (
    <React.Fragment>
      <TitleBar />
      <div class="profilePage">
        <p> Let's begin </p>
        <p></p>
        <div class="invitationForm">
            <p> Let's begin </p>
        </div>
        </div>
    </React.Fragment>
    );
  }
}

export default Start;