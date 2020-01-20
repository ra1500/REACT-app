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
         <p> Send your friends a set of questions and then see what their results are.</p>
         <p> We have some pre-made question sets such as trivia, invitations, and stock picks etc.</p>
         <p> Or, create your own and invite your friends to answer.</p>
         <p> Start by logging in and going to 'ASK' to create your own question set. Then invite </p>
         <p> your network contacts to answer and see how they score. </p>
         <p> Your friends can then invite you to comment on their answers after they've posted their results. </p>
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
