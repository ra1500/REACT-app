import React from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";
import { AuthContext } from "./context/auth";

class Introduction extends React.Component {
    static contextType = AuthContext
  constructor(props) {
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          userName: null,
          password: null,
          isLoggedIn: false,
          referer: "/start",
          redirect: false,
        };
  }

    componentDidMount() {
    const auth = this.context
    }

  handleChange1(event) {
    this.setState({userName: event.target.value});
  }
  handleChange2(event) {
    this.setState({password: event.target.value});
  }
  handleSubmit(event) {
    this.postLogin();
    event.preventDefault();
  }

    postLogin() {
        //const { setAuthTokens } = useAuth();
        let data = { userName: this.state.userName, password: this.state.password };
        axios.post("http://localhost:8080/user/userId", data)
        .then((response) => {
            if (response.status === 200) {
            //setAuthTokens(response.data);
            //this.state.useAuth(response.data);
            //this.AuthTokens(response.data);
            //this.props.useAuth(response.data);
            this.setState({isLoaded: true,
             isLoggedIn: true,
            //auth: response.data,
            //authTokens: response.data,
            });
            //this.useAuth(response.data); //
            this.props.useAuth(response.data);
            this.goToStart();
            } // end if
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

    goToStart() {
      if (this.state.isLoggedIn) {
        this.setState({redirect: true});
      }
    }

  render() {

    return (
    <React.Fragment>
    <a id="NJ" href="/"> NeuralJuice </a>

      <form onSubmit={this.handleSubmit}>
        <input type="username" value={this.state.userName} onChange={this.handleChange1} placeholder="user id"/>
        <input type="password" value={this.state.password} onChange={this.handleChange2} placeholder="password"/>
        <button type="submit">Log in</button>
      </form>

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
    </div>

    { this.state.redirect &&
    <Redirect to={this.state.referer} /> }

    </React.Fragment>
    );
  }
}

export default Introduction;
