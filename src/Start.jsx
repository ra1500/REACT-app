import React from "react";
import axios from 'axios';
import TitleBar from "./TitleBar";

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.showAlerts = this.showAlerts.bind(this);
    this.showFeatures = this.showFeatures.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          showAlerts: true,
          showFeatures: false,
        };
  }

    componentDidMount() {
    }

    showAlerts() {
        this.setState({showAlerts: true, showFeatures: false,});
    }
    showFeatures() {
        this.setState({showAlerts: false, showFeatures: true,});
    }

  render() {
    return (
    <React.Fragment>
      <TitleBar />

          <div id="settingsButtionDivWelcome">
            <button class="settingsButton" onClick={this.showAlerts}> Alerts  </button>
            <button class="settingsButton" onClick={this.showFeatures}> About NJ </button>
          </div>


       { this.state.showAlerts &&
      <div class="profilePage">
        <p> Welcome. Let's begin </p>
        <p></p>
        <div class="invitationForm">
            <p> Alerts </p>
        </div>
        </div> }

       { this.state.showFeatures &&
      <div class="profilePage">
        <p> NeuralJuice Features Guide </p>
        <p></p>
        <div class="invitationForm">
            <p> Feature explanation </p>
            <p> Public Profile Internet Page: only NJ sets will appear on public page. </p>
        </div>
        </div> }

    </React.Fragment>
    );
  }
}

export default Start;