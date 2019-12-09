import React from 'react';
import axios from 'axios';

class ViewAudits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionSetVersionEntityId: this.props.questionSetVersionEntityId,
            list: null,
            showList: false,
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
          this.setState({showList: true,});
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
               <td> {data.userName} &nbsp; &nbsp;</td>
               <td> &nbsp;{data.score} </td>
               <td> &nbsp;{data.result} </td>
               <td> <button class="greenButton" value={data.userName} onClick={e => this.props.getAuditDetails(e)}> View audit </button> </td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = ["Auditor", "Score", "Result"]
      return header.map((key, index) => {
         return <th key={index}>{key}</th>
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
                {this.renderTableData()}
               </tbody>
            </table>
         </div> }

        </React.Fragment>
        )
    }

}

export default ViewAudits;