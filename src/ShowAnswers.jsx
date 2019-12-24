import React from 'react';
import axios from 'axios';

class ShowAnswers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                questionSetVersionEntityId: this.props.questionSetVersionEntityId,
            list: null,
            showList: false,
        };
    }

  componentDidMount() {
    this.getQuestions();
  }

    getQuestions() {
         const name = JSON.parse(sessionStorage.getItem('tokens'));
         const u = name.userName;
         const p = name.password;
         const token = u +':' + p;
         const hash = btoa(token);
         const Basic = 'Basic ' + hash;
         axios.get("http://localhost:8080/api/q/b?qsId=" + this.props.questionSetVersionEntityId,
         {headers : { 'Authorization' : Basic }})
         .then((response) => {
           this.setState({
             isLoaded: true,
             list: response.data,
           });
           this.state.list.sort((a,b) => (a.sequenceNumber > b.sequenceNumber) ? 1 : ((b.sequenceNumber > a.sequenceNumber) ? -1 : 0));
           this.setState({showList: true});
                }).catch(error => {this.setState({ isLoaded: true, error,});
                });
     }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
               <td> {data.sequenceNumber} &nbsp;</td>
               <td> {data.question} &nbsp;</td>
               <td> {data.answer1} &nbsp;</td>
               <td> {data.answer1Points} &nbsp;</td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = ["#", "Question","Answer", "Answer Points",]
      return header.map((key, index) => {
         return <th key={index}>{key} </th>
      })
   }

    render() {
        return (
        <React.Fragment>

        { this.state.showList &&
        <div class="topParentDiv">
         <p>Highest Score Answers/Correct Answers </p>
         <div class="secondParentDiv">
            <table>
               <tbody>
               <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
               </tbody>
            </table>
         </div>
         </div> }

        </React.Fragment>
        )
    }

}

export default ShowAnswers;