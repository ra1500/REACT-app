import React, { useState } from "react"
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Answer from './Answer';
import PublicUserPages from './PublicUserPages';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import { AuthContext } from "./context/auth";
import Network from "./Network";
import Profile from "./Profile";
import Ask from "./Ask";
import Start from "./Start";

function App(props) {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    sessionStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

// <PrivateRoute path="/score" component={Score} /> // revert back to this after development
// <PrivateRoute path="/network" component={Network} /> // revert back to this after development
// <PrivateRoute path="/profile" component={Profile} /> // revert back to this after development

  return (
            <React.Fragment>
                    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
                    <Router>
                      <div>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/flavor" component={PublicUserPages} />
                        <Route exact path="/welcome" component={Start} />
                        <Route exact path="/answer" component={Answer} />
                        <Route exact path="/ask" component={Ask} />
                        <Route exact path="/network" component={Network} />
                        <Route exact path="/me" component={Profile} />
                      </div>
                    </Router>
                    </AuthContext.Provider>
            </React.Fragment>
  );
}

export default App;