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
    }

  render() {
    return (
    <React.Fragment>
        <p>Enter a question</p>
      <form onSubmit={this.handleSubmit1}>
          Question
          <input class="askForm" type="text" value={this.state.question} onChange={this.handleChange13} />
          Answer 1
          <input class="askForm" type="text" value={this.state.answer1} onChange={this.handleChange1} />
          Answer 1 Points
          <input class="askForm" type="text" value={this.state.answer1Points} onChange={this.handleChange2} />
          Answer 2
          <input class="askForm" type="text" value={this.state.answer2} onChange={this.handleChange3} />
          Answer 2 Points
          <input class="askForm" type="text" value={this.state.answer2Points} onChange={this.handleChange4} />
          Answer 3
          <input class="askForm" type="text" value={this.state.answer3} onChange={this.handleChange5} />
          Answer 3 Points
          <input class="askForm" type="text" value={this.state.answer3Points} onChange={this.handleChange6} />
          Answer 4
          <input class="askForm" type="text" value={this.state.answer4} onChange={this.handleChange7} />
          Answer 4 Points
          <input class="askForm" type="text" value={this.state.answer4Points} onChange={this.handleChange8} />
          Answer 5
          <input class="askForm" type="text" value={this.state.answer5} onChange={this.handleChange9} />
          Answer 5 Points
          <input class="askForm" type="text" value={this.state.answer5Points} onChange={this.handleChange10} />
          Answer 6
          <input class="askForm" type="text" value={this.state.answer6} onChange={this.handleChange11} />
          Answer 6 Points
          <input class="askForm" type="text" value={this.state.answer6Points} onChange={this.handleChange12} />
          <input className="qbutton" type="submit" value="Submit" />
      </form>
    </React.Fragment>
    );
  }
}

export default AskFormQuestion;