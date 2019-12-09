import React from "react";
import axios from 'axios';
import Login from './pages/Login';
import TitleBar from './TitleBar';
import SampleQuestions from './SampleQuestions';
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
          showSignIn: false,
          showIntro: true,
          showSignUpForm: false,
          showSample: false,
        };
  }

    componentDidMount() {
    }

    showSignIn() {
        this.setState({showSignIn: true, showSignUpForm: false, showIntro: false, showSample: false});
    }

    signUpCreate() {
        this.setState({showSignIn: false, showIntro: false, showSignUpForm: true, showSample: false});
    }

    viewSample() {
        if (!this.state.showSample) {
            this.setState({showSignIn: false, showIntro: true, showSignUpForm: false, showSample: true});
        }
        else {
            this.setState({showSignIn: false, showIntro: true, showSignUpForm: false, showSample: false});
        }
    }

  render() {

    return (
    <React.Fragment>

    <TitleBar showSignIn={this.showSignIn} signUpCreate={this.signUpCreate}/>

    {this.state.showSignIn &&
    <Login /> }

    {this.state.showSignUpForm &&
    <Signup /> }

    {this.state.showIntro &&
    <div class="topParentDiv">
    <p> NeuralJuice </p>
    <p></p>
    <div class="secondParentDiv">
         <p>NeuralJuice. The web app for fun quizzes, trivia, asking advice and more.</p>
         <p> See how you score in ANSWER.  </p>
         <p> Create your own question sets. Ask your network for advice or to help you select your fantasy football team or make your own trivia quiz etc. with ASK.  </p>
         <p> Connect with friends and colleagues in NETWORK. 'Audit' their results and give them comments with your opinion. </p>
         <p> Post your results to your ME page. Share with your network or the internet. </p>
         <br></br>
         <button id="sampleButton" onClick={() => this.viewSample()}>Sample</button>
    </div>

    </div> }

    {this.state.showSample &&
    <div id="questionsComponent">
        <SampleQuestions />
    </div> }

    <div class="introPadding"></div>
    </React.Fragment>
    );
  }
}

export default Introduction;
