import React from "react";
import TitleBar from "./TitleBar";
import AlertsNewContactsList from "./AlertsNewContactsList";
import AlertsNewAuditInviteList from "./AlertsNewAuditInviteList";
import AlertsNewAuditPostedList from "./AlertsNewAuditPostedList";

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
            <p id="alertsBlueP"> Go to 'Answer' to see our new question sets. </p> <br></br>
            <p class="questionsParagraph"> New Network Invitations (&lt; 2 weeks) </p>
            <AlertsNewContactsList /><br></br>
            <p class="questionsParagraph"> New Review Invitations (&lt; 2 weeks) </p>
            <AlertsNewAuditInviteList /><br></br>
            <p class="questionsParagraph"> New Completed Reviews (&lt; 1 week) </p>
            <AlertsNewAuditPostedList /><br></br>
        </div>
        </div> }

       { this.state.showFeatures &&
      <div class="topParentDiv">
        <p> Welcome - About NeuralJuice</p>
        <p></p>
        <div class="secondParentDiv">
            <p> NeuralJuice. The web app for quizzes, trivia, asking advice and more. </p>

            <p class="questionsParagraph"> WELCOME </p>
            <p class="questionsParagraph">  Alerts. This is the first page you see after logging in. If there is any recent activity affecting your account you will be alerted here. New network invitations, new invitations to review a network's answers and new completed reviews from contacts in your network. </p><br></br><br></br><br></br>
            <p class="questionsParagraph"> ANSWER </p>
            <p class="questionsParagraph"> View and answer available question sets here. NJ Sets are those created by NeuralJuice. Network Sets are from contacts in your network who have specifically invited you to answer. My Created Sets are those that you created in 'ASK' (and of course you can answer them as well). </p><br></br><br></br><br></br>
            <p class="questionsParagraph"> ASK </p>
            <p class="questionsParagraph">  Create your own question sets on anything you like. Edit or delete existing ones in Manage. Invite your network to answer your new set. Note that your created sets are only available to those within your network (as well as their posted results). Also, if you delete a question (or a set), it will also delete any of your contacts' answers. Limit of 40 questions per set and 10 sets per account. </p><br></br><br></br><br></br><br></br>
            <p class="questionsParagraph"> NETWORK </p>
            <p class="questionsParagraph"> View your list of contacts. Invite new ones based on their username. If your contact has invited you to review their answers to a set then start your review here (select the contact and then choose 'Review Them'). </p><br></br><br></br><br></br>
            <p class="questionsParagraph"> ME </p>
            <p class="questionsParagraph"> View your posted results and created question sets here. Invite network contacts to review your answers. View those reviews through here as well. Note that you must post a score/result before it will show here and then be available to invite reviewers. Limit of 4 question sets can be put out for review per account. </p><br></br><br></br><br></br><br></br>
            <p class="questionsParagraph"> Public Profile Page </p>
            <p class="questionsParagraph"> All accounts have a public internet URL available where their scores/results are displayed. You can find the URL under 'ME -> Settings'. Only NJ Sets can be displayed publicly. By default, new user accounts are set to 'Network' only view. Change to 'Public' for the public URL to be activated in 'ME -> Settings'. </p> <br></br><br></br><br></br>
        </div>
        </div> }

    </React.Fragment>
    );
  }
}

export default Start;