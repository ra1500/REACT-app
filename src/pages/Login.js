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

function enterPressed(event) {
    var code = event.keyCode || event.which;
    if(code === 13) {
        postLogin();
    }
}

  function postLogin() {
    axios.post("http://localhost:8080/api/user/userId", {
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
        <input class="loginInput" type="password" value={password} onChange={e => {setPassword(e.target.value);}} placeholder="password" onKeyPress={enterPressed}/><br></br>
        <button class="greenButton" onClick={postLogin}> Let's go </button>
        <br></br>
      </Form>
      <button class="inviteAuditButton" onClick={() => props.signUpCreate()}>(easy sign up)</button>

        { isError &&
        <p id="deletedScorePostP">username or password not found</p> }

        </div>
      </div>

    </React.Fragment>
  );
}

export default Login;