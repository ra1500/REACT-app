import React from 'react';
import axios from 'axios';

class ViewAuditsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionSetVersionEntityId: this.props.questionSetVersionEntityId,
            list: null,
            showList: false,
            auditorName: this.props.auditorName,
        };
    }

  componentDidMount() {
    this.getAuditDetails();
  }

    getAuditDetails(event) {
         const name = JSON.parse(sessionStorage.getItem('tokens'));
         const u = name.userName;
         const p = name.password;
         const token = u +':' + p;
         const hash = btoa(token);
         const Basic = 'Basic ' + hash;
         axios.get("http://localhost:8080/api/a/y?sv=" + this.props.questionSetVersionEntityId + "&fnm=" + this.props.auditorName,
         {headers : { 'Authorization' : Basic }})
         .then((response) => {
           this.setState({
             isLoaded: true,
             list: response.data,
           });
           this.state.list.sort((a,b) => (a.questionsEntity.sequenceNumber > b.questionsEntity.sequenceNumber) ? 1 : ((b.questionsEntity.sequenceNumber > a.questionsEntity.sequenceNumber) ? -1 : 0));
           this.setState({showList: true,});
                }).catch(error => {this.setState({ isLoaded: true, error,});
                });
     }

   renderTableData2() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
               <td> {data.questionsEntity.sequenceNumber} &nbsp; &nbsp;</td>
               <td> {data.userName} &nbsp; &nbsp;</td>
               <td> {data.questionsEntity.question} &nbsp; &nbsp;</td>
               <td> {data.answer} &nbsp; &nbsp;</td>
               <td> {data.answerPoints} &nbsp; &nbsp;</td>
               <td> {data.comments} &nbsp; &nbsp;</td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = [ "#","Auditor", "Question", "Auditor's Answer","Auditor's Points", "Comments"]
      return header.map((key, index) => {
         return <th key={index}>{key} </th>
      })
   }

    render() {
        return (
        <React.Fragment>

        { this.state.showList &&
         <div>
            <table>
               <tbody>
                <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData2()}
               </tbody>
            </table>
         </div> }

        </React.Fragment>
        )
    }

}

export default ViewAuditsDetails;