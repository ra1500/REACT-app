import React from "react";
import Questions from "./Questions";
import axios from 'axios';
import ShowAnswers from "./ShowAnswers";

class QuestionSetSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.addToProfile = this.addToProfile.bind(this); // Binded since this is called from child!!!
    this.renderNJSets = this.renderNJSets.bind(this);
    this.renderNetworkSets = this.renderNetworkSets.bind(this);
    this.renderMySets = this.renderMySets.bind(this);
    this.seeAnswers = this.seeAnswers.bind(this);
    this.state = {
          questionSetSize: 500,
          questionToGoTo: 1, // initialized at first question sequence of the set.
          questionSetVersion: null,
          maxPoints: 10000,
          category: null,
          description: null,
          title: null,
          version: null,
          renderQuestions: false,
          scorePostedMessage: null,
          showList: false,
          showListNone: false,
          showListNetwork: false,
          showListNetworkNone: false,
          showListMySets: false,
          showListMySetsNone: false,
          showAnswers: false,
          showAnswersButton: true,
        };
    };

  componentDidMount() {
        this.getNJQsets();
  }

  handleSubmit1(event) {
    this.setState({renderQuestions: false});
    this.state = {questionSetVersion: event.target.value}; // must mutate state directly cuz setState is for matching another variable
    this.setState({questionSetVersion: this.state.questionSetVersion}); // setState to the current value of state.
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
        axios.get("http://localhost:8080/api/qs/q?sn=" + this.state.questionSetVersion,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            questionSetSize: response.data.maxQtyQuestions,
            maxPoints: response.data.maxPoints,
          });
          if (response.data.maxPoints === null) {this.setState({ maxPoints: 0})};
          this.renderQuestions(); // ********
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

    // TODO is this redundant? just get from useranswersentity via parent.
  getQuestionSetVersionEntity() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/qs/g?qsid=" + this.state.questionSetVersion,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            category: response.data.category,
            description: response.data.description,
            title: response.data.title,
            version: response.data.version,
            showScoring: response.data.scoringStyle,
            displayAnswers: response.data.displayAnswers,
            result1: response.data.result1,
            result2: response.data.result2,
            result3: response.data.result3,
            result4: response.data.result4,
            result1start: response.data.result1start,
            result2start: response.data.result2start,
            result3start: response.data.result3start,
          });

          if      (response.data.scoringStyle === 1) {this.setState({showScoring: false,});}
          else                                       {this.setState({showScoring: true,});};

          if      (response.data.displayAnswers === 1) {this.setState({showAnswersButton: true});}
          else                                         {this.setState({showAnswersButton: false});};


          if      (response.data.result1start === undefined) {this.setState({result1start: "", result2end: "", result2start: "", result3end: "", result3start: "", result4end: "", result4start: ""});}
          else if (response.data.result2start === undefined) {this.setState({ result2end: "", result2start: "", result3end: "", result3start: "", result4end: "", });}
          else if (response.data.result3start === undefined) {this.setState({ result2end: +response.data.result1start-1, result3end: "", result3start: "", result4end: "", });}
          else {this.setState({result2end: +response.data.result1start-1, result3end: +response.data.result2start-1, result4end: +response.data.result3start-1, result4start: 0});}
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  getNJQsets() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/prm/sc/dw",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoaded: true,
            list: response.data,
          });
          this.setState({renderQuestions: false, showList: true, showListNone: false, showListNetwork: false, showListMySets: false,});
          this.renderTableData();
          } // end if
          else {this.setState({renderQuestions: false, showList: true, showListNone: true, showListNetwork: false, showListMySets: false,}); }
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  getNetworkQsets() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/prm/sc/dv",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoaded: true,
            list: response.data,
          });
          this.setState({renderQuestions: false, showList: false, showListNetworkNone: false, showListNetwork: true, showListMySets: false,});
          this.renderTableData();
          } // end if
          else {this.setState({renderQuestions: false, showList: false, showListNetworkNone: true, showListNetwork: true, showListMySets: false,}); }
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  getMyQsets() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/prm/sc/du",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoaded: true,
            list: response.data,
          });
          this.setState({renderQuestions: false, showList: false, showListMySetsNone: false, showListNetwork: false, showListMySets: true,});
          this.renderTableData();
          } // end if
          else {this.setState({renderQuestions: false, showList: false, showListMySetsNone: true, showListNetwork: false, showListMySets: true,}); }
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  renderQuestions() {
    if (this.state.questionSetVersion == null) {
        this.setState({renderQuestions: false});
     } // end if
     else {
        this.setState({renderQuestions: true, showList: false, showListNetwork: false, showListMySets: false,});
     }
  }

    renderNJSets() {
        this.setState({showAnswers: false,});
        this.getNJQsets();
    }
    renderNetworkSets() {
        this.setState({showAnswers: false,});
        this.getNetworkQsets();
    }
    renderMySets() {
        this.setState({showAnswers: false,});
        this.getMyQsets();
    }

    seeAnswers() {
        this.setState({showAnswers: true,});
    }

  // called from child, 'Questions'
  addToProfile(value) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { auditee: u,  result: value};  // sending over auditee since this method also in 'AuditQuestions' where it is set to friend.
        axios.post("http://localhost:8080/api/prm/sc/d?qsId=" + this.state.questionSetVersion,
        data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, scorePostedMessage: "Your score has been posted"
          });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
  }

   renderTableDataNetwork() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
                <td> <button className="titleButton" value={data.questionSetVersionEntity.id} onClick={e => this.handleSubmit1(e)}> {data.questionSetVersionEntity.title} </button> </td>
                <td> {data.questionSetVersionEntity.creativeSource} &nbsp;&nbsp;  </td>
                <td> {data.questionSetVersionEntity.description} &nbsp;&nbsp;  </td>
            </tr>
         )
      })
   }
   renderTableHeaderNetwork() {
      let header = ["Title","Creator", "Description"]
      return header.map((key, index) => {
         return <th key={index}>{key}  </th>
      })
   }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
                <td> <button className="titleButton" value={data.questionSetVersionEntity.id} onClick={e => this.handleSubmit1(e)}> {data.questionSetVersionEntity.title} </button> </td>
                <td> {data.questionSetVersionEntity.description} &nbsp;&nbsp;  </td>
            </tr>
         )
      })
   }


   render() {
    return (
        <React.Fragment>

          <div class="settings3ButtonsDiv">
            <button class="settingsButton" onClick={this.renderNJSets}> NJ Sets  </button>
            <button class="settingsButton" onClick={this.renderNetworkSets}> Network Sets </button>
            <button class="settingsButton" onClick={this.renderMySets}> My Created Sets </button>
          </div>

        { this.state.showListNetwork &&
         <div class="topParentDiv">
        <p> Answer - Network Sets </p>
        <p></p>
        <div class="secondParentDiv">
            { this.state.showListNetworkNone &&
            <div>
            <p class="alertsSmallP"> &nbsp;(nothing to see here yet)</p>
            </div> }
            { !this.state.showListNetworkNone &&
            <div>
            <table>
               <tbody>
               <tr><th class="thTitle">Title</th><th>Creator</th><th>Description</th></tr>
                {this.renderTableDataNetwork()}
               </tbody>
            </table>
            </div> }
         </div>
         </div> }

        { this.state.showList &&
         <div class="topParentDiv">
        <p> Answer - NJ Sets </p>
        <p></p>
        <div class="secondParentDiv">
            { this.state.showListNone &&
            <div>
            <p class="alertsSmallP"> &nbsp;(nothing to see here yet)</p>
            </div> }
            { !this.state.showListNone &&
            <div>
            <table>
               <tbody>
               <tr><th class="thTitle">Title</th><th>Description</th></tr>
                {this.renderTableData()}
               </tbody>
            </table>
            </div> }
         </div>
         </div> }

        { this.state.showListMySets &&
         <div class="topParentDiv">
        <p> Answer - My Created Sets </p>
        <p></p>
        <div class="secondParentDiv">
            { this.state.showListMySetsNone &&
            <div>
            <p class="alertsSmallP"> &nbsp;(nothing to see here yet)</p>
            </div> }
            { !this.state.showListMySetsNone &&
            <div>
            <table>
               <tbody>
               <tr><th class="thTitle">Title</th><th>Description</th></tr>
                {this.renderTableData()}
               </tbody>
            </table>
            </div> }
         </div>
         </div> }

        { this.state.renderQuestions &&
         <div class="topParentDiv">
        <p> Answer </p>
        <div id="questionsComponent">
        <Questions questionSetVersion={this.state.questionSetVersion} questionSetSize={this.state.questionSetSize} questionToGoTo={this.state.questionToGoTo}
        maxPoints={this.state.maxPoints} title={this.state.title} description={this.state.description} showScoring={this.state.showScoring}
        addToProfile={this.addToProfile} scorePostedMessage={this.state.scorePostedMessage} result1={this.state.result1}
         result2={this.state.result2} result3={this.state.result3} result4={this.state.result4} result1start={this.state.result1start}
         result2start={this.state.result2start} result3start={this.state.result3start} result4start={this.state.result4start}
          result2end={this.state.result2end} result3end={this.state.result3end} result4end={this.state.result4end} seeAnswers={this.seeAnswers}
           showAnswersButton={this.state.showAnswersButton}/>
        </div>
        </div> }


         {this.state.showAnswers &&
         <ShowAnswers questionSetVersionEntityId={this.state.questionSetVersion} /> }

        </React.Fragment>
    ); // end return
   }
}

export default QuestionSetSelector;