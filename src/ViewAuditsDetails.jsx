import React from 'react';
import axios from 'axios';

class ViewAudits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionSetVersionEntityId: this.props.questionSetVersionEntityId,
            list: null,
            showAuditList: false,
            showAuditListDetails: false,
            //showAuditListDetails2: this.props.showAuditListDetails2,
        };
    }

  componentDidMount() {
    this.getQsets();
  }

  getQsets() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/prm/sc/de?qsId=" + this.props.questionSetVersionEntityId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            list: response.data,
          });
          this.renderTableData();
          this.setState({showAuditList: true, showAuditListDetails: false,});
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

    getAuditDetails(event) {
         const name = JSON.parse(sessionStorage.getItem('tokens'));
         const u = name.userName;
         const p = name.password;
         const token = u +':' + p;
         const hash = btoa(token);
         const Basic = 'Basic ' + hash;
         axios.get("http://localhost:8080/a/y?sv=" + this.props.questionSetVersionEntityId + "&fnm=" + event.target.value,
         {headers : { 'Authorization' : Basic }})
         .then((response) => {
           this.setState({
             isLoaded: true,
             list: response.data,
           });
           this.renderTableData2();
           this.setState({showAuditList: false, showAuditListDetails: true});
                }).catch(error => {this.setState({ isLoaded: true, error,});
                });
     }

   renderTableData2() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
               <td> #{data.questionsEntity.sequenceNumber} &nbsp; &nbsp;</td>
               <td> {data.userName} &nbsp; &nbsp;</td>
               <td> {data.questionsEntity.question} &nbsp; &nbsp;</td>
               <td> {data.answer} &nbsp; &nbsp;</td>
               <td> {data.answerPoints} &nbsp; &nbsp;</td>
               <td> {data.comments} &nbsp; &nbsp;</td>
            </tr>
         )
      })
   }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
               <td> {data.userName} &nbsp; &nbsp;</td>
               <td> &nbsp;{data.score} </td>
               <td> <button class="titleButton" value={data.userName} onClick={e => this.getAuditDetails(e)}> View audit </button> </td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = ["Auditor", "Score"]
      return header.map((key, index) => {
         return <th key={index}>{key} &nbsp;&nbsp;&nbsp;   </th>
      })
   }

    render() {
        return (
        <React.Fragment>

        { this.state.showAuditList &&
         <div>
            <table>
               <tbody>
               <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
               </tbody>
            </table>
         </div> }

        { this.state.showAuditListDetails &&
         <div>
            <table>
               <tbody>
                {this.renderTableData2()}
               </tbody>
            </table>
         </div> }

        </React.Fragment>
        )
    }

}

export default ViewAudits;