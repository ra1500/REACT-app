import React from 'react';
import axios from 'axios';

class ScoresList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            showList: false,
            id: null,
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
        axios.get("http://localhost:8080/prm/sc/dr",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            list: response.data,
          });
          this.renderTableData();
          this.setState({showList: true});
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

    deleteScore(event) {
        this.setState({showList: false}); // magic
        const data = {id: event.target.value};
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.post("http://localhost:8080/prm/sc/dl", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            list: response.data,
          });
          this.getQsets();
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }



   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
                <td> {data.questionSetVersionEntity.title} &nbsp; &nbsp;</td>
                <td> {data.questionSetVersionEntity.description} &nbsp;&nbsp;  </td>
               <td> &nbsp;{data.score} </td>
               <td> <button className="qsbutton" value={data.id} onClick={e => this.deleteScore(e)}> remove </button> </td>
               <td> <button className="qsbutton" value={data.id} onClick={e => this.props.manageAudit(e)}> Invite Audit </button> </td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = ["Title", "Description","Score"]
      return header.map((key, index) => {
         return <th key={index}>{key} &nbsp;&nbsp;&nbsp;   </th>
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

export default ScoresList;