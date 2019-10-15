import React from 'react';
import './App.css';
import Introduction from "./Introduction";
//import Question from "./Question";
import QuestionIssuer from "./QuestionIssuer";
import UserTotalScore from "./UserTotalScore";


function App() {
  return (
            <React.Fragment>
                <Introduction />
                <QuestionIssuer />
            </React.Fragment>
  );
}

export default App;
