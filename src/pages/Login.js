import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { Form } from "../components/AuthForms";
import { useAuth } from "../context/auth";


function Login(props) {
  const referer = "/welcome";
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();


  function postLogin() {
    axios.post("http://localhost:8080/user/userId", { // TODO: make this 'light' without friendsList
      userName,
      password
    }).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

// TODO why must this be <Form> instead of <form>?
  return (
    <React.Fragment>
      <div class="topParentDiv">
        <p> Sign in </p>
        <p></p>
        <div class="secondParentDiv">
      <Form>
        <input class="loginInput" type="username" value={userName} onChange={e => {setUserName(e.target.value);}} placeholder="username"/><br></br>
        <input class="loginInput" type="password" value={password} onChange={e => {setPassword(e.target.value);}} placeholder="password"/><br></br>
        <button class="titleButton" onClick={postLogin}> Let's go </button>
      </Form>
        { isError &&
        <p>The username or password provided were incorrect</p> }
        </div>
      </div>

    </React.Fragment>
  );
}

export default Login;