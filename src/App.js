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

  return (
            <React.Fragment>
                    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
                    <Router>
                      <div>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/flavor" component={PublicUserPages} />
                        <PrivateRoute path="/welcome" component={Start} />
                        <PrivateRoute path="/answer" component={Answer} />
                        <PrivateRoute path="/ask" component={Ask} />
                        <PrivateRoute path="/network" component={Network} />
                        <PrivateRoute path="/me" component={Profile} />
                      </div>
                    </Router>
                    </AuthContext.Provider>
            </React.Fragment>
  );
}

export default App;