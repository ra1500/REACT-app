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
    this.toggleEditInputBoxes = this.toggleEditInputBoxes.bind(this);
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
          showInputBoxes: true,
          showQsetDetails: false,
          showAskFormQuestion: false,
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
    this.setState({showInputBoxes: false});
    this.setState({showQsetDetails: true});
    this.setState({showAskFormQuestion: true});
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
        axios.post("http://localhost:8080/qs/p?qsid=" + this.state.questionSetVersion, data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true,
                  });
         this.getQuestionSetVersionNumber(); //
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
   }

    toggleEditInputBoxes() {
        this.setState({showInputBoxes: true});
        this.setState({showQsetDetails: false});
        this.setState({showAskFormQuestion: true});
    }

  render() {
    return (
    <React.Fragment>
       <p>Pose it to your world</p>

      { this.state.showInputBoxes &&
      <div id="QsetInputBoxes">
      <form onSubmit={this.handleSubmit1}>
          <div class="askDiv"><span class="askText">Title &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span> <input class="askForm" type="text" size="20" maxlength="20" value={this.state.question} onChange={this.handleChange1} /> </div>
          <div class="askDiv"><span class="askText">Category &nbsp; &nbsp; &nbsp;</span> <input class="askForm" type="text" size="20" maxlength="20" value={this.state.category} onChange={this.handleChange2} /></div>
          <div class="askDiv"><span class="askText">Description &nbsp;</span> <input class="askForm" type="text" size="70" maxlength="70" value={this.state.description} onChange={this.handleChange3} /></div>
          <input className="qbutton" type="submit" value="Submit" /><span> Submit and start adding questions to your new inquiry </span>
      </form>
      </div> }

      { this.state.showQsetDetails &&
      <div id="QsetInputBoxes">
        <p>&nbsp; &nbsp; &nbsp; Title &nbsp; > &nbsp; {this.state.title} </p>
        <p>&nbsp; Category &nbsp; > &nbsp; {this.state.category} </p>
        <p>Description &nbsp; > &nbsp; {this.state.description} </p>
        <button onClick={this.toggleEditInputBoxes}> Change </button> <span> Edit Title, Category, or Description </span>
        <input className="qbutton" type="submit" value="Delete All" />
        <p>You are now entering question number &nbsp; {this.state.sequenceNumber}</p>
      </div> }

      { this.state.showAskFormQuestion &&
      <AskFormQuestion sequenceNumber={this.state.sequenceNumber} questionSetVersion={this.state.questionSetVersion} manageSequenceNumber={this.manageSequenceNumber} />
      }

    </React.Fragment>
    );
  }
}

export default AskFormQset;