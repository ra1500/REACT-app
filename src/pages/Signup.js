import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { Form } from "../components/AuthForms";
import { useAuth } from "../context/auth";

function Signup(props) {
  const referer = "/welcome";
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [ setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");
  const { setAuthTokens } = useAuth();

  function postSignup() {
    if (password !== verifyPassword) { setVerifyMessage("Please check your input. Password fields did not match.");}
    else if (userName.length < 4) { setVerifyMessage("Please ensure username is at least 4 characters in length");}
    else if (password.length < 4) { setVerifyMessage("Please ensure password is at least 4 characters in length");}
    else {
    axios.post("http://localhost:3000/api/user/signup", {
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
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <React.Fragment>

      <div class="topParentDiv">
        <p> Sign up </p>
        <p></p>
        <div class="secondParentDiv">
          <Form>
            <input class="loginInput" maxlength="100" type="username" value={userName} onChange={e => {setUserName(e.target.value);}}placeholder="username" /> <p class="questionsDescriptionParagraph"> (must be at least 4 characters in length) </p><br></br>
            <input class="loginInput" maxlength="100" type="password" value={password} onChange={e => {setPassword(e.target.value);}}placeholder="password" /> <p class="questionsDescriptionParagraph"> (must be at least 4 characters in length) </p><br></br>
            <input class="loginInput" maxlength="100" type="password" value={verifyPassword} onChange={e => {setVerifyPassword(e.target.value);}}placeholder="password again" /><br></br>
            <button class="greenButton" onClick={postSignup}>Sign Up</button>

            <br></br><br></br>
            <p>We don't use cookies.</p>
            <div>
            <p>{verifyMessage}</p>
            </div>
          </Form>
        </div>
      </div>

    </React.Fragment>
  );
}

export default Signup;