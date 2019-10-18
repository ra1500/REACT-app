import React, { useState } from "react"
import './App.css';
import Introduction from "./Introduction";
import TitleBar from "./TitleBar";
import QuestionIssuer from "./QuestionIssuer";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Admin from './Admin';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import { AuthContext } from "./context/auth";

function App(props) {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    sessionStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
            <React.Fragment>
                <TitleBar />
                <QuestionIssuer />
                    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
                    <Router>
                      <div>
                        <ul>
                          <li>
                            <Link to="/">Home Page</Link>
                          </li>
                          <li>
                            <Link to="/admin">Admin Page</Link>
                          </li>
                        </ul>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <PrivateRoute path="/admin" component={Admin} />
                      </div>
                    </Router>
                    </AuthContext.Provider>
            </React.Fragment>
  );
}

export default App;