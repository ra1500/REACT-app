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
        axios.get("http://localhost:8080/api/prm/sc/dr",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoaded: true,
            list: response.data,
            showList: true,
          });
         } // end if
         else { this.setState({showList: false}); }
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }


   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={index}>
                <td class="tableData"> <button class="titleButton" value={data.questionSetVersionEntity} onClick={e => this.props.renderSingleScore(data.id ,data.questionSetVersionEntity.id, data.questionSetVersionEntity.title, data.questionSetVersionEntity.description, data.score,e)}> {data.questionSetVersionEntity.title} </button> </td>
                <td class="tableData"> {data.questionSetVersionEntity.description} &nbsp;&nbsp;  </td>
                <td class="tableData"> &nbsp;{data.score} </td>
                <td class="tableData"> &nbsp;{data.result} </td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = ["Title", "Description", "Score", "Result" ]
      return header.map((key, index) => {
         return <th key={index}>{key}    </th>
      })
   }

    render() {
        return (
        <React.Fragment>

        { !this.state.showList &&
         <div id="meSettingsDiv">
         <p> Posted Stats </p>
         <p class="alertsSmallP"> &nbsp;(none posted)</p>
         </div> }

        { this.state.showList &&
         <div id="meSettingsDiv">
         <p> Posted Stats </p>
            <table>
               <tbody>
               <tr><th class="thTitle">Title</th><th>Description</th><th>Score</th><th>Result</th></tr>
                {this.renderTableData()}
               </tbody>
            </table>
         </div> }

        </React.Fragment>
        )
    }

}

export default ScoresList;