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
    <div id="introduction">
         <span> Life Scores. Who are you. How do you compare. </span><br></br>
         <span> Decisions to be made. Ask your network. </span><br></br>
         <span> Destiny. Find out what it may be. </span><br></br>
         <span> Sports games. Who will win. Ask your friends. </span><br></br>
         <span> Science problem. Your colleagues might know the right solution. </span><br></br>  <br></br>

         <span>&nbsp; &nbsp; Score &nbsp;  &nbsp; Choose your answers carefully</span><br></br>
         <span>&nbsp; &nbsp; &nbsp; Pose &nbsp;  &nbsp; Inquire to understand</span><br></br>
         <span>Connect &nbsp;  &nbsp; Network with your invited friends</span><br></br>
         <span>&nbsp; &nbsp; &nbsp; &nbsp; Ego &nbsp;  &nbsp; View your outcomes. Share with your network or the world</span><br></br>
         <br></br>
    </div> }

    </React.Fragment>
    );
  }
}

export default Introduction;
