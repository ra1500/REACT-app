import React, { useState } from "react"
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Main from './Main';
import PublicUserPages from './PublicUserPages';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import { AuthContext } from "./context/auth";
//import TitleBar from "./TitleBar";

function App(props) {
  const [authTokens, setAuthTokens] = useState();

   // setAuthTokens(sessionStorage.getItem("tokens")); // ????

  const setTokens = (data) => {
    sessionStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
    //if (data == null) { // this if statement probably trash. delete.
    //setAuthTokens(sessionStorage.getItem("tokens"));
    //}
  }

//<PrivateRoute path="/Main" component={Main} /> // revert back to this after development

  return (
            <React.Fragment>
                    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
                    <Router>
                      <div>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/us/scores" component={PublicUserPages} />
                        <Route exact path="/Main" component={Main} />

                      </div>
                    </Router>
                    </AuthContext.Provider>
            </React.Fragment>
  );
}

export default App;