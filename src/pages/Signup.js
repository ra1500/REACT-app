import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { Card, Form, Input, Button} from "../components/AuthForms";
import { useAuth } from "../context/auth";

function Signup(props) {
  //const referer = props.location.state.referer || '/'; //TODO: make this work so that goes to homepage or page tried to initially access
  const referer = "/";
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
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
    <a id="NJ" href="/"> NeuralJuice </a>
    <Card>
      <Form>
        <Input type="username" value={userName} onChange={e => {setUserName(e.target.value);}}placeholder="username" />
        <Input type="password" value={password} onChange={e => {setPassword(e.target.value);}}placeholder="password" />
        <Button onClick={postSignup}>Sign Up</Button>
      </Form>
      <a href={'/'}> log in/home </a>
    </Card>
    </React.Fragment>
  );
}

export default Signup;