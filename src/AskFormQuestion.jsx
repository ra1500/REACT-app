import React from "react";
import axios from 'axios';

class AskFormQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleChange5 = this.handleChange5.bind(this);
    this.handleChange6 = this.handleChange6.bind(this);
    this.handleChange7 = this.handleChange7.bind(this);
    this.handleChange8 = this.handleChange8.bind(this);
    this.handleChange9 = this.handleChange9.bind(this);
    this.handleChange10 = this.handleChange10.bind(this);
    this.handleChange11 = this.handleChange11.bind(this);
    this.handleChange12 = this.handleChange12.bind(this);
    this.handleChange13 = this.handleChange13.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleSubmit3 = this.handleSubmit3.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          questionSetVersion: this.props.questionSetVersion,
          sequenceNumber: this.props.sequenceNumber,
          maxPoints: null,
          question: null,
          answer1: null,
          answer2: null,
          answer3: null,
          answer4: null,
          answer5: null,
          answer6: null,
          answer1Points: null,
          answer2Points: null,
          answer3Points: null,
          answer4Points: null,
          answer5Points: null,
          answer6Points: null,
        };
  }

    componentDidMount() {
    }

   handleChange1(event) {
     this.setState({answer1: event.target.value});
   }
   handleChange2(event) {
     this.setState({answer1Points: event.target.value});
   }
   handleChange3(event) {
     this.setState({answer2: event.target.value});
   }
   handleChange4(event) {
     this.setState({answer2Points: event.target.value});
   }
   handleChange5(event) {
     this.setState({answer3: event.target.value});
   }
   handleChange6(event) {
     this.setState({answer3Points: event.target.value});
   }
   handleChange7(event) {
     this.setState({answer4: event.target.value});
   }
   handleChange8(event) {
     this.setState({answer4Points: event.target.value});
   }
   handleChange9(event) {
     this.setState({answer5: event.target.value});
   }
   handleChange10(event) {
     this.setState({answer5Points: event.target.value});
   }
   handleChange11(event) {
     this.setState({answer6: event.target.value});
   }
   handleChange12(event) {
     this.setState({answer6Points: event.target.value});
   }
   handleChange13(event) {
     this.setState({question: event.target.value});
   }

   postNewQuestion() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        const maximumPoints = Math.max(this.state.answer1Points, this.state.answer2Points,this.state.answer3Points,
        this.state.answer4Points,this.state.answer5Points,this.state.answer6Points,);
        let data = { maxPoints: maximumPoints, question: this.state.question,
         sequenceNumber: this.props.sequenceNumber, answer1: this.state.answer1, answer1Points: this.state.answer1Points,
         answer2: this.state.answer2, answer2Points: this.state.answer2Points,
         answer3: this.state.answer3, answer3Points: this.state.answer3Points,
         answer4: this.state.answer4, answer4Points: this.state.answer4Points,
         answer5: this.state.answer5, answer5Points: this.state.answer5Points,
         answer6: this.state.answer6, answer6Points: this.state.answer6Points,};
        axios.post("http://localhost:8080/q/p?qsid=" + this.props.questionSetVersion, data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true,
                  });
         this.props.manageSequenceNumber(); //
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
   }

  handleSubmit1(event) {
    event.preventDefault();
    this.postNewQuestion();
          this.setState({
            question: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            answer5: "",
            answer6: "",
            answer1Points: "",
            answer2Points: "",
            answer3Points: "",
            answer4Points: "",
            answer5Points: "",
            answer6Points: "",
          });
    this.getCurrentQuestion();
    }
  handleSubmit2(event) {
    event.preventDefault();
    }
  handleSubmit3(event) {
    event.preventDefault();
    this.props.previousSequenceNumber();
    this.getPreviousQuestion();
    }

  getPreviousQuestion() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/q/" + this.props.questionSetVersion + "/" + (this.props.sequenceNumber-1),
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            question: response.data.question,
            questionsEntityId: response.data.id,
            answer1: response.data.answer1,
            answer2: response.data.answer2,
            answer3: response.data.answer3,
            answer4: response.data.answer4,
            answer5: response.data.answer5,
            answer6: response.data.answer6,
            answer1Points: response.data.answer1Points,
            answer2Points: response.data.answer2Points,
            answer3Points: response.data.answer3Points,
            answer4Points: response.data.answer4Points,
            answer5Points: response.data.answer5Points,
            answer6Points: response.data.answer6Points,
          });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

  getCurrentQuestion() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/q/" + this.props.questionSetVersion + "/" + (this.props.sequenceNumber+1),
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            question: response.data.question,
            questionsEntityId: response.data.id,
            answer1: response.data.answer1,
            answer2: response.data.answer2,
            answer3: response.data.answer3,
            answer4: response.data.answer4,
            answer5: response.data.answer5,
            answer6: response.data.answer6,
            answer1Points: response.data.answer1Points,
            answer2Points: response.data.answer2Points,
            answer3Points: response.data.answer3Points,
            answer4Points: response.data.answer4Points,
            answer5Points: response.data.answer5Points,
            answer6Points: response.data.answer6Points,
          });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

  render() {
    return (
    <React.Fragment>
      <div id="askQuestionsForm">
      <p>You are now entering question number &nbsp; {this.props.sequenceNumber}</p>
      <form onSubmit={this.handleSubmit1}>
          <div class="askDiv"><span class="askText">Question &nbsp;</span>
          <input class="askForm" size="80" maxlength="80" type="text" value={this.state.question} onChange={this.handleChange13} /></div>

          <div class="askDiv"><span class="askText">Answer 1 &nbsp;</span>
          <input class="askForm" type="text" size="40" maxlength="40" value={this.state.answer1} onChange={this.handleChange1} />
          <span class="askText">Points &nbsp;</span>
          <input type="number" maxlength="3" size="3" class="askForm" type="text" value={this.state.answer1Points} onChange={this.handleChange2} /></div>

          <div class="askDiv"><span class="askText">Answer 2 &nbsp;</span>
          <input class="askForm" type="text" size="40" maxlength="40" value={this.state.answer2} onChange={this.handleChange3} />
          <span class="askText">Points &nbsp;</span>
          <input type="number" maxlength="3" size="3" class="askForm" type="text" value={this.state.answer2Points} onChange={this.handleChange4} /></div>

          <div class="askDiv"><span class="askText">Answer 3 &nbsp;</span>
          <input class="askForm" type="text" size="40" maxlength="40" value={this.state.answer3} onChange={this.handleChange5} />
          <span class="askText">Points &nbsp;</span>
          <input type="number" maxlength="3" size="3" class="askForm" type="text" value={this.state.answer3Points} onChange={this.handleChange6} /></div>

          <div class="askDiv"><span class="askText">Answer 4 &nbsp;</span>
          <input class="askForm" type="text" size="40" maxlength="40" value={this.state.answer4} onChange={this.handleChange7} />
          <span class="askText">Points &nbsp;</span>
          <input type="number" maxlength="3" size="3" class="askForm" type="text" value={this.state.answer4Points} onChange={this.handleChange8} /></div>

          <div class="askDiv"><span class="askText">Answer 5 &nbsp;</span>
          <input class="askForm" type="text" size="40" maxlength="40" value={this.state.answer5} onChange={this.handleChange9} />
          <span class="askText">Points &nbsp;</span>
          <input type="number" maxlength="3" size="3" class="askForm" type="text" value={this.state.answer5Points} onChange={this.handleChange10} /></div>

          <div class="askDiv"><span class="askText">Answer 6 &nbsp;</span>
          <input class="askForm" type="text" size="40" maxlength="40" value={this.state.answer6} onChange={this.handleChange11} />
          <span class="askText">Points &nbsp;</span>
          <input type="number" maxlength="3" size="3" class="askForm" type="text" value={this.state.answer6Points} onChange={this.handleChange12} /></div>


          <input className="qbutton" type="submit" value="Add" />
      </form>
          <form onSubmit={this.handleSubmit2}>
          <input className="qbutton" type="submit" value="Jump to" />
          </form>
          <form onSubmit={this.handleSubmit3}>
          <input className="qbutton" type="submit" value="Previous" />
          </form>


      </div>
    </React.Fragment>
    );
  }
}

export default AskFormQuestion;