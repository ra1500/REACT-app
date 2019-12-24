import React from 'react';
//import React, { useState } from "react"; // test
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { useAuth } from "./context/auth"; // test

sessionStorage.clear(); // TODO: if tokens in sessionStorage then useAuth() so that a browser refresh doesnt require another login.

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
