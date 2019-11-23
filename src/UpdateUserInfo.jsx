import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { Card, Form, Input, Button} from "./components/AuthForms";
import { useAuth } from "./context/auth";

function UpdateUserInfo(props) {
  const referer = "/welcome";
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [ setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setoldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [UpdateMessage, setUpdateMessage] = useState("");
  const { setAuthTokens } = useAuth();

    function updateSignup() {
        if (window.confirm('Please confirm login credentials update')) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { password: password, userName: oldPassword }; // lame security check... TODO modify
        axios.post("http://localhost:8080/user/update", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
            if (response.data.password !== "error" ) {
            setAuthTokens(response.data);
            setUpdateMessage("Password has been updated"); }
            else {
            setUpdateMessage("Error updating password. Please check your input");
            };
               }).catch(error => {
               });
        } // end if window confirm
    }

  return (
    <React.Fragment>
      <div id="updateForm">
      <p> Password </p>
      <Form>
        <input class="loginInput" type="password" value={oldPassword} onChange={e => {setoldPassword(e.target.value);}} placeholder=" current password" />
        <input class="loginInput" type="password" value={password} onChange={e => {setPassword(e.target.value);}} placeholder=" new password" />
        <input class="loginInput" type="password" value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value);}} placeholder=" new password again" />
        <button class="inviteAuditButton" onClick={updateSignup}>Update</button>
        <p> {UpdateMessage} </p>
      </Form>
      </div>
    </React.Fragment>
  );
}

export default UpdateUserInfo;