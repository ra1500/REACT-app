import React from "react";
import Questions from "./Questions";
import axios from 'axios';

class QuestionSetSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    //this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.state = {
          questionSetSize: 10000,
          questionToGoTo: 1,
          setNumber: null,
          maxPoints: 10000,
          category: null,
          description: null,
          title: null,
          version: null,
          renderQuestions: false,
        };
    };

  componentDidMount() {
  }

  handleSubmit1() {
    this.setState({renderQuestions: false});
    this.state = {setNumber: 1}; // must mutate state directly cuz setState is for matching another variable
    this.setState({setNumber: this.state.setNumber}); // setState to the current value of state.
    this.getMaxQtyAndPoints();
    this.getQuestionSetVersionEntity(); // *
  }
  handleSubmit2() {
    this.setState({renderQuestions: false});
    this.state = {setNumber: 2}; // must mutate state directly cuz setState is for matching another variable
    this.setState({setNumber: this.state.setNumber}); // setState to the current value of state.
    console.log(this.state.setNumber);
    this.getMaxQtyAndPoints();
    this.getQuestionSetVersionEntity(); // *
  }

  getMaxQtyAndPoints() {
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
            maxPoints: response.data.maxPoints,
          });
          this.renderQuestions(); // ********
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  getQuestionSetVersionEntity() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/qs/" + this.state.setNumber,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            category: response.data.category,
            description: response.data.description,
            title: response.data.title,
            version: response.data.version,
          });
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  renderQuestions() {
    if (this.state.setNumber == null) {
        this.setState({renderQuestions: false});
     } // end if
     else {
        this.setState({renderQuestions: true});
     }
  }

   render() {
    return (
        <React.Fragment>

        <div id="chooseSet">
            <p> Select a quiz. 'Life Score' is where it all begins. Share your score with you friends on your public profile page. Send them a link.</p>

            <table>
            <tr>
                <th> Title </th><th> Category </th><th> Description </th>
            </tr>
            <tr>
                <td id="selectQuestionSet" onClick={() => this.handleSubmit1()}> Life Score </td><td> Life </td><td> Who are you? What is your life value score</td>
            </tr>
            <tr>
                <td> (more to come)</td>
            </tr>
            </table>

        </div>
            { this.state.renderQuestions &&
            <div>
            <Questions setNumber={this.state.setNumber} questionSetSize={this.state.questionSetSize} questionToGoTo={this.state.questionToGoTo} maxPoints={this.state.maxPoints} title={this.state.title} description={this.state.description}/>
            </div> }

        </React.Fragment>
    ); // end return
   }
}

export default QuestionSetSelector;