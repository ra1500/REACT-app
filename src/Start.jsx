import React from "react";
import axios from 'axios';
import TitleBar from "./TitleBar";
import AlertsNewContactsList from "./AlertsNewContactsList";
import AlertsNewAuditInviteList from "./AlertsNewAuditInviteList";

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

          <div class="settings2ButtonsDiv">
            <button class="settingsButton" onClick={this.showAlerts}> Alerts  </button>
            <button class="settingsButton" onClick={this.showFeatures}> About NJ </button>
          </div>


       { this.state.showAlerts &&
      <div class="topParentDiv">
        <p> Welcome - Alerts </p>
        <p></p>
        <div class="secondParentDiv">
            <p> New Network Invitations (recent two weeks) </p>
            <AlertsNewContactsList />
            <p> New Audit Invitations (recent two weeks) </p>
            <AlertsNewAuditInviteList />
        </div>
        </div> }

       { this.state.showFeatures &&
      <div class="topParentDiv">
        <p> Welcome - About NeuralJuice</p>
        <p></p>
        <div class="secondParentDiv">
            <p> Features </p>
            <p> Public Profile Internet Page: only NJ sets will appear on public page. </p>
        </div>
        </div> }

    </React.Fragment>
    );
  }
}

export default Start;