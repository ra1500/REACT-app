import React from "react";
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
    this.showIntroStuff = this.showIntroStuff.bind(this);
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

    showIntroStuff() {
        this.setState({showSignIn: false, showSignUpForm: false, showIntro: true, showSample: false});
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

    <TitleBar showSignIn={this.showSignIn} signUpCreate={this.signUpCreate} showIntroStuff={this.showIntroStuff}/>

    {this.state.showSignIn &&
    <Login signUpCreate={this.signUpCreate} /> }

    {this.state.showSignUpForm &&
    <Signup /> }

    {this.state.showIntro &&
    <div class="topParentDiv">
    <p> NeuralJuice </p>
    <p></p>
    <div class="secondParentDiv">
         <p> Social networking made easy. </p>
         <p>  - See who your friends' friends are. </p>
         <p>  - Add stats to your profile to better show who you are. </p>
         <p>  - Create new specialized stats for use in your network. </p>
         <p>  - Invite your network to review and comment.  </p>
         <p>  - No trackers or cookies.  </p>
         <button id="sampleButton" onClick={() => this.viewSample()}>Sample Stat: Animal Trivia Intelligence</button>
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
