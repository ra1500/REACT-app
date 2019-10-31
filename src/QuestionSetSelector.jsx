import React from "react";
import Questions from "./Questions";
import axios from 'axios';

class QuestionSetSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          questionSetSize: 10000,
          questionToGoTo: 1,
          setNumber: 1,
          maxPoints: 10000,
        };
    };

  componentDidMount() {
    this.getMaxQtyQuestions();
  }

  getMaxQtyQuestions() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/max?sn=" + this.state.setNumber,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            questionSetSize: response.data.maxQtyQuestions,
          });
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  getMaxPoints() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/max?snp=" + this.state.setNumber,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            maxPoints: response.data.maxPoints,
          });
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

   render() {
    return (
        <React.Fragment>
            <Questions questionSetSize={this.state.questionSetSize} questionToGoTo={this.state.questionToGoTo} maxPoints={this.state.maxPoints}/>
        </React.Fragment>
    ); // end return
   }
}

export default QuestionSetSelector;