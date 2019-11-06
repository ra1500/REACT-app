import React from "react";
import axios from 'axios';
import AskFormQuestion from "./AskFormQuestion";

class AskFormQset extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.manageSequenceNumber = this.manageSequenceNumber.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          title: null,
          category: null,
          description: null,
          creativeSource: null,
          questionSetVersion: "1",
          sequenceNumber: "1",
        };
  }

    componentDidMount() {
    }

   handleChange1(event) {
     this.setState({title: event.target.value});
   }
   handleChange2(event) {
     this.setState({category: event.target.value});
   }
    handleChange3(event) {
      this.setState({description: event.target.value});
    }

  handleSubmit1(event) {
    event.preventDefault();
    this.postNewQset();
    }

  manageSequenceNumber() {
    this.state = {sequenceNumber: ++this.state.sequenceNumber};
    this.setState({sequenceNumber: this.state.sequenceNumber});
    console.log(this.state.sequenceNumber);
  }

   postNewQset() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { title: this.state.title, category: this.state.category, description: this.state.description, };
        axios.post("http://localhost:8080/qs", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true,
                  });
         this.getFriendships(); //
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
   }

  render() {
    return (
    <React.Fragment>
        <p>Make your own quiz</p>
      <form onSubmit={this.handleSubmit1}>
          Title
          <input class="askForm" type="text" value={this.state.question} onChange={this.handleChange1} />
          Category
          <input class="askForm" type="text" value={this.state.category} onChange={this.handleChange2} />
          Description
          <input class="askForm" type="text" value={this.state.description} onChange={this.handleChange3} />
          <input className="qbutton" type="submit" value="Submit" />
      </form>
      <p>{this.state.sequenceNumber}</p>
      <AskFormQuestion sequenceNumber={this.state.sequenceNumber} questionSetVersion={this.state.questionSetVersion} manageSequenceNumber={this.manageSequenceNumber} />
    </React.Fragment>
    );
  }
}

export default AskFormQset;