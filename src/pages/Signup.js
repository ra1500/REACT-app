import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { Card, Form, Input, Button} from "../components/AuthForms";
import { useAuth } from "../context/auth";
import TitleBar from '../TitleBar';

function Signup(props) {
  const referer = "/welcome";
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [ setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  function postSignup() {
    axios.post("http://localhost:8080/user/signup", {
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

  return (
    <React.Fragment>

      <div class="profilePage">
        <p> Sign up </p>
        <p></p>
        <div class="invitationForm">
          <Form>
            <input class="loginInput" type="username" value={userName} onChange={e => {setUserName(e.target.value);}}placeholder="username" />
            <input class="loginInput" type="password" value={password} onChange={e => {setPassword(e.target.value);}}placeholder="password" />
            <button class="titleButton" onClick={postSignup}>Sign Up</button>
          </Form>
        </div>
      </div>
      
    </React.Fragment>
  );
}

export default Signup;