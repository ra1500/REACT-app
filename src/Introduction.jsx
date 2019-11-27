import React from "react";
import axios from 'axios';
import Login from './pages/Login';
import TitleBar from './TitleBar';
import Signup from './pages/Signup';

class Introduction extends React.Component {
  constructor(props) {
    super(props);
    this.showSignIn = this.showSignIn.bind(this);
    this.signUpCreate = this.signUpCreate.bind(this);
    this.viewSample = this.viewSample.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          showEmptySignInSpace: true,
          showSignIn: false,
          showIntro: true,
          showSignUpForm: false,
        };
  }

    componentDidMount() {
    }

    showSignIn() {
        this.setState({showSignIn: true, showEmptySignInSpace: false, showSignUpForm: false, showIntro: true,});
    }

    signUpCreate() {
        this.setState({showSignIn: false, showEmptySignInSpace: false, showIntro: false, showSignUpForm: true,});
    }

    viewSample() {

    }

  render() {

    return (
    <React.Fragment>

    <TitleBar showSignIn={this.showSignIn} signUpCreate={this.signUpCreate}/>

    {this.state.showSignIn &&
    <Login /> }
    {this.state.showEmptySignInSpace &&
    <div id="emptySignInSpace"></div> }

    {this.state.showSignUpForm &&
    <Signup /> }

    {this.state.showIntro &&

    <div class="profilePage">
    <p> Home </p>
    <p></p>
    <div class="invitationForm">


         <p> Answer quick questions with SCORE to disover how you rate in areas such as your destiny, life value or trivia etc.  </p>
         <p> Create your own question sets and ask your network in POSE.  </p>
         <p> Connect with friends and colleagues in NETWORK to see how they scored, and even audit their answers and make comments.  </p>
         <p> Post your scores to your EGO profile page. Share it with your network or on the internet. </p>
         <br></br>
         <button id="noAnswerButton" onClick={() => this.viewSample()}>Sample</button>
    </div>
    </div> }

    </React.Fragment>
    );
  }
}

export default Introduction;
